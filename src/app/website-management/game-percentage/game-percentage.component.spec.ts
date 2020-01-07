// Developer：July
// Date:
// Description：站点游戏提成比例

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GamePercentageComponent } from './game-percentage.component';

describe('GamePercentageComponent', () => {
    let component: GamePercentageComponent;
    let fixture: ComponentFixture<GamePercentageComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GamePercentageComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(GamePercentageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
