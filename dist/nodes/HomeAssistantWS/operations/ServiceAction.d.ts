import { IDataObject, IExecuteFunctions, INodeExecutionData, INodeProperties } from "n8n-workflow";
import { HomeAssistant } from "../HomeAssistant";
export declare const serviceActionOperations: INodeProperties[];
export declare const serviceActionFields: INodeProperties[];
export declare function executeServiceActionOperation(t: IExecuteFunctions, assistant: HomeAssistant, items: IDataObject[]): Promise<INodeExecutionData[][]>;
