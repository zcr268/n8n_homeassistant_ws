"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeAssistantWsApiTest = homeAssistantWsApiTest;
const HomeAssistant_1 = require("../HomeAssistant");
async function homeAssistantWsApiTest(credential) {
    var _a, _b;
    if (!((_a = credential.data) === null || _a === void 0 ? void 0 : _a.host)) {
        return Promise.resolve({
            status: 'Error',
            message: 'Host is required',
        });
    }
    if (!((_b = credential.data) === null || _b === void 0 ? void 0 : _b.apiKey)) {
        return Promise.resolve({
            status: 'Error',
            message: 'API key is required',
        });
    }
    const assistant = new HomeAssistant_1.HomeAssistant(credential.data.protocol, credential.data.host, credential.data.apiKey, this.logger);
    await assistant.get_states();
    return Promise.resolve({
        status: 'OK',
        message: 'Connection successful',
    });
}
//# sourceMappingURL=credentialTest.js.map