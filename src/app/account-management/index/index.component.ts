// Developer：July
// Date:
// Description：首页

import { Component, OnInit,ViewChild } from '@angular/core';
import { WebsocketService } from '../../../service/websocket.service';
import { AlertComponent } from 'src/app/page/alert/alert.component';

@Component({
	selector: 'app-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public tit = '今天';
	public ranklist;//今日数据统计
	public sitelist; //今日站点数据统计
	public alldata = [];//今日所有数据统计
	public stock = '';//提示框传值
	public fatherTitle: string = '';
	constructor(private socket: WebsocketService) { }
	ngOnInit() {
		this.indexlist();
		this.setbgindate('input[name="begindate"]');
		this.setbgindate('input[name="enddate"]');
	}
	//设置时间
	setbgindate(el) {
		$(el).daterangepicker({
			singleDatePicker: true,
			showDropdowns: true,
			autoUpdateInput: false,
			timePicker: true,
			timePicker24Hour: true,
			"locale": {
				format: 'YYYY-MM-DD',
				applyLabel: "应用",
				cancelLabel: "取消",
				resetLabel: "重置",
			}
		},
			function (start, end, label) {
				if (!this.startDate) {
					this.element.val('');
				} else {
					this.element.val(this.startDate.format(this.locale.format));
				}
			})
	}//开始时间
	private indexlist() {
		let data = `{}`;
		this.socket.ws_send(this.socket.WS_URL.index, data, (res) => {
			if (res.status == 200) {
				this.ranklist = res.data.rank;
				this.sitelist = res.data.siteData;
				this.alldata = [];
				this.alldata.push(res.data.totalData);
			} 
				this.stock = res.msg;
				this.child.exOuts();
		})
	}
	public getDay(day) {
		if (day == "yesterday") {
			this.tit = "昨日";
		} else if (day == "today") {
			this.tit = "今日";
		} else if (day == "thisWeek") {
			this.tit = "本周";
		} else if (day == "thisMonth") {
			this.tit = "本月";
		} else if (day == "LastMonth") {
			this.tit = "上月";
		} else if (day == "LastWeek") {
			this.tit = '上周';
		}
		let data = `{"date":"${day}"}`;
		this.socket.ws_send(this.socket.WS_URL.index, data, (res) => {
			if (res.status == 200) {
				this.ranklist = res.data.rank;
				this.sitelist = res.data.siteData;
				this.alldata = [];
				this.alldata.push(res.data.totalData);
			} 
				this.stock = res.msg;
				this.child.exOuts();
		})
	}
}