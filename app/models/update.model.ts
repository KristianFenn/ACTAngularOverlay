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
    dps: string;
    maxhit: string;
    last10dps: number;
    last30dps: number;
    last60dps: number;
}

export class ActUpdateCombatant {
    name: string;
    dps: number;
    damage: number;
    encdps: number;
    Job: string;
}