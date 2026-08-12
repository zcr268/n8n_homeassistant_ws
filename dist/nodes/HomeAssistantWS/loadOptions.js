"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.load_component_options = load_component_options;
exports.search_component_options = search_component_options;
exports.load_service_options = load_service_options;
exports.search_service_options = search_service_options;
exports.load_service_domain_options = load_service_domain_options;
exports.search_service_domain_options = search_service_domain_options;
exports.load_entity_options = load_entity_options;
exports.search_entity_options = search_entity_options;
exports.load_device_options = load_device_options;
exports.search_device_options = search_device_options;
exports.load_trigger_options = load_trigger_options;
exports.search_trigger_options = search_trigger_options;
exports.load_area_options = load_area_options;
exports.search_area_options = search_area_options;
const HomeAssistant_1 = require("./HomeAssistant");
async function map_options_to_search(fn, filter) {
    return await fn.call(this).then(res => {
        let results;
        if (filter) {
            results = res.filter(r => {
                var _a, _b, _c, _d, _e;
                return r.name.toLowerCase().includes((_a = filter === null || filter === void 0 ? void 0 : filter.toLowerCase()) !== null && _a !== void 0 ? _a : '') ||
                    ((_b = r.value) === null || _b === void 0 ? void 0 : _b.toString().toLowerCase().includes((_c = filter === null || filter === void 0 ? void 0 : filter.toLowerCase()) !== null && _c !== void 0 ? _c : '')) ||
                    ((_d = r.description) === null || _d === void 0 ? void 0 : _d.toLowerCase().includes((_e = filter === null || filter === void 0 ? void 0 : filter.toLowerCase()) !== null && _e !== void 0 ? _e : ''));
            });
        }
        else {
            results = res;
        }
        return {
            results: results
        };
    });
}
async function load_component_options() {
    const cred = await this.getCredentials('homeAssistantWsApi');
    return new HomeAssistant_1.HomeAssistant(cred.protocol, cred.host, cred.apiKey, this.logger).oneShot(async (assistant) => {
        const components = await assistant.get_components();
        return components.map(component => ({ name: component, value: component }));
    });
}
async function search_component_options(filter) {
    return await map_options_to_search.call(this, load_component_options, filter);
}
async function load_service_options() {
    const cred = await this.getCredentials('homeAssistantWsApi');
    return new HomeAssistant_1.HomeAssistant(cred.protocol, cred.host, cred.apiKey, this.logger).oneShot(async (assistant) => {
        const domain = this.getNodeParameter('serviceDomainId', "", { extractValue: true });
        const services = await assistant.get_service_actions(domain);
        return services.map(service => ({ name: service.name, value: service.id, description: service.description }));
    });
}
async function search_service_options(filter) {
    return await map_options_to_search.call(this, load_service_options, filter);
}
async function load_service_domain_options() {
    const cred = await this.getCredentials('homeAssistantWsApi');
    return new HomeAssistant_1.HomeAssistant(cred.protocol, cred.host, cred.apiKey, this.logger).oneShot(async (assistant) => {
        const services = await assistant.get_service_domains();
        return services.map(service => ({ name: service, value: service }));
    });
}
async function search_service_domain_options(filter) {
    return await map_options_to_search.call(this, load_service_domain_options, filter);
}
async function load_entity_options() {
    const cred = await this.getCredentials('homeAssistantWsApi');
    return new HomeAssistant_1.HomeAssistant(cred.protocol, cred.host, cred.apiKey, this.logger).oneShot(async (assistant) => {
        const components = await assistant.get_all_entities();
        const devices = await assistant.get_all_devices();
        return components.map(entity => {
            var _a, _b;
            const device = devices.find(d => d.id == entity.device_id);
            const entityName = (_a = entity.name) !== null && _a !== void 0 ? _a : entity.original_name;
            const deviceName = (_b = device === null || device === void 0 ? void 0 : device.name_by_user) !== null && _b !== void 0 ? _b : device === null || device === void 0 ? void 0 : device.name;
            if (entityName) {
                const description = [device === null || device === void 0 ? void 0 : device.name, entity.entity_id].filter(Boolean).join(': ');
                return ({ name: entityName !== null && entityName !== void 0 ? entityName : '', value: entity.entity_id, description: description });
            }
            else {
                const description = [entity.entity_id].filter(Boolean).join(': ');
                return ({ name: deviceName !== null && deviceName !== void 0 ? deviceName : '', value: entity.entity_id, description: description });
            }
        });
    });
}
async function search_entity_options(filter) {
    return await map_options_to_search.call(this, load_entity_options, filter);
}
async function load_device_options() {
    const cred = await this.getCredentials('homeAssistantWsApi');
    return new HomeAssistant_1.HomeAssistant(cred.protocol, cred.host, cred.apiKey, this.logger).oneShot(async (assistant) => {
        const components = await assistant.get_all_devices();
        return components.map(component => {
            var _a, _b;
            return ({ name: (_a = component.name) !== null && _a !== void 0 ? _a : '', value: component.id, description: (_b = component.model) !== null && _b !== void 0 ? _b : '' });
        });
    });
}
async function search_device_options(filter) {
    return await map_options_to_search.call(this, load_device_options, filter);
}
async function load_trigger_options() {
    const deviceId = this.getNodeParameter('deviceId', null, {});
    if (!deviceId) {
        return Promise.resolve([]);
    }
    const cred = await this.getCredentials('homeAssistantWsApi');
    return new HomeAssistant_1.HomeAssistant(cred.protocol, cred.host, cred.apiKey, this.logger).oneShot(async (assistant) => {
        const triggers = await assistant.get_triggers_for_device(deviceId);
        return triggers.map(trigger => {
            var _a;
            return ({ name: trigger.getName(), value: trigger.getId(), description: (_a = trigger.domain) !== null && _a !== void 0 ? _a : '' });
        });
    });
}
async function search_trigger_options(filter) {
    return await map_options_to_search.call(this, load_trigger_options, filter);
}
async function load_area_options() {
    const cred = await this.getCredentials('homeAssistantWsApi');
    return new HomeAssistant_1.HomeAssistant(cred.protocol, cred.host, cred.apiKey, this.logger).oneShot(async (assistant) => {
        const components = await assistant.get_areas();
        return components.map(area => ({ name: area.name, value: area.area_id }));
    });
}
async function search_area_options(filter) {
    return await map_options_to_search.call(this, load_area_options, filter);
}
//# sourceMappingURL=loadOptions.js.map