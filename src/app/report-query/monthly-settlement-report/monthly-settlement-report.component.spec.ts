// Developer：July
// Date:
// Description：月结对账报表

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthlySettlementReportComponent } from './monthly-settlement-report.component';

describe('MonthlySettlementReportComponent', () => {
	let component: MonthlySettlementReportComponent;
	let fixture: ComponentFixture<MonthlySettlementReportComponent>;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MonthlySettlementReportComponent]
		})
			.compileComponents();
	}));
	beforeEach(() => {
		fixture = TestBed.createComponent(MonthlySettlementReportComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
