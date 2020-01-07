import { NgModule, Directive } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EchartsNg2Module } from 'echarts-ng2';
import { AccountManagementComponent } from './account-management.component';
import { IndexComponent } from './index/index.component';
import { OperalogComponent } from './operalog/operalog.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';
import { PageModule } from '../page/page.module';
import { LoginComponent } from '../account-management/login/login.component';

const routes: Routes = [
	{ path: '', redirectTo: '/login', pathMatch: 'full' },
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'home',
		component: IndexComponent,
		data: {
			title: '首页'
		}
	}, {
		path: 'operalog',
		component: OperalogComponent,
		data: {
			title: '操作日志'
		}
	}, {
		path: 'employee-management',
		component: EmployeeManagementComponent,
		data: {
			title: '员工管理'
		}
	}, {
		path: 'role-management',
		component: RoleManagementComponent,
		data: {
			title: '角色管理'
		}
	}, {
		path: 'change-pwd',
		component: ChangePwdComponent,
		data: {
			title: '修改密码'
		}
	}
]
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		EchartsNg2Module,
		RouterModule.forChild(routes),
		PageModule,
	],
	declarations: [
		AccountManagementComponent,
		IndexComponent,
		OperalogComponent,
		EmployeeManagementComponent,
		RoleManagementComponent,
		LoginComponent,
		ChangePwdComponent,
	],
	providers: [
	]
})
export class AccountManagementModule { }