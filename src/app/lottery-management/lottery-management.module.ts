import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { LotteryManagementComponent } from './lottery-management.component';
import { LotteryResultComponent } from './lottery-result/lottery-result.component';
import { BetAmountSettingComponent } from './bet-amount-setting/bet-amount-setting.component';
import { GameoddsSettingComponent } from './gameodds-setting/gameodds-setting.component';
import { RebateSettingComponent } from './rebate-setting/rebate-setting.component'
import { PageModule } from '../page/page.module';
import { OddsEditComponent } from './odds-edit/odds-edit.component';
import { RebateEditComponent } from './rebate-edit/rebate-edit.component';
import { BetEditComponent } from './bet-edit/bet-edit.component';

const routes: Routes = [
	{
		path: 'gameodds-setting',//彩票赔率设置
		component: GameoddsSettingComponent,
		data: {
			title: '彩票赔率设置'
		}
	},
	{
		path: 'odd-edit',//彩票赔率修改
		component: OddsEditComponent,
		data: {
			title: '彩票赔率修改'
		}
	},
	{
		path: 'bet-amount-setting',//彩票投注额设置
		component: BetAmountSettingComponent,
		data: {
			title: '彩票投注额设置'
		}
	},
	{
		path: 'bet-edit',//彩票投注额修改设置
		component: BetEditComponent,
		data: {
			title: '彩票投注额修改设置'
		}
	},
	{
		path: 'rabate-setting',//彩票返点设置
		component: RebateSettingComponent,
		data: {
			title: '彩票返点设置'
		}
	},
	{
		path: 'rabate-edit',//彩票返点设置
		component: RebateEditComponent,
		data: {
			title: '彩票返点设置'
		}
	},
	{
		path: 'lottery-result',//开奖结果
		component: LotteryResultComponent,
		data: {
			title: '开奖结果'
		}
	}
]
@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		HttpClientModule,
		HttpModule,
		FormsModule,
		PageModule
	],
	declarations: [
		LotteryManagementComponent,
		LotteryResultComponent,
		BetEditComponent,
		RebateEditComponent,
		OddsEditComponent,
		RebateSettingComponent,
		BetAmountSettingComponent,
		GameoddsSettingComponent
	],
	providers: [
	]
})
export class LotteryManagementModule { }