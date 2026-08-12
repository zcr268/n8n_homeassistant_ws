"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeAssistantWsApi = void 0;
class HomeAssistantWsApi {
    constructor() {
        this.name = 'homeAssistantWsApi';
        this.displayName = 'HomeAssistant WS API';
        this.properties = [
            {
                displayName: 'Protocol',
                name: 'protocol',
                type: 'options',
                options: [
                    {
                        name: 'wss:// (Secure)',
                        value: 'wss',
                    },
                    {
                        name: 'ws:// (Unsecure)',
                        value: 'ws',
                    },
                ],
                default: 'wss',
            },
            {
                displayName: 'Host',
                name: 'host',
                type: 'string',
                default: 'homeassistant.local:8123',
            },
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                default: '',
            },
        ];
        this.documentationUrl = 'https://developers.home-assistant.io/docs/api/websocket';
    }
}
exports.HomeAssistantWsApi = HomeAssistantWsApi;
//# sourceMappingURL=HomeAssistantWsApi.credentials.js.map