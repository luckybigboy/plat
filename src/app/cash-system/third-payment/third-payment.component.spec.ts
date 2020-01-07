// Developer：July
// Date:
// Description：第三方支付方式列表

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ThirdPaymentComponent } from './third-payment.component';

describe('ThirdPaymentComponent', () => {
    let component: ThirdPaymentComponent;
    let fixture: ComponentFixture<ThirdPaymentComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThirdPaymentComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ThirdPaymentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
