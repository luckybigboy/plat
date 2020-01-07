import { ReportQueryModule } from './report-query.module';

describe('ReportQueryModule', () => {
	let reportQueryModule: ReportQueryModule;
	beforeEach(() => {
		reportQueryModule = new ReportQueryModule();
	});
	it('should create an instance', () => {
		expect(reportQueryModule).toBeTruthy();
	});
});
