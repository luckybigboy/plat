// Developer：July
// Date:
// Description：开奖结果

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LotteryResultComponent } from './lottery-result.component';

describe('LotteryResultComponent', () => {
    let component: LotteryResultComponent;
    let fixture: ComponentFixture<LotteryResultComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LotteryResultComponent]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(LotteryResultComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
