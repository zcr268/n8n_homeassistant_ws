import { IDataObject, IExecuteFunctions, INodeExecutionData, INodeProperties } from "n8n-workflow";
import { HomeAssistant } from "../HomeAssistant";
export declare const logbookOperations: INodeProperties[];
export declare const logbookFields: INodeProperties[];
export declare function executeLogbookOperation(t: IExecuteFunctions, assistant: HomeAssistant, items: IDataObject[]): Promise<INodeExecutionData[][]>;
