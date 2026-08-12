export declare class Device {
    area_id: string;
    configuration_url: string | null;
    config_entries: string[];
    config_entries_subentries: Record<string, string | null>;
    connections: string[];
    created_at: number;
    disabled_by: string | null;
    entry_type: string | null;
    hw_version: string;
    id: string;
    identifiers: string[][];
    labels: string[];
    manufacturer: string;
    model: string;
    model_id: string;
    modified_at: number;
    name_by_user: string | null;
    name: string;
    primary_config_entry: string;
    serial_number: string | null;
    sw_version: string;
    via_device_id: string | null;
    static fromJSON(json: any): Device;
    constructor(data?: Partial<Device>);
}
