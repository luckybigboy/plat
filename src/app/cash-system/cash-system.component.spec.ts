import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CashSystemComponent } from './cash-system.component';

describe('CashSystemComponent', () => {
    let component: CashSystemComponent;
    let fixture: ComponentFixture<CashSystemComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CashSystemComponent]
        }).compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CashSystemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
