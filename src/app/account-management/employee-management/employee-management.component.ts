// Developer：July
// Date:
// Description：员工管理

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from '../../../service/websocket.service';
import { AlertComponent } from 'src/app/page/alert/alert.component';
import { SelectallService } from 'src/service/selectall.service';

@Component({
	selector: 'app-employee-management',
	templateUrl: './employee-management.component.html',
	styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public state = false;//删除提示框的显示状态
	public primary = true;
	public editState = false;//编辑添加员工弹出层状态
	public addState = false;//添加员工
	public totalNum = 0;//数据总条数
	public totalPage = 0;//总页数
	public pageSizeNum = 10;
	public pageSize = this.pageSizeNum;//每页数据条数
	public pageData = this.pageSize;//每页数据
	public currentPage = 1;//当前页数
	public goPage: "";//跳转输入页数
	private staffList;//员工列表
	public staffName = '';//员工名字
	public roleList;//添加员工角色列表
	private roleId = '';//角色id
	private editAdminId = '';
	public editAdminName;//编辑姓名
	public editLoginName;//编辑登录名
	public editloginPsd = '';//编辑密码
	public stock = "";//提示框的值
	//修改权限
	private menukeyArr;//权限列表
	public perBar = true;
	public perEdit = false;
	public perDel = false;
	public perAdd = false;
	public loadingDiv = false;
	public stace = false;//数据是否为空
	public lists = [];
	private batch = [];//批量的数据
	public selallatate=false;
	//新增
	public username = '';//新增用户名
	public loginuser = '';//新增登录名
	public loginpwd = '';//登录密码
	//角色列表
	private roleIdlist = [];
	private key = [];
	constructor(private socket: WebsocketService, private seleacts: SelectallService) {
		this.menukeyArr = socket.menuKey;
	}
	ngOnInit() {
		this.gotoLogin();
		this.permission();
	}
	//清空分页数据
	private emptyPage() {
		this.totalNum = 0;//数据总条数
		this.totalPage = 0;//总页数
		this.pageSize = this.pageSizeNum;//每页数据条数
		this.pageData = this.pageSize;//每页数据
		this.currentPage = 1;//当前页数
	}
	//权限判断
	private permission() {
		let menukey = this.menukeyArr;
		//修改
		if (menukey.includes('account_admin_update')) {
			this.perEdit = true;
		}
		//删除
		if (menukey.includes('account_admin_delete')) {
			this.perDel = true;
		}
		//操作栏
		if (!menukey.includes('account_admin_update') && !menukey.includes('account_admin_delete')) {
			this.perBar = false;
		}
		//新增
		if (menukey.includes('account_admin_insert')) {
			this.perAdd = true;
		}
	}
	public gotoLogin() {
		this.emptyPage();
		this.currentPage = 1;
        this.selallatate=false;
		this.lists = [];
		this.primary = true;
		let data = `{}`;
		this.loadingDiv = true;
		this.socket.ws_send(this.socket.WS_URL.staff_list, data, (evt) => {
			this.loadingDiv = false;
			if (evt.status == 200) {
				this.staffList = evt.adminlist;
				this.roleList = evt.roleAll;
				this.lists = this.staffList.slice(0, this.pageData);
				this.totalNum = this.staffList.length;
				this.totalPage = Math.ceil(this.totalNum / this.pageSizeNum);//总页数
				this.staffList.forEach(element => {
					element.active = false;
				});
			} else {
				this.stock = evt.msg;
				this.child.exOuts();
			}
		})
	}
	//删除
	public delete(id) {
		this.batch = [];
		this.state = !this.state;
		this.batch.push(id)
	}
	public massDelete() {
		if (this.batch.length > 0) {
			this.state = !this.state;
		} else {
			//提示框	
			this.stock = '请选择要删除的员工';
			this.child.exOuts();
		}
	}
	//全选
	public selall(active, opelist) {
		this.seleacts.selall(active, opelist, (res) => {
			this.batch = res.batchSet;
			this.selallatate = res.seallatate;
		})
	}
	//单选
	public singelsel(str, i, opelist) {
		this.seleacts.singelsel(str, i, opelist, (res) => {
			this.batch = res.batchSet;
			this.selallatate = res.singelsel;
		})
	}
	//确认删除
	public sureDelete() {
		this.key = [];
		this.state = !this.state;
		this.batch.forEach(element => {
			this.key.push(element.admin_id);
		})
		let data = `{"admin_id":[${this.key}]}`;
		this.socket.ws_send(this.socket.WS_URL.staff_delete, data, (res) => {
			this.batch = [];
			this.seleacts.batch = [];
			this.selallatate = false;
			this.staffList.forEach(element => {
				element.active = false;
			})
			if (res.status == 200) {
				//提示框
				for (let index = 0; index < this.staffList.length; index++) {
					for (let i = 0; i < this.key.length; i++) {
						if (this.staffList[index].admin_id == this.key[i]) {
							this.staffList.splice(index, 1);
						}
					}
				}
				this.pageData = this.pageSize;
				this.totalNum = this.staffList.length;
				this.totalPage = Math.ceil(this.totalNum / this.pageSizeNum);//总页数
				if (this.currentPage > this.totalPage) {
					this.currentPage = this.currentPage - 1;
				}
				this.getPageData(this.currentPage);
			}
			//提示框
			this.stock = res.msg;
			this.child.exOuts();
		})
	}
	public close() {
		this.primary = true;
		this.editState = false;
		this.state = false;
		this.addState = false;
	}
	//新增员工
	public add() {
		this.primary = false;
		this.username = '';
		this.loginuser = '';
		this.loginpwd = '';
		this.roleIdlist = [];
		this.addState = !this.addState;
	}
	public role($event, item) {
		let checkbox = $event.target;
		let action = (checkbox.checked ? 'add' : 'remove');
		this.updateSelected(action, item);
	}
	private updateSelected(action, id) {
		this.roleIdlist = [];
		if (action == 'add' && this.roleIdlist.indexOf(id) == -1) {
			this.roleIdlist.push(id);
		}
		if (action == 'remove' && this.roleIdlist.indexOf(id) != -1) {
			this.roleIdlist.splice(this.roleIdlist.indexOf(id), 1);
		}
	}
	//处理新增接口
	public confirm() {
		this.username=$('input[name="user"]').val();
		this.loginuser=$('input[name="login"]').val();
		this.loginpwd=$('input[name="pas"]').val();
		if (this.username == "") {
			this.stock = "员工名称不能为空";
		} else if (this.loginuser == "") {
			this.stock = "登录账号不能为空";
		} else if (this.loginpwd == "") {
			this.stock = "登录密码不能为空";
		} else {
			let data = `{"admin_name":"${this.username.trim()}","admin_key":"${this.loginuser.trim()}","admin_password":"${this.loginpwd.trim()}","role_id":"${this.roleIdlist}"}`;
			this.socket.ws_send(this.socket.WS_URL.staff_addupdata, data, (res) => {
				if (res.status == 200) {
					this.addState = !this.addState;
					this.gotoLogin();
					this.stock = res.msg;
				} else {
					//提示框
					this.stock = res.msg;
				}
			})
		}
		this.child.exOuts();
	}
	//编辑
	public edit(item) {
		this.primary = false;
		this.editloginPsd = '';
		this.editState = !this.editState;
		this.editAdminName = item.admin_name;
		this.editLoginName = item.admin_key;
		this.editAdminId = item.admin_id;
		this.roleList.forEach(element => {
			element.active = false;
		})
		this.roleList.forEach(element => {
			if (element.role_name == item.role_name) {
				element.active = true;
				this.roleId = element.role_id;
			}
		});
	}
	public editsingelsel(str, list) {
		list.active = str;
		this.roleId = list.role_id;
	}
	//确认编辑
	public sureEdit() {
		this.editAdminName=$('input[name="first"]').val();
		this.editLoginName=$('input[name="second"]').val();
		this.editloginPsd=$('input[name="psd"]').val();
		let data = `{"admin_id":"${this.editAdminId}","admin_key":"${this.editLoginName.trim()}","admin_name":"${this.editAdminName.trim()}","admin_password":"${this.editloginPsd.trim()}","role_id":"${this.roleId}"}`;
		this.socket.ws_send(this.socket.WS_URL.staff_updata, data, (res) => {
			this.stock = res.msg;
			if (res.status == 200) {
				this.editState = !this.editState;
				this.gotoLogin();
			}
			this.child.exOuts();
		})
	}
	public getPageData(event) {
		this.selallatate = false;
		this.staffList.forEach(element => {
			element.active = false;
		})
		this.batch = [];
		this.lists = [];
		this.pageSize = this.pageSizeNum;
		this.currentPage = event;
		this.pageSize = this.pageSizeNum * event;
		this.lists = this.staffList.slice((event - 1) * this.pageSizeNum, event * this.pageSizeNum);
	}
	//搜索
	public research() {
		this.emptyPage();
		this.staffList = [];
		this.stace = false;
		this.currentPage = 1;
		this.lists = [];
		this.loadingDiv = true;
		let data = `{"admin_name":"${this.staffName.trim()}"}`;
		this.socket.ws_send(this.socket.WS_URL.staff_list, data, (evt) => {
			this.loadingDiv = false;
			this.stock = evt.msg;
			if (evt.status == 200) {
				this.staffList = evt.adminlist;
				this.lists = this.staffList.slice(0, this.pageData);
				this.totalNum = this.staffList.length;
				this.totalPage = Math.ceil(this.totalNum / this.pageSizeNum);//总页数
				if (this.staffList.length == 0) {
					this.stace = true;
				}
				this.lists.forEach(element => {
					element.active = false;
				})
			} else {
				this.stace = true;
			}
			this.child.exOuts();
		})
	}
	//输入框限制
	public user_name(event) {
		let val = event.target.value;
		let reg = /^[\u4e00-\u9fa50-9a-zA-Z!#%@*_+-=&.]{4,20}$/;
		if (reg.test(val)) {
			val = event.target.value;
		} else {
			this.stock = '请输入4-20位字符，支持中文，英文和数字，特殊符号包括（！@#%&*_+=.)';
			this.child.exOuts();
			val = '';
		}
		event.target.value = val;
	}
	public uservalue(event, num) {
		let val = event.target.value;
		let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
		if (!reg.test(val)) {
			if (num == 1) {
				this.stock = '请输入正确登录账号,6-20位字符，支持英文数字组合';
			} else {
				this.stock = '请输入正确登录密码,6-20位字符，支持英文数字组合';
			}
			this.child.exOuts();
			val = '';
		} else {
			val = event.target.value;
		}
		event.target.value = val;
	}
}