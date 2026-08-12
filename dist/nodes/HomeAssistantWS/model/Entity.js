"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
class Entity {
    constructor(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        this.area_id = (_a = data === null || data === void 0 ? void 0 : data.area_id) !== null && _a !== void 0 ? _a : null;
        this.categories = (_b = data === null || data === void 0 ? void 0 : data.categories) !== null && _b !== void 0 ? _b : {};
        this.config_entry_id = (_c = data === null || data === void 0 ? void 0 : data.config_entry_id) !== null && _c !== void 0 ? _c : '';
        this.config_subentry_id = (_d = data === null || data === void 0 ? void 0 : data.config_subentry_id) !== null && _d !== void 0 ? _d : null;
        this.created_at = (_e = data === null || data === void 0 ? void 0 : data.created_at) !== null && _e !== void 0 ? _e : 0;
        this.device_id = (_f = data === null || data === void 0 ? void 0 : data.device_id) !== null && _f !== void 0 ? _f : '';
        this.disabled_by = (_g = data === null || data === void 0 ? void 0 : data.disabled_by) !== null && _g !== void 0 ? _g : null;
        this.entity_category = (_h = data === null || data === void 0 ? void 0 : data.entity_category) !== null && _h !== void 0 ? _h : '';
        this.entity_id = (_j = data === null || data === void 0 ? void 0 : data.entity_id) !== null && _j !== void 0 ? _j : '';
        this.has_entity_name = (_k = data === null || data === void 0 ? void 0 : data.has_entity_name) !== null && _k !== void 0 ? _k : false;
        this.hidden_by = (_l = data === null || data === void 0 ? void 0 : data.hidden_by) !== null && _l !== void 0 ? _l : null;
        this.icon = (_m = data === null || data === void 0 ? void 0 : data.icon) !== null && _m !== void 0 ? _m : null;
        this.id = (_o = data === null || data === void 0 ? void 0 : data.id) !== null && _o !== void 0 ? _o : '';
        this.labels = (_p = data === null || data === void 0 ? void 0 : data.labels) !== null && _p !== void 0 ? _p : [];
        this.modified_at = (_q = data === null || data === void 0 ? void 0 : data.modified_at) !== null && _q !== void 0 ? _q : 0;
        this.name = (_r = data === null || data === void 0 ? void 0 : data.name) !== null && _r !== void 0 ? _r : null;
        this.options = (_s = data === null || data === void 0 ? void 0 : data.options) !== null && _s !== void 0 ? _s : {};
        this.original_name = (_t = data === null || data === void 0 ? void 0 : data.original_name) !== null && _t !== void 0 ? _t : null;
        this.platform = (_u = data === null || data === void 0 ? void 0 : data.platform) !== null && _u !== void 0 ? _u : '';
        this.translation_key = (_v = data === null || data === void 0 ? void 0 : data.translation_key) !== null && _v !== void 0 ? _v : null;
        this.unique_id = (_w = data === null || data === void 0 ? void 0 : data.unique_id) !== null && _w !== void 0 ? _w : '';
        const [type, ...rest] = this.entity_id.split('.');
        this.entity_type = type;
        this.entity_name_id = rest.join('.');
    }
    static fromJSON(json) {
        return new Entity(json);
    }
}
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map