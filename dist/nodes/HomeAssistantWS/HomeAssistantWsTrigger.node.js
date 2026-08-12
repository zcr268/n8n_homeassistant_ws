"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeAssistantWsTrigger = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const HomeAssistant_1 = require("./HomeAssistant");
const loadOptions_1 = require("./loadOptions");
const cred_1 = require("./cred");
class HomeAssistantWsTrigger {
    constructor() {
        this.description = {
            displayName: 'Home Assistant WS Trigger',
            name: 'homeAssistantWsTrigger',
            icon: 'file:homeAssistantWs.svg',
            group: ['trigger'],
            version: 1,
            subtitle: '={{ $parameter["resource"]}}',
            description: 'Starts a Workflow on a Home Assistant Event',
            defaults: {
                name: 'Home Assistant WS Trigger',
            },
            inputs: [],
            outputs: ["main"],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    options: [
                        {
                            name: 'State Changed',
                            value: 'state',
                        },
                        {
                            name: 'Trigger Fired',
                            value: 'trigger'
                        },
                    ],
                    default: 'state',
                    noDataExpression: true,
                    required: true,
                    description: 'The type of event to listen for',
                },
                {
                    displayName: 'Entity Name or ID',
                    name: 'entityId',
                    type: 'options',
                    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                    default: '',
                    displayOptions: {
                        show: {
                            resource: ['state'],
                        }
                    },
                    typeOptions: {
                        loadOptionsMethod: 'load_entity_options',
                    },
                },
                {
                    displayName: 'Device Name or ID',
                    name: 'deviceId',
                    type: 'options',
                    description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                    default: '',
                    displayOptions: {
                        show: {
                            resource: ['trigger'],
                        }
                    },
                    typeOptions: {
                        loadOptionsMethod: 'load_device_options',
                    },
                },
                {
                    displayName: 'Trigger Names or IDs',
                    name: 'triggerId',
                    type: 'multiOptions',
                    description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                    default: [],
                    displayOptions: {
                        show: {
                            resource: ['trigger'],
                        }
                    },
                    typeOptions: {
                        loadOptionsDependsOn: ['deviceId'],
                        loadOptionsMethod: 'load_trigger_options',
                    },
                },
            ],
            credentials: [
                {
                    name: 'homeAssistantWsApi',
                    required: true,
                    testedBy: 'homeAssistantWsApiTest'
                },
            ],
        };
        this.methods = {
            loadOptions: {
                load_entity_options: loadOptions_1.load_entity_options,
                load_device_options: loadOptions_1.load_device_options,
                load_trigger_options: loadOptions_1.load_trigger_options,
            },
            credentialTest: cred_1.credentialTest
        };
    }
    async trigger() {
        let assistant;
        let emitter;
        let running = false;
        const subscribeToEvents = async () => {
            const resource = this.getNodeParameter('resource', null, {});
            switch (resource) {
                case 'state': {
                    const entityId = this.getNodeParameter('entityId', null, {});
                    emitter = await assistant.subscribe_events('state_changed');
                    emitter === null || emitter === void 0 ? void 0 : emitter.on('event', async (event) => {
                        const data = event.data;
                        if (!entityId || data.entity_id == entityId) {
                            this.emit([
                                this.helpers.returnJsonArray([event])
                            ]);
                        }
                    });
                    emitter === null || emitter === void 0 ? void 0 : emitter.on('error', (error) => {
                        this.emitError(new n8n_workflow_1.NodeApiError(this.getNode(), error));
                    });
                    break;
                }
                case 'trigger':
                    {
                        const triggerId = this.getNodeParameter('triggerId', null, {});
                        const deviceId = this.getNodeParameter('deviceId', null, {});
                        emitter = await assistant.subscribe_trigger(deviceId, triggerId);
                        emitter === null || emitter === void 0 ? void 0 : emitter.on('event', (event) => {
                            this.emit([
                                this.helpers.returnJsonArray([event])
                            ]);
                        });
                        emitter === null || emitter === void 0 ? void 0 : emitter.on('error', (error) => {
                            this.emitError(new n8n_workflow_1.NodeApiError(this.getNode(), error));
                        });
                    }
                    break;
            }
        };
        const resubscribeAfterReconnect = async () => {
            try {
                emitter === null || emitter === void 0 ? void 0 : emitter.removeAllListeners();
                await subscribeToEvents();
            }
            catch (error) {
                this.logger.error('Error resubscribing after reconnect:', error);
                this.emitError(new n8n_workflow_1.NodeApiError(this.getNode(), error));
            }
        };
        const startConsumer = async () => {
            running = true;
            const cred = await this.getCredentials('homeAssistantWsApi');
            assistant = new HomeAssistant_1.HomeAssistant(cred.protocol, cred.host, cred.apiKey, this.logger);
            await subscribeToEvents();
            emitter === null || emitter === void 0 ? void 0 : emitter.on('error', (error) => {
                var _a, _b;
                stopConsumer();
                this.emitError(new n8n_workflow_1.NodeOperationError(this.getNode(), error, {
                    message: (_a = error['message']) !== null && _a !== void 0 ? _a : 'Unknown error',
                    description: (_b = error['description']) !== null && _b !== void 0 ? _b : 'Unknown error'
                }));
            });
            assistant.on('close', (code, reason) => {
                this.logger.info(`HomeAssistant connection closed: ${code} - ${reason}`);
            });
            assistant.on('reconnecting', (attempt, delay) => {
                this.logger.info(`HomeAssistant reconnecting... attempt ${attempt}, delay ${delay}ms`);
            });
            assistant.on('connected', () => {
                this.logger.info('HomeAssistant reconnected successfully');
                resubscribeAfterReconnect();
            });
            assistant.on('reconnect_failed', () => {
                stopConsumer();
                this.emitError(new n8n_workflow_1.NodeOperationError(this.getNode(), 'Connection could not be re-established after multiple attempts'));
            });
            return Promise.resolve(true);
        };
        async function stopConsumer() {
            await (assistant === null || assistant === void 0 ? void 0 : assistant.removeAllWebSocketListeners());
            await (assistant === null || assistant === void 0 ? void 0 : assistant.close());
            emitter === null || emitter === void 0 ? void 0 : emitter.removeAllListeners();
            running = false;
        }
        async function manualTriggerFunction() {
            if (!running) {
                await startConsumer();
            }
        }
        await startConsumer();
        return {
            closeFunction: stopConsumer,
            manualTriggerFunction: manualTriggerFunction,
        };
    }
}
exports.HomeAssistantWsTrigger = HomeAssistantWsTrigger;
//# sourceMappingURL=HomeAssistantWsTrigger.node.js.map