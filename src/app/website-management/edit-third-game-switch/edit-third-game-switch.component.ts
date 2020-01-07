// Developer：July
// Date:
// Description：修改第三方游戏开关-详情

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/service/websocket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from 'src/app/page/alert/alert.component';

@Component({
	selector: 'app-edit-third-game-switch',
	templateUrl: './edit-third-game-switch.component.html',
	styleUrls: ['./edit-third-game-switch.component.css']
})
export class EditThirdGameSwitchComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public types;//批量还是单选
	private siteList = [];//站点key列表
	public siteName;//站点的名字
	public flag = true;//选择卡切换
	private menukeyArr;
	private siteKey;//站点的key
	private lotteryList;
	private keys;//所有的key
	public lists;//接收当前数据
	public stock;//传给弹框的值
	private gamelists = [];
	//权限
	public dis = false;
	public updatabtn = true;
	constructor(private socket: WebsocketService, private routerinfo: ActivatedRoute, private router: Router) {
		this.menukeyArr = socket.menuKey;
	}
	ngOnInit() {
		this.routerinfo.queryParams.subscribe(
			params => {
				this.types = params['type'];
			}
		)
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
		} else if (this.types == 2) {
			this.siteList = [];
			let sitekey = [];
			sitekey = this.routerinfo.snapshot.queryParams["id"];
			this.siteList.push(sitekey);
			this.siteName = this.routerinfo.snapshot.queryParams["name"];
		}
		this.editgameSwitch();
		this.permission();
	}
	//权限
	private permission() {
		let menukey = this.menukeyArr;
		//修改
		if (!menukey.includes('site_play_update')) {
			this.dis = true;
			this.updatabtn = false;
		}
	}
	public menuList: any = [
		{
			key: 'ag',
			name: 'AG视讯',
			active: false,
			list: [],
		},
		{
			key: 'fg',
			name: 'FG电子',
			active: false,
			list: [],
		},
		{
			key: 'ky',
			name: '开元棋牌',
			active: false,
			list: [],
		},
		{
			key: 'lb',
			name: '沙巴体育',
			active: false,
			list: [],
		}
	]
	private editgameSwitch() {
		this.lists = [];
		if (this.types == 1) {
			let siteK = this.siteList[this.siteList.length - 1];
			this.siteKey = siteK;
		} else if (this.types == 2) {
			this.siteKey = this.siteList;
		}
		let data = `{"site_key":"${this.siteKey}"}`;
		this.socket.ws_send(this.socket.WS_URL.editGame, data, (res) => {
			if (res.status == 200) {
				this.lotteryList = res.list;
				this.lotteryList.forEach(element => {
					element.game_list.forEach(el => {
						this.keys = el.game_key.split('_');
						this.menuList.forEach(element => {
							if (this.keys[0] == element.key) {
								element.active = true;
							}
						})
						switch (this.keys[0]) {
							case 'ag':
								this.menuList[0].list.push(el);
								break;
							case 'fg':
								this.menuList[1].list.push(el);
								break;
							case 'ky':
								this.menuList[2].list.push(el);
								break;
							case 'lb':
								this.menuList[3].list.push(el);
								break;
						}
					})
				})
				this.lists.push(this.menuList[this.newnum]);
				this.lists.forEach(ele => {
					ele.list.forEach(element => {
						if (element.acceptable == "0") {
							element.acceptable = false;
							ele.active = false;
						}
					})
				})
			} else {
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
    public	clear() {
		this.router.navigateByUrl("third-game-switch");
	}
	newnum = '0';//当前的下标
	public tab(num) {
		this.newnum = num;
		this.flag = num + 1;
		this.lists = [];
		if (num == 0) {
			this.lists.push(this.menuList[num]);
		}
		if (num == 1) {
			this.lists.push(this.menuList[num]);
		}
		if (num == 2) {
			this.lists.push(this.menuList[num]);
		}
		if (num == 3) {
			this.lists.push(this.menuList[num]);
		}
		this.lists.forEach(element => {
			element.active = true;
			element.list.forEach(el => {
				if (el.acceptable == "0") {
					element.active = false;
					el.acceptable = false;
				}
			})
		})
	}
	//全选
	public singelsel(active, opelist) {
		opelist.list.forEach(element => {
			element.acceptable = active;
		})
	}
	//单选
	public radioswitch(em, act, i) {
		em.list[i].acceptable = act;
		em.active = true;
		em.list.forEach(element => {
			if (element.acceptable == false) {
				em.active = false;
			}
		})
	}
	public getOddAll() {
		this.stock = '正在保存中...';
		this.child.exOuts();
		this.gamelists = [];
		this.lists = [];
		this.menuList.forEach(element => {
			element.list.forEach(el => {
				if (el.acceptable == true) {
					el.acceptable = "1";
				} else if (el.acceptable == false) {
					el.acceptable = "0";
				}
				this.gamelists.push(el);
			})
		})
		this.siteList.forEach(e => {
			this.lists.push(`"${e}"`);
		})
		let data = `{"list":${JSON.stringify(this.lotteryList)},"site_list":[${this.lists}]}`;
		this.socket.ws_send(this.socket.WS_URL.SiteLotterySave, data, (res) => {
			this.stock = res.msg;
			if (res.status == 200) {
				setTimeout(() => {
					this.router.navigateByUrl("third-game-switch");
				}, 1500)
			} else {
				this.menuList[0].list = [];
				this.menuList[1].list = [];
				this.menuList[2].list = [];
				this.menuList[3].list = [];
				this.lotteryList.forEach(element => {
					element.game_list.forEach(el => {
						this.keys = el.game_key.split('_');
						this.menuList.forEach(element => {
							if (this.keys[0] == element.key) {
								element.active = true;
							}
						})
						switch (this.keys[0]) {
							case 'ag':
								this.menuList[0].list.push(el);
								break;
							case 'fg':
								this.menuList[1].list.push(el);
								break;
							case 'ky':
								this.menuList[2].list.push(el);
								break;
							case 'lb':
								this.menuList[3].list.push(el);
								break;
						}
					})
				})
				this.lists = [];
				this.lists.push(this.menuList[this.newnum]);
				this.lists.forEach(ele => {
					ele.list.forEach(element => {
						if (element.acceptable == "0") {
							element.acceptable = false;
							ele.active = false;
						}
					})
				})
			}
			this.child.exOuts();
		})
	}
}