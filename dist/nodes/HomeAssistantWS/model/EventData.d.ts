import { State } from "./State";
export declare class EventData {
    entity_id: string;
    old_state: State;
    new_state: State;
    constructor(data?: Partial<EventData>);
    static fromJSON(json: any): EventData;
}
