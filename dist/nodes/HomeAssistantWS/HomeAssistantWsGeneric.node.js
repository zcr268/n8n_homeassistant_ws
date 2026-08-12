"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeAssistantWsGeneric = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const HomeAssistant_1 = require("./HomeAssistant");
const utils_1 = require("./utils");
const cred_1 = require("./cred");
const GenericProperties_1 = require("./operations/GenericProperties");
class HomeAssistantWsGeneric {
    constructor() {
        this.description = {
            displayName: 'Home Assistant Generic WS',
            name: 'homeAssistantWsGeneric',
            subtitle: '={{ $parameter["type"] }}',
            icon: 'file:homeAssistantWs.svg',
            group: ['transform'],
            version: 1,
            description: 'Node to interact with Home Assistant through the WebSocket API with generic operations',
            defaults: {
                name: 'Home Assistant Generic WS',
            },
            usableAsTool: true,
            inputs: ["main"],
            outputs: ["main"],
            credentials: [
                {
                    name: 'homeAssistantWsApi',
                    required: true,
                    testedBy: 'homeAssistantWsApiTest'
                },
            ],
            properties: [
                ...(0, GenericProperties_1.genericNodeProperties)(true)
            ]
        };
        this.methods = {
            credentialTest: cred_1.credentialTest
        };
    }
    async execute() {
        const cred = await this.getCredentials('homeAssistantWsApi');
        const assistant = new HomeAssistant_1.HomeAssistant(cred.protocol, cred.host, cred.apiKey, this.logger);
        const items = this.getInputData();
        let results = [];
        for (let i = 0; i < items.length; i++) {
            const type = this.getNodeParameter('type', i, null);
            if (!type) {
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Type is required');
            }
            const hasResponse = this.getNodeParameter('response', i, true);
            const hasParameters = this.getNodeParameter('hasParameters', i, false);
            const bodyParameters = this.getNodeParameter('bodyParameters.parameters', i, null);
            const jsonBodyParameter = this.getNodeParameter('jsonBody', i, null);
            let queryParams = (0, GenericProperties_1.parseQueryParams)(this, hasParameters, bodyParameters, jsonBodyParameter, {
                itemIndex: i
            });
            if (hasResponse) {
                const result = await assistant.send_with_response(type, d => Promise.resolve(d), queryParams);
                results.push(this.helpers.returnJsonArray(result));
            }
            else {
                await assistant.send_no_response(type, queryParams);
                results.push(this.helpers.returnJsonArray([]));
            }
        }
        await assistant.close();
        return (0, utils_1.mapResults)(this, items, results);
    }
}
exports.HomeAssistantWsGeneric = HomeAssistantWsGeneric;
//# sourceMappingURL=HomeAssistantWsGeneric.node.js.map