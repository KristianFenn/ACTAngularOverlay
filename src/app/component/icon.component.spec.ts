import { IconComponent } from './icon.component'

describe('Icon Component', () => {
    it('should return the correct icon URL', () => {
        const target = new IconComponent();
        target.iconName = "PLD";
        
        expect(target.getIconSrc())
            .toBe('/assets/icons/PLD.png');
    });

    it('should return the correct sizes', () => {
        const target = new IconComponent();
        target.iconSize = 2;

        expect(target.getIconSize())
            .toBe('2em');
    });
});