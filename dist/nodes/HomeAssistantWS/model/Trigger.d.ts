export declare class Trigger {
    platform: string;
    type: string;
    subtype?: string;
    device_id: string;
    entity_id?: string;
    domain: string;
    metadata: any;
    constructor(data?: Partial<Trigger>);
    static fromJSON(json: any): Trigger;
    getId(): string;
    getName(): string;
}
