// Developer：July
// Date:
// Description：彩票返点设置

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RabateSettingComponent } from './rabate-setting.component';

describe('RabateSettingComponent', () => {
    let component: RabateSettingComponent;
    let fixture: ComponentFixture<RabateSettingComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RabateSettingComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(RabateSettingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
