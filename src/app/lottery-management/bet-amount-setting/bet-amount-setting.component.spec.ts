// Developer：July
// Date:
// Description：彩票投注额设置

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BetAmountSettingComponent } from './bet-amount-setting.component';

describe('BetAmountSettingComponent', () => {
    let component: BetAmountSettingComponent;
    let fixture: ComponentFixture<BetAmountSettingComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BetAmountSettingComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(BetAmountSettingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
