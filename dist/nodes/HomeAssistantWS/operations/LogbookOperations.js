"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logbookFields = exports.logbookOperations = void 0;
exports.executeLogbookOperation = executeLogbookOperation;
const utils_1 = require("../utils");
exports.logbookOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
            {
                name: 'Read',
                value: 'read',
                action: 'Read the logbook',
            },
        ],
        default: 'read',
        displayOptions: {
            show: {
                resource: [
                    'logbook'
                ],
            },
        },
        noDataExpression: true,
    },
];
exports.logbookFields = [
    {
        displayName: 'Start Time',
        name: 'startTime',
        type: 'dateTime',
        default: '',
        displayOptions: {
            show: {
                resource: [
                    'logbook'
                ],
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
                    'logbook'
                ],
            },
        },
        options: [
            {
                displayName: 'End Time',
                name: 'endTime',
                type: 'dateTime',
                default: '',
            },
            {
                displayName: 'Device Names or IDs',
                name: 'deviceIds',
                type: 'multiOptions',
                description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                default: [],
                typeOptions: {
                    loadOptionsMethod: 'load_device_options',
                },
            },
            {
                displayName: 'Entity Names or IDs',
                name: 'entityIds',
                type: 'multiOptions',
                description: 'Choose from the list, or specify IDs using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                default: [],
                typeOptions: {
                    loadOptionsMethod: 'load_entity_options',
                },
            },
            {
                displayName: 'Context ID',
                name: 'contextId',
                type: 'string',
                default: '',
            },
        ],
    }
];
async function executeLogbookOperation(t, assistant, items) {
    const operation = t.getNodeParameter("operation", 0);
    const results = [];
    switch (operation) {
        case 'read': {
            for (let i = 0; i < items.length; i++) {
                const startTime = t.getNodeParameter("startTime", i);
                const endTime = t.getNodeParameter("additionalFields.endTime", i, null);
                const deviceIds = t.getNodeParameter("additionalFields.deviceIds", i, null);
                const entityIds = t.getNodeParameter("additionalFields.entityIds", i, null);
                const contextId = t.getNodeParameter("additionalFields.contextId", i, null);
                const data = await assistant.get_logbook(startTime, endTime, deviceIds, entityIds, contextId);
                results.push(data);
            }
            break;
        }
    }
    return (0, utils_1.mapResults)(t, items, results);
}
//# sourceMappingURL=LogbookOperations.js.map