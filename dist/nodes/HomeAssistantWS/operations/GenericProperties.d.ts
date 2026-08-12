import { FunctionsBase, INodeProperties, NodeParameterValueType } from "n8n-workflow";
export declare function genericNodeProperties(withResponseOption: boolean): INodeProperties[];
export declare function parseQueryParams(t: FunctionsBase, hasParameters: boolean, bodyParameters: object | NodeParameterValueType, jsonBodyParameter: string, errorInfo?: any): any;
