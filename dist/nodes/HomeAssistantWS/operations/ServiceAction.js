"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceActionFields = exports.serviceActionOperations = void 0;
exports.executeServiceActionOperation = executeServiceActionOperation;
const utils_1 = require("../utils");
exports.serviceActionOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
            {
                name: 'List',
                value: 'list',
                action: 'Return a list of service actions',
            },
            {
                name: 'Execute',
                value: 'execute',
                action: 'Execute a service action',
            },
        ],
        default: 'list',
        displayOptions: {
            show: {
                resource: [
                    'serviceAction'
                ],
            },
        },
        noDataExpression: true,
    },
    {
        displayName: 'Service Domain ID',
        name: 'serviceDomainId',
        type: 'resourceLocator',
        description: 'The ID of the service domain to execute',
        default: { mode: 'list', value: '' },
        modes: [
            {
                displayName: 'From List',
                name: 'list',
                type: 'list',
                typeOptions: {
                    searchable: true,
                    searchListMethod: 'search_service_domain_options',
                },
            },
            {
                displayName: 'By Name',
                name: 'name',
                type: 'string',
            },
        ],
        displayOptions: {
            show: {
                resource: [
                    'serviceAction'
                ],
                operation: [
                    'execute', 'list'
                ],
            },
        },
    },
    {
        displayName: 'Service ID',
        name: 'serviceId',
        type: 'resourceLocator',
        description: 'The ID of the service to execute',
        default: { mode: 'list', value: '' },
        modes: [
            {
                displayName: 'From List',
                name: 'list',
                type: 'list',
                typeOptions: {
                    searchable: true,
                    searchListMethod: 'search_service_options',
                },
            },
            {
                displayName: 'By Name',
                name: 'name',
                type: 'string',
            },
        ],
        displayOptions: {
            show: {
                resource: [
                    'serviceAction'
                ],
                operation: [
                    'execute'
                ],
            },
        },
    },
    {
        displayName: 'Service Attribute Fields',
        name: 'serviceAttributeFields',
        type: 'resourceMapper',
        default: {
            mappingMode: 'defineBelow',
            value: null,
        },
        noDataExpression: true,
        required: true,
        typeOptions: {
            loadOptionsDependsOn: ['serviceDomainId.value', 'serviceId.value'],
            resourceMapper: {
                resourceMapperMethod: 'getMappingColumns',
                mode: 'add',
                fieldWords: {
                    singular: 'field',
                    plural: 'fields',
                },
                addAllFields: false,
                multiKeyMatch: true,
            },
        },
        displayOptions: {
            show: {
                resource: ['serviceAction'],
                operation: ['execute'],
            },
        },
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: [
                    'serviceAction',
                ],
                operation: [
                    'execute',
                ],
            },
        },
        options: [
            {
                displayName: 'Response',
                name: 'response',
                type: 'boolean',
                description: 'Whether the service call should return a response',
                default: false,
            },
        ],
    },
];
exports.serviceActionFields = [];
async function executeServiceActionOperation(t, assistant, items) {
    const operation = t.getNodeParameter("operation", 0);
    const results = [];
    switch (operation) {
        case 'list': {
            for (let i = 0; i < items.length; i++) {
                const serviceDomain = t.getNodeParameter("serviceDomainId", i, '', { extractValue: true });
                const data = await assistant.get_service_actions(serviceDomain);
                for (let i = 0; i < items.length; i++) {
                    results.push(data);
                }
            }
            break;
        }
        case 'execute': {
            for (let i = 0; i < items.length; i++) {
                const data = await executeServerAction(t, assistant, i);
                results.push([data]);
            }
            break;
        }
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
    return (0, utils_1.mapResults)(t, items, results);
}
async function executeServerAction(t, assistant, item) {
    var _a;
    const additionalFields = t.getNodeParameter('additionalFields', item, {});
    const serviceDomain = t.getNodeParameter("serviceDomainId", item, '', { extractValue: true });
    const serviceName = t.getNodeParameter("serviceId", item, '', { extractValue: true });
    const serviceAttributeFields = (_a = t.getNodeParameter("serviceAttributeFields", item)) === null || _a === void 0 ? void 0 : _a.value;
    const serviceData = {};
    for (let f in serviceAttributeFields) {
        serviceData[f] = serviceAttributeFields[f];
    }
    const response = additionalFields.response;
    return await assistant.call_service(serviceDomain, serviceName, serviceData, response);
}
//# sourceMappingURL=ServiceAction.js.map