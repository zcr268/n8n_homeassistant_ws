"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeAssistant = exports.CommandCounter = void 0;
const ws_1 = require("ws");
const Area_1 = require("./model/Area");
const Config_1 = require("./model/Config");
const Device_1 = require("./model/Device");
const Entity_1 = require("./model/Entity");
const State_1 = require("./model/State");
const Trigger_1 = require("./model/Trigger");
const SocketConnection_1 = require("./SocketConnection");
class CommandCounter {
    constructor() {
        this.cmd = 1;
    }
    get() {
        return this.cmd++;
    }
    reset() {
        this.cmd = 1;
    }
}
exports.CommandCounter = CommandCounter;
var MessageType;
(function (MessageType) {
    MessageType["RESULT"] = "result";
    MessageType["RESULT_WITH_ERROR"] = "result_error";
    MessageType["EVENT"] = "event";
    MessageType["AUTH_REQUIRED"] = "auth_required";
    MessageType["AUTH_OK"] = "auth_ok";
    MessageType["ERROR"] = "error";
    MessageType["PING"] = "ping";
    MessageType["PONG"] = "pong";
})(MessageType || (MessageType = {}));
class HomeAssistant extends ws_1.EventEmitter {
    oneShot(callback) {
        const result = callback(this)
            .then(x => {
            this.close();
            return x;
        });
        return result;
    }
    constructor(protocol, host, apiKey, logger) {
        super();
        this.protocol = protocol;
        this.host = host;
        this.apiKey = apiKey;
        this.logger = logger;
        this.cmd = new CommandCounter();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = Infinity;
        this.reconnectTimeoutId = null;
        this.isReconnecting = false;
        this.shouldReconnect = true;
        this.hasConnectedOnce = false;
        this.lastConnectionError = null;
        this.pingIntervalId = null;
        this.pongTimeoutId = null;
        this.pingInterval = 30000;
        this.pongTimeout = 10000;
        this.lastPongReceived = Date.now();
        this.callbacks = new Map();
        this.ws = this.get_authenticated_ws();
    }
    get_logbook(startTime, endTime, deviceIds, entityIds, contextId) {
        const params = {
            start_time: startTime
        };
        if (endTime) {
            params.end_time = endTime;
        }
        if (deviceIds) {
            params.device_ids = deviceIds;
        }
        if (entityIds) {
            params.entity_ids = entityIds;
        }
        if (contextId) {
            params.context_id = contextId;
        }
        return this.send_with_single_response('logbook/get_events', (data) => {
            return Promise.resolve(data);
        }, params);
    }
    get_service_domains() {
        const promise = this.send_with_single_response("get_services", (data) => {
            const options = [];
            for (let k in data) {
                options.push(k);
            }
            return Promise.resolve(options);
        });
        return promise;
    }
    get_all_entities() {
        return this.get_entities();
    }
    get_entities(entityType, areaId, deviceId) {
        return this.get_all_devices().then(devices => {
            return this.send_with_single_response('config/entity_registry/list', (data) => {
                const result = data
                    .map(item => {
                    const entity = Entity_1.Entity.fromJSON(item);
                    const device = devices.find(d => d.id === entity.device_id);
                    entity.device = device;
                    return entity;
                })
                    .filter(item => {
                    var _a;
                    const inArea = !areaId || areaId.trim() === '' || item.area_id === areaId || ((_a = item.device) === null || _a === void 0 ? void 0 : _a.area_id) === areaId;
                    const inType = !entityType || entityType.trim() === '' || item.entity_type === entityType;
                    const inDevice = !deviceId || deviceId.trim() === '' || item.device_id === deviceId;
                    return inArea && inType && inDevice;
                });
                return Promise.resolve(result);
            });
        });
    }
    resolve_state(state, entities) {
        const entity = entities.find(e => e.entity_id === state.entity_id);
        state.entity = entity;
        return state;
    }
    get_states(resolve = false) {
        return this.send_with_single_response('get_states', (data) => {
            let resolving;
            if (resolve) {
                resolving = this.get_all_entities();
            }
            else {
                resolving = Promise.resolve([]);
            }
            return resolving.then(entities => {
                const resolvedData = data
                    .map(item => State_1.State.fromJSON(item))
                    .map(item => {
                    if (resolve) {
                        return this.resolve_state(item, entities);
                    }
                    else {
                        return item;
                    }
                });
                return Promise.resolve(resolvedData);
            });
        });
    }
    get_components() {
        return this.get_system_config().then(config => config.components);
    }
    get_system_config(unsafe) {
        return this.send_with_single_response('get_config', (data) => {
            return Promise.resolve(Config_1.Config.fromJSON(data));
        }, undefined, unsafe);
    }
    async waitForReady(timeout = 10000) {
        const config = await this.get_system_config(true);
        if (config.state.trim().toUpperCase() === 'RUNNING') {
            this.logger.info('Automation is ready');
            return;
        }
        this.logger.info(`Home Assistant not ready yet (state: ${config.state}), waiting for homeassistant_started event...`);
        return new Promise((resolve, reject) => {
            let resolved = false;
            let eventEmitter;
            const cleanup = () => {
                if (eventEmitter) {
                    eventEmitter.removeAllListeners();
                }
            };
            const done = (error) => {
                if (!resolved) {
                    resolved = true;
                    cleanup();
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve();
                    }
                }
            };
            const timeoutId = setTimeout(() => {
                this.logger.error(`Timeout waiting for Home Assistant to be ready after ${timeout}ms`);
                done(new Error(`Home Assistant not ready after ${timeout}ms`));
            }, timeout);
            this.subscribe_events('homeassistant_started', true).then(emitter => {
                eventEmitter = emitter;
                emitter.on('event', (x, id) => {
                    this.logger.info(`Received homeassistant_started event, Home Assistant is ready: ${JSON.stringify(x)}`);
                    clearTimeout(timeoutId);
                    this.unsubscribe_events(id);
                    setTimeout(done, 10000);
                });
            }).catch(error => {
                this.logger.error('Failed to subscribe to homeassistant_started event:', error);
                clearTimeout(timeoutId);
                done(error);
            });
        });
    }
    get_all_devices() {
        return this.send_with_single_response('config/device_registry/list', (data) => {
            return Promise.resolve(data
                .map(item => Device_1.Device.fromJSON(item)));
        });
    }
    get_device(deviceId) {
        return this.get_all_devices().then(devices => devices.find(device => device.id === deviceId));
    }
    get_devices_by_area(areaId) {
        return this.get_all_devices().then(devices => devices.filter(device => !areaId || areaId.trim() === '' || device.area_id === areaId));
    }
    get_categories(scope) {
        return this.send_with_single_response('config/category_registry/list', (data) => {
            return Promise.resolve(data);
        }, { scope: scope });
    }
    get_areas() {
        return this.send_with_single_response('config/area_registry/list', (data) => {
            return Promise.resolve(data
                .map(item => Area_1.Area.fromJSON(item)));
        });
    }
    get_triggers_for_device(deviceId) {
        return this.send_with_single_response('device_automation/trigger/list', (data) => {
            return Promise.resolve(data
                .map(item => Trigger_1.Trigger.fromJSON(item)));
        }, { device_id: deviceId });
    }
    subscribe_trigger_mapped(device_id, triggers) {
        return this.subscribe_generic('subscribe_trigger', { trigger: triggers });
    }
    async subscribe_trigger(device_id, trigger) {
        const triggers = await this.get_triggers_for_device(device_id);
        const triggerArray = triggers.filter((t) => trigger.includes(t.getId()));
        if (triggerArray.length <= 0) {
            return Promise.reject("trigger not found");
        }
        else {
            return this.subscribe_trigger_mapped(device_id, triggerArray);
        }
    }
    unsubscribe_events(subscription_id, unsafe) {
        let eventualId;
        if (unsafe) {
            eventualId = Promise.resolve(this.cmd.get());
        }
        else {
            eventualId = this.ws.then(_ => this.cmd.get());
        }
        return eventualId.then(nextId => {
            return this.send(nextId, "unsubscribe_events", { "subscription": subscription_id }, unsafe);
        });
    }
    subscribe_generic(type, params, unsafe) {
        const emitter = new ws_1.EventEmitter();
        let eventualId;
        if (unsafe) {
            eventualId = Promise.resolve(this.cmd.get());
        }
        else {
            eventualId = this.ws.then(_ => this.cmd.get());
        }
        return eventualId.then(id => {
            this.callbacks.set(id, (type, data) => {
                if (type == MessageType.RESULT) {
                    if (!data['success']) {
                        emitter.emit('error', data['error'], id);
                        this.callbacks.delete(id);
                    }
                    else {
                        emitter.emit(MessageType.RESULT, data['result'], id);
                    }
                }
                else if (type == MessageType.EVENT) {
                    emitter.emit(MessageType.EVENT, data['event'], id);
                }
                else if (type == MessageType.ERROR || type == MessageType.RESULT_WITH_ERROR) {
                    emitter.emit(MessageType.ERROR, data, id);
                }
            });
            return this.send(id, type, params, unsafe).then(() => {
                return emitter;
            });
        });
    }
    subscribe_events(type, unsafe) {
        return this.subscribe_generic("subscribe_events", { event_type: type }, unsafe);
    }
    call_service(domain, service, attributes, response) {
        return this.send_with_single_response('call_service', (data) => {
            return Promise.resolve(data);
        }, {
            domain: domain,
            service: service,
            service_data: attributes,
            return_response: response
        });
    }
    get_service_action(domain, service) {
        return this.get_service_actions(domain).then(calls => {
            const call = calls.find(c => c.id == service);
            return Promise.resolve(call);
        });
    }
    get_service_actions(domain) {
        const services = this.send_with_single_response("get_services", (services) => {
            const options = [];
            for (let k in services) {
                if (!domain || domain.trim() === '' || k == domain) {
                    for (let s in services[k]) {
                        const serviceDef = services[k][s];
                        serviceDef['id'] = s;
                        serviceDef['domain'] = k;
                        options.push(serviceDef);
                    }
                }
            }
            return Promise.resolve(options);
        });
        return services;
    }
    get_authenticated_ws() {
        const url = this.protocol + '://' + this.host + '/api/websocket';
        const ws = new ws_1.WebSocket(url, {
            followRedirects: true,
        });
        this.logger.info(`connection to ${url}`);
        const socket = new SocketConnection_1.SocketConnection(ws);
        ws.on('message', (event) => {
            const data = JSON.parse(event.toString());
            if (data['type'] == 'auth_required') {
                ws.send(JSON.stringify({
                    type: 'auth',
                    access_token: this.apiKey,
                }));
            }
            else if (data['type'] == 'auth_ok') {
                this.isReconnecting = false;
                this.waitForReady().then(() => {
                    this.reconnectAttempts = 0;
                    this.hasConnectedOnce = true;
                    this.emit('connected');
                    this.startPingPong();
                    socket.ready();
                }).catch(error => {
                    this.logger.error('Home Assistant not ready, closing connection to retry:', error);
                    this.emit('error', data);
                    socket.error(error);
                    ws.close();
                });
            }
            else if (data['type'] == 'auth_invalid') {
                this.logger.error('authentication invalid', data);
                socket.error(data.message);
                this.emit('error', data);
            }
            else if (data['type'] == 'pong') {
                this.handlePongReceived(data);
            }
            else {
                const id = data['id'];
                const type = data['type'];
                const callback = this.callbacks.get(id);
                if (callback) {
                    callback(type, data);
                }
            }
        });
        ws.on('error', (error) => {
            this.logger.error('WebSocket error', error);
            this.lastConnectionError = error;
            if (!this.hasConnectedOnce) {
                this.logger.error('this is the first connect, fail out');
                this.shouldReconnect = false;
                socket.error(error);
                ws.close();
                this.emit('error', error);
            }
            else {
                if (!this.shouldReconnect) {
                    this.emit('error', error);
                }
            }
        });
        ws.on('close', (code, reason) => {
            this.logger.info(`WebSocket closed with code ${code}, reason: ${reason.toString()}`);
            this.stopPingPong();
            if (this.shouldReconnect) {
                this.attemptReconnect();
            }
            else {
                this.emit('close', code, reason.toString());
            }
        });
        return socket;
    }
    send_with_response(type, mapping, params) {
        return this.send_with_single_response(type, mapping, params);
    }
    send_with_single_response(type, mapping, params, unsafe) {
        let eventualId;
        if (unsafe) {
            eventualId = Promise.resolve(this.cmd.get());
        }
        else {
            eventualId = this.ws.then(_ => this.cmd.get());
        }
        return eventualId.then(id => {
            const promise = new Promise((resolve, reject) => {
                this.callbacks.set(id, (type, data) => {
                    try {
                        this.callbacks.delete(id);
                        if (type == MessageType.RESULT) {
                            const result = data['result'];
                            const error = data['error'];
                            if (error) {
                                reject(error);
                            }
                            else {
                                const mappedResult = mapping(result);
                                if (mappedResult) {
                                    mappedResult.then(r => resolve(r));
                                }
                                else {
                                    reject(new Error("No result returned from mapping function"));
                                }
                            }
                        }
                        else if (type == MessageType.ERROR) {
                            reject(data);
                        }
                    }
                    catch (e) {
                        reject(e);
                    }
                });
            });
            this.logger.info(`send with single response unsafe: ${unsafe}`);
            return this.send(id, type, params, unsafe).then(() => {
                return promise;
            });
        });
    }
    send_no_response(type, params) {
        return this.send(this.cmd.get(), type, params);
    }
    send(id, type, params, unsafe) {
        const jsonString = JSON.stringify({
            type: type,
            id: id,
            ...params
        });
        this.logger.info(`send ${id} ${type} ${jsonString}`);
        if (unsafe) {
            return this.ws.get_unsafe().then(ws => {
                this.logger.info(`sending unsage message ${id}...`);
                ws.send(jsonString);
            });
        }
        else {
            return this.ws.then(ws => {
                ws.send(jsonString);
            });
        }
    }
    onWebSocket(event, listener) {
        return this.ws.then(ws => ws.on(event, listener));
    }
    removeAllWebSocketListeners() {
        return this.ws.then(ws => ws.removeAllListeners());
    }
    attemptReconnect() {
        if (this.isReconnecting || !this.shouldReconnect) {
            return;
        }
        this.isReconnecting = true;
        this.reconnectAttempts++;
        if (this.reconnectAttempts > this.maxReconnectAttempts) {
            this.logger.error(`Max reconnection attempts (${this.maxReconnectAttempts}) reached. Giving up.`);
            this.shouldReconnect = false;
            this.isReconnecting = false;
            this.emit('reconnect_failed', this.lastConnectionError);
            this.emit('close', 1006, 'Reconnection failed');
            return;
        }
        const delay = Math.min(Math.pow(2, this.reconnectAttempts - 1) * 1000, 60000);
        this.logger.info(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.emit('reconnecting', this.reconnectAttempts, delay);
        this.reconnectTimeoutId = setTimeout(() => {
            try {
                this.stopPingPong();
                this.ws.close();
                this.cmd.reset();
                this.ws = this.get_authenticated_ws();
                this.isReconnecting = false;
                this.logger.info(`Reconnection attempt ${this.reconnectAttempts} initiated`);
            }
            catch (error) {
                this.logger.error('Error during reconnection attempt:', error);
                this.isReconnecting = false;
                this.attemptReconnect();
            }
        }, delay);
    }
    stopReconnecting() {
        this.shouldReconnect = false;
        if (this.reconnectTimeoutId) {
            clearTimeout(this.reconnectTimeoutId);
            this.reconnectTimeoutId = null;
        }
        this.isReconnecting = false;
    }
    startPingPong() {
        this.stopPingPong();
        this.lastPongReceived = Date.now();
        this.logger.info('Starting ping-pong mechanism');
        this.pingIntervalId = setInterval(() => {
            this.sendPing();
        }, this.pingInterval);
    }
    stopPingPong() {
        if (this.pingIntervalId) {
            clearInterval(this.pingIntervalId);
            this.pingIntervalId = null;
        }
        if (this.pongTimeoutId) {
            clearTimeout(this.pongTimeoutId);
            this.pongTimeoutId = null;
        }
    }
    sendPing() {
        const pingId = this.cmd.get();
        const pingMessage = {
            type: 'ping',
            id: pingId
        };
        this.logger.debug(`Sending ping ${pingId}`);
        this.ws.then(ws => {
            ws.send(JSON.stringify(pingMessage));
        }).catch(error => {
            this.logger.error('Failed to send ping:', error);
        });
        this.pongTimeoutId = setTimeout(() => {
            this.logger.warn(`Pong timeout for ping ${pingId}`);
            this.handlePongTimeout();
        }, this.pongTimeout);
    }
    handlePongReceived(data) {
        const pongId = data.id;
        this.lastPongReceived = Date.now();
        this.logger.debug(`Received pong ${pongId}`);
        if (this.pongTimeoutId) {
            clearTimeout(this.pongTimeoutId);
            this.pongTimeoutId = null;
        }
    }
    handlePongTimeout() {
        this.logger.error('Ping-pong timeout - connection may be dead');
        this.stopPingPong();
        this.emit('ping_timeout');
        if (this.shouldReconnect && !this.isReconnecting) {
            this.logger.info('Triggering reconnection due to ping timeout');
            this.attemptReconnect();
        }
    }
    getConnectionHealth() {
        const now = Date.now();
        const timeSinceLastPong = now - this.lastPongReceived;
        const maxHealthyInterval = this.pingInterval + this.pongTimeout;
        return {
            lastPongReceived: this.lastPongReceived,
            timeSinceLastPong,
            isHealthy: timeSinceLastPong < maxHealthyInterval
        };
    }
    close() {
        this.stopReconnecting();
        this.stopPingPong();
        return this.ws.then(ws => {
            this.ws.close();
            ws.close();
        });
    }
}
exports.HomeAssistant = HomeAssistant;
//# sourceMappingURL=HomeAssistant.js.map