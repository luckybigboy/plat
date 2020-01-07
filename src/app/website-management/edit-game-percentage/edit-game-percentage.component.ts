// Developer：July
// Date:
// Description：修改站点游戏提成比例

import { Component, OnInit, ViewChild } from "@angular/core";
import { WebsocketService } from "../../../service/websocket.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertComponent } from "src/app/page/alert/alert.component";

@Component({
	selector: "app-edit-game-percentage",
	templateUrl: "./edit-game-percentage.component.html",
	styleUrls: ["./edit-game-percentage.component.css"]
})
export class EditGamePercentageComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public rent; //比例列表
	public siteName = [];
	private rangeNum = [];//彩票损益范围
	public service = '';//服务的数据
	public types;//判断是否批量
	private siteList = [];//站点站点
	private menukeyArr;
	public loadingDivs=false;
	public Model_keys = [];//model_key的列表；
	private	siteKey;//获得列表的kay
	public stock = '';
	public dis = false;
	public updatabtn = true;
	public dis_max = true;
	constructor(
		public socket: WebsocketService,
		private routerinfo: ActivatedRoute,
		private router: Router
	) {
		this.menukeyArr = socket.menuKey;
	}
	ngOnInit() {
		this.routerinfo.queryParams.subscribe(
			params => {
				this.types = params['type'];
			}
		)
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
		this.defau();
		this.permission();
	}
	//权限
	private permission() {
		let menukey = this.menukeyArr;
		if (menukey) {
			//修改
			if (!menukey.includes('site_tax_update')) {
				this.dis = true;
				this.updatabtn = false;
			}	
		}
	}
	public clear() {
		this.router.navigateByUrl("game-percentage");
	}
	public service_text(event) {
		let val = event.target.value;
		if (val>0) {
			if (val > 9999999999.99) {
				this.stock = '最大为9999999999.99且小数点只保留两位';
				this.child.exOuts();
				if (val.split('.')[1]) {
					val=String(val.split('.')[0].slice(0,9))+'.'+String(val.split('.')[1]);
				} else {
					val=String(val.slice(0,9));
				}
				event.target.value= val;
			} else if (val < 0) {
				this.stock = '金额请输入值大于0';
				this.child.exOuts();
				val='';
			}	
		}
	}
	public rangmax(event) {
		let val = event.target.value;
			if (val > 10000000000) {
				this.stock = '最大为9999999999.99且小数点只保留两位';
				this.child.exOuts();
				this.dis_max = false;
			} else {
				this.dis_max = true;
			}
	}
	public taxrate(event) {
		let val = event.target.value;
		if (val > 100) {
			this.stock = '最大值100且只保留小数点两位';
			this.child.exOuts();
			val = 100;
		}
		event.target.value=val;
	}
	public defau() {
		this.loadingDivs=true;
		if (this.types == 1) {
			let siteK = this.siteList[this.siteList.length - 1];
			this.siteKey = siteK;
		} else if (this.types == 2) {
			this.siteKey = this.siteList;
		}
		let data = `{"site_key":"${this.siteKey}"}`;
		this.socket.ws_send(this.socket.WS_URL.CommissionList, data, res => {
			this.loadingDivs=false;
			if (res.status == 200) {
				this.rent = res.list;
				this.service = res.rent;
				this.Model_keys = Object.keys(this.rent);
			}else{
				this.stock = res.msg;
			    this.child.exOuts();
			}
		})
	}
	public addinput(list) {
		var number = this.rangeNum.length + 1;
		list.push({ "range_max": "" + number, "tax_rate": "" + number });
	}
	public sure() {
		if (this.dis_max) {
			this.stock = '正在保存中...';
			this.child.exOuts();
			let site = [];
			this.siteList.forEach(ele => {
				site.push('"' + ele + '"');
			})
			this.service=$('input[name="serve"]').val();
			let tec_list = JSON.stringify(this.rent);
			let data = `{"site_list":[${site}],"rent":"${
				this.service
				}","tax_list":${tec_list}}`;
			this.socket.ws_send(this.socket.WS_URL.CommissionSave, data, res => {
				this.stock = res.msg;
				if (res.status == 200) {
					setTimeout(() => {
						this.router.navigateByUrl("game-percentage");
					}, 1500)
					this.defau();
				}
				this.child.exOuts();
			})
		} else {
			this.stock = '最大为9999999999.99且小数点只保留两位';
			this.child.exOuts();
		}
	}
}