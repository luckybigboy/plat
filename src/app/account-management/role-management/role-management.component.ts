// Developer：July
// Date:
// Description：角色管理

import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from 'src/app/page/alert/alert.component';
import { WebsocketService } from '../../../service/websocket.service';

@Component({
	selector: 'app-role-management',
	templateUrl: './role-management.component.html',
	styleUrls: ['./role-management.component.css']
})
export class RoleManagementComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public addtion = false;//添加弹出框
	public remove = false;//删除弹出框
	public purview = false;//权限弹出框
	public delState1 = false;//删除弹出框(下线不为一)
	public primary = true;  //默认角色列表数据
	public totalNum = 0;//数据总条数
	public totalPage = 0;//总页数
	private pageSizeNum = 10;
	public pageSize = this.pageSizeNum;//每页数据条数
	public pageData = this.pageSize;//每页数据
	public currentPage = 1;//当前页数
	public goPage = "";//跳转输入页数
	private roleList;//角色列表
	public editAdminName;//编辑角色名称
	private pomission: Array<String> = [];//编辑权限
	private access: Array<String> = [];//添加权限
	private menukeyArr;//权限列表
	public AdminName = '';//添加
	//修改权限
	public perBar = true;
	public perEdit = false;
	public perDel = false;
	public perAdd = false;
	public refresh = true;
	public stock = '';
	public lists = [];
	//编辑
	private keys;
	private roleAuth;
	private roleId;
	constructor(private socket: WebsocketService) {
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
		})
		this.menukeyArr = socket.menuKey;
	}
	public menuList: any = [
		{
			name: '账户管理',
			key: { name: 'home', active: false },
			list: [],
		},
		{
			name: '现金系统',
			key: { name: 'slave', active: false },
			list: [],
		},
		{
			name: '彩票管理',
			key: { name: 'staff', active: false },
			list: [],
		},
		{
			name: '报表查询',
			key: { name: 'user', active: false },
			list: [],
		},
		{
			name: '网站管理',
			key: { name: 'user', active: false },
			list: [],
		},
	];
	ngOnInit() {
		this.gotoLogin();
		this.permission();
	}
	//权限判断
	private permission() {
		let menukey = this.menukeyArr;
		if (menukey) {
			//修改
			if (menukey.includes('account_role_update')) {
				this.perEdit = true;
			}
			//删除
			if (menukey.includes('account_role_delete')) {
				this.perDel = true;
			}
			//操作栏
			if (!menukey.includes('account_role_update') && !menukey.includes('account_role_delete')) {
				this.perBar = false;
			}
			//新增
			if (menukey.includes('account_role_insert')) {
				this.perAdd = true;
			}
		}
	}
	public getPageData(event) {
		this.pageSize = this.pageSizeNum;
		this.currentPage = event;
		this.pageSize = this.pageSizeNum * event;
		this.lists = this.roleList.slice((event - 1) * this.pageSizeNum, event * this.pageSizeNum);
	}
	private gotoLogin() {
		this.primary = true;
		this.currentPage = 1;
		let data = `{}`;
		this.socket.ws_send(this.socket.WS_URL.role_list, data, (evt) => {
			this.refresh = false;
			if (evt.status == 200) {
				this.roleList = evt.rolelist;
				this.totalNum = this.roleList.length;
				this.totalPage = Math.ceil(this.totalNum / this.pageSizeNum);//总页数
				this.lists = this.roleList.slice(0, this.pageData);
			}
			this.stock = evt.msg;
			this.child.exOuts();
		})
	}
	//添加
	public add() {
		this.AdminName = '';//角色管理
		this.addtion = !this.addtion;
		this.purview = false;
		this.primary = false;
		this.menuList.forEach(element => {
			element.key.active = false;
			element.list.forEach(ele => {
				ele.acceptable = false;
			})
		})
		this.limtlist();
	}
	private limtlist() {
		this.menuList.forEach(element => {
			element.list = [];
		});
		let data = `{}`;
		this.socket.ws_send(this.socket.WS_URL.role_add, data, (res) => {
			if (res.status == 200) {
				for (let i = 0; i < res.roleAll.length; i++) {
					this.keys = res.roleAll[i].operate_key.split('_');
					switch (this.keys[0]) {
						case 'account':
							let accountlist = { limlit: res.roleAll[i].operate_key, acceptable: false };
							this.menuList[0].list.push(accountlist);
							break;
						case 'cash':
							let cashlist = { limlit: res.roleAll[i].operate_key, acceptable: false };
							this.menuList[1].list.push(cashlist);
							break;
						case 'lottery':
							let lotterylist = { limlit: res.roleAll[i].operate_key, acceptable: false };
							this.menuList[2].list.push(lotterylist);
							break;
						case 'report':
							let reportlist = { limlit: res.roleAll[i].operate_key, acceptable: false };
							this.menuList[3].list.push(reportlist);
							break;
						case 'site':
							let sitelist = { limlit: res.roleAll[i].operate_key, acceptable: false };
							this.menuList[4].list.push(sitelist);
							break;
					}
				}
			}
			this.stock = res.msg;
			this.child.exOuts();
		})
	}
	//确认添加
	public confirmAdd() {
		this.access = [];
		this.menuList.forEach(element => {
			element.list.forEach(el => {
				if (el.acceptable) {
					this.access.push(`"${el.limlit}"`);
				}
			});
		});
		let data = `{"role_name":"${this.AdminName.trim()}","role_auth":[${this.access}]}`;
		this.socket.ws_send(this.socket.WS_URL.role_update, data, (res) => {
			if (res.status == 200) {
				this.stock = res.msg;
				this.child.exOuts();
				this.addtion = !this.addtion;
				this.gotoLogin()
			} else {
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
	public selectall(active, opelist, i) {
		this.menuList[i].key.active = active;
		opelist.forEach(e => {
			e.acceptable = active;
		})
	}
	public update(str, i, j, opelist) {
		opelist[j].acceptable = str;
		this.menuList[i].key.active = true;
		opelist.forEach(e => {
			if (e.acceptable == false) {
				this.menuList[i].key.active = false;
			}
		})
	}
	public close() {
		this.addtion = false;
		this.delState1 = false;
		this.purview = false;
		this.primary = true;
	}
	//删除
	public countermand(id, num, name) {
		this.roleId = id;
		if (num == 0) {
			this.remove = true;
		} else {
			this.delState1 = true;
		}
	}
	//确认删除
	public sureDel() {
		this.remove = false;
		let data = `{"role_id":[${this.roleId}]}`;
		this.socket.ws_send(this.socket.WS_URL.role_delete, data, (res) => {
			if (res.status == 200) {
				this.stock = res.msg;
				this.child.exOuts();
				for (let i = 0; i < this.roleList.length; i++) {
					if (this.roleList[i].role_id == this.roleId) {
						this.roleList.splice(i, 1);
					}
				}
				this.totalNum = this.roleList.length;
				this.totalPage = Math.ceil(this.totalNum / this.pageSizeNum);//总页数
				if (this.currentPage > this.totalPage) {
					this.currentPage = this.currentPage - 1;
				}
				this.getPageData(this.currentPage);
			} else {
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
	public abolish() {
		this.remove = !this.remove;
	}
	public limit(item) {
		this.menuList.forEach(element => {
			element.list = [];
		});
		this.roleId = item.role_id;
		this.primary = false;
		this.purview = true;
		let data1 = { "role_id": item.role_id };
		this.socket.ws_send(this.socket.WS_URL.role_edit, JSON.stringify(data1), (res) => {
			if (res.status == 200) {
				this.editAdminName = res.list.role_name;
				this.roleAuth = res.list.role_auth;
				for (let i = 0; i < res.roleAll.length; i++) {
					this.keys = res.roleAll[i].operate_key.split('_');
					switch (this.keys[0]) {
						case 'account':
							let accountlist = { limlit: res.roleAll[i].operate_key, acceptable: false };
							this.menuList[0].list.push(accountlist);
							break;
						case 'cash':
							let cashlist = { limlit: res.roleAll[i].operate_key, acceptable: false };
							this.menuList[1].list.push(cashlist);
							break;
						case 'lottery':
							let lotterylist = { limlit: res.roleAll[i].operate_key, acceptable: false };
							this.menuList[2].list.push(lotterylist);
							break;
						case 'report':
							let reportlist = { limlit: res.roleAll[i].operate_key, acceptable: false };
							this.menuList[3].list.push(reportlist);
							break;
						case 'site':
							let sitelist = { limlit: res.roleAll[i].operate_key, acceptable: false };
							this.menuList[4].list.push(sitelist);
							break;
					}
				}
				this.menuList.forEach(element => {
					element.list.forEach(el => {
						this.roleAuth.forEach(e => {
							if (e == el.limlit) {
								el.acceptable = true;
							}
						})
					})
				})
				this.menuList.forEach(ele => {
					ele.key.active = true;
					ele.list.forEach(e => {
						if (e.acceptable == false) {
							ele.key.active = false;
							return;
						}
					})
				})
			} else {
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
	//保存权限
	public preserve() {
		this.pomission = [];
		this.menuList.forEach(element => {
			element.list.forEach(el => {
				if (el.acceptable) {
					this.pomission.push(`"${el.limlit}"`);
				}
			});
		});
		let data = `{"role_id":${this.roleId},"role_name":"${this.editAdminName.trim()}","role_auth":[${this.pomission}]}`;
		this.socket.ws_send(this.socket.WS_URL.role_permission, data, (res) => {
			if (res.status == 200) {
				this.stock = res.msg;
				this.child.exOuts();
				this.purview = false;
				this.gotoLogin();
			} else {
				this.stock = res.msg;
				this.child.exOuts();
			}
		})
	}
}