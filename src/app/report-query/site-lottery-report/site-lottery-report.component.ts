// Developer：July
// Date:
// Description：站点彩票报表

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from './../../../service/websocket.service';
import { AlertComponent } from 'src/app/page/alert/alert.component';

@Component({
	selector: 'app-site-lottery-report',
	templateUrl: './site-lottery-report.component.html',
	styleUrls: ['./site-lottery-report.component.css']
})
export class SiteLotteryReportComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public flag1 = true;//添加类名
	public timestate = true;
	public timestate1 = false;
	public timestate2 = false;
	public timestate3 = false;
	public timestate4 = false;
	public timestate5 = false;
	public siteList;//站点列表
	public lotteryList;//彩票列表
	private datalist = [];//今天投注派彩列表
	public gamekeys = [];
	public  login_btn = true;
	private sites = '';
	public stock;
	public betAmount = 0;
	public bonusAmount = 0;
	public betCount = 0;
	public profitAmount = 0;
	private preindex = null;
	public tit;
	private datas = '';
	constructor(private socket: WebsocketService) { }
	ngOnInit() {
		this.report();
	}
	private report() {
		this.datalist = [];
		let data = `{"site_key":"","date": ""}`;
		this.socket.ws_send(this.socket.WS_URL.sitelist + "?" + 'v1', data, (res) => {
			this.login_btn = false;
			if (res.status == 200) {
				this.siteList = res.site_list;
				this.sites = this.siteList[0].site_key;
				this.load();
			}
		})
	}
	private load() {
		let datas = `{"site_key":"${this.sites}","date": ""}`;
		this.socket.ws_send(this.socket.WS_URL.site_report, datas, (res) => {
			if (res.status == 200) {
				this.datalist.push(res.today);
				this.datalist.forEach(element => {
					this.betAmount = element.bet_amount;
					this.bonusAmount = element.bonus_amount;
					this.betCount = element.bet_count;
					this.profitAmount = element.profit_amount;
				})
				this.lotteryList = res.list;
				this.gamekeys = Object.keys(this.lotteryList);
			}
		})
	}
	private siteReport() {
		this.datalist = [];
		let data = `{"site_key":"${this.sites}","date": "${this.datas}"}`;
		this.socket.ws_send(this.socket.WS_URL.site_report + '?' + this.datas, data, (res) => {
			if (res.status == 200) {
				this.datalist.push(res.today);
				this.datalist.forEach(element => {
					this.betAmount = element.bet_amount;
					this.bonusAmount = element.bonus_amount;
					this.betCount = element.bet_count;
					this.profitAmount = element.profit_amount;
				})
				this.lotteryList = res.list;
				this.gamekeys = Object.keys(this.lotteryList);
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
	public turnback(index) {
		this.gamekeys = Object.keys(this.lotteryList);
		if (this.preindex !== index) {
			this.lotteryList[this.gamekeys[index]].sate = false;
			this.lotteryList[this.gamekeys[index]].sate = !this.lotteryList[this.gamekeys[index]].sate;
			this.preindex = index;
		} else {
			this.lotteryList[this.gamekeys[index]].sate = !this.lotteryList[this.gamekeys[index]].sate;
		}
	}
	public tabbtn(key, index) {
		this.flag1 = index + 1;
		this.timestate = true;
		this.timestate1 = false;
		this.timestate2 = false;
		this.timestate3 = false;
		this.timestate4 = false;
		this.timestate5 = false;
		this.datalist = [];
		this.sites = key;
		let data = `{"site_key":"${key}","date": ""}`;
		this.socket.ws_send(this.socket.WS_URL.site_report, data, (res) => {
			if (res.status == 200) {
				this.datalist.push(res.today);
				this.datalist.forEach(element => {
					this.betAmount = element.bet_amount;
					this.bonusAmount = element.bonus_amount;
					this.betCount = element.bet_count;
					this.profitAmount = element.profit_amount;
				})
				this.lotteryList = res.list;
				this.gamekeys = Object.keys(this.lotteryList);
			}
		})
	}
	public timetab1(datas) {
		this.timestate = true;
		this.timestate1 = false;
		this.timestate2 = false;
		this.timestate3 = false;
		this.timestate4 = false;
		this.timestate5 = false;
		this.tit = '今日';
		this.datas = datas;
		this.siteReport();
	}
	public timetab2(datas) {
		this.tit = '昨日';
		this.timestate1 = true;
		this.timestate = false;
		this.timestate2 = false;
		this.timestate3 = false;
		this.timestate4 = false;
		this.timestate5 = false;
		this.datas = datas;
		this.siteReport();
	}
	public timetab3(datas) {
		this.tit = '本周';
		this.timestate2 = true;
		this.timestate1 = false;
		this.timestate = false;
		this.timestate3 = false;
		this.timestate4 = false;
		this.timestate5 = false;
		this.datas = datas;
		this.siteReport();
	}
	public timetab4(data) {
		this.tit = '上周';
		this.timestate3 = true;
		this.timestate1 = false;
		this.timestate2 = false;
		this.timestate = false;
		this.timestate4 = false;
		this.timestate5 = false;
		this.datas = data;
		this.siteReport();
	}
	public timetab5(datas) {
		this.tit = '本月';
		this.timestate4 = true;
		this.timestate1 = false;
		this.timestate2 = false;
		this.timestate3 = false;
		this.timestate = false;
		this.timestate5 = false;
		this.datas = datas;
		this.siteReport();
	}
	public timetab6(datas) {
		this.tit = '上月';
		this.timestate5 = true;
		this.timestate1 = false;
		this.timestate2 = false;
		this.timestate3 = false;
		this.timestate4 = false;
		this.timestate = false;
		this.datas = datas;
		this.siteReport();
	}
}