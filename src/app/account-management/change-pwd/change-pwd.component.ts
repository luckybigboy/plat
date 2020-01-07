// Developer：July
// Date:
// Description：修改密码

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from '../../../service/websocket.service';
import { AlertComponent } from 'src/app/page/alert/alert.component';

@Component({
	selector: 'app-change-pwd',
	templateUrl: './change-pwd.component.html',
	styleUrls: ['./change-pwd.component.css']
})
export class ChangePwdComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public edittext = '修改密码';
	public password = "";//旧密码
	public passwordNew = ""; //新密码
	public onceAgainPasswordNew = "";//再次输入的新密码
	public verPasswordOld = "";//原登录密码提示
	public verPasswordNew = "";//新密码提醒
	public verOnceAgainPasswordNew = "";//再次输入新密码提醒
	public info;
	public stock = '';//提示语
	constructor(private socket: WebsocketService) { }
	ngOnInit() {
		let users = localStorage.getItem('userMsg');
		let userinfos = JSON.parse(users);
		this.info = userinfos.userinfo;
	}
	// 确认修改
	public changPsd() {
		if (this.password == "") {
			this.verPasswordOld = "请输入原登录密码";
			return false;
		} if (this.passwordNew == "") {
			this.verPasswordNew = "请输入新的登录密码";
			return false;
		} if (this.passwordNew.length < 6) {
			this.verPasswordNew = "密码长度不能小于6个字符";
			return false;
		} if (this.onceAgainPasswordNew == "") {
			this.verOnceAgainPasswordNew = "请再次输入新的登录密码";
			return false;
		} if (this.passwordNew != this.onceAgainPasswordNew) {
			this.verPasswordNew = "两次输入的密码不一致";
			return false;
		} else {
			let data = `{"admin_old_password":"${this.password}","admin_new_password":"${this.passwordNew}","admin_confirm_password":"${this.onceAgainPasswordNew}"}`;
			this.socket.ws_send(this.socket.WS_URL.modefy_password, data, (evt) => {
				if (evt.status == 200) {
					this.password = '';
					this.passwordNew = '';
					this.onceAgainPasswordNew = '';
					this.verPasswordOld = "";
					this.verPasswordNew = "";
					this.verOnceAgainPasswordNew = "";
				}
					this.stock = evt.msg;
					this.child.exOuts();
			})
		}
	}
}