import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { CrcService } from './crc'
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class WebsocketService {
	public WS_URL = {
		user_login: "Admin/Login?td5", //用户登录
		resume_login: "Admin/ResumeLogin?crc", //恢复登录
		staff_list: "Staff/StaffList?crc", //员工列表和搜索列表
		staff_add: "Staff/StaffAdd?crc", //新增员工
		staff_addupdata: "Staff/StaffAddUpdate?crc", //处理添加提交的员工信息
		staff_updata: "Staff/StaffUpdate?crc", //接收修改的员工的信息
		staff_delete: "Staff/StaffDelete?crc", //删除员工
		role_add: "Roles/RolesAdd?crc", //添加角色
		role_list: "Roles/RolesList?td5", //角色列表
		role_edit: "Roles/RolesEdit?crc", //角色编辑
		role_permission: "Roles/RolesPermissionUpdate?crc", //编辑角色权限
		role_update: "Roles/RolesUpdate?crc", //添加角色提交的信息
		role_delete: "Roles/RolesDelete?crc", //删除角色
		third_payment: "PayType/PayTypeList?crc", //第三方支付列表
		log_list: "Logs/LogsList?crc", //日志列表
		log_export: "Logs/LogsExport?td5", //日志导出
		modefy_password: "Admin/ModifyPassWord?crc", //修改登录密码
		login_out: "Admin/LoginOut?td5", //退出登录
		playsrate_setting: "LotteryTicket/LotteryRateSetting/PlayRateSetting?crc", //彩票设置--玩法赔率设置信息
		playsrate_edit: "LotteryTicket/LotteryRateSetting/PlayRateSettingSave?crc", //彩票设置--编辑玩法赔率设置信息
		playsrate_save: "LotteryTicket/LotteryRateSetting/PlayRateSettingBatchSave?crc", //彩票设置--保存玩法赔率设置信息
		rebate_setting: "LotteryTicket/LotteryRebateSetting/LotteryRebateList?crc", //彩票设置 --返点设置
		LotteryRebateSetting: "LotteryTicket/LotteryRebateSetting/LotteryRebateSetting?crc",//彩票设置--返点编辑
		rebate_settingsave: "LotteryTicket/LotteryRebateSetting/LotteryRebateSettingSave?crc", //彩票设置--返点设置保存
		bet_setting: "LotteryTicket/LotteryBetSetting/BetSetting?crc", //彩票设置--投注额设置
		bet_edit: "LotteryTicket/LotteryBetSetting/BetSettingList?crc", //彩票设置 --投注额编辑
		bet_settingsave: "LotteryTicket/LotteryBetSetting/BetSettingSave?crc", //彩票设置--保存投注额设置
		result_list: "LotteryTicket/Result/ResultList?crc", //开奖结果列表及搜索
		site_report: "Report/SiteReport?crc", //站点彩票报表
		site_analyze: "Report/SiteAnalyze?crc", //站点分析
		site_bill: "Report/SiteBill?crc", //月结对账报表
		site_all: "Website/Site/Site?crc", //站点总开关
		site_edit: "Website/Site/SiteList?crc",//站点总开关编辑接口
		site_save: "Website/Site/SiteSave?crc",//站点总开关保存接口
		sitelottery_list: "Website/SiteLottery/SiteLotteryList?crc", //站点彩票设置--彩票开关列表
		siteLottery_edit: "Website/SiteLottery/SiteLotteryEdit?crc",//.站点彩票开关编辑接口
		sitelottery_save: "Website/SiteLottery/SiteLotterySave?crc",//站点彩票开关保存接口
		CommissionSite: "Website/GameCommission/CommissionSite?crc",//游戏提成比例设置列表接口
		CommissionList: "Website/GameCommission/CommissionList?crc", //游戏提成比例设置编辑接口
		CommissionSave: "Website/GameCommission/CommissionSave?crc",//游戏提成比例设置保存接口
		siteplay_list: "Website/SitePlay/SiteList?crc", //站点彩票设置--彩票玩法列表
		editsiteplay_list: "Website/SitePlay/SitePlayList?crc", //站点彩票设置--保存彩票具体玩法的开关设置
		siteplaysave: "Website/SitePlay/SitePlaySave?crc", //站点彩票设置--保存彩票彩种的玩法的开关设置
		index: "Index/Index?crc",//首页数据
		sitelist: "Report/SiteList?td5",
		ExternalGame: "Website/ExternalGame/Site?crc",//第三方游戏的列表
		editGame: "Website/ExternalGame/SiteLottery?crc",//第三方游戏的编辑
		SiteLotterySave: "Website/ExternalGame/SiteLotterySave?crc",//第三方游戏的保存
		online: "Admin/Online",//在线人数
		OfficialLotteryResultList: "LotteryTicket/LotteryNumberSetting/OfficialLotteryResultList?td5",//官方彩票预设结果列表
		Settle: "LotteryTicket/LotteryNumberSetting/Settle",//官方彩票预设结果列表--立即结算
		CancelPeriod: "LotteryTicket/LotteryNumberSetting/CancelPeriod"//官方彩票预设结果的列表的--取消改期

	}
	private key_resume;//登录成功返回的key;
	private ws: WebSocket;//声明ws
	private api;//接口地址
	public menuKey; //权限列表
	public loginstatus: boolean = false;  //未登录
	private bind_list = new Map(); //存取数据接收
	private globalmap = new Map(); //推送消息接收
	private cacheMap = new Map();//创建加密
	private callback_list = new Map();//数据返回
	public msg = '';//是否登录的提示；
	constructor(
		private http: HttpClient,
		private message: MessageService,
		private crc: CrcService,
		private router: Router
	) {
		this.key_resume = window.localStorage.getItem('key');
		let userMsgs = window.localStorage.getItem('userMsg')

		if (userMsgs) {
			let userMsg = JSON.parse(userMsgs);
			this.menuKey = userMsg.authkey;
		}
		this.getRequestContact().subscribe(res => {
			this.api = res['websocket'];
			this.selectWS();
		}, error => {
		});
	}
	private getRequestContact() {
		return this.http.get("assets/api/config.json")
	}
    /**
     * websocket初始化
     */
	private selectWS() {
		for (let i = 0; i < this.api.length; i++) {
			this.api[i] = new WebSocket(this.api[i]);
			this.api[i].onopen = () => {
				//恢复登录
				if (this.ws) {
					this.api[i].close();
					return;
				} else {
					this.ws = this.api[i];
					this.init();
				}
				if (this.key_resume != null) {
					let data = `{"resume_key":"${this.key_resume}"}`
					this.ws_send(this.WS_URL.resume_login, data, (res) => {
						if (res.status == 200) {
							const userMsgs: string = JSON.stringify(res);
							setTimeout(() => { this.message.send(userMsgs); }, 100)
							localStorage.setItem("key", res.resume_key);
							this.loginstatus = true;
							let url = location.hash;
							let newurl= url.split("#")[1].split('?')[0];
							if (newurl=="/login") {
								this.router.navigate(['/home']);
							}else{
								this.router.navigate([newurl]);
							}
						} else {
							this.loginstatus = false;
							this.router.navigate(['/login']);
							localStorage.clear();
						}
					})
				} else {
					this.loginstatus = false;
					this.router.navigate(['/login']);
					localStorage.clear();
				}
			}
		}
	}
	private init() {
		this.ws.onmessage = (evt) => {
			let a = evt.data.indexOf("{");
			if (a == -1) {
				return;
			}
			let str = [];
			let index = evt.data.indexOf(" ");
			let str1 = evt.data.slice(0, index);
			let str2 = evt.data.slice(index + 1);
			str[0] = str1;
			str[1] = str2;
			let url = str[0];
			let new_url = url.split('?')
			if (str[1] == null) {
				return;
			}
			if (new_url[0] == "Admin/ResumeLogin" || new_url[0] == "Admin/Login") {
				if (JSON.parse(str[1]).status == 200) {
					this.menuKey = JSON.parse(str[1]).authkey;
				}
			}
			if (this.callback_list.get(url)) {
				let callback = this.callback_list.get(url);
				callback(JSON.parse(str[1]));
				this.callback_list.delete(url);
			} else {
				//推送消息保存
				this.fire(str[0], str[1])
				//在线人数实时更新
				if (url == "Admin/Online") {
					this.refreshIndexData(url, JSON.parse(str[1]));
				}
				if (url == "Login/Notice") {
					if (JSON.parse(str[1]).status == 800) {
						this.msg = JSON.parse(str[1]).msg;
						this.loginstatus = false;
						this.router.navigate(['/login']);
						localStorage.clear();
					}
				}
			}
		};
		this.ws.onclose = (evt) => {
			console.log('websocket 连接关闭...');
		}
		this.ws.onerror = (err) => {
			console.log('websocket 出现问题....')
			console.log(err);
		}
	}
    /**
     * 关闭ws
     * @returns 是否关闭成功
     */
	private ws_close(): boolean {
		if (this.ws) {
			if (this.ws.readyState == WebSocket.OPEN) {
				this.ws.close();
				return true;
			}
		}
		return false;
	}
    /**
     * 打开ws
     * @returns 是否开启成功
     */
	private ws_open(): boolean {
		if (this.ws) {
			if (this.ws.readyState == WebSocket.CLOSED) {
				this.ws = null;
				this.init();
				return true;
			}
		}
		return false;
	}
    /**
     * 发送请求
     * @param url 接口url
     * @param data 传递数据
     * @param callback 回调函数
     * @returns 是否发送成功
     */
	public ws_send(url: string, data: any, callback: Function): boolean {
		if (url.indexOf('?crc') != -1) {
			//'?crc'标识
			//data使用crc加密
			url = url.replace('?crc', '?');
			if (!data) {
				data = {};
			}
			let dataCRC = this.crc.CRCMaster.Calculate(data, "ASCII").crc32;
			url = url + dataCRC;
		} else if (url.indexOf('?td5') != -1) {
			//'?td5'标识
			url = url.replace('?td5', '?');
		} else {
			url = url + "?";
		}
		//检测cacheMap是否含有相同的url并判断时间间隔是否大于5s
		//判断重复则拦截提示”频繁操作“
		let Realurl = url;
		let timer = new Date().getTime();
		if (this.cacheMap.has(Realurl)) {
			if (timer - this.cacheMap.get(Realurl) < 3000) {
				callback({ "msg": "频繁操作,请稍后再试" });
				return;
			} else {
				let timerString = timer.toString();
				url = url + this.crc.CRCMaster.Calculate(timerString, "ASCII").crc32;
				this.cacheMap.set(Realurl, timer);
			}
		} else {
			this.cacheMap.set(Realurl, timer);
		}
		if (this.ws) {
			if (this.ws.readyState == WebSocket.OPEN) {
				this.ws.send(`${url} ${data}`);
				this.callback_list.set(url, callback);
				return true;
			}
		}

		this.ws_open();
		//当页面刷新后重新发送请求 
		setTimeout(() => {
			this.ws_send(url, data, callback);
		}, 1000);
		return false;
	}
	public bind(url: string, callback: Function) {
		if (!this.bind_list[url]) {
			this.bind_list.set(url, callback);
		}
		let data = this.globalmap.get(url);
		if (!data) data = localStorage.getItem(url);
		if (data) {
			callback(data, url);
		}
	}
	public unbind(url: string) {
		this.bind_list.forEach((value, key) => {
			if (key == url) {
				this.bind_list.delete(key);
			}
		})
	}
	private fire(url: string, data) {
		this.bind_list.forEach((value, key) => {
			if (key.indexOf(url) > -1) {
				this.bind_list.get(key)(data);
			}
		})
	}
	private refreshIndexData(url, data) {
		this.fire('Admin/Online', data);
	}
}