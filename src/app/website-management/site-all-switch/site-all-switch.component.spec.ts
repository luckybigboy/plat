// Developer：July
// Date:
// Description：站点总开关

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SiteAllSwitchComponent } from './site-all-switch.component';

describe('SiteAllSwitchComponent', () => {
    let component: SiteAllSwitchComponent;
    let fixture: ComponentFixture<SiteAllSwitchComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SiteAllSwitchComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SiteAllSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
