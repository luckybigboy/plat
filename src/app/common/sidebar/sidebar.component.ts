// Developer：July
// Date:
// Description：公共左侧导航

import { Component, OnInit } from '@angular/core';
import { MessageService } from './../../../service/message.service';

// declare var $:any;
@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	constructor( private message: MessageService) {
	}
	public siderbarItem = [
		{
			'allName': '账户管理', 'isActive': false, 'display': false, 'innerName': [
				{ 'name': '员工管理', 'router': './employee-management', 'key': ['account_admin_delete', 'account_admin_insert', 'account_admin_select', 'account_admin_update'], 'isActive': false },
				{ 'name': '操作日志', 'router': './operalog', 'key': 'account_operate_select', 'isActive': false },
				{ 'name': '角色管理', 'router': './role-management', 'key': ['account_role_delete', 'account_role_insert', 'account_role_select', 'account_role_update'], 'isActive': false }]
		},
		{ 'allName': '现金管理', 'isActive': false, 'display': false, 'innerName': [{ 'name': '第三方支付方式列表', 'router': './third-payment', 'key': 'cash_list', 'isActive': false }] },
		{
			'allName': '彩票管理', 'isActive': false, 'display': false, 'innerName': [
				{ 'name': '彩票赔率设置', 'router': './gameodds-setting', 'key': ['lottery_win_select', 'lottery_win_update'], 'isActive': false },
				{ 'name': '彩票投注额设置', 'router': './bet-amount-setting', 'key': ['lottery_bet_select', 'lottery_bet_update'], 'isActive': false },
				{ 'name': '彩票返点设置', 'router': './rabate-setting', 'key': ['lottery_rebate_select', 'lottery_rebate_update'], 'isActive': false },
				// { 'name': '官方彩预设结果', 'router': './official-preset', 'key': '', 'isActive': false },
				{ 'name': '开奖结果', 'router': './lottery-result', 'key': 'lottery_open', 'isActive': false },
			]
		},
		{
			'allName': '报表查询', 'isActive': false, 'display': false, 'innerName': [{ 'name': '站点彩票报表', 'router': './site-lottery-report', 'key': 'report_site', 'isActive': false },
			{ 'name': '站点分析', 'router': './site-analysis', 'key': 'report_analysis', 'isActive': false },
			{ 'name': '月结对账报表', 'router': './monthly-settlement-report', 'key': 'report_monthly', 'isActive': false }]
		},
		{
			'allName': '网站管理', 'isActive': false, 'display': false, 'innerName': [
				{ 'name': '站点总开关', 'router': './site-all-switch', 'key': ['site_status_select', 'site_status_update'], 'isActive': false },
				{ 'name': '站点彩票开关', 'router': './site-lottory-switch', 'key': ['site_lottery_select', 'site_lottery_update'], 'isActive': false },
				{ 'name': '站点彩票玩法开关', 'router': './site-play-switch', 'key': ['site_play_select', 'site_play_update'], 'isActive': false },
				{ 'name': '站点游戏提成比例', 'router': './game-percentage', 'key': ['site_tax_select', 'site_tax_update'], 'isActive': false },
				{ 'name': '第三方游戏开关', 'router': './third-game-switch', 'key': ['site_external_select', 'site_external_update'], 'isActive': false },
			]
		}
	]
	public open = false;
	private url = '';
	private index = null;
	private prei = null;
	public gohome() {
		this.open = true;
		this.siderbarItem.forEach(ele => {
			if (ele !== this.prei) {
				this.index = null;
				this.prei = ele;
			}
		})
		let hash_url = window.location.hash;
		this.url = ('.' + hash_url.split('#')[1]).split('?')[0];
		this.siderbarItem.forEach(element => {
			element.display = false;
		})
	}
	private getPermission(menus) {
		this.siderbarItem.forEach(ele => {
			ele.isActive = false;
			ele.innerName.forEach(el => {
				el.isActive = false;
			})
		})
		this.siderbarItem.forEach(ele => {
			ele.innerName.forEach(el => {
				menus.forEach(e => {
					let type = typeof el.key;
					if (type == "string") {
						if (e == el.key || el.key == '') {
							el.isActive = true;
							ele.isActive = true;
						}
					} else {
						if (el.key.indexOf(e) !== -1) {
							el.isActive = true;
							ele.isActive = true;
						}
					}
				})
			})
		})
		this.siderbarItem.forEach(ele => {
			ele.innerName.forEach(el => {
				if (el.isActive) {
					ele.isActive = true;
				}
			})
		})
	}
	//添加点击样式
	public returni(i) {
		if (i !== this.prei) {
			this.index = null;
			this.prei = i;
		}
		this.siderbarItem.forEach(element => {
			element.display = false;
		});
	}
	public geti(j) {
		this.open = false;
		this.index = j;
		this.siderbarItem.forEach(element => {
			element.display = false;
		});
		let hash_url = window.location.hash;
		this.url = ('.' + hash_url.split('#')[1]).split('?')[0];
		this.siderbarItem.forEach(element => {
			element.innerName.forEach(el => {
				if (el.router == this.url) {
					element.display = true;
				}
			})
		});
	}
	ngOnInit() {
		$(document).ready(() => {
			const trees: any = $('[data-widget="tree"]');
			trees.tree();
		});
		this.message.get().subscribe((result) => {
			let msg = JSON.parse(result);
			let menus = msg.authkey;
			this.getPermission(menus);
			let hash_url = window.location.hash
			this.url = ('.' + hash_url.split('#')[1]).split('?')[0];
			if (this.url == './') {
				this.open = true;
			} else {
				this.open = false;
			}
			this.siderbarItem.forEach(element => {
				element.innerName.forEach(el => {
					if (el.router == this.url) {
						element.display = true;
					}
				})
			});
		})
	}
}