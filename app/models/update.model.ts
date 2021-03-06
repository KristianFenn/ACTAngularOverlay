export class ActUpdateEvent {
    detail: ActUpdate;
}

export class ActUpdate {
    Encounter: ActUpdateEncounter;
    Combatant: any;
}

export class ActUpdateEncounter {
    CurrentZoneName: string;
    duration: string;
    damage: string;
    ENCDPS: number;
    maxhit: string;
    last10dps: number;
    last30dps: number;
    last60dps: number;
}

export class ActUpdateCombatant {
    name: string;
    damage: number;
    ENCDPS: string;
    Job: string;
    'crithit%': string;
    deaths: number;
    maxhit: string;
    misses: number;
    ENCHPS: string;
    OverHealPct: string;
    CritDirectHitPct: string;
    DirectHitPct: string;
}