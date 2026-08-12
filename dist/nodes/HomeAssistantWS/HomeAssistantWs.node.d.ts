import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { load_area_options, load_component_options, load_device_options, load_entity_options, load_service_domain_options, load_service_options, search_area_options, search_component_options, search_device_options, search_entity_options, search_service_domain_options, search_service_options, search_trigger_options } from './loadOptions';
import { credentialTest } from './cred';
import { getMappingColumns } from './serviceMapping';
export declare class HomeAssistantWs implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            load_component_options: typeof load_component_options;
            load_area_options: typeof load_area_options;
            load_entity_options: typeof load_entity_options;
            load_device_options: typeof load_device_options;
            load_service_options: typeof load_service_options;
            load_service_domain_options: typeof load_service_domain_options;
        };
        listSearch: {
            search_component_options: typeof search_component_options;
            search_area_options: typeof search_area_options;
            search_entity_options: typeof search_entity_options;
            search_device_options: typeof search_device_options;
            search_service_options: typeof search_service_options;
            search_service_domain_options: typeof search_service_domain_options;
            search_trigger_options: typeof search_trigger_options;
        };
        credentialTest: typeof credentialTest;
        resourceMapping: {
            getMappingColumns: typeof getMappingColumns;
        };
    };
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
