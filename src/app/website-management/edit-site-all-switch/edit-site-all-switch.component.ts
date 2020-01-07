// Developer：July
// Date:
// Description：修改站点总开关-详情

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/service/websocket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertComponent } from 'src/app/page/alert/alert.component';

@Component({
	selector: 'app-edit-site-all-switch',
	templateUrl: './edit-site-all-switch.component.html',
	styleUrls: ['./edit-site-all-switch.component.css']
})
export class EditSiteAllSwitchComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public gameName = '';//是否批量
	public siteName = '';
	public statusList;
	private siteList = [];
	public types;
	private menukeyArr;
	public stock;//传给弹框的值
	private lists = [];
	private siteKey;
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
			);
			this.routerinfo.queryParams.subscribe(
				params => {
					this.siteName = params['sitename'];
				}
			);
			this.gameName = "批量";
		} else if (this.types == 2) {
			this.siteList=[];
			let sitekey = this.routerinfo.snapshot.queryParams["id"];
			this.siteList.push(sitekey);
			this.siteName = this.routerinfo.snapshot.queryParams["name"];
		}
		this.editSiteSwitch();
		this.permission();
	}
	//权限
	private permission() {
		let menukey = this.menukeyArr;
		//修改
		if (menukey) {
			if (!menukey.includes('site_status_update')) {
				this.dis = true;
				this.updatabtn = false;
			}
		}
	}
	private editSiteSwitch() {
		if (this.types == 1) {
			let siteK = this.siteList[this.siteList.length - 1];
			this.siteKey = siteK;
		} else if (this.types == 2) {
			this.siteKey = this.siteList;
		}
		let data = `{"site_key":"${this.siteKey}"}`;
		this.socket.ws_send(this.socket.WS_URL.site_edit, data, (res) => {
			if (res.status == 200) {
				this.statusList = res.data.status;
			} else {
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
	public clear() {
		this.router.navigateByUrl("site-all-switch");
	}
	public getOddAll() {
		this.stock = '正在保存中...';
		this.child.exOuts();
		this.lists = []
		this.siteList.forEach(e => {
			this.lists.push(`"${e}"`);
		})
		let data = `{"site_list":[${this.lists}],"status":${this.statusList}}`;
		this.socket.ws_send(this.socket.WS_URL.site_save, data, (res) => {
			this.stock = res.msg;
			if (res.status == 200) {
				setTimeout(() => {
					this.router.navigateByUrl("site-all-switch");
				}, 1500)
			}
			this.child.exOuts();
		})
	}
}