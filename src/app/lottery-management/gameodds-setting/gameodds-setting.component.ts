// Developer：July
// Date:
// Description：彩票赔率设置

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from './../../../service/websocket.service';
import { AlertComponent } from 'src/app/page/alert/alert.component';
import { JumpService } from 'src/service/jump.service';
import { SelectallService } from 'src/service/selectall.service';

@Component({
	selector: 'app-gameodds-setting',
	templateUrl: './gameodds-setting.component.html',
	styleUrls: ['./gameodds-setting.component.css']
})
export class GameoddsSettingComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public oddsSetting;//赔率设置
	public siteName = '';//站点名称
	public systemLine = '';//体系线
	public staus = false;
	public stock = "";
	public selallatate: boolean;
	private menukeyArr;
	public loadingDivs = false;
	public perview = false;
	public perupdata = false;
	private batch = [];//批量的数据
	constructor(private socket: WebsocketService, private jump: JumpService, private seleacts: SelectallService) {
		this.menukeyArr = socket.menuKey;
	}
	ngOnInit() {
		this.loadGames(1);
		this.permission();
	}
	//权限
	private permission() {
		let menukey = this.menukeyArr;
		//查看
		if (menukey) {
			if (menukey.includes('lottery_win_select')) {
				this.perview = true;
				this.perupdata = false;
			}
			//修改
			if (menukey.includes('lottery_win_update')) {
				this.perupdata = true;
				this.perview = false;
			}
		}
	}
	//玩法赔率设置的列表
	public loadGames(num) {
		this.staus = false;
		this.loadingDivs = true;
		if (num == 1) {
			let data = `{"status":"1","site_name"：""}`;
			this.socket.ws_send(this.socket.WS_URL.playsrate_setting, data, (evt) => {
				this.loadingDivs = false;
				if (evt.status == 200) {
					this.oddsSetting = evt.list;
					this.oddsSetting.forEach(element => {
						element.active = false;
					})
				}
			})
		} else if (num == 2) {
			let data = `{"status":"${this.systemLine}","site_name":"${this.siteName.trim()}"}`;
			this.socket.ws_send(this.socket.WS_URL.playsrate_setting, data, (evt) => {
				this.loadingDivs = false;
				this.stock = evt.msg;
				this.child.exOuts();
				if (evt.status == 200) {
					this.oddsSetting = evt.list;
					if (this.oddsSetting.length == 0) {
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
	//批量按钮的切换
	public editBatch() {
		this.jump.jumpPage('/odd-edit', this.batch, (res) => {
			if (res.pass == false) {
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
}