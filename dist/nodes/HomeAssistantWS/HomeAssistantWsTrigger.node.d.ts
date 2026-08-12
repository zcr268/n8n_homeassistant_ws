import { INodeType, INodeTypeDescription, ITriggerFunctions, ITriggerResponse } from "n8n-workflow";
import { load_device_options, load_entity_options, load_trigger_options } from "./loadOptions";
import { credentialTest } from './cred';
export declare class HomeAssistantWsTrigger implements INodeType {
    description: INodeTypeDescription;
    methods: {
        loadOptions: {
            load_entity_options: typeof load_entity_options;
            load_device_options: typeof load_device_options;
            load_trigger_options: typeof load_trigger_options;
        };
        credentialTest: typeof credentialTest;
    };
    trigger(this: ITriggerFunctions): Promise<ITriggerResponse>;
}
