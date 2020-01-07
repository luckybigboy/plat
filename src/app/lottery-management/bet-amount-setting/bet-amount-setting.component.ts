// Developer：July
// Date:
// Description：彩票投注额设置

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from './../../../service/websocket.service';
import { AlertComponent } from 'src/app/page/alert/alert.component';
import { JumpService } from 'src/service/jump.service';
import { SelectallService } from './../../../service/selectall.service';

@Component({
	selector: 'app-bet-amount-setting',
	templateUrl: './bet-amount-setting.component.html',
	styleUrls: ['./bet-amount-setting.component.css']
})
export class BetAmountSettingComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public betList;//投注额列
	public systemLine = '';
	public siteName = '';
	public staus = false;
	public selallatate: boolean;
	public stock = "";
	private menukeyArr;//权限列表
	public loadingDivs = false;
	//批量按钮的切换
	private batch = [];//批量的数据
	public perview = false;
	public perupdata = false;
	constructor(private socket: WebsocketService, private jump: JumpService, public seleacts: SelectallService) {
		this.menukeyArr = socket.menuKey;
	}
	ngOnInit() {
		this.betlist(1);
		this.permission();
	}
	private permission() {
		let menukey = this.menukeyArr;
		if (menukey) {
			//查看
			if (menukey.includes('lottery_bet_select')) {
				this.perview = true;
				this.perupdata = false;
			}
			//修改
			if (menukey.includes('lottery_bet_update')) {
				this.perupdata = true;
				this.perview = false;
			}
		}
	}
	public betlist(num) {
		this.staus = false;
		this.loadingDivs = true;
		if (num == 1) {
			let data = `{}`
			this.socket.ws_send(this.socket.WS_URL.bet_setting, data, (evt) => {
				this.loadingDivs = false;
				if (evt.status == 200) {
					this.betList = evt.list;
					this.betList.forEach(element => {
						element.active = false;
					});
					if (this.betList.length == 0) {
						this.staus = true;
					}
				}
			})
		} else if (num == 2) {
			let data = `{"site_name":"${this.siteName.trim()}","status":"${this.systemLine}"}`;
			this.socket.ws_send(this.socket.WS_URL.bet_setting, data, (evt) => {
				this.loadingDivs = false;
				if (evt.status == 200) {
					this.betList = evt.list;
					if (this.betList.length == 0) {
						this.staus = true;
					}
				}
				this.stock = evt.msg;
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
	//批量
	public editBatch() {
		this.jump.jumpPage('/bet-edit', this.batch, (res) => {
			if (res.pass == false) {
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
}