// Developer：July
// Date:
// Description：彩票赔率设置-详情

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/service/websocket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from 'src/app/page/alert/alert.component';

@Component({
	selector: 'app-odds-edit',
	templateUrl: './odds-edit.component.html',
	styleUrls: ['./odds-edit.component.css']
})
export class OddsEditComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	private model_key;
	private game_key;
	public play_key;
	public siteName = '';
	private listsobj;//获取列表
	private game_list;
	private play_list;
	public win_list;
	public newOdd: number;
	public falg = true;
	public falg1 = true;
	public falg2 = true;
	//权限
	public dis = false;
	public updatabtn = true;
	public gameName = '';
	public types;//切换类型
	private lists = [];
	public Model_keys = [];
	public game_keys = [];
	public play_keys = [];
	public obj = Object.keys;
	private ids;
	private siteList = [];//获取站点列表
	public stock = "";
	private menukeyArr;//权限
	public loadingDivs = false;
	private lastwin = [];
	private allwin = [];
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
		this.editOdds();
		this.permission();
	}
	//权限
	private permission() {
		let menukey = this.menukeyArr;
		//修改
		if (menukey) {
			if (!menukey.includes('lottery_win_update')) {
				this.dis = true;
				this.updatabtn = false;
			}
		}
	}
	private editOdds() {
		this.loadingDivs = true;
		if (this.types == 1) {
			let siteK = this.siteList[this.siteList.length - 1];
			this.ids = siteK;
		} else if (this.types == 2) {
			this.ids = this.siteList;
		}
		let data = `{"site":"${this.ids}"}`;
		this.socket.ws_send(this.socket.WS_URL.playsrate_edit, data, (res) => {
			this.loadingDivs = false;
			if (res.status == 200) {
				this.listsobj = res.list;
				if (this.listsobj) {
					this.Model_keys = Object.keys(this.listsobj);
					this.model_key = this.Model_keys[0];
					this.game_list = this.listsobj[this.model_key];
					this.game_keys = Object.keys(this.game_list);
					this.game_key = this.game_keys[0];
					this.play_list = this.game_list[this.game_key];
					this.play_keys = Object.keys(this.play_list);
					this.play_key = this.play_keys[0];
					this.win_list = this.play_list[this.play_key];
				}
			}
			this.stock = res.msg;
			this.child.exOuts();
		})
	}
	public clear() {
		this.router.navigateByUrl("gameodds-setting");
	}
	public modelbtn(index, em, a) {
		this.falg = index + 1;
		this.falg1 = a;
		this.falg2 = a;
		this.model_key = em;
		this.game_list = this.listsobj[em];
		this.game_keys = this.obj(this.game_list);
		this.game_key = this.game_keys[0];
		this.play_list = this.game_list[this.game_key];
		this.play_keys = Object.keys(this.play_list);
		this.play_key = this.play_keys[0];
		this.win_list = this.play_list[this.play_key];
	}
	public gamebtn(game, key, b) {
		this.falg1 = game + 1;
		this.falg2 = b;
		this.game_key = key;
		this.play_list = this.game_list[key];
		this.play_keys = Object.keys(this.play_list);
		this.play_key = this.play_keys[0];
		this.win_list = this.play_list[this.play_key];
	}
	public playbtn(play, key) {
		this.falg2 = play + 1;
		this.win_list = this.play_list[key];
		this.play_key = key;
	}
	public getodd(id, event) {
		let val = event.target.value;
		if (val > 0) {
			if (val > 10000000) {
				this.stock = '金额最大为999999999.99且小数点只保留两位';
				this.child.exOuts();
				if (val.split('.')[1]) {
					val = String(val.split('.')[0].slice(0, 7)) + '.' + String(val.split('.')[2]);
				} else {
					val = String(val.slice(0, 7));
				}
			}
		} else {
			this.stock = '赔率的值请设置大于0';
			this.child.exOuts();
			val = 0.001;
		}
		val = Number(val);
		event.target.value = val;
		this.play_key = this.play_keys[0];
		let lists = { model_key: `${this.model_key}`, game_key: `${this.game_key}`, play_key: `${this.play_key}`, win_key: `${id}`, bonus_rate: `${val}` };
		if (this.lastwin.length > 0) {
			for (let index = 0; index < this.lastwin.length; index++) {
				if (lists.model_key == this.lastwin[index].model_key && lists.game_key == this.lastwin[index].game_key && lists.play_key == this.lastwin[index].play_key && lists.win_key == this.lastwin[index].win_key) {
					this.lastwin[index] = lists;
					break;
				} else {
					this.lastwin.push(lists);
				}
			}
		} else {
			this.lastwin.push(lists);
		}
	}
	public editoddsAll() {
		this.allwin = [];
		if (this.newOdd > 0) {
			if (this.newOdd > 10000000) {
				this.stock = '最大为9999999.99且小数点只保留三位';
				this.child.exOuts();
			} else {
				if (this.win_list && this.newOdd) {
					this.allwin = [];
					for (const iterator of this.win_list) {
						iterator[Object.keys(iterator)[0]] = this.newOdd;
						let lists = { model_key: `${this.model_key}`, game_key: `${this.game_key}`, play_key: `${this.play_key}`, win_key: `${Object.keys(iterator)}`, bonus_rate: `${iterator[Object.keys(iterator)[0]]}` };
						this.allwin.push(lists);
					}
					if (this.lastwin.length > 0) {
						this.lastwin.forEach(el => {
							this.allwin.forEach(element => {
								if (element.game_key == el.game_key && element.play_key == el.play_key && element.win_key == el.win_key) {
									el.bonus_rate = element.bonus_rate;
								} else {
									this.lastwin.push(element);
								}
							})
						})
					} else {
						this.allwin.forEach(element => {
							this.lastwin.push(element);
						});
					}
					this.lastwin = Array.from(new Set(this.lastwin));
				} else {
					this.stock = '请选择';
					this.child.exOuts();
				}
			}
		} else {
			this.stock = '赔率的值请设置大于0';
			this.child.exOuts();
		}
	}
	public getOddAll() {
		this.stock = '正在保存中...';
		this.child.exOuts();
		this.siteList.forEach(e => {
			this.lists.push(`"${e}"`);
		})
		let data = `{"site":[${this.lists}],"site_win":${JSON.stringify(this.lastwin)}}`;
		this.socket.ws_send(this.socket.WS_URL.playsrate_save, data, (res) => {
			if (res.status == 200) {
				setTimeout(() => {
					this.router.navigateByUrl("gameodds-setting");
				}, 1000)
			}
			this.stock = res.msg;
			this.child.exOuts();
		})
	}
}