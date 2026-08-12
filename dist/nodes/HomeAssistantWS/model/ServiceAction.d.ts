export declare class ServiceAction {
    name: string;
    description: string;
    fields: Record<string, any>;
    target: Record<string, any>;
    id: string;
    domain: string;
    constructor(data?: Partial<ServiceAction>);
    static fromJSON(json: any): ServiceAction;
}
