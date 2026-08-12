"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entityFields = exports.entityOperations = void 0;
exports.executeEntityOperation = executeEntityOperation;
const utils_1 = require("../utils");
exports.entityOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
            {
                name: 'List',
                value: 'list',
                action: 'Return a list of entities',
            },
        ],
        default: 'list',
        displayOptions: {
            show: {
                resource: [
                    'entity'
                ],
            },
        },
        noDataExpression: true,
    },
];
exports.entityFields = [
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: [
                    'entity',
                ],
            },
        },
        options: [
            {
                displayName: 'Entity Type',
                name: 'entityType',
                type: 'resourceLocator',
                description: 'The Entity Type to filter by',
                default: { mode: 'list', value: '' },
                modes: [
                    {
                        displayName: 'From List',
                        name: 'list',
                        type: 'list',
                        typeOptions: {
                            searchable: true,
                            searchListMethod: 'search_component_options',
                        },
                    }, {
                        displayName: 'By Name',
                        name: 'name',
                        type: 'string',
                    },
                ]
            },
            {
                displayName: 'Area ID',
                name: 'areaId',
                type: 'resourceLocator',
                description: 'The Area ID to filter by',
                default: { mode: 'list', value: '' },
                modes: [
                    {
                        displayName: 'From List',
                        name: 'list',
                        type: 'list',
                        typeOptions: {
                            searchable: true,
                            searchListMethod: 'search_area_options',
                        },
                    }, {
                        displayName: 'By Name',
                        name: 'name',
                        type: 'string',
                    },
                ]
            },
            {
                displayName: 'Device ID',
                name: 'deviceId',
                type: 'resourceLocator',
                description: 'The Device ID to filter by',
                default: { mode: 'list', value: '' },
                modes: [
                    {
                        displayName: 'From List',
                        name: 'list',
                        type: 'list',
                        typeOptions: {
                            searchable: true,
                            searchListMethod: 'search_device_options',
                        },
                    }, {
                        displayName: 'By Name',
                        name: 'name',
                        type: 'string',
                    },
                ]
            },
        ],
    },
];
async function executeEntityOperation(t, assistant, items) {
    const operation = t.getNodeParameter("operation", 0);
    const results = [];
    switch (operation) {
        case 'list':
            for (let i = 0; i < items.length; i++) {
                const areaId = t.getNodeParameter('additionalFields.areaId', i, '', { extractValue: true, });
                const entityType = t.getNodeParameter('additionalFields.entityType', i, '', { extractValue: true, });
                const deviceId = t.getNodeParameter('additionalFields.deviceId', i, '', { extractValue: true, });
                const data = await assistant.get_entities(entityType, areaId, deviceId);
                results.push(data);
            }
            break;
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
    return (0, utils_1.mapResults)(t, items, results);
}
//# sourceMappingURL=EntityOperations.js.map