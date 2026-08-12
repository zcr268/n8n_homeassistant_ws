"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
class State {
    static fromJSON(json) {
        return Object.assign(new State(), json);
    }
    constructor(data) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.entity_id = (_a = data === null || data === void 0 ? void 0 : data.entity_id) !== null && _a !== void 0 ? _a : '';
        this.state = (_b = data === null || data === void 0 ? void 0 : data.state) !== null && _b !== void 0 ? _b : '';
        this.attributes = (_c = data === null || data === void 0 ? void 0 : data.attributes) !== null && _c !== void 0 ? _c : {};
        this.last_changed = (_d = data === null || data === void 0 ? void 0 : data.last_changed) !== null && _d !== void 0 ? _d : '';
        this.last_reported = (_e = data === null || data === void 0 ? void 0 : data.last_reported) !== null && _e !== void 0 ? _e : '';
        this.last_updated = (_f = data === null || data === void 0 ? void 0 : data.last_updated) !== null && _f !== void 0 ? _f : '';
        this.context = (_g = data === null || data === void 0 ? void 0 : data.context) !== null && _g !== void 0 ? _g : {};
    }
}
exports.State = State;
//# sourceMappingURL=State.js.map