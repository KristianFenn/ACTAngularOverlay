export interface ActUpdateEvent extends Event {
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
    ENCDPS: number;
}

export interface ActUpdateCombatant {
    name: string;
    damage: number;
    ENCDPS: string;
    Job: string;
    'crithit%': string;
    deaths: number;
    maxhit: string;
    ENCHPS: string;
    OverHealPct: string;
    CritDirectHitPct: string;
    DirectHitPct: string;
}