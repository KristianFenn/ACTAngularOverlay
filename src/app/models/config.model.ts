export enum Layout {
    Bars = 'bars',
    Table = 'table',
    Pills = 'pills'
}

export enum Theme {
    FFXIV = 'ffxiv',
    FFLogs = 'fflogs'
}

export class OverlayConfig {
    theme = Theme.FFXIV;
    partyLayout = Layout.Bars;
    allianceLayout = Layout.Table;
    mainPlayerName = 'YOU';
    fontSize = 16;
    test = '';
    autohide = 0;
}
