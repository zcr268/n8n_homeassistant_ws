import { IDataObject, IExecuteFunctions, INodeExecutionData, INodeProperties } from "n8n-workflow";
import { HomeAssistant } from "../HomeAssistant";
export declare const deviceOperations: INodeProperties[];
export declare const deviceFields: INodeProperties[];
export declare function executeDeviceOperation(t: IExecuteFunctions, assistant: HomeAssistant, items: IDataObject[]): Promise<INodeExecutionData[][]>;
