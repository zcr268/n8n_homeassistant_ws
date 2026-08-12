export declare class UnitSystem {
    length: string;
    accumulated_precipitation: string;
    area: string;
    mass: string;
    pressure: string;
    temperature: string;
    volume: string;
    wind_speed: string;
    constructor(data?: Partial<UnitSystem>);
    static fromJSON(json: any): UnitSystem;
}
export declare class Config {
    allowlist_external_dirs: string[];
    allowlist_external_urls: string[];
    components: string[];
    config_dir: string;
    config_source: string;
    country: string;
    currency: string;
    debug: boolean;
    elevation: number;
    external_url: string | null;
    internal_url: string | null;
    language: string;
    latitude: number;
    location_name: string;
    longitude: number;
    radius: number;
    recovery_mode: boolean;
    safe_mode: boolean;
    state: string;
    time_zone: string;
    unit_system: UnitSystem;
    version: string;
    whitelist_external_dirs: string[];
    whitelist_external_urls: string[];
    constructor(data?: Partial<Config>);
    static fromJSON(json: any): Config;
}
