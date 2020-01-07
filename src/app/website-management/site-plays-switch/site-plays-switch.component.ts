// Developer：July
// Date:
// Description：站点彩票玩法开关

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/service/websocket.service';
import { AlertComponent } from 'src/app/page/alert/alert.component';
import { JumpService } from 'src/service/jump.service';
import { SelectallService } from 'src/service/selectall.service';

@Component({
	selector: 'app-site-plays-switch',
	templateUrl: './site-plays-switch.component.html',
	styleUrls: ['./site-plays-switch.component.css']
})
export class SitePlaysSwitchComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public siteName = '';
	public selallatate: boolean;
	public playSwitch;//数据列表
	public staus = false;
	public stock = "";
	private menukeyArr;
	public loadingDivs = false;
	//权限
	public perview = false;
	public perupdata = false;
	private batch = [];//批量的数据
	constructor(private socket: WebsocketService, private jump: JumpService,private seleacts: SelectallService) {
		this.menukeyArr = socket.menuKey;
	}
	ngOnInit() {
		this.playList(1);
		this.permission();
	}
	//权限
	private permission() {
		let menukey = this.menukeyArr;
		//查看
		if (menukey.includes('site_play_select')) {
			this.perview = true;
			this.perupdata = false;
		}
		//修改
		if (menukey.includes('site_play_update')) {
			this.perupdata = true;
			this.perview = false;
		}
	}
	public playList(num) {
		this.staus = false;
		this.loadingDivs = true;
		if (num == 1) {
			let data = `{}`;
			this.socket.ws_send(this.socket.WS_URL.siteplay_list, data, (res) => {
				this.loadingDivs = false;
				if (res.status == 200) {
					this.playSwitch = res.list;
					this.playSwitch.forEach(element => {
						element.active = false;
					});
					if (this.playSwitch.length == 0) {
						this.staus = true;
					}
				} else {
					this.stock = res.msg;
					this.child.exOuts();
				}
			})
		} else if (num == 2) {
			let data = `{"site_name":"${this.siteName.trim()}"}`;
			this.socket.ws_send(this.socket.WS_URL.siteplay_list, data, (res) => {
				this.loadingDivs = false;
				if (res.status == 200) {
					this.stock = "搜索成功";
					this.playSwitch = res.list;
					if (this.playSwitch.length == 0) {
						this.staus = true;
					}
				} else {
					this.stock = res.msg;
				}
				this.child.exOuts();
			})
		}
	}
	//全选
	public selall(active, opelist) {
		this.seleacts.selall(active, opelist, (res) => {
			this.batch = res.batchSet;
			this.selallatate = res.seallatate;
		})
	}
	//单选
	public singelsel(str, i, opelist) {
		this.seleacts.singelsel(str, i, opelist, (res) => {
			this.batch = res.batchSet;
			this.selallatate = res.singelsel;
		})
	}
	public editBatch() {
		this.jump.jumpPage('/edit-site-play-switch', this.batch, (res) => {
			if (res.pass == false) {
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
}