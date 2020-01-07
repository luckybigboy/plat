// Developer：July
// Date:
// Description：彩票投注额设置-详情

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/service/websocket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from 'src/app/page/alert/alert.component';

@Component({
	selector: 'app-bet-edit',
	templateUrl: './bet-edit.component.html',
	styleUrls: ['./bet-edit.component.css']
})
export class BetEditComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public falg = true;
	public falg1 = true;
	public siteName = '';
	public gameName = '';
	private listsobj;
	public model_keys = [];
	public game_keys = [];
	private game_list;
	public play_list;
	public obj = Object.keys;
	public betMin: number;//最小的投注额
	public betMax: number;//最大的投注额
	private siteList = [];
	public types;//类型
	public stock = "";
	//权限
	public dis = false;
	public updatabtn = true;
	private menukeyArr;//权限列表
	private model_key;
    private	game_key;
	public loadingDivs = false;
	private lists = [];//站点列表
	private ids;//站点的key值
	private allwin = [];
	private lastwin = [];
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
			this.gameName = "批量";
		} else if (this.types == 2) {
			let sitekey = [];
			this.siteList = [];
			sitekey = this.routerinfo.snapshot.queryParams["id"];
			this.siteList.push(sitekey);
			this.siteName = this.routerinfo.snapshot.queryParams["name"];
		}
		this.editBet();
		this.permission();
	}
	//权限
	private permission() {
		let menukey = this.menukeyArr;
		if (menukey) {
			//修改
			if (!menukey.includes('lottery_win_update')) {
				this.dis = true;
				this.updatabtn = false;
			}
		}
	}
	public modelbtn(index, em, a) {
		this.falg = index + 1;
		this.falg1 = a;
		this.model_key = em;
		this.game_list = this.listsobj[em];
		this.game_keys = this.obj(this.game_list);
		this.game_key = this.game_keys[0];
		this.play_list = this.game_list[this.game_key];
	}
	public gamebtn(game, gamekey) {
		this.falg1 = game + 1;
		this.game_key = gamekey;
		this.play_list = this.game_list[gamekey];
	}
	private editBet() {
		this.loadingDivs = true;
		if (this.types == 1) {
			let siteK = this.siteList[this.siteList.length - 1];
			this.ids = siteK;
		} else if (this.types == 2) {
			this.ids = this.siteList;
		}
		let data = `{"site_key":"${this.ids}"}`;
		this.socket.ws_send(this.socket.WS_URL.bet_edit, data, (res) => {
			this.loadingDivs = false;
			if (res.status == 200) {
				this.listsobj = res.list;
				if (this.listsobj) {
					this.model_keys = Object.keys(this.listsobj);
					this.model_key = this.model_keys[0];
					this.game_list = this.listsobj[this.model_key];
					this.game_keys = Object.keys(this.game_list);
					this.game_key = this.game_keys[0];
					this.play_list = this.game_list[this.game_key];
				}
			}
			this.stock = res.msg;
			this.child.exOuts();
		})
	}
	public clear() {
		this.router.navigateByUrl("bet-amount-setting");
	}
	//批量修改最小投注
	public minbtn() {
		if (this.betMin >= 1) {
			if (this.betMin > 10000000) {
				this.stock = '金额最大为9999999.99且小数点只保留两位';
				this.child.exOuts();
			} else {
				if (this.play_list && this.betMin) {
					this.allwin = [];
					for (const iterator of this.play_list) {
						iterator[Object.keys(iterator)[0]].bet_min = this.betMin;
						let lists = { model_key: `${this.model_key}`, game_key: `${this.game_key}`, play_key: `${Object.keys(iterator)}`, bet_min: `${iterator[Object.keys(iterator)[0]].bet_min}`, bet_max: `${iterator[Object.keys(iterator)[0]].bet_max}` };
						this.allwin.push(lists);
					}
					if (this.lastwin.length > 0) {
						for (let index = 0; index < this.lastwin.length; index++) {
							for (let i = 0; i < this.allwin.length; i++) {
								if (this.allwin[i].model_key == this.lastwin[index].model_key && this.allwin[i].game_key == this.lastwin[index].game_key && this.allwin[i].play_key == this.lastwin[index].play_key) {
									this.lastwin = this.allwin;
									break;
								} else {
									this.lastwin.push(this.allwin[i]);
								}
							}
							break;
						}
					} else {
						this.lastwin = this.allwin;
					}
				} else {
					this.stock = '请选择';
					this.child.exOuts();
				}
			}
		} else {
			this.stock = '投注额最低不能低于1元';
			this.child.exOuts();
		}
	}
	//批量修改最大投注
	public maxbtn() {
		if (this.play_list) {
			if (this.betMax < 1) {
				this.stock = '最大金额不能低于1.00';
				this.child.exOuts();
			} else {
				if (this.betMax > 10000000) {
					this.stock = '金额最大为9999999.99且小数点只保留两位';
					this.child.exOuts();
				} else {
					this.allwin = [];
					for (const iterator of this.play_list) {
						iterator[Object.keys(iterator)[0]].bet_max = this.betMax;
						let lists = { model_key: `${this.model_key}`, game_key: `${this.game_key}`, play_key: `${Object.keys(iterator)}`, bet_min: `${iterator[Object.keys(iterator)[0]].bet_min}`, bet_max: `${iterator[Object.keys(iterator)[0]].bet_max}` };
						this.allwin.push(lists);
					}
					if (this.lastwin.length > 0) {
						for (let index = 0; index < this.lastwin.length; index++) {
							for (let i = 0; i < this.allwin.length; i++) {
								if (this.allwin[i].model_key == this.lastwin[index].model_key && this.allwin[i].game_key == this.lastwin[index].game_key && this.allwin[i].play_key == this.lastwin[index].play_key) {
									this.lastwin = this.allwin;
									break;
								} else {
									this.lastwin.push(this.allwin[i]);
								}
							}
							break;
						}
					} else {
						this.lastwin = this.allwin;
					}
				}
			}
		} else {
			this.stock = '请选择';
			this.child.exOuts();
		}
	}
	public getmin(id, event, max) {
		let val = event.target.value;
		if (val >= 1) {
			if (val > 10000000) {
				this.stock = '金额最大为9999999.99且小数点只保留两位';
				this.child.exOuts();
				if (val.split('.')[1]) {
					val = String(val.split('.')[0].slice(0, 7)) + '.' + String(val.split('.')[1]);
				} else {
					val = String(val.slice(0, 7));
				}
			}
		} else {
			this.stock = '投注额最低不能低于1元';
			this.child.exOuts();
			val = "1.00";
		}
		val = Number(val);
		event.target.value = val;
		let lists = { model_key: `${this.model_key}`, game_key: `${this.game_key}`, play_key: `${id}`, bet_min: `${val}`, bet_max: `${max}` };
		if (this.lastwin.length > 0) {
			for (let index = 0; index < this.lastwin.length; index++) {
				if (lists.model_key == this.lastwin[index].model_key && lists.game_key == this.lastwin[index].game_key && lists.play_key == this.lastwin[index].play_key) {
					this.lastwin[index] = lists;
					break;
				} else {
					this.lastwin.push(lists);
				}
			}
		} else {
			this.lastwin.push(lists);
		}
		this.lastwin = Array.from(new Set(this.lastwin));
	}
	public getmax(id, event, min) {
		let val = event.target.value;
		if (val >= 1) {
			if (val > 10000000) {
				this.stock = '金额最大为9999999.99且小数点只保留两位';
				this.child.exOuts();
				if (val.split('.')[1]) {
					val = String(val.split('.')[0].slice(0, 7)) + '.' + String(val.split('.')[1]);
				} else {
					val = String(val.slice(0, 7));
				}
			}
		} else {
			this.stock = '投注额最低不能低于1元';
			this.child.exOuts();
			val = "1.00";
		}
		val = Number(val);
		event.target.value = val;
		let lists = { model_key: `${this.model_key}`, game_key: `${this.game_key}`, play_key: `${id}`, bet_min: `${min}`, bet_max: `${val}` };
		if (this.lastwin.length > 0) {
			for (let index = 0; index < this.lastwin.length; index++) {
				if (lists.model_key == this.lastwin[index].model_key && lists.game_key == this.lastwin[index].game_key && lists.play_key == this.lastwin[index].play_key) {
					this.lastwin[index] = lists;
					break;
				} else {
					this.lastwin.push(lists);
				}
			}
		} else {
			this.lastwin.push(lists);
		}
		this.lastwin = Array.from(new Set(this.lastwin));
	}
    public getOddAll() {
		this.stock = '正在保存中...';
		this.child.exOuts();
		this.lists = [];
		this.siteList.forEach(e => {
			this.lists.push(`"${e}"`);
		})
		this.lastwin = Array.from(new Set(this.lastwin));
		let data = `{"data":${JSON.stringify(this.lastwin)},"site_list":[${this.lists}]}`;
		this.socket.ws_send(this.socket.WS_URL.bet_settingsave, data, (res) => {
			if (res.status == 200) {
				this.stock = res.msg;
				this.child.exOuts();
				setTimeout(() => {
					this.router.navigateByUrl("bet-amount-setting");
				}, 1500)
			} else {
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
}
