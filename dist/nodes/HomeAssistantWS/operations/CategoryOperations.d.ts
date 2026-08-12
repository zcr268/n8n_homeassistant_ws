import { IDataObject, IExecuteFunctions, INodeExecutionData, INodeProperties } from "n8n-workflow";
import { HomeAssistant } from "../HomeAssistant";
export declare const categoryOperations: INodeProperties[];
export declare const categoryFields: INodeProperties[];
export declare function executeCategoryOperations(t: IExecuteFunctions, assistant: HomeAssistant, items: IDataObject[]): Promise<INodeExecutionData[][]>;
