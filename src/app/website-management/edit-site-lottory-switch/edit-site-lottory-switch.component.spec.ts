// Developer：July
// Date:
// Description：修改彩票开关-详情

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditSiteLottorySwitchComponent } from './edit-site-lottory-switch.component';

describe('EditSiteLottorySwitchComponent', () => {
    let component: EditSiteLottorySwitchComponent;
    let fixture: ComponentFixture<EditSiteLottorySwitchComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditSiteLottorySwitchComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(EditSiteLottorySwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
