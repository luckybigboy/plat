import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
	@Input() fromFatherValue;
	@Input() stock;
	constructor() {
	}
	exOuts() {
		$('#exportOut').modal('show');
		setTimeout(function () {
			$("#exportOut").modal("hide")
		}, 1500)
	}
	public tip() {
		console.log('这是一段');
	}
	ngOnInit() {
	}
}