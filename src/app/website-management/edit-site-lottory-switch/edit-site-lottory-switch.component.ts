// Developer：July
// Date:
// Description：修改彩票开关-详情

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/service/websocket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from 'src/app/page/alert/alert.component';

@Component({
	selector: 'app-edit-site-lottory-switch',
	templateUrl: './edit-site-lottory-switch.component.html',
	styleUrls: ['./edit-site-lottory-switch.component.css']
})
export class EditSiteLottorySwitchComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public types;//批量和单个
	private siteList = [];//站点的key
    public	siteName;//站点的名字
	public obj = Object.keys;
	private lists = [];
	private siteKey;//站点的key
	public lotteryList;//彩票开关列表
	//权限
	public allswith = false;
	public dis = false;
	public updatabtn = true;
	private menukeyArr;
	public stock;//传给弹框的值
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
			);
		} else if (this.types == 2) {
			this.siteList = [];
			let sitekey = [];
			sitekey = this.routerinfo.snapshot.queryParams["id"];
			this.siteList.push(sitekey);
			this.siteName = this.routerinfo.snapshot.queryParams["name"];
		}
		this.editlottorySwitch();
		this.permission();
	}
	//权限
	private permission() {
		let menukey = this.menukeyArr;
		if (menukey) {
			//修改
			if (!menukey.includes('site_lottery_update')) {
				this.dis = true;
				this.updatabtn = false;
			}
		}
	}
       private	editlottorySwitch() {
		if (this.types == 1) {
			let siteK = this.siteList[this.siteList.length - 1];
			this.siteKey = siteK;
		} else if (this.types == 2) {
			this.siteKey = this.siteList;
		}
		let data = `{"site":"${this.siteKey}"}`;
		this.socket.ws_send(this.socket.WS_URL.siteLottery_edit, data, (res) => {
			if (res.status == 200) {
				this.lotteryList = res.list;
				this.allswith = true;
				this.lotteryList.forEach(element => {
					element.isoff = true;
					element.game_list.forEach(el => {
						if (el.acceptable == false) {
							element.isoff = false;
							this.allswith = false;
						}
					})
				})
			} else {
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
	//全选所有
	public selall(active, opelist) {
		opelist.forEach(element => {
			element.isoff = active
			element.game_list.forEach(el => {
				el.acceptable = active;
			})
		})
	}
	//单个彩种全选
	public singelsel(str, em, opelist) {
		em.game_list.forEach(ele => {
			ele.acceptable = str;
		})
		em.isoff = str;
		this.allswith = true;
		opelist.forEach(element => {
			if (element.isoff == false) {
				this.allswith = false;
			}
		});
	}
	//单个玩法
	public radioswitch(em, act, i, opelist) {
		em.game_list[i].acceptable = act;
		em.isoff = true;
		em.game_list.forEach(element => {
			if (element.acceptable == false) {
				em.isoff = false;
			}
		});
		this.allswith = true;
		opelist.forEach(element => {
			if (element.isoff == false) {
				this.allswith = false;
			}
		})
	}
	public getOddAll() {
		this.stock = '正在保存中...';
		this.child.exOuts();
		this.lists = [];
		this.siteList.forEach(e => {
			this.lists.push(`"${e}"`);
		})
		let lottery = JSON.stringify(this.lotteryList);
		let data = `{"list":${lottery},"site":[${this.lists}]}`;
		this.socket.ws_send(this.socket.WS_URL.sitelottery_save, data, (res) => {
			this.stock = res.msg;
			if (res.status == 200) {
				setTimeout(() => {
					this.router.navigateByUrl("site-lottory-switch");
				}, 1000)
			} else {
				this.allswith = true;
				this.lotteryList.forEach(element => {
					element.isoff = true;
					element.game_list.forEach(el => {
						if (el.acceptable == false) {
							element.isoff = false;
							this.allswith = false;
						}
					})
				})
			}
			this.child.exOuts();
		})
	}
	public clear() {
		this.router.navigateByUrl("site-lottory-switch");
	}
}