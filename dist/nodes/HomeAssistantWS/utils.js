"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapResults = mapResults;
exports.mapResultToAll = mapResultToAll;
function mapResults(t, items, results) {
    const mappedResults = [];
    for (let i = 0; i < items.length; i++) {
        const arr = results[i];
        mappedResults.push(t.helpers.constructExecutionMetaData(t.helpers.returnJsonArray(arr), { itemData: { item: i } }));
    }
    ;
    return mappedResults;
}
function mapResultToAll(t, items, results) {
    const mappedResults = [];
    for (let i = 0; i < items.length; i++) {
        const arr = results;
        mappedResults.push(t.helpers.constructExecutionMetaData(t.helpers.returnJsonArray(arr), { itemData: { item: i } }));
    }
    ;
    return mappedResults;
}
//# sourceMappingURL=utils.js.map