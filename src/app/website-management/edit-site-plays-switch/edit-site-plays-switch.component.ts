// Developer：July
// Date:
// Description：修改彩票玩法开关-详情

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/service/websocket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from 'src/app/page/alert/alert.component';

@Component({
	selector: 'app-edit-site-plays-switch',
	templateUrl: './edit-site-plays-switch.component.html',
	styleUrls: ['./edit-site-plays-switch.component.css']
})
export class EditSitePlaysSwitchComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	private menukeyArr;
	private siteList = [];//站点站点
	public types;//类型
	public siteName;//站点的名字
	private siteKey;//获取站点的key
	private playList;
	public falg = true;
	public Model_keys = [];
	private model_key;//默认的model_key
	public game_list;//彩种列表
	public play_lists = [];//玩法列表
	public game_keys = [];
	private game_key;
	public allbut = false;//全选
	public obj = Object.keys;
	public loadingDivs = false;
	private lists = [];
	public stock;//弹出框传值
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
		);
		if (this.types == 1) {
			this.routerinfo.queryParams.subscribe(
				params => {
					this.siteList = params['sitekey'];
				}
			)
			this.routerinfo.queryParams.subscribe(
				params => {
					this.siteName = params['sitename'];
				}
			)
		} else if (this.types == 2) {
			let sitekey = [];
			this.siteList = [];
			sitekey = this.routerinfo.snapshot.queryParams["id"];
			this.siteList.push(sitekey);
			this.siteName = this.routerinfo.snapshot.queryParams["name"];
		}
		this.editplaySwitch();
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
	public clear() {
		this.router.navigateByUrl("site-play-switch");
	}
	private editplaySwitch() {
		this.loadingDivs = true;
		if (this.types == 1) {
			let siteK = this.siteList[this.siteList.length - 1];
			this.siteKey = siteK;
		} else if (this.types == 2) {
			this.siteKey = this.siteList;
		}
		let data = `{"site_key":"${this.siteKey}"}`;
		this.socket.ws_send(this.socket.WS_URL.editsiteplay_list, data, (res) => {
			this.loadingDivs = false;
			if (res.status == 200) {
				this.playList = res.data;
				this.allbut = true;
				this.Model_keys = Object.keys(this.playList);
				this.model_key = this.Model_keys[0];
				this.game_list = this.playList[this.model_key];
				this.game_keys = Object.keys(this.game_list);
				this.game_key = this.game_keys[0];
				this.play_lists = this.game_list[this.game_key].play_list;
				this.game_keys.forEach(ele => {
					this.game_list[ele].isOff = true;
					this.game_list[ele].play_list.forEach(el => {
						el.active = true;
						if (el.acceptable == false) {
							this.game_list[ele].isOff = false;
							if (this.game_list[ele].isOff == false) {
								this.allbut = false;
								el.active = false;
							}
						}
					})
				})
			} else {
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
	public modelbtn(index) {
		this.falg = index + 1
		this.allbut = true;
		this.model_key = this.Model_keys[index];
		this.game_list = this.playList[this.model_key];
		this.game_keys = Object.keys(this.game_list);
		this.game_key = this.game_keys[0];
		this.play_lists = this.game_list[this.game_key].play_list;
		this.game_keys.forEach(ele => {
			this.game_list[ele].isOff = true;
			this.game_list[ele].play_list.forEach(el => {
				el.active = true;
				if (el.acceptable == false) {
					this.game_list[ele].isOff = false;
					if (this.game_list[ele].isOff == false) {
						this.allbut = false;
						this.play_lists.forEach(plays => {
							if (plays.play_key == el.play_key) {
								plays.active = false;
							}
						})
					}
				}
			})
		})
	}
	//全选
	public selall(active, opelist) {
		opelist.forEach(ele => {
			this.game_list[ele].isOff = active;
			this.game_list[ele].play_list.forEach(el => {
				el.acceptable = active;
				el.active = active;
			})
		})
	}
	//单个彩种全选
	public singelsel(str, em, opelist) {
		this.game_list[em].play_list.forEach(el => {
			el.acceptable = str;
			this.game_list[em].isOff = str;
			this.game_list[em].play_list.forEach(element => {
				this.play_lists.forEach(ele => {
					if (element.play_key == ele.play_key) {
						if (element.acceptable == true) {
							ele.active = true;
						}
					}
				})
			})
		})
		this.allbut = true;
		opelist.forEach(ele => {
			this.game_list[ele].isOff = true;
			this.game_list[ele].play_list.forEach(el => {
				el.active = true;
				if (el.acceptable == false) {
					this.game_list[ele].isOff = false;
					if (this.game_list[ele].isOff == false) {
						this.allbut = false;
						this.play_lists.forEach(plays => {
							if (plays.play_key == el.play_key) {
								plays.active = false;
							}
						})
					}
				}
			})
		})
		if (this.allbut == true) {
			this.play_lists.forEach(plays => {
				plays.active = true;
			})
		}
	}
	//单个玩法
	public radioswitch(em, act, i, opelist) {
		this.game_list[em].play_list[i].acceptable = act;
		this.game_list[em].isOff = true;
		this.game_list[em].play_list.forEach(el => {
			if (el.acceptable == false) {
				this.game_list[em].isOff = false;
			}
		})
		this.allbut = true;
		opelist.forEach(element => {
			if (this.game_list[element].isOff == false) {
				this.allbut = false;
			}
		})
		this.play_lists[i].active = true;
		Object.keys(this.game_list).forEach(ele => {
			if (this.game_list[ele].play_list[i].acceptable == false) {
				this.play_lists[i].active = false;
			}
		})
	}
	//当前的
	public playall(act, index) {
		this.play_lists[index].active = act;
		this.game_keys.forEach(ele => {
			this.game_list[ele].play_list[index].acceptable = act;
			this.allbut = true;
			if (this.play_lists[index].active == false) {
				this.game_list[ele].play_list[index].acceptable = false;
			}
		})
		this.game_keys.forEach(element => {
			this.game_list[element].isOff = true;
			this.game_list[element].play_list.forEach(el => {
				if (el.acceptable == false) {
					this.game_list[element].isOff = false;
					this.allbut = false;
				}
			})
		})
	}
	public getPlayAll() {
		this.stock = '正在保存中...';
		this.child.exOuts();
		this.lists = [];
		this.siteList.forEach(e => {
			this.lists.push(`"${e}"`);
		})
		let play = JSON.stringify(this.playList);
		let data = `{"data":${play},"site_list":[${this.lists}]}`;
		this.socket.ws_send(this.socket.WS_URL.siteplaysave, data, (res) => {
			this.stock = res.msg;
			if (res.status == 200) {
				setTimeout(() => {
					this.router.navigateByUrl("site-play-switch");
				}, 1000)
			} else {
				this.game_keys.forEach(ele => {
					this.game_list[ele].isOff = true;
					this.game_list[ele].play_list.forEach(el => {
						el.active = true;
						if (el.acceptable == false) {
							this.game_list[ele].isOff = false;
							if (this.game_list[ele].isOff == false) {
								this.allbut = false;
								el.active = false;
							}
						}
					})
				})
			}
			this.child.exOuts();
		})
	}
}