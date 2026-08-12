"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Area = void 0;
class Area {
    constructor(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        this.aliases = (_a = data === null || data === void 0 ? void 0 : data.aliases) !== null && _a !== void 0 ? _a : [];
        this.area_id = (_b = data === null || data === void 0 ? void 0 : data.area_id) !== null && _b !== void 0 ? _b : '';
        this.floor_id = (_c = data === null || data === void 0 ? void 0 : data.floor_id) !== null && _c !== void 0 ? _c : null;
        this.humidity_entity_id = (_d = data === null || data === void 0 ? void 0 : data.humidity_entity_id) !== null && _d !== void 0 ? _d : null;
        this.icon = (_e = data === null || data === void 0 ? void 0 : data.icon) !== null && _e !== void 0 ? _e : null;
        this.labels = (_f = data === null || data === void 0 ? void 0 : data.labels) !== null && _f !== void 0 ? _f : [];
        this.name = (_g = data === null || data === void 0 ? void 0 : data.name) !== null && _g !== void 0 ? _g : '';
        this.picture = (_h = data === null || data === void 0 ? void 0 : data.picture) !== null && _h !== void 0 ? _h : null;
        this.temperature_entity_id = (_j = data === null || data === void 0 ? void 0 : data.temperature_entity_id) !== null && _j !== void 0 ? _j : null;
        this.created_at = (_k = data === null || data === void 0 ? void 0 : data.created_at) !== null && _k !== void 0 ? _k : 0;
        this.modified_at = (_l = data === null || data === void 0 ? void 0 : data.modified_at) !== null && _l !== void 0 ? _l : 0;
    }
    static fromJSON(json) {
        return new Area(json);
    }
}
exports.Area = Area;
//# sourceMappingURL=Area.js.map