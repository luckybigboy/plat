import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EchartsNg2Module } from 'echarts-ng2';
import { ReportQueryComponent } from './report-query.component';
import { SiteLotteryReportComponent } from './site-lottery-report/site-lottery-report.component';
import { SiteAnalysisComponent } from './site-analysis/site-analysis.component';
import { MonthlySettlementReportComponent } from './monthly-settlement-report/monthly-settlement-report.component';
import { PageModule } from '../page/page.module';

const routes: Routes = [
	{
		path: 'site-lottery-report',//站点彩票报表
		component: SiteLotteryReportComponent,
		data: {
			title: '站点彩票报表'
		}
	},
	{
		path: 'site-analysis',//站点分析
		component: SiteAnalysisComponent,
		data: {
			title: '站点分析'
		}
	},
	{
		path: 'monthly-settlement-report',//月结对账报表
		component: MonthlySettlementReportComponent,
		data: {
			title: '月结对账报表'
		}
	},
]
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild(routes),
		EchartsNg2Module,
		PageModule
	],
	declarations: [
		ReportQueryComponent,
		SiteLotteryReportComponent,
		SiteAnalysisComponent,
		MonthlySettlementReportComponent,
		// gameDicyPipe,
	],
	providers: [
	]
})
export class ReportQueryModule { }