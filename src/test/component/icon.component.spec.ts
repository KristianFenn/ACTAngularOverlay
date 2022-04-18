import { IconComponent } from '../../app/component/icon.component'
import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('Icon Component', () => {
    let fixture: ComponentFixture<IconComponent>;
    let targetViewModel: IconComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [IconComponent] });
        fixture = TestBed.createComponent(IconComponent);
        targetViewModel = fixture.componentInstance;
    });

    it('should create', () => {
        expect(targetViewModel).toBeDefined();
    });

    describe('rendered image', () => {
        let imageNode: HTMLImageElement;

        beforeEach(() => {
            imageNode = fixture.nativeElement.firstChild! as HTMLImageElement;
        });

        it('should render an img node', () => {
            expect(imageNode.nodeName)
                .toBe('IMG');
        });

        it('should render the correct icon src', () => {
            targetViewModel.iconName = "PLD";
            fixture.detectChanges();

            expect(imageNode.src)
                .toMatch('/assets/icons/PLD.png');
        });

        it('should render the correct size', () => {
            targetViewModel.iconSize = 2.4;
            fixture.detectChanges();
    
            expect(imageNode.style.height)
                .toBe('2.4em');

            expect(imageNode.style.width)
                .toBe('2.4em');
        });
    });
});