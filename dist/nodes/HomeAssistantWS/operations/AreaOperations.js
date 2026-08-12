"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areaFields = exports.areaOperations = void 0;
exports.executeAreaOperation = executeAreaOperation;
const utils_1 = require("../utils");
exports.areaOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
            {
                name: 'List',
                value: 'list',
                action: 'Return a list of areas',
            },
        ],
        default: 'list',
        displayOptions: {
            show: {
                resource: [
                    'area'
                ],
            },
        },
        noDataExpression: true,
    },
];
exports.areaFields = [];
async function executeAreaOperation(t, assistant, items) {
    const results = [];
    const operation = t.getNodeParameter('operation', 0);
    switch (operation) {
        case 'list': {
            const areas = await assistant.get_areas();
            for (let i = 0; i < items.length; i++) {
                results.push(areas);
            }
            break;
        }
        default:
            throw new Error('Invalid operation');
    }
    return (0, utils_1.mapResults)(t, items, results);
}
//# sourceMappingURL=AreaOperations.js.map