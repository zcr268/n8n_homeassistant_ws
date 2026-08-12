import { Entity } from "./Entity";
export declare class State {
    entity_id: string;
    state: string;
    attributes: any;
    last_changed: string;
    last_reported: string;
    last_updated: string;
    context: any;
    entity?: Entity;
    static fromJSON(json: any): State;
    constructor(data?: Partial<State>);
}
