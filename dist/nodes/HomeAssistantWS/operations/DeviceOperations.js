"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceFields = exports.deviceOperations = void 0;
exports.executeDeviceOperation = executeDeviceOperation;
const utils_1 = require("../utils");
exports.deviceOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
            {
                name: 'List',
                value: 'list',
                action: 'Return a list of devices',
            },
        ],
        default: 'list',
        displayOptions: {
            show: {
                resource: [
                    'device'
                ],
            },
        },
        noDataExpression: true,
    },
];
exports.deviceFields = [
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: [
                    'device',
                ],
                operation: [
                    'list',
                ],
            },
        },
        options: [
            {
                displayName: 'Area Name or ID',
                name: 'areaId',
                type: 'resourceLocator',
                description: 'The Area to filter by',
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
        ],
    },
];
async function executeDeviceOperation(t, assistant, items) {
    const operation = t.getNodeParameter("operation", 0);
    const results = [];
    switch (operation) {
        case 'list':
            for (let i = 0; i < items.length; i++) {
                const areaId = t.getNodeParameter('additionalFields.areaId', i, '', { extractValue: true });
                const data = await assistant.get_devices_by_area(areaId);
                results.push(data);
            }
            break;
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
    return (0, utils_1.mapResults)(t, items, results);
}
//# sourceMappingURL=DeviceOperations.js.map