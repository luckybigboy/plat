// Developer：July
// Date:
// Description：彩票赔率设置

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GameoddsSettingComponent } from './gameodds-setting.component';

describe('GameoddsSettingComponent', () => {
    let component: GameoddsSettingComponent;
    let fixture: ComponentFixture<GameoddsSettingComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GameoddsSettingComponent]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(GameoddsSettingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
