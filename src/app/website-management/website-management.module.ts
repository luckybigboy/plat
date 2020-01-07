import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteManagementComponent } from './website-management.component';
import { GamePercentageComponent } from './game-percentage/game-percentage.component';
import { RouterModule, Routes } from '@angular/router';
import { SiteAllSwitchComponent } from './site-all-switch/site-all-switch.component';
import { SiteLottorySwitchComponent } from './site-lottory-switch/site-lottory-switch.component';
import { SitePlaysSwitchComponent } from './site-plays-switch/site-plays-switch.component';
import { EditSiteAllSwitchComponent } from './edit-site-all-switch/edit-site-all-switch.component';
import { EditSiteLottorySwitchComponent } from './edit-site-lottory-switch/edit-site-lottory-switch.component';
import { EditSitePlaysSwitchComponent } from './edit-site-plays-switch/edit-site-plays-switch.component';
import { EditGamePercentageComponent } from './edit-game-percentage/edit-game-percentage.component';
import { PageModule } from '../page/page.module';
import { ThirdGameSwitchComponent } from './third-game-switch/third-game-switch.component';
import { EditThirdGameSwitchComponent } from './edit-third-game-switch/edit-third-game-switch.component'

const routes: Routes = [
	{
		path: 'game-percentage',
		component: GamePercentageComponent,
		data: {
			title: '游戏提成比例'
		}
	},
	{
		path: 'site-all-switch',
		component: SiteAllSwitchComponent,
		data: {
			title: '站点总开关'
		}
	},
	{
		path: 'edit-site-all-switch',
		component: EditSiteAllSwitchComponent,
		data: {
			title: '修改站点总开关'
		}
	},
	{
		path: 'site-lottory-switch',
		component: SiteLottorySwitchComponent,
		data: {
			title: '站点彩票开关'
		}
	},
	{
		path: 'edit-site-lottory-switch',
		component: EditSiteLottorySwitchComponent,
		data: {
			title: '修改站点彩票开关'
		}
	},
	{
		path: 'site-play-switch',
		component: SitePlaysSwitchComponent,
		data: {
			title: '站点彩票玩法开关'
		}
	},
	{
		path: 'edit-site-play-switch',
		component: EditSitePlaysSwitchComponent,
		data: {
			title: '修改站点彩票玩法开关'
		}
	},
	{
		path: 'edit-game-percentage',
		component: EditGamePercentageComponent,
		data: {
			title: '游戏提成比例设置的修改'
		}
	},
	{
		path: 'third-game-switch',
		component: ThirdGameSwitchComponent,
		data: {
			title: '游戏提成比例设置的修改'
		}
	},
	{
		path: 'edit-third-game-switch',
		component: EditThirdGameSwitchComponent,
		data: {
			title: '游戏提成比例设置的修改'
		}
	}
]
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		PageModule,
		RouterModule.forChild(routes),
	],
	declarations: [WebsiteManagementComponent,
		GamePercentageComponent,
		SiteAllSwitchComponent,
		SiteLottorySwitchComponent,
		EditSiteAllSwitchComponent,
		EditSiteLottorySwitchComponent,
		EditSitePlaysSwitchComponent,
		EditGamePercentageComponent,
		SitePlaysSwitchComponent,
		ThirdGameSwitchComponent,
		EditThirdGameSwitchComponent,
	],
	providers: [
	]
})
export class WebsiteManagementModule { }