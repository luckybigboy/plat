// Developer：July
// Date:
// Description：修改彩票玩法开关-详情

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSitePlaysSwitchComponent } from './edit-site-plays-switch.component';

describe('EditSitePlaysSwitchComponent', () => {
    let component: EditSitePlaysSwitchComponent;
    let fixture: ComponentFixture<EditSitePlaysSwitchComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditSitePlaysSwitchComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(EditSitePlaysSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
