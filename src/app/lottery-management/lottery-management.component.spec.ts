import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LotteryManagementComponent } from './lottery-management.component';
describe('LotteryManagementComponent', () => {
    let component: LotteryManagementComponent;
    let fixture: ComponentFixture<LotteryManagementComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LotteryManagementComponent]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(LotteryManagementComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
