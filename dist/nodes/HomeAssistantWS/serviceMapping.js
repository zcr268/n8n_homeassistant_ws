"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMappingColumns = getMappingColumns;
const HomeAssistant_1 = require("./HomeAssistant");
async function getMappingColumns() {
    var _a, _b, _c, _d, _e;
    const serviceDomainId = this.getNodeParameter('serviceDomainId', null, { extractValue: true });
    const serviceId = this.getNodeParameter('serviceId', null, { extractValue: true });
    let fields = [];
    if (!serviceDomainId || !serviceId) {
        return Promise.resolve({
            fields: [],
            emptyFieldsNotice: 'No service domain or service id provided',
        });
    }
    else {
        const cred = await this.getCredentials('homeAssistantWsApi');
        const assistant = new HomeAssistant_1.HomeAssistant(cred.protocol, cred.host, cred.apiKey, this.logger);
        const service = await assistant.get_service_action(serviceDomainId, serviceId);
        if (!service) {
            return Promise.resolve({
                fields: [],
                emptyFieldsNotice: 'Service not found',
            });
        }
        else {
            if ((_a = service.target) === null || _a === void 0 ? void 0 : _a.entity) {
                fields.push({
                    id: 'entity_id',
                    displayName: 'Target Entity',
                    type: 'string',
                    defaultMatch: true,
                    required: true,
                    display: true,
                });
            }
            for (let f in service.fields) {
                if (f != 'advanced_fields') {
                    fields.push(createMappedField(service, f, service.fields[f]));
                }
            }
            for (let f in (_c = (_b = service.fields) === null || _b === void 0 ? void 0 : _b.advanced_fields) === null || _c === void 0 ? void 0 : _c.fields) {
                fields.push(createMappedField(service, f, (_e = (_d = service.fields) === null || _d === void 0 ? void 0 : _d.advanced_fields) === null || _e === void 0 ? void 0 : _e.fields[f]));
            }
        }
        return Promise.resolve({
            fields: fields,
        });
    }
}
function createMappedField(service, f, fieldDesc) {
    var _a, _b;
    const type = Object.keys(fieldDesc.selector)[0];
    let fieldType = {
        type: "string"
    };
    switch (type) {
        case 'number':
        case 'color_temp':
            fieldType = {
                type: "number"
            };
            break;
        case 'rgb_color':
        case 'color_rgb':
        case 'object':
            fieldType = {
                type: "object"
            };
            break;
        case 'select':
            let options = [];
            fieldDesc.selector.select.options.forEach((o) => {
                options.push({
                    name: o,
                    value: o
                });
            });
            fieldType = {
                type: "options",
                options: options
            };
            break;
        case 'boolean':
            fieldType = {
                type: "boolean",
            };
            break;
        case 'entity':
            fieldType = {
                type: "object",
            };
            break;
    }
    return {
        id: f,
        displayName: (_a = fieldDesc.name) !== null && _a !== void 0 ? _a : f,
        defaultMatch: true,
        required: (_b = fieldDesc.required) !== null && _b !== void 0 ? _b : false,
        display: true,
        ...fieldType
    };
}
//# sourceMappingURL=serviceMapping.js.map