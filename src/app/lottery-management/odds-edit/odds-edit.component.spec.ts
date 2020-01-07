// Developer：July
// Date:
// Description：彩票赔率设置-详情

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OddsEditComponent } from './odds-edit.component';

describe('OddsEditComponent', () => {
    let component: OddsEditComponent;
    let fixture: ComponentFixture<OddsEditComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OddsEditComponent]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(OddsEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
