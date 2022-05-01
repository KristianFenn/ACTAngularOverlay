import { Player } from 'src/app/models/player.model';

export const TestPlayerData: Player[] = [
    {
        name: 'Monk Monk',
        class: 'MNK',
        critDirectHitPercent: '25%',
        critPercent: '50%',
        directHitPercent: '45%',
        damage: 25000,
        deaths: 1,
        dps: 2500,
        dpsPercent: 100,
        hps: 50,
        maxHitName: 'Woah',
        maxHitAmount: 25000,
        overhealPercent: '0%'
    },
    {
        name: 'Paladin Paladin',
        class: 'PLD',
        critDirectHitPercent: '15%',
        critPercent: '30%',
        directHitPercent: '35%',
        damage: 20000,
        deaths: 0,
        dps: 2000,
        dpsPercent: 80,
        hps: 200,
        maxHitName: 'Sword',
        maxHitAmount: 15000,
        overhealPercent: '15%'
    },
    {
        name: 'Sage Sage',
        class: 'SGE',
        critDirectHitPercent: '10%',
        critPercent: '35%',
        directHitPercent: '15%',
        damage: 15000,
        deaths: 2,
        dps: 1500,
        dpsPercent: 60,
        hps: 1200,
        maxHitName: 'Laser',
        maxHitAmount: 10000,
        overhealPercent: '30%'
    }
];