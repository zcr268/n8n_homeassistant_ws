import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';


export class HomeAssistantWsApi implements ICredentialType {
	name = 'homeAssistantWsApi';
	displayName = 'HomeAssistant WS API';
	properties: INodeProperties[] = [
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
	documentationUrl = 'https://developers.home-assistant.io/docs/api/websocket';
}
