// Developer：July
// Date:
// Description：彩票返点设置-详情

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RebateEditComponent } from './rebate-edit.component';

describe('RebateEditComponent', () => {
    let component: RebateEditComponent;
    let fixture: ComponentFixture<RebateEditComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RebateEditComponent]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(RebateEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
