// Developer：July
// Date:
// Description：站点总开关

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/service/websocket.service';
import { AlertComponent } from 'src/app/page/alert/alert.component';
import { JumpService } from 'src/service/jump.service';
import { SelectallService } from 'src/service/selectall.service';

@Component({
	selector: 'app-site-all-switch',
	templateUrl: './site-all-switch.component.html',
	styleUrls: ['./site-all-switch.component.css']
})
export class SiteAllSwitchComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public siteSwitch;
	public staus = false;
	public siteName = '';
	public syline = '';
	public selallatate: boolean;
	public stock = "";
	private menukeyArr;
	public loadingDivs = false;
	public perview = false;
	public perupdata = false;
	private batch = [];//批量的数据
	constructor(private socket: WebsocketService, private jump: JumpService, private seleacts: SelectallService) {
		this.menukeyArr = socket.menuKey;
	}
	ngOnInit() {
		this.siteList(1);
		this.permission();
	}
	//权限
	private permission() {
		let menukey = this.menukeyArr;
		//查看
		if (menukey.includes('site_status_select')) {
			this.perview = true;
			this.perupdata = false;
		}
		//修改
		if (menukey.includes('site_status_update')) {
			this.perupdata = true;
			this.perview = false;
		}
	}
	public siteList(num) {
		this.staus = false;
		this.loadingDivs = true;
		if (num == 1) {
			let data = `{}`;
			this.socket.ws_send(this.socket.WS_URL.site_all, data, (res) => {
				this.loadingDivs = false;
				if (res.status == 200) {
					this.siteSwitch = res.list;
					this.siteSwitch.forEach(element => {
						element.active = false;
					})
					if (this.siteSwitch.length == 0) {
						this.staus = true;
					}
				}
			})
		} else if (num == 2) {
			let data = `{"site_name":"${this.siteName.trim()}","status":"${this.syline}"}`;
			this.socket.ws_send(this.socket.WS_URL.site_all, data, (res) => {
				this.loadingDivs = false;
				if (res.status == 200) {
					this.stock = res.msg;
					this.child.exOuts();
					this.siteSwitch = res.list;
					if (this.siteSwitch.length == 0) {
						this.staus = true;
					}
				}
			})
		}
	}
	//全选
	public selall(active, opelist) {
		this.seleacts.selall(active, opelist, (res) => {
			this.batch = res.batchSet;
			this.selallatate = res.seallatate
		})
	}
	//单选
	public singelsel(str, i, opelist) {
		this.seleacts.singelsel(str, i, opelist, (res) => {
			this.batch = res.batchSet;
			this.selallatate = res.singelsel
		})
	}
	//批量按钮的切换
	public editBatch() {
		this.jump.jumpPage('/edit-site-all-switch', this.batch, (res) => {
			if (res.pass == false) {
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
}
