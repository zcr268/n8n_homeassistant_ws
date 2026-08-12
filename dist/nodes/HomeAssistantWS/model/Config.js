"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.UnitSystem = void 0;
class UnitSystem {
    constructor(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.length = (_a = data === null || data === void 0 ? void 0 : data.length) !== null && _a !== void 0 ? _a : '';
        this.accumulated_precipitation = (_b = data === null || data === void 0 ? void 0 : data.accumulated_precipitation) !== null && _b !== void 0 ? _b : '';
        this.area = (_c = data === null || data === void 0 ? void 0 : data.area) !== null && _c !== void 0 ? _c : '';
        this.mass = (_d = data === null || data === void 0 ? void 0 : data.mass) !== null && _d !== void 0 ? _d : '';
        this.pressure = (_e = data === null || data === void 0 ? void 0 : data.pressure) !== null && _e !== void 0 ? _e : '';
        this.temperature = (_f = data === null || data === void 0 ? void 0 : data.temperature) !== null && _f !== void 0 ? _f : '';
        this.volume = (_g = data === null || data === void 0 ? void 0 : data.volume) !== null && _g !== void 0 ? _g : '';
        this.wind_speed = (_h = data === null || data === void 0 ? void 0 : data.wind_speed) !== null && _h !== void 0 ? _h : '';
    }
    static fromJSON(json) {
        return new UnitSystem(json);
    }
}
exports.UnitSystem = UnitSystem;
;
class Config {
    constructor(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
        this.allowlist_external_dirs = (_a = data === null || data === void 0 ? void 0 : data.allowlist_external_dirs) !== null && _a !== void 0 ? _a : [];
        this.allowlist_external_urls = (_b = data === null || data === void 0 ? void 0 : data.allowlist_external_urls) !== null && _b !== void 0 ? _b : [];
        this.components = (_c = data === null || data === void 0 ? void 0 : data.components) !== null && _c !== void 0 ? _c : [];
        this.config_dir = (_d = data === null || data === void 0 ? void 0 : data.config_dir) !== null && _d !== void 0 ? _d : '';
        this.config_source = (_e = data === null || data === void 0 ? void 0 : data.config_source) !== null && _e !== void 0 ? _e : '';
        this.country = (_f = data === null || data === void 0 ? void 0 : data.country) !== null && _f !== void 0 ? _f : '';
        this.currency = (_g = data === null || data === void 0 ? void 0 : data.currency) !== null && _g !== void 0 ? _g : '';
        this.debug = (_h = data === null || data === void 0 ? void 0 : data.debug) !== null && _h !== void 0 ? _h : false;
        this.elevation = (_j = data === null || data === void 0 ? void 0 : data.elevation) !== null && _j !== void 0 ? _j : 0;
        this.external_url = (_k = data === null || data === void 0 ? void 0 : data.external_url) !== null && _k !== void 0 ? _k : null;
        this.internal_url = (_l = data === null || data === void 0 ? void 0 : data.internal_url) !== null && _l !== void 0 ? _l : null;
        this.language = (_m = data === null || data === void 0 ? void 0 : data.language) !== null && _m !== void 0 ? _m : '';
        this.latitude = (_o = data === null || data === void 0 ? void 0 : data.latitude) !== null && _o !== void 0 ? _o : 0;
        this.location_name = (_p = data === null || data === void 0 ? void 0 : data.location_name) !== null && _p !== void 0 ? _p : '';
        this.longitude = (_q = data === null || data === void 0 ? void 0 : data.longitude) !== null && _q !== void 0 ? _q : 0;
        this.radius = (_r = data === null || data === void 0 ? void 0 : data.radius) !== null && _r !== void 0 ? _r : 0;
        this.recovery_mode = (_s = data === null || data === void 0 ? void 0 : data.recovery_mode) !== null && _s !== void 0 ? _s : false;
        this.safe_mode = (_t = data === null || data === void 0 ? void 0 : data.safe_mode) !== null && _t !== void 0 ? _t : false;
        this.state = (_u = data === null || data === void 0 ? void 0 : data.state) !== null && _u !== void 0 ? _u : '';
        this.time_zone = (_v = data === null || data === void 0 ? void 0 : data.time_zone) !== null && _v !== void 0 ? _v : '';
        this.unit_system = (_w = UnitSystem.fromJSON(data === null || data === void 0 ? void 0 : data.unit_system)) !== null && _w !== void 0 ? _w : new UnitSystem();
        this.version = (_x = data === null || data === void 0 ? void 0 : data.version) !== null && _x !== void 0 ? _x : '';
        this.whitelist_external_dirs = (_y = data === null || data === void 0 ? void 0 : data.whitelist_external_dirs) !== null && _y !== void 0 ? _y : [];
        this.whitelist_external_urls = (_z = data === null || data === void 0 ? void 0 : data.whitelist_external_urls) !== null && _z !== void 0 ? _z : [];
    }
    static fromJSON(json) {
        return new Config(json);
    }
}
exports.Config = Config;
//# sourceMappingURL=Config.js.map