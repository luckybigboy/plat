// Developer：July
// Date:
// Description：站点彩票开关

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SiteLottorySwitchComponent } from './site-lottory-switch.component';

describe('SiteLottorySwitchComponent', () => {
    let component: SiteLottorySwitchComponent;
    let fixture: ComponentFixture<SiteLottorySwitchComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SiteLottorySwitchComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SiteLottorySwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
