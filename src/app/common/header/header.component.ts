// Developer：July
// Date:
// Description：公共头部

import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../../service/websocket.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';
import { MessageService } from 'src/service/message.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	public userlist = [];//会员列表
	public online;//在线人数
	public  userInfo;//登录时间
	constructor(private socket: WebsocketService, private router: Router, private app: AppComponent, private route: ActivatedRoute, private message: MessageService, public ws: WebsocketService) { }
	ngOnInit() {
		this.message.get().subscribe((result) => {
			let logininfo = JSON.parse(result);
			if (logininfo) {
				this.online = logininfo.online_num;
				this.userInfo = logininfo.userinfo;
				this.userlist = []
				this.userlist.push(this.userInfo)
			}
		})
		this.ws.bind("Admin/Online", (res) => {
			if (res) {
				this.online = res.online_num;
			}
		})
	}
	ngOnDestroy() {
		this.ws.unbind('online');
	}
	// 退出登录
	public signout() {
		let data = `{}`;
		this.socket.ws_send(this.socket.WS_URL.login_out, data, (evt) => {
			if (evt.status == 200) {
				this.router.navigate(['/login']);
				this.socket.loginstatus = false;
				window.localStorage.clear();
			} 
		})
	}
}