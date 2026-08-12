import { Device } from "./Device";
export declare class Entity {
    area_id: string | null;
    categories: Record<string, any>;
    config_entry_id: string;
    config_subentry_id: string | null;
    created_at: number;
    device_id: string;
    disabled_by: string | null;
    entity_category: string;
    entity_type: string;
    entity_name_id: string;
    entity_id: string;
    has_entity_name: boolean;
    hidden_by: string | null;
    icon: string | null;
    id: string;
    labels: string[];
    modified_at: number;
    name: string | null;
    options: Record<string, any>;
    original_name: string | null;
    platform: string;
    translation_key: string | null;
    unique_id: string;
    device?: Device;
    constructor(data?: Partial<Entity>);
    static fromJSON(json: any): Entity;
}
