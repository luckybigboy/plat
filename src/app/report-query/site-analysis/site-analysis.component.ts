// Developer：July
// Date:
// Description：站点分析

import { Component, OnInit, ViewChild } from '@angular/core';
import { EChartOption } from 'echarts-ng2';
import { WebsocketService } from '../../../service/websocket.service';
import { AlertComponent } from 'src/app/page/alert/alert.component';

@Component({
	selector: 'app-site-analysis',
	templateUrl: './site-analysis.component.html',
	styleUrls: ['./site-analysis.component.css']
})
export class SiteAnalysisComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public flag1 = true;//添加类
	public isShow1 = true;
	public isShow2 = false;
	public isShow3 = false;
	public chartOption;
	private data1 = [];//创建一个时间数组
	private betall1 = [];//创建一个投注额数组
	private profitAll = [];//创建一个损益数组
	public siteList;//站点列表
	private infolist;//统计
	private coutes;
	public tit = '今日';
	private sitekey = '';//站点key
	private coute;
	public stock = '';//提示框
	public infolists;//投注总额
	constructor( private socket: WebsocketService) {
	}
	ngOnInit() {
		this.timeout();
	}
	//tab切换的数据清空
	private tableInit() {
		this.coute = [];
		this.data1 = [];
		this.betall1 = [];
		this.profitAll = [];
	}
	private load() {
		this.tableInit();
		let datas = `{"site_key":"${this.sitekey}","date":""}`;
		this.socket.ws_send(this.socket.WS_URL.site_analyze, datas, (res) => {
			if (res.status == 200) {
				this.coute = res.list;
				this.infolist = res.info;
				this.infolists = [];
				this.infolists.push(this.infolist);
				this.data1 = [];
				this.betall1 = [];
				this.profitAll = [];
				for (let index = 0; index < this.coute.length; index++) {
					let dailys = this.coute[index].daily;
					let betalls = this.coute[index].bet_all;
					let profitall = this.coute[index].profit_all;
					this.data1.push(dailys);
					this.betall1.push(betalls);
					this.profitAll.push(profitall);
				}
				this.chartOption = this.createline(this.data1, this.betall1, this.profitAll);
			} else {
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
	private timeout() {
		this.data1 = [];
		this.betall1 = [];
		this.profitAll = [];
		let data = `{"site_key":"","date":""}`;
		this.socket.ws_send(this.socket.WS_URL.sitelist, data, (evt) => {
			if (evt.status == 200) {
				this.siteList = evt.site_list;
				this.sitekey = this.siteList[0].site_key;
				this.load();
			}
		})
	}
	private createline(data1, profitAll, betall1): EChartOption {
		return {
			backgroundColor: '#fff',
			legend: {
				data: ['投注额', '损益'],
				align: 'left',
				left: 10
			},
			tooltip: {},
			xAxis: {
				data: this.data1,
				name: '日期',
				silent: true,
				axisLine: { onZero: true },
				splitLine: { show: false },
				splitArea: { show: false }
			},
			yAxis: {
				inverse: false,
				splitArea: { show: false }
			},
			grid: {
				left: 100
			},
			series: [
				{
					name: '投注额',
					type: 'bar',
					stack: 'two',
					data: this.betall1
				},
				{
					name: '损益',
					type: 'bar',
					stack: 'two',
					data: this.profitAll
				}
			]
		}
	}
	//点击站点
	public tab1(i, key) {
		this.flag1 = i + 1;
		this.sitekey = key;
		this.isShow3 = false;
		this.isShow2 = false;
		this.isShow1 = true;
		this.load()
	}
	public day() {
		this.isShow3 = false;
		this.isShow2 = false;
		this.isShow1 = true;
		this.tableInit();
		this.tit = '今日';
		let data = `{"site_key":"${this.sitekey}","date":"day"}`;
		this.socket.ws_send(this.socket.WS_URL.site_analyze + "?" + 'v1', data, (evt) => {
			if (evt.status == 200) {
				this.coutes = evt.list;
				this.infolist = evt.info;
				this.infolists = [];
				this.infolists.push(this.infolist);
				this.data1 = [];
				this.betall1 = [];
				this.profitAll = [];
				for (let index = 0; index < this.coutes.length; index++) {
					let today_daily = this.coutes[index].daily;
					let today_betall = this.coutes[index].bet_all;
					let today_profit = this.coutes[index].profit_all;
					this.data1.push(today_daily);
					this.betall1.push(today_betall);
					this.profitAll.push(today_profit);
				}
				this.chartOption = this.createline(this.data1, this.betall1, this.profitAll);
			} else {
				this.stock = evt.msg;
				this.child.exOuts();
			}
		})
	}
	public week() {
		this.tit = '本周';
		this.isShow3 = false;
		this.isShow1 = false;
		this.isShow2 = true;
		this.tableInit()
		let data = `{"site_key":"${this.sitekey}","date":"week"}`;
		this.socket.ws_send(this.socket.WS_URL.site_analyze + "?" + 'v2', data, (evt) => {
			if (evt.status == 200) {
				this.stock = evt.msg;
				this.child.exOuts();
				this.coutes = evt.list;
				this.infolist = evt.info;
				this.infolists = [];
				this.infolists.push(this.infolist);
				this.data1 = [];
				this.betall1 = [];
				this.profitAll = [];
				for (let index = 0; index < this.coutes.length; index++) {
					let weeks = this.coutes[index].weekly;
					let week_betall = this.coutes[index].bet_all;
					let week_profit = this.coutes[index].profit_all;
					this.data1.push(weeks);
					this.betall1.push(week_betall);
					this.profitAll.push(week_profit);
				}
				this.chartOption = this.createline(this.data1, this.betall1, this.profitAll);
			} else {
				this.stock = evt.msg;
				this.child.exOuts();
			}
		})
	}
	public month() {
		this.tit = '本月';
		this.isShow1 = false;
		this.isShow2 = false;
		this.isShow3 = true;
		this.tableInit();
		let data = `{"site_key":"${this.sitekey}","date":"month"}`;
		this.socket.ws_send(this.socket.WS_URL.site_analyze + "?" + 'v3', data, (evt) => {
			if (evt.status == 200) {
				this.coutes = evt.list;
				this.infolist = evt.info;
				this.infolists = [];
				this.infolists.push(this.infolist);
				this.data1 = [];
				this.betall1 = [];
				this.profitAll = [];
				for (let index = 0; index < this.coutes.length; index++) {
					let monthy = this.coutes[index].monthly;
					let monthy_betall = this.coutes[index].bet_all;
					let month_profitall = this.coutes[index].profit_all;
					this.data1.push(monthy);
					this.betall1.push(monthy_betall);
					this.profitAll.push(month_profitall);
				}
				this.chartOption = this.createline(this.data1, this.betall1, this.profitAll);
			} else {
				this.stock = evt.msg;
				this.child.exOuts();
			}
		})
	}
}