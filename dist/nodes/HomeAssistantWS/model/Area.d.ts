export declare class Area {
    aliases: string[];
    area_id: string;
    floor_id: string | null;
    humidity_entity_id: string | null;
    icon: string | null;
    labels: string[];
    name: string;
    picture: string | null;
    temperature_entity_id: string | null;
    created_at: number;
    modified_at: number;
    constructor(data?: Partial<Area>);
    static fromJSON(json: any): Area;
}
