// Developer：July
// Date:
// Description：月结对账报表

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from '../../../service/websocket.service';
import { AlertComponent } from 'src/app/page/alert/alert.component';

@Component({
	selector: 'app-monthly-settlement-report',
	templateUrl: './monthly-settlement-report.component.html',
	styleUrls: ['./monthly-settlement-report.component.css']
})
export class MonthlySettlementReportComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public flag = true;//添加类名
	public sitelist;//站点列表
	private lists;//报表列表
	private betlist = [];//投注列表
	private bonuslist = [];//派彩
	private profitlist = [];//损益
	private taxlist = [];
	public rent;//服务费
	public total;//应收金额
	public stock = '';//提示
	public years = '';
	public month = '';
	//投注总额
	public betlottery = 0;
	public betvideo = 0;
	public betgames = 0;
	public betsports = 0;
	public betcards = 0;
	//派彩总额
	public bonuslottery = 0;
	public bonusvideo = 0;
	public bonusgames = 0;
	public bonussports = 0;
	public bonuscards = 0;
	//损益
	public profitlottery = 0;
	public profitvideo = 0;
	public profitgames = 0;
	public profitsports = 0;
	public profitcards = 0;
	//提成
	public taxlottery = 0;
	public taxvideo = 0;
	public taxgames = 0;
	public taxsports = 0;
	public taxcards = 0;
	public loadingDivs = false;
	public datelist = [];
	private sitekeys = '';//站点切换
	constructor(private socket: WebsocketService) { }
	ngOnInit() {
		this.getMon();
		this.mothly();
	}
	private getMon() {
		let mydate = new Date();
		let yy = mydate.getFullYear();
		let mm = mydate.getMonth() + 1;
		this.years = yy + '年' + Number(mm) + '月';
		var d;
		for (let i = mm; i > 0; i--) {
			if (mm < 10) {
				d = yy + '-0' + mm;
			} else {
				d = yy + '-' + mm;
			}
			this.datelist.push(d);
			mm--;
			if (mm == 0) {
				yy = yy - 1;
				mm = 12;
				for (let j = mm; j > 0; j--) {
					if (mm < 10) {
						d = yy + '-0' + mm;
					} else {
						d = yy + '-' + mm;
					}
					this.datelist.push(d);
					mm--;
				}
			}
		}
		this.datelist = this.datelist.slice(0, 12);
	}
	private report() {
		this.betlist = [];
		this.bonuslist = [];
		this.profitlist = [];
		this.taxlist = [];
		this.loadingDivs = true;
		let data = `{"site_key":"${this.sitekeys}","date":"${this.month}"}`;
		this.socket.ws_send(this.socket.WS_URL.site_bill, data, (evt) => {
			this.loadingDivs = false;
			if (evt.status == 200) {
				this.lists = evt.list;
				this.rent = evt.rent;
				this.total = evt.total;
				this.betlist.push(this.lists.bet);
				this.betlist.forEach(element => {
					this.betlottery = element.lottery;
					this.betvideo = element.video;
					this.betgames = element.game;
					this.betsports = element.sports;
					this.betcards = element.cards;
				});
				this.bonuslist.push(this.lists.bonus);
				this.bonuslist.forEach(element => {
					this.bonuslottery = element.lottery;
					this.bonusvideo = element.video;
					this.bonusgames = element.game;
					this.bonussports = element.sports;
					this.bonuscards = element.cards;
				});
				this.profitlist.push(this.lists.profit);
				this.profitlist.forEach(element => {
					this.profitlottery = element.lottery;
					this.profitvideo = element.video;
					this.profitgames = element.game;
					this.profitsports = element.sports;
					this.profitcards = element.cards;
				})
				this.taxlist.push(this.lists.tax);
				this.taxlist.forEach(element => {
					this.taxlottery = element.lottery;
					this.taxvideo = element.video;
					this.taxgames = element.game;
					this.taxsports = element.sports;
					this.taxcards = element.cards;
				})
			}
			this.stock = evt.msg;
			this.child.exOuts();
		})
	}
	public tab(index, key) {
		this.flag = index + 1;
		this.sitekeys = key;
		this.betlist = [];
		this.bonuslist = [];
		this.profitlist = [];
		this.taxlist = [];
		this.month = '';
		this.report();
		let mydate = new Date();
		let yy = mydate.getFullYear();
		let mm = mydate.getMonth() + 1;
		this.years = yy + '年' + Number(mm) + '月';
	}
	//结算日期
	public databtn() {
		this.report();
		this.years = this.month;
	}
	private mothly() {
		let data = `{"site_key":"","date": ""}`;
		this.socket.ws_send(this.socket.WS_URL.sitelist + "?" + 'v3', data, (res) => {
			if (res.status == 200) {
				this.sitelist = res.site_list;
				this.sitekeys = this.sitelist[0].site_key;
				this.report();
			}
		})
	}
}