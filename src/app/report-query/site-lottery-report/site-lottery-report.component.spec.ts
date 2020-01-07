// Developer：July
// Date:
// Description：站点彩票报表

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SiteLotteryReportComponent } from './site-lottery-report.component';

describe('SiteLotteryReportComponent', () => {
	let component: SiteLotteryReportComponent;
	let fixture: ComponentFixture<SiteLotteryReportComponent>;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SiteLotteryReportComponent]
		})
			.compileComponents();
	}));
	beforeEach(() => {
		fixture = TestBed.createComponent(SiteLotteryReportComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
