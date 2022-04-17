export interface ActUpdateEvent {
    detail: ActUpdate;
}

export interface ActUpdate {
    Encounter: ActUpdateEncounter;
    Combatant: any;
    isActive: string | undefined;
}

export interface ActUpdateEncounter {
    CurrentZoneName: string;
    duration: string;
    damage: string;
    ENCDPS: number;
    maxhit: string;
    last10dps: number;
    last30dps: number;
    last60dps: number;
}

export interface ActUpdateCombatant {
    name: string;
    damage: number;
    ENCDPS: string;
    Job: string;
    'crithit%': string;
    deaths: number;
    maxhit: string;
    "MAXHIT-*": string;
    misses: number;
    ENCHPS: string;
    OverHealPct: string;
    CritDirectHitPct: string;
    DirectHitPct: string;
}