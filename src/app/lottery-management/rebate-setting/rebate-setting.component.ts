// Developer：July
// Date:
// Description：彩票返点设置

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from './../../../service/websocket.service';
import { AlertComponent } from 'src/app/page/alert/alert.component';
import { JumpService } from 'src/service/jump.service';
import { SelectallService } from 'src/service/selectall.service';

@Component({
	selector: 'app-rebate-setting',
	templateUrl: './rebate-setting.component.html',
	styleUrls: ['./rebate-setting.component.css']
})
export class RebateSettingComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public rebateList;//列表
	public systemLine = '';
	public siteName = '';
	public staus = false;
    public selallatate: boolean;
    public stock = "";
	private menukeyArr;
	public loadingDivs = false;
	public perview = false;
	public	perupdata = false;
	private batch = [];//批量的数据
	constructor(private socket: WebsocketService, private jump:JumpService, private seleacts: SelectallService) {
		this.menukeyArr = socket.menuKey;
	}
	ngOnInit() {
		this.rebatelist(1);
		this.permission();
	}
	//权限
    private	permission() {
		let menukey = this.menukeyArr;
		if (menukey) {
			//查看
			if (menukey.includes('lottery_rebate_select')) {
				this.perview = true;
				this.perupdata = false;
			}
			//修改
			if (menukey.includes('lottery_rebate_update')) {
				this.perupdata = true;
				this.perview = false;
			}
		}
	}
	//彩票返点设置的列表
	public rebatelist(num) {
		this.staus = false;
		this.loadingDivs = true;
		if (num == 1) {
			let data = `{}`;
			this.socket.ws_send(this.socket.WS_URL.rebate_setting, data, (evt) => {
				this.loadingDivs = false;
				if (evt.status == 200) {
					this.rebateList = evt.list;
					this.rebateList.forEach(element => {
						element.active= false;
					});
					if (this.rebateList.length == 0) {
						this.staus = true;
					}
				} else {
					this.stock = evt.msg;
					this.child.exOuts();
				}
			})
		} else if (num == 2) {
			let data = `{"site_name":"${this.siteName.trim()}","status":"${this.systemLine}"}`;
			this.socket.ws_send(this.socket.WS_URL.rebate_setting, data, (evt) => {
				this.loadingDivs = false;
				if (evt.status == 200) {
					this.rebateList = evt.list;
					if (this.rebateList.length == 0) {
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
	//批量按钮的切换
	public editBatch() {
		this.jump.jumpPage('/rabate-edit',this.batch,(res)=>{
			if (res.pass==false) {
				this.stock = res.msg;
				this.child.exOuts();	
			}
		})
	}
}