import { Player } from 'src/app/models/player.model';

export const TestPlayerData: Player[] = [
    {
        name: 'Monk Monk',
        class: 'MNK',
        critDirectHitPercent: '25%',
        critPercent: '50%',
        directHitPercent: '45%',
        damage: 25000,
        damageFormatted: '25,000',
        deaths: 1,
        dps: 2500,
        dpsPercent: 100,
        hps: 50,
        maxhit: '25k - Woah',
        maxhitamount: '25k',
        misses: 0,
        overhealPercent: '0%',
        rank: 1
    },
    {
        name: 'Paladin Paladin',
        class: 'PLD',
        critDirectHitPercent: '15%',
        critPercent: '30%',
        directHitPercent: '35%',
        damage: 20000,
        damageFormatted: '20,000',
        deaths: 0,
        dps: 2000,
        dpsPercent: 80,
        hps: 200,
        maxhit: '15k - Sword',
        maxhitamount: '15k',
        misses: 0,
        overhealPercent: '15%',
        rank: 2
    },
    {
        name: 'Scholar Scholar',
        class: 'SCH',
        critDirectHitPercent: '10%',
        critPercent: '35%',
        directHitPercent: '15%',
        damage: 15000,
        damageFormatted: '15,000',
        deaths: 2,
        dps: 1500,
        dpsPercent: 60,
        hps: 1200,
        maxhit: '10k - Book',
        maxhitamount: '10k',
        misses: 0,
        overhealPercent: '30%',
        rank: 3
    }
];