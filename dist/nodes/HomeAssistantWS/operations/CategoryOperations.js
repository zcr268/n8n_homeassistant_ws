"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryFields = exports.categoryOperations = void 0;
exports.executeCategoryOperations = executeCategoryOperations;
const utils_1 = require("../utils");
exports.categoryOperations = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        options: [
            {
                name: 'List',
                value: 'list',
                action: 'Return a list of categories',
            },
        ],
        default: 'list',
        displayOptions: {
            show: {
                resource: [
                    'category'
                ],
            },
        },
        noDataExpression: true,
    },
];
exports.categoryFields = [
    {
        displayName: 'Category Scope',
        name: 'categoryScope',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: [
                    'category',
                ],
            },
        },
    },
];
async function executeCategoryOperations(t, assistant, items) {
    const results = [];
    const operation = t.getNodeParameter('operation', 0);
    switch (operation) {
        case 'list': {
            for (let i = 0; i < items.length; i++) {
                const scopeParam = t.getNodeParameter("categoryScope", 0);
                const categories = await assistant.get_categories(scopeParam);
                results.push(categories);
            }
            break;
        }
        default:
            throw new Error('Invalid operation');
    }
    return (0, utils_1.mapResults)(t, items, results);
}
//# sourceMappingURL=CategoryOperations.js.map