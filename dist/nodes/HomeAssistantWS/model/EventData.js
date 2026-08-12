"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventData = void 0;
const State_1 = require("./State");
class EventData {
    constructor(data) {
        var _a, _b, _c;
        this.entity_id = (_a = data === null || data === void 0 ? void 0 : data.entity_id) !== null && _a !== void 0 ? _a : '';
        this.old_state = (_b = State_1.State.fromJSON(data === null || data === void 0 ? void 0 : data.old_state)) !== null && _b !== void 0 ? _b : new State_1.State();
        this.new_state = (_c = State_1.State.fromJSON(data === null || data === void 0 ? void 0 : data.new_state)) !== null && _c !== void 0 ? _c : new State_1.State();
    }
    static fromJSON(json) {
        return new EventData(json);
    }
}
exports.EventData = EventData;
//# sourceMappingURL=EventData.js.map