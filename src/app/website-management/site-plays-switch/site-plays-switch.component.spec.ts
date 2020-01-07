// Developer：July
// Date:
// Description：站点彩票玩法开关

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SitePlaysSwitchComponent } from './site-plays-switch.component';

describe('SitePlaysSwitchComponent', () => {
    let component: SitePlaysSwitchComponent;
    let fixture: ComponentFixture<SitePlaysSwitchComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SitePlaysSwitchComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SitePlaysSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
