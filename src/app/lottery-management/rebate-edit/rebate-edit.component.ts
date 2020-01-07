// Developer：July
// Date:
// Description：彩票返点设置-详情

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/service/websocket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from 'src/app/page/alert/alert.component';

@Component({
	selector: 'app-rebate-edit',
	templateUrl: './rebate-edit.component.html',
	styleUrls: ['./rebate-edit.component.css']
})
export class RebateEditComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public gameName = '';//判断是批量还是单个修改
	public siteName = '';
	public editRebateList;//接收数据
	public rebateAll: number;
	private siteList = [];
	public types;
	public stock = "";
	private menukeyArr;
	//权限
	public dis = false;
	public updatabtn = true;
	private ids;//站点key
	private Lists;
	private sitelists;
	constructor(private socket: WebsocketService, private routerinfo: ActivatedRoute, private router: Router) {
		this.menukeyArr = socket.menuKey;
	}
	ngOnInit() {
		this.routerinfo.queryParams.subscribe(
			params => {
				this.types = params['type'];
			}
		);
		if (this.types == 1) {
			this.routerinfo.queryParams.subscribe(
				params => {
					this.siteList = params['sitekey'];
				}
			);
			this.routerinfo.queryParams.subscribe(
				params => {
					this.siteName = params['sitename'];
				}
			)
			this.gameName = "批量";
		} else if (this.types == 2) {
			let sitekey = [];
			this.siteList = [];
			sitekey = this.routerinfo.snapshot.queryParams["id"];
			this.siteList.push(sitekey);
			this.siteName = this.routerinfo.snapshot.queryParams["name"];
		}
		this.editRebate();
		this.permission();
	}
	//权限
    private	permission() {
		let menukey = this.menukeyArr;
		//修改
		if (menukey) {
			if (!menukey.includes('lottery_rebate_update')) {
				this.dis = true;
				this.updatabtn = false;
			}
		}
	}
	private editRebate() {
		if (this.types == 1) {
			let siteK = this.siteList[this.siteList.length - 1];
			this.ids = siteK;
		} else if (this.types == 2) {
			this.ids = this.siteList;
		}
		let data = `{"site_key":"${this.ids}"}`;
		this.socket.ws_send(this.socket.WS_URL.LotteryRebateSetting, data, (res) => {
			if (res.status == 200) {
				this.editRebateList = res.list;
			}
			this.stock = res.msg;
			this.child.exOuts();
		})
	}
	public clear() {
		this.router.navigateByUrl("rabate-setting");
	}
	//批量修改
	public editbtn() {
		if (this.rebateAll > 0) {
			if (this.rebateAll > 100) {
				this.stock = "最大值100且只支持整数";
				this.child.exOuts();
			} else {
				if (this.editRebateList && this.rebateAll) {
					this.editRebateList.forEach(element => {
						element.rebate_max = this.rebateAll;
					});
				} else {
					this.stock = "请选择";
					this.child.exOuts();
				}
			}
		}
	}
	public getodd(event, index) {
		let val = event.target.value;
		val = val.replace(/[^\d]/g, "");//清除小数点
		if (val > 0) {
			if (val > 100) {
				this.stock = "最大值100且只支持整数";
				this.child.exOuts();
				val = "100";
			}
		} else {
			this.stock = "最大值100且只支持整数";
			this.child.exOuts();
		}
		this.editRebateList[index].rebate_max = val;
	}
	//获取到input的值
	public getOddAll() {
		this.stock = '正在保存中...';
		this.child.exOuts();
		this.sitelists = [];
		this.siteList.forEach(e => {
			this.sitelists.push(`"${e}"`);
		})
		let arr = [];
		if (this.editRebateList) {
			this.editRebateList.forEach(element => {
				let item = {
					"game_key": element.game_key,
					"rebate_max": element.rebate_max
				}
				arr.push(item);
			});
		}
		this.Lists = JSON.stringify(arr);
		let data = `{"list":${this.Lists},"site_list":[${this.sitelists}]}`;
		this.socket.ws_send(this.socket.WS_URL.rebate_settingsave, data, (res) => {
			if (res.status == 200) {
				setTimeout(() => {
					this.router.navigateByUrl("rabate-setting");
				}, 1500)
			}
				this.stock = res.msg;
				this.child.exOuts();
		})
	}
}