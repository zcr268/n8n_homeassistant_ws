"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trigger = void 0;
class Trigger {
    constructor(data) {
        var _a, _b, _c, _d, _e;
        this.platform = (_a = data === null || data === void 0 ? void 0 : data.platform) !== null && _a !== void 0 ? _a : '';
        this.domain = (_b = data === null || data === void 0 ? void 0 : data.domain) !== null && _b !== void 0 ? _b : '';
        this.device_id = (_c = data === null || data === void 0 ? void 0 : data.device_id) !== null && _c !== void 0 ? _c : '';
        this.subtype = data === null || data === void 0 ? void 0 : data.subtype;
        this.type = (_d = data === null || data === void 0 ? void 0 : data.type) !== null && _d !== void 0 ? _d : '';
        this.entity_id = data === null || data === void 0 ? void 0 : data.entity_id;
        this.metadata = (_e = data === null || data === void 0 ? void 0 : data.metadata) !== null && _e !== void 0 ? _e : {};
    }
    static fromJSON(json) {
        return new Trigger(json);
    }
    getId() {
        return [this.device_id, this.entity_id, this.type, this.subtype].filter(Boolean).join('/');
    }
    getName() {
        return [this.type, this.subtype].filter(Boolean).join(': ');
    }
}
exports.Trigger = Trigger;
//# sourceMappingURL=Trigger.js.map