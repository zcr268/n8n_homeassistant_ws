"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceAction = void 0;
class ServiceAction {
    constructor(data) {
        var _a, _b, _c, _d, _e, _f;
        this.name = (_a = data === null || data === void 0 ? void 0 : data.name) !== null && _a !== void 0 ? _a : '';
        this.description = (_b = data === null || data === void 0 ? void 0 : data.description) !== null && _b !== void 0 ? _b : '';
        this.fields = (_c = data === null || data === void 0 ? void 0 : data.fields) !== null && _c !== void 0 ? _c : {};
        this.target = (_d = data === null || data === void 0 ? void 0 : data.target) !== null && _d !== void 0 ? _d : {};
        this.id = (_e = data === null || data === void 0 ? void 0 : data.id) !== null && _e !== void 0 ? _e : '';
        this.domain = (_f = data === null || data === void 0 ? void 0 : data.domain) !== null && _f !== void 0 ? _f : '';
    }
    static fromJSON(json) {
        return new ServiceAction(json);
    }
}
exports.ServiceAction = ServiceAction;
//# sourceMappingURL=ServiceAction.js.map