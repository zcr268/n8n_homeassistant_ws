"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateFields = exports.stateOperations = void 0;
exports.executeStateOperation = executeStateOperation;
const utils_1 = require("../utils");
exports.stateOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
            {
                name: 'List',
                value: 'list',
                action: 'Return a list of states',
            }
        ],
        default: 'list',
        displayOptions: {
            show: {
                resource: [
                    'state'
                ],
            },
        },
        noDataExpression: true,
    },
];
exports.stateFields = [
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: [
                    'state',
                ],
            },
        },
        options: [
            {
                displayName: 'Entity Type Name or ID',
                name: 'entityType',
                type: 'resourceLocator',
                description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
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
                    },
                    {
                        displayName: 'By Name',
                        name: 'name',
                        type: 'string',
                    },
                ],
            },
            {
                displayName: 'Entity Name or ID',
                name: 'entityId',
                type: 'resourceLocator',
                description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
                default: { mode: 'list', value: '' },
                modes: [
                    {
                        displayName: 'From List',
                        name: 'list',
                        type: 'list',
                        typeOptions: {
                            searchable: true,
                            searchListMethod: 'search_entity_options',
                        },
                    },
                    {
                        displayName: 'By Name',
                        name: 'name',
                        type: 'string',
                    },
                ],
            },
            {
                displayName: 'Area Name or ID',
                name: 'areaId',
                type: 'resourceLocator',
                description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
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
                    },
                    {
                        displayName: 'By Name',
                        name: 'name',
                        type: 'string',
                    },
                ],
            },
            {
                displayName: 'Resolve Entities',
                name: 'resolveEntities',
                type: 'boolean',
                default: false,
            },
        ],
    },
];
function filterStates(states, t, i, resolveEntities) {
    const entityType = t.getNodeParameter('additionalFields.entityType', i, '', { extractValue: true });
    const areaId = t.getNodeParameter('additionalFields.areaId', i, '', { extractValue: true });
    const entityId = t.getNodeParameter('additionalFields.entityId', i, '', { extractValue: true });
    return states.filter(state => {
        var _a, _b, _c;
        const inArea = !areaId || areaId.trim() === '' || state.entity_id.startsWith(areaId) || ((_a = state.entity) === null || _a === void 0 ? void 0 : _a.area_id) == areaId || ((_c = (_b = state.entity) === null || _b === void 0 ? void 0 : _b.device) === null || _c === void 0 ? void 0 : _c.area_id) == areaId;
        const inType = !entityType || entityType.trim() === '' || state.entity_id.startsWith(entityType);
        const inEntity = !entityId || entityId.trim() === '' || state.entity_id === entityId;
        if (!resolveEntities) {
            state.entity = undefined;
        }
        return inArea && inType && inEntity;
    });
}
async function getStates(t, assistant, items) {
    let resolveEntities = false;
    let fetchEntities = false;
    for (let i = 0; i < items.length; i++) {
        const additionalFields = t.getNodeParameter('additionalFields', i, {});
        if (additionalFields.resolveEntities) {
            fetchEntities = true;
            resolveEntities = true;
            break;
        }
        if (additionalFields.areaId) {
            fetchEntities = true;
            break;
        }
    }
    return assistant.get_states(fetchEntities).then(states => {
        const results = [];
        for (let i = 0; i < items.length; i++) {
            const filteredStates = filterStates(states, t, i, resolveEntities);
            results.push(filteredStates);
        }
        return (0, utils_1.mapResults)(t, items, results);
    });
}
function executeStateOperation(t, assistant, items) {
    const operation = t.getNodeParameter("operation", 0);
    switch (operation) {
        case 'list':
            return getStates(t, assistant, items);
        default:
            throw new Error(`Unknown operation: ${operation}`);
    }
}
//# sourceMappingURL=StateOperations.js.map