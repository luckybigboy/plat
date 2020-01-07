// Developer：July
// Date:
// Description：站点游戏提成比例

import { Component, OnInit, ViewChild } from "@angular/core";
import { WebsocketService } from "../../../service/websocket.service";
import { Router } from '@angular/router';
import { AlertComponent } from "src/app/page/alert/alert.component";
import { JumpService } from "src/service/jump.service";
import { SelectallService } from "src/service/selectall.service";

@Component({
	selector: "app-game-percentage",
	templateUrl: "./game-percentage.component.html",
	styleUrls: ["./game-percentage.component.css"]
})
export class GamePercentageComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public staus = false; //是否有数据
	public sitename = ""; //站点名称
	public ratelist = [];
	public stock = "";
	private menukeyArr;
	public loadingDivs = false;
	private batch = [];//批量的数据
	public selallatate: boolean;
	//权限
	public perview = false;
	public perupdata = false;
	constructor(private ws: WebsocketService, public router: Router, private jump: JumpService, private seleacts: SelectallService) {
		this.menukeyArr = ws.menuKey;
	}
	ngOnInit() {
		this.research(1);
		this.permission();
	}
	//权限
	private permission() {
		let menukey = this.menukeyArr;
		//查看
		if (menukey.includes('site_tax_select')) {
			this.perview = true;
			this.perupdata = false;
		}
		//修改
		if (menukey.includes('site_tax_update')) {
			this.perupdata = true;
			this.perview = false;
		}
	}
	//搜索
	public research(num) {
		this.staus = false;
		this.loadingDivs = true;
		if (num == 1) {
			let data = `{"site_name":"${this.sitename}"}`;
			this.ws.ws_send(this.ws.WS_URL.CommissionSite, data, res => {
				this.loadingDivs = false;
				if (res.status == 200) {
					this.ratelist = res.list;
					this.ratelist.forEach(element => {
						element.active = false;
					});
					if (this.ratelist.length == 0) {
						this.staus = true;
					}
				} else {
					this.stock = res.msg;
					this.child.exOuts();
				}
			});
		} else if (num == 2) {
			let data = `{"site_name":"${this.sitename.trim()}"}`;
			this.ws.ws_send(this.ws.WS_URL.CommissionSite, data, res => {
				this.loadingDivs = false;
				this.stock = res.msg;
				if (res.status == 200) {
					this.ratelist = res.list;
					this.ratelist.forEach(element => {
						element.active = false;
					});
					if (this.ratelist.length == 0) {
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
	public alledit() {
		this.jump.jumpPage('/edit-game-percentage', this.batch, (res) => {
			if (res.pass == false) {
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
}