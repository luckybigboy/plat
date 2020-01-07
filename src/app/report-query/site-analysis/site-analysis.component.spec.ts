// Developer：July
// Date:
// Description：站点分析

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SiteAnalysisComponent } from './site-analysis.component';

describe('SiteAnalysisComponent', () => {
	let component: SiteAnalysisComponent;
	let fixture: ComponentFixture<SiteAnalysisComponent>;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SiteAnalysisComponent]
		})
			.compileComponents();
	}));
	beforeEach(() => {
		fixture = TestBed.createComponent(SiteAnalysisComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
