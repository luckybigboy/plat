// Developer：July
// Date:
// Description：第三方游戏开关

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/service/websocket.service';
import { AlertComponent } from 'src/app/page/alert/alert.component';
import { JumpService } from 'src/service/jump.service'
import { SelectallService } from 'src/service/selectall.service';

@Component({
	selector: 'app-third-game-switch',
	templateUrl: './third-game-switch.component.html',
	styleUrls: ['./third-game-switch.component.css']
})
export class ThirdGameSwitchComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	private menukeyArr;
	public selallatate: boolean;
	public staus = false;//数据是否为空；
	public siteName = '';//站点名称
	public loadingDivs = false;
	public perview = false;
	public perupdata = false;
	public gameSwitch;
	private batch = [];//批量的数据
	//批量编辑
	public stock = '';//提示
	constructor( private socket: WebsocketService, private jump: JumpService,private seleacts: SelectallService) {
		this.menukeyArr = socket.menuKey;
	}
	ngOnInit() {
		this.gameList(1);
		this.permission();
	}
	//权限
	private permission() {
		let menukey = this.menukeyArr;
		//查看
		if (menukey.includes('site_external_select')) {
			this.perview = true;
			this.perupdata = false;
		}
		//修改
		if (menukey.includes('site_external_update')) {
			this.perupdata = true;
			this.perview = false;
		}
	}
	public gameList(num) {
		this.staus = false;
		this.loadingDivs = true;
		if (num == 1) {
			let data = `{}`;
			this.socket.ws_send(this.socket.WS_URL.ExternalGame, data, (res) => {
				this.loadingDivs = false;
				if (res.status == 200) {
					this.gameSwitch = res.list;
					this.gameSwitch.forEach(element => {
						element.active = false;
					});
					if (this.gameSwitch.length == 0) {
						this.staus = true;
					}
				} else {
					this.stock = res.msg;
					this.child.exOuts();
				}
			})
		} else if (num == 2) {
			let data = `{"site_name":"${this.siteName.trim()}"}`;
			this.socket.ws_send(this.socket.WS_URL.ExternalGame, data, (res) => {
				this.loadingDivs = true;
				this.stock = res.msg;
				if (res.status == 200) {
					this.gameSwitch = res.list;
					if (this.gameSwitch.length == 0) {
						this.staus = true;
					}
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
		this.jump.jumpPage('/edit-third-game-switch', this.batch, (res) => {
			if (res.pass == false) {
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
}