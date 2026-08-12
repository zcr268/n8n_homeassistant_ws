"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
class Device {
    static fromJSON(json) {
        return new Device(json);
    }
    constructor(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        this.area_id = (_a = data === null || data === void 0 ? void 0 : data.area_id) !== null && _a !== void 0 ? _a : '';
        this.configuration_url = (_b = data === null || data === void 0 ? void 0 : data.configuration_url) !== null && _b !== void 0 ? _b : null;
        this.config_entries = (_c = data === null || data === void 0 ? void 0 : data.config_entries) !== null && _c !== void 0 ? _c : [];
        this.config_entries_subentries = (_d = data === null || data === void 0 ? void 0 : data.config_entries_subentries) !== null && _d !== void 0 ? _d : {};
        this.connections = (_e = data === null || data === void 0 ? void 0 : data.connections) !== null && _e !== void 0 ? _e : [];
        this.created_at = (_f = data === null || data === void 0 ? void 0 : data.created_at) !== null && _f !== void 0 ? _f : 0;
        this.disabled_by = (_g = data === null || data === void 0 ? void 0 : data.disabled_by) !== null && _g !== void 0 ? _g : null;
        this.entry_type = (_h = data === null || data === void 0 ? void 0 : data.entry_type) !== null && _h !== void 0 ? _h : null;
        this.hw_version = (_j = data === null || data === void 0 ? void 0 : data.hw_version) !== null && _j !== void 0 ? _j : '';
        this.id = (_k = data === null || data === void 0 ? void 0 : data.id) !== null && _k !== void 0 ? _k : '';
        this.identifiers = (_l = data === null || data === void 0 ? void 0 : data.identifiers) !== null && _l !== void 0 ? _l : [];
        this.labels = (_m = data === null || data === void 0 ? void 0 : data.labels) !== null && _m !== void 0 ? _m : [];
        this.manufacturer = (_o = data === null || data === void 0 ? void 0 : data.manufacturer) !== null && _o !== void 0 ? _o : '';
        this.model = (_p = data === null || data === void 0 ? void 0 : data.model) !== null && _p !== void 0 ? _p : '';
        this.model_id = (_q = data === null || data === void 0 ? void 0 : data.model_id) !== null && _q !== void 0 ? _q : '';
        this.modified_at = (_r = data === null || data === void 0 ? void 0 : data.modified_at) !== null && _r !== void 0 ? _r : 0;
        this.name_by_user = (_s = data === null || data === void 0 ? void 0 : data.name_by_user) !== null && _s !== void 0 ? _s : null;
        this.name = (_t = data === null || data === void 0 ? void 0 : data.name) !== null && _t !== void 0 ? _t : '';
        this.primary_config_entry = (_u = data === null || data === void 0 ? void 0 : data.primary_config_entry) !== null && _u !== void 0 ? _u : '';
        this.serial_number = (_v = data === null || data === void 0 ? void 0 : data.serial_number) !== null && _v !== void 0 ? _v : null;
        this.sw_version = (_w = data === null || data === void 0 ? void 0 : data.sw_version) !== null && _w !== void 0 ? _w : '';
        this.via_device_id = (_x = data === null || data === void 0 ? void 0 : data.via_device_id) !== null && _x !== void 0 ? _x : null;
    }
}
exports.Device = Device;
//# sourceMappingURL=Device.js.map