"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericNodeProperties = genericNodeProperties;
exports.parseQueryParams = parseQueryParams;
const n8n_workflow_1 = require("n8n-workflow");
function genericNodeProperties(withResponseOption) {
    const properties = [
        {
            displayName: 'Type',
            name: 'type',
            type: 'string',
            default: '',
            noDataExpression: false,
        },
    ];
    if (withResponseOption) {
        properties.push({
            displayName: 'Has Response',
            description: 'Whether the request has a response or not. If true, we wait until the websocket responds.',
            name: 'response',
            type: 'boolean',
            default: true,
            noDataExpression: true,
        });
    }
    return properties.concat([
        {
            displayName: 'Has Parameters',
            name: 'hasParameters',
            type: 'boolean',
            default: false,
            noDataExpression: true,
            description: 'Whether the request has additional parameters or not',
        },
        {
            displayName: 'Specify Body',
            name: 'specifyBody',
            type: 'options',
            displayOptions: {
                show: {
                    hasParameters: [true],
                },
            },
            options: [
                {
                    name: 'Using Fields Below',
                    value: 'keypair',
                },
                {
                    name: 'Using JSON',
                    value: 'json',
                },
            ],
            default: 'keypair',
            description: 'The body can be specified using explicit fields (<code>keypair</code>) or using a JavaScript object (<code>json</code>)',
        },
        {
            displayName: 'Body Parameters',
            name: 'bodyParameters',
            type: 'fixedCollection',
            displayOptions: {
                show: {
                    hasParameters: [true],
                    specifyBody: ['keypair'],
                },
            },
            typeOptions: {
                multipleValues: true,
            },
            placeholder: 'Add Parameter',
            default: {
                parameters: [
                    {
                        name: '',
                        value: '',
                    },
                ],
            },
            options: [
                {
                    name: 'parameters',
                    displayName: 'Parameter',
                    values: [
                        {
                            displayName: 'Name',
                            name: 'name',
                            type: 'string',
                            default: '',
                            description: 'ID of the field to set. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>.',
                        },
                        {
                            displayName: 'Value',
                            name: 'value',
                            type: 'string',
                            default: '',
                            description: 'Value of the field to set',
                        },
                    ],
                },
            ],
        },
        {
            displayName: 'JSON',
            name: 'jsonBody',
            type: 'json',
            displayOptions: {
                show: {
                    hasParameters: [true],
                    specifyBody: ['json'],
                },
            },
            default: '',
        },
    ]);
}
function parseQueryParams(t, hasParameters, bodyParameters, jsonBodyParameter, errorInfo) {
    let queryParams;
    if (hasParameters) {
        if (bodyParameters) {
            const params = bodyParameters;
            queryParams = {};
            for (let param of params) {
                queryParams[param.name] = param.value;
            }
        }
        else if (jsonBodyParameter) {
            if (typeof jsonBodyParameter !== 'object' && jsonBodyParameter !== null) {
                queryParams = JSON.parse(jsonBodyParameter);
            }
            else {
                throw new n8n_workflow_1.NodeOperationError(t.getNode(), 'JSON parameter needs to be valid JSON', errorInfo);
            }
        }
        else {
            throw new n8n_workflow_1.NodeOperationError(t.getNode(), 'No body parameters specified');
        }
    }
    return queryParams;
}
//# sourceMappingURL=GenericProperties.js.map