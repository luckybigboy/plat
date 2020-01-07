// Developer：July
// Date:
// Description：操作日志

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from '../../../service/websocket.service';
import { AlertComponent } from 'src/app/page/alert/alert.component';
import { GetExportServiceService } from '../../../service/get-export.service.service'

@Component({
	selector: 'app-operalog',
	templateUrl: './operalog.component.html',
	styleUrls: ['./operalog.component.css']
})
export class OperalogComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public totalNum = 0;//数据总条数
	public totalPage = 0;//总页数
    private pageSizeNum = 10;
	public pageSize = this.pageSizeNum;//每页数据条数
	public pageData = this.pageSize;//每页数据
	public currentPage = 1;//当前页数
	public goPage: "";//跳转输入页数
	private logList;//日志列表
	private startTime = "";//开始时间
	private endTime = "";//结束时间
	//搜索
	public username = '';//搜索登录账号
	public selectTime = "";
	public stock = "";//提示框的值
	public lists;//列表数据渲染
	public loadingDiv = false;//loading框显示
	public stuse = false;//暂无数据显示
	constructor(private socket: WebsocketService, private getExport: GetExportServiceService) {
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
		})
	}
	public getPageData(event) {
		this.lists = [];
		this.pageSize = this.pageSizeNum;
		this.currentPage = event;
		this.pageSize = this.pageSizeNum * event;
		this.lists = this.logList.slice((event - 1) * this.pageSizeNum, event * this.pageSizeNum);
	}
	private gotoLogin() {
		this.emptyPage();
		this.currentPage = 1;
		this.loadingDiv = true;
		let data = `{"admin_name":"${this.username}","start_time":"${this.startTime}","end_time":"${this.endTime}"}`;
		this.socket.ws_send(this.socket.WS_URL.log_list + "?" + 'v1', data, (evt) => {
			this.loadingDiv = false;
			if (evt.status == 200) {
				this.logList = evt.loglist;
				this.totalNum = this.logList.length;
				this.totalPage = Math.ceil(this.totalNum / this.pageSize);//总页数
				this.lists = this.logList.slice(0, this.pageData);
				if (this.logList.length == 0) {
					this.stuse = true;
				}
			} else {
				this.stock = evt.msg;
				this.child.exOuts();
			}
		})
	}
	ngOnInit() {
		this.setDate();
		this.gotoLogin();
	}
	//清空分页数据
	private emptyPage() {
		this.totalNum = 0;//数据总条数
		this.totalPage = 0;//总页数
		this.pageSize = this.pageSizeNum;//每页数据条数
		this.pageData = this.pageSize;//每页数据
		this.currentPage = 1;//当前页数
	}
	private setDate() {
		$('input[name="daterange"]').on('cancel.daterangepicker', function (ev, picker) {
			$('input[name="daterange"]').val('');
		})
		$('input[name="daterange"]').daterangepicker({
			"linkedCalendars": false,
			"alwaysShowCalendars": true,
			"opens": 'left',
			"parentEl": '.content-wrapper',
			"locale": {
				format: 'YYYY-MM-DD',
				separator: ' ~ ',
				applyLabel: "应用",
				cancelLabel: "重置",
				daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
				monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
					'七月', '八月', '九月', '十月', '十一月', '十二月'],
			}
		}, function (start, end, label) {
			if (!this.startDate) {
				this.element.val('');
			} else {
				this.element.val(this.startDate.format(this.locale.format) + this.locale.separator + this.endDate.format(this.locale.format));
			}
		})
		$('input[name="daterange"]').val('');
	}
	//搜索
	public research() {
		this.emptyPage();
		this.stuse = false;
		this.currentPage = 1;
		this.pageSize = 10;
		this.lists = [];
		this.logList = '';
		let start = '';
		let end = '';
		let a = $('#to_submit_time').val();
		if (a) {
			let starttime = a.split(" ~ ");
			start = starttime[0];
			end = starttime[1];
		}
		let time1 = new Date(start.replace(/-/g, '/')).valueOf();
		let mydata = new Date().toLocaleDateString();
		let newtime = new Date(mydata.replace(/-/g, '/')).valueOf();
		let utc = (newtime - time1) / (24 * 60 * 60 * 1000);
		if (utc > 60) {
			this.stock = '可查询两月以内数据';
			this.child.exOuts();
		} else {
			this.loadingDiv = true;
			let data = `{"admin_name":"${this.username.trim()}","start_time":"${start}","end_time":"${end}"}`;
			this.socket.ws_send(this.socket.WS_URL.log_list + "?" + 'v2', data, (res) => {
				this.loadingDiv = false;
				this.selectTime = ''
				this.startTime = '';
				this.endTime = '';
				if (res.status == 200) {
					this.logList = res.loglist;
					this.totalNum = this.logList.length;
					this.totalPage = Math.ceil(this.totalNum / this.pageSize);//总页数
					this.lists = this.logList.slice(0, this.pageData);
					if (this.logList.length == 0) {
						this.stuse = true;
					}
				} 
					this.stock = res.msg;
					this.child.exOuts();
			})
		}
	}
	//导出
	public toExport() {
		let ths = ['登录账号', '操作类型', '详情', '日期'];
		let listSave = ['admin_name', 'operate_name', 'detail', 'time'];
		this.getExport.goExport(this.logList, listSave, ths, '操作日志');
	}
}