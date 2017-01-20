export class ActUpdateEvent {
    detail: ActUpdate;
}

export class ActUpdate {
    Encounter: ActUpdateEncounter;
    Combatant: any;
}

export class ActUpdateEncounter {
    title: string;
    duration: string;
    damage: string;
    dps: string;
}

export class ActUpdateCombatant {
    name: string;
    dps: number;
    damage: number;
    encdps: number;
    Job: string;
}