"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeAssistantWsGenericTrigger = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const HomeAssistant_1 = require("./HomeAssistant");
const GenericProperties_1 = require("./operations/GenericProperties");
const cred_1 = require("./cred");
class HomeAssistantWsGenericTrigger {
    constructor() {
        this.description = {
            displayName: 'Home Assistant Generic WS Trigger',
            name: 'homeAssistantWsGenericTrigger',
            icon: 'file:homeAssistantWs.svg',
            group: ['trigger'],
            version: 1,
            subtitle: '={{ $parameter["type"] }}',
            description: 'Starts a Workflow on a Generic Home Assistant Event',
            defaults: {
                name: 'Home Assistant Generic WS Trigger',
            },
            inputs: [],
            outputs: ["main"],
            credentials: [
                {
                    name: 'homeAssistantWsApi',
                    required: true,
                    testedBy: 'homeAssistantWsApiTest'
                },
            ],
            properties: [
                ...(0, GenericProperties_1.genericNodeProperties)(false)
            ]
        };
        this.methods = {
            credentialTest: cred_1.credentialTest
        };
    }
    async trigger() {
        let assistant;
        let emitter;
        let running = false;
        const subscribeToEvents = async () => {
            const type = this.getNodeParameter('type', null, {});
            if (!type) {
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Type is required');
            }
            const hasParameters = this.getNodeParameter('hasParameters', null);
            const bodyParameters = this.getNodeParameter('bodyParameters.parameters', null);
            const jsonBodyParameter = this.getNodeParameter('jsonBody', null);
            let queryParams = (0, GenericProperties_1.parseQueryParams)(this, hasParameters, bodyParameters, jsonBodyParameter);
            emitter = await assistant.subscribe_generic(type, queryParams);
            emitter === null || emitter === void 0 ? void 0 : emitter.on('error', (error) => {
                var _a, _b;
                stopConsumer();
                this.emitError(new n8n_workflow_1.NodeOperationError(this.getNode(), error, {
                    message: (_a = error['message']) !== null && _a !== void 0 ? _a : 'Unknown error',
                    description: (_b = error['description']) !== null && _b !== void 0 ? _b : 'Unknown error'
                }));
            });
            emitter === null || emitter === void 0 ? void 0 : emitter.on('event', (event) => {
                this.emit([
                    this.helpers.returnJsonArray([event])
                ]);
            });
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
exports.HomeAssistantWsGenericTrigger = HomeAssistantWsGenericTrigger;
//# sourceMappingURL=HomeAssistantWsGenericTrigger.node.js.map