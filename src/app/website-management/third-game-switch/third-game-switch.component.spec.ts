// Developer：July
// Date:
// Description：第三方游戏开关

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThirdGameSwitchComponent } from './third-game-switch.component';

describe('ThirdGameSwitchComponent', () => {
    let component: ThirdGameSwitchComponent;
    let fixture: ComponentFixture<ThirdGameSwitchComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThirdGameSwitchComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ThirdGameSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
