"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeAssistantWs = void 0;
const HomeAssistant_1 = require("./HomeAssistant");
const loadOptions_1 = require("./loadOptions");
const AreaOperations_1 = require("./operations/AreaOperations");
const CategoryOperations_1 = require("./operations/CategoryOperations");
const DeviceOperations_1 = require("./operations/DeviceOperations");
const EntityOperations_1 = require("./operations/EntityOperations");
const StateOperations_1 = require("./operations/StateOperations");
const ServiceAction_1 = require("./operations/ServiceAction");
const LogbookOperations_1 = require("./operations/LogbookOperations");
const cred_1 = require("./cred");
const serviceMapping_1 = require("./serviceMapping");
const ConfigOperation_1 = require("./operations/ConfigOperation");
class HomeAssistantWs {
    constructor() {
        this.description = {
            displayName: 'Home Assistant WS',
            name: 'homeAssistantWs',
            subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
            icon: 'file:homeAssistantWs.svg',
            group: ['transform'],
            version: 1,
            description: 'Node to interact with Home Assistant through the WebSocket API',
            defaults: {
                name: 'Home Assistant WS',
            },
            usableAsTool: true,
            inputs: ["main"],
            outputs: ["main"],
            credentials: [
                {
                    name: 'homeAssistantWsApi',
                    required: true,
                    testedBy: 'homeAssistantWsApiTest'
                },
            ],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    options: [
                        {
                            name: 'Area',
                            value: 'area',
                        },
                        {
                            name: 'Category',
                            value: 'category',
                        },
                        {
                            name: 'Config',
                            value: 'config',
                        },
                        {
                            name: 'Device',
                            value: 'device',
                        },
                        {
                            name: 'Entity',
                            value: 'entity',
                        },
                        {
                            name: 'Logbook',
                            value: 'logbook',
                        },
                        {
                            name: 'Service Action',
                            value: 'serviceAction',
                        },
                        {
                            name: 'State',
                            value: 'state',
                        },
                    ],
                    default: 'area',
                    noDataExpression: true,
                    required: true,
                    description: 'The resource to interact with',
                },
                ...AreaOperations_1.areaOperations,
                ...AreaOperations_1.areaFields,
                ...CategoryOperations_1.categoryOperations,
                ...CategoryOperations_1.categoryFields,
                ...ConfigOperation_1.configOperations,
                ...ConfigOperation_1.configFields,
                ...DeviceOperations_1.deviceOperations,
                ...DeviceOperations_1.deviceFields,
                ...EntityOperations_1.entityOperations,
                ...EntityOperations_1.entityFields,
                ...StateOperations_1.stateOperations,
                ...StateOperations_1.stateFields,
                ...ServiceAction_1.serviceActionOperations,
                ...ServiceAction_1.serviceActionFields,
                ...LogbookOperations_1.logbookOperations,
                ...LogbookOperations_1.logbookFields,
            ],
        };
        this.methods = {
            loadOptions: {
                load_component_options: loadOptions_1.load_component_options,
                load_area_options: loadOptions_1.load_area_options,
                load_entity_options: loadOptions_1.load_entity_options,
                load_device_options: loadOptions_1.load_device_options,
                load_service_options: loadOptions_1.load_service_options,
                load_service_domain_options: loadOptions_1.load_service_domain_options,
            },
            listSearch: {
                search_component_options: loadOptions_1.search_component_options,
                search_area_options: loadOptions_1.search_area_options,
                search_entity_options: loadOptions_1.search_entity_options,
                search_device_options: loadOptions_1.search_device_options,
                search_service_options: loadOptions_1.search_service_options,
                search_service_domain_options: loadOptions_1.search_service_domain_options,
                search_trigger_options: loadOptions_1.search_trigger_options,
            },
            credentialTest: cred_1.credentialTest,
            resourceMapping: {
                getMappingColumns: serviceMapping_1.getMappingColumns,
            }
        };
    }
    async execute() {
        const items = this.getInputData();
        const cred = await this.getCredentials('homeAssistantWsApi');
        const assistant = new HomeAssistant_1.HomeAssistant(cred.protocol, cred.host, cred.apiKey, this.logger);
        let resultData = [];
        const resource = this.getNodeParameter('resource', 0);
        switch (resource) {
            case 'area':
                resultData = await (0, AreaOperations_1.executeAreaOperation)(this, assistant, items);
                break;
            case 'entity':
                resultData = await (0, EntityOperations_1.executeEntityOperation)(this, assistant, items);
                break;
            case 'device':
                resultData = await (0, DeviceOperations_1.executeDeviceOperation)(this, assistant, items);
                break;
            case 'category':
                resultData = await (0, CategoryOperations_1.executeCategoryOperations)(this, assistant, items);
                break;
            case 'config':
                resultData = await (0, ConfigOperation_1.executeConfigOperations)(this, assistant, items);
                break;
            case 'state':
                resultData = await (0, StateOperations_1.executeStateOperation)(this, assistant, items);
                break;
            case 'serviceAction':
                resultData = await (0, ServiceAction_1.executeServiceActionOperation)(this, assistant, items);
                break;
            case 'logbook':
                resultData = await (0, LogbookOperations_1.executeLogbookOperation)(this, assistant, items);
                break;
        }
        assistant.close();
        return resultData;
    }
}
exports.HomeAssistantWs = HomeAssistantWs;
//# sourceMappingURL=HomeAssistantWs.node.js.map