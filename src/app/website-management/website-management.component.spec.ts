import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { WebsiteManagementComponent } from './website-management.component';

describe('WebsiteManagementComponent', () => {
    let component: WebsiteManagementComponent;
    let fixture: ComponentFixture<WebsiteManagementComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WebsiteManagementComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(WebsiteManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
