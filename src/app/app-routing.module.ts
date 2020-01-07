import { CommonModule } from '@angular/common';
import { NgModule, Component, ElementRef } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AccountManagementModule } from './account-management/account-management.module';
import { WebsiteManagementModule } from './website-management/website-management.module';
import { LotteryManagementModule } from './lottery-management/lottery-management.module';
import { ReportQueryModule } from './report-query/report-query.module'
import { from } from 'rxjs';
import { CashSystemModule } from './cash-system/cash-system.module';

const routes: Routes = [
	//首页
	{ path: '', redirectTo: './login', pathMatch: 'full' },
	{ path: 'account-management', loadChildren: './account-management/account-management.module#AccountManagementModule', data: { preload: true } },
	// 第三方支付
	{ path: 'cash-system', loadChildren: './cash-system/cash-system.module#CashSystemModule', data: { preload: true } },
	//网站管理
	{ path: 'website-management', loadChildren: './website-management/website-management.module#WebsiteManagementModule', data: { preload: true } },
	//彩票管理
	{ path: 'lottery-management', loadChildren: './lottery-management/lottery-management.module#LotteryManagementModule', data: { preload: true } },
	//报表管理
	{
		path: 'report-query', loadChildren: './report-query/report-query.module#ReportQueryModule', data: { preload: true },
	}
];
@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(
			routes,
			{ useHash: true },
			// { enableTracing: true }
		),
		AccountManagementModule,//首页及账户管理
		CashSystemModule,//现金支付
		WebsiteManagementModule, //网站管理
		LotteryManagementModule,//彩票管理
		ReportQueryModule//报表查询
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
	ngOnInit() { }
}
