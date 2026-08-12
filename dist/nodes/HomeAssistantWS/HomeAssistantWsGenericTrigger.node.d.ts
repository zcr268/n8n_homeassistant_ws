import { INodeType, INodeTypeDescription, ITriggerFunctions, ITriggerResponse } from "n8n-workflow";
import { credentialTest } from './cred';
export declare class HomeAssistantWsGenericTrigger implements INodeType {
    description: INodeTypeDescription;
    methods: {
        credentialTest: typeof credentialTest;
    };
    trigger(this: ITriggerFunctions): Promise<ITriggerResponse>;
}
