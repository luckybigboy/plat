// Developer：July
// Date:
// Description：站点彩票开关

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/service/websocket.service';
import { AlertComponent } from 'src/app/page/alert/alert.component';
import { JumpService } from 'src/service/jump.service';
import { SelectallService } from 'src/service/selectall.service';

@Component({
	selector: 'app-site-lottory-switch',
	templateUrl: './site-lottory-switch.component.html',
	styleUrls: ['./site-lottory-switch.component.css']
})
export class SiteLottorySwitchComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public lotterySwitch;//列表
	public staus = false;
	public siteName = '';//站点名称
	public selallatate: boolean;
	public stock = "";
	//权限
	private menukeyArr;
	public perview = false;
	public perupdata = false;
	public loadingDivs=false;
	private batch = [];//批量的数据
	constructor(private socket: WebsocketService, private jump:JumpService,private seleacts: SelectallService) {
		this.menukeyArr = socket.menuKey;
	}
	ngOnInit() {
		this.lottoryList(1);
		this.permission();
	}
	//权限
	private permission() {
		let menukey = this.menukeyArr;
		//查看
		if (menukey.includes('site_lottery_select')) {
			this.perview = true;
			this.perupdata = false;
		}
		//修改
		if (menukey.includes('site_lottery_update')) {
			this.perupdata = true;
			this.perview = false;
		}
	}
	public lottoryList(num) {
		this.staus = false;
		this.loadingDivs=true;
		if (num == 1) {
			let data = `{}`;
			this.socket.ws_send(this.socket.WS_URL.sitelottery_list, data, (res) => {
				this.loadingDivs=false;
				if (res.status == 200) {
					this.lotterySwitch = res.list;
					this.lotterySwitch.forEach(element => {
						element.active = false;
					})
					if (this.lotterySwitch.length == 0) {
						this.staus = true;
					}
				}else{
					this.stock=res.msg;
					this.child.exOuts();
				}
			})
		} else if (num == 2) {
			let data = `{"site_name":"${this.siteName.trim()}"}`;
			this.socket.ws_send(this.socket.WS_URL.sitelottery_list, data, (res) => {
				this.loadingDivs=false;
				if (res.status == 200) {
					this.lotterySwitch = res.list;
					if (this.lotterySwitch.length == 0) {
						this.staus = true;
					}
				}
				this.stock = res.msg;
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
			this.selallatate = res.singelsel
		})
	}
	public editBatch() {
		this.jump.jumpPage('/edit-site-lottory-switch',this.batch,(res)=>{
			if (res.pass==false) {
				this.stock = res.msg;
				this.child.exOuts();	
			}
		})
	}
}