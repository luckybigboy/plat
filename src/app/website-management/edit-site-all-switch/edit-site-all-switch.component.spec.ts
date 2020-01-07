// Developer：July
// Date:
// Description：修改站点总开关-详情

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSiteAllSwitchComponent } from './edit-site-all-switch.component';

describe('EditSiteAllSwitchComponent', () => {
    let component: EditSiteAllSwitchComponent;
    let fixture: ComponentFixture<EditSiteAllSwitchComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditSiteAllSwitchComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(EditSiteAllSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
