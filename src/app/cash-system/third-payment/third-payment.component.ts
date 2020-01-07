// Developer：July
// Date:
// Description：第三方支付方式列表

import { AppComponent } from './../../app.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from '../../../service/websocket.service';
import { AlertComponent } from 'src/app/page/alert/alert.component';

@Component({
    selector: 'app-third-payment',
    templateUrl: './third-payment.component.html',
    styleUrls: ['./third-payment.component.css']
})
export class ThirdPaymentComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
    public paylist;// 类型列表
    public typelist; //支付方式列表
	public falg = true;
	public stock='';//提示框传值
	public title = '';
	public staus = false;
    constructor(private socket: WebsocketService, private app: AppComponent) {
    }
    ngOnInit() {
        this.thirdpay();
    }
    public thirdpay() {
        let data = `{}`;
        this.socket.ws_send(this.socket.WS_URL.third_payment, data, (evt) => {
			this.stock=evt.msg;
            if (evt.status == 200) {
				this.paylist = evt.paylist;
				this.title= this.paylist[0].gate_name;
				this.typelist = this.paylist[0].paytypeDetail;
				if (this.typelist.length==0) {
					this.stock='暂无数据';
					this.staus = true;
				}
			} 
			this.child.exOuts();
        })
    }
    //点击
    public tab(index, name) {
        this.falg = index + 1
		this.title = name;
		this.typelist = this.paylist[index].paytypeDetail;
		if (this.typelist.length==0) {
			this.stock='暂无数据';
			this.child.exOuts();
			this.staus = true;
		}else{
			this.staus = false;
		}
    }
}