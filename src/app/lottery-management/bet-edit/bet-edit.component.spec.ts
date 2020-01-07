// Developer：July
// Date:
// Description：彩票投注额设置-详情

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BetEditComponent } from './bet-edit.component';

describe('BetEditComponent', () => {
    let component: BetEditComponent;
    let fixture: ComponentFixture<BetEditComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BetEditComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(BetEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
