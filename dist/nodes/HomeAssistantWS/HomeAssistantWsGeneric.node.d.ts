import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { credentialTest } from './cred';
export type QueryParameter = {
    name: string;
    value: string;
};
export declare class HomeAssistantWsGeneric implements INodeType {
    description: INodeTypeDescription;
    methods: {
        credentialTest: typeof credentialTest;
    };
    execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]>;
}
