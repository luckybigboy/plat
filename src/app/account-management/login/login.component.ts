// Developer：July
// Date:
// Description：登录

import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from 'src/app/page/alert/alert.component';
import { WebsocketService } from 'src/service/websocket.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/service/message.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	@ViewChild('child')
	child: AlertComponent;
	public loginText = '登录';
	public imgs = '../../../assets/images/icon.png';
	public username = '';//用户名
	public varUsername = '';//用户名提醒
	public password = ''; //密码
	public varUserpassword = ''; //密码提醒
	public sete = false;
	public mesg = false;
	public check = false;
	public varUser = false;
	public varpassword = false;
	public loginmsg: string = "";
	public reage = '';
	public login_btn = false;//判断是否可以点击登录
	public time_loading = false; //等待时间30s
	public stock = '';//传值修改
	constructor(private socket: WebsocketService, private router: Router,private message: MessageService) {
		this.time_loading = false;
		this.loginmsg = this.socket.msg;
		if (this.socket.loginstatus == false) {
			this.mesg = true;
		}
	}
	ngOnInit() { }
	public loginbtn() {
		this.mesg = false;
		if (this.username == "") {
			this.varUser = true;
			this.sete = false;
			this.varUsername = "请输入用户名";
			return false;
		} else if (this.password == "") {
			this.varpassword = true;
			this.varUserpassword = "请输入密码";
			this.sete = false;
			return false;
		} else {
			this.varUser = false;
			this.varpassword = false;
			this.login_btn = true;
			let timer = setTimeout(() => {
				if (this.time_loading) {
					clearTimeout(timer);
				} else {
					this.stock = '登录失败，请重新登录';
					this.child.exOuts();
					this.login_btn = false;
				}
			}, 30000)
			let data = `{"admin_name":"${this.username}","admin_password":"${this.password}"}`;
			this.socket.ws_send(this.socket.WS_URL.user_login, data, (evt) => {
				this.time_loading = true;
				this.login_btn = false;
				if (evt.status == 200) {
					this.loginText = '正在登录';
					const userMsgs: string = JSON.stringify(evt);
					console.log(userMsgs);
					localStorage.setItem('userMsg', userMsgs); //保存用户信息
					setTimeout(() => { this.message.send(userMsgs) }, 100)
					this.router.navigate(['/home']);
					this.socket.loginstatus = true;
					window.localStorage.setItem('key', evt.resume_key);
					window.localStorage.setItem('line', 'true');
				}else{
					this.sete = true;
					this.reage = evt.msg;
				}
			})
		}
	}
	public userlick(event) {
		if (event.target.value! = '') {
			this.varUser = false;
		}
	}

}