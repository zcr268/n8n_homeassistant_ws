"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configFields = exports.configOperations = void 0;
exports.executeConfigOperations = executeConfigOperations;
const utils_1 = require("../utils");
exports.configOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
            {
                name: 'Get',
                value: 'get',
                action: 'Return the configuration',
            },
        ],
        default: 'get',
        displayOptions: {
            show: {
                resource: [
                    'config'
                ],
            },
        },
        noDataExpression: true,
    },
];
exports.configFields = [];
async function executeConfigOperations(t, assistant, items) {
    const results = [];
    const operation = t.getNodeParameter('operation', 0);
    switch (operation) {
        case 'get': {
            for (let i = 0; i < items.length; i++) {
                const config = await assistant.get_system_config();
                results.push([config]);
            }
            break;
        }
        default:
            throw new Error('Invalid operation');
    }
    return (0, utils_1.mapResults)(t, items, results);
}
//# sourceMappingURL=ConfigOperation.js.map