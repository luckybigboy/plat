import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-account-management',
	templateUrl: './account-management.component.html',
	styleUrls: ['./account-management.component.css'],
})
export class AccountManagementComponent implements OnInit {
	public admin;
	user = '请先登录'
	constructor() {
	}
	ngOnInit() {
		window.localStorage.getItem('key')
		window.localStorage.getItem('online')
		window.localStorage.getItem('line')
	}
}
