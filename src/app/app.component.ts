import { from } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../service/websocket.service';
import { Title } from '@angular/platform-browser'
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router'
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { routeAnimation } from './animations';
import { Observable } from 'rxjs/Rx';
import { PreloadingStrategy, Route } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	animations: [routeAnimation]
})
export class AppComponent {
	location: Location;
	route: string;
	routerState: boolean = true;
	constructor(public socket: WebsocketService, private router: Router, private titleService: Title, private activatedRoute: ActivatedRoute) {
	}
	ngOnInit() {
		this.router.events
			.filter(event => event instanceof NavigationEnd)
			.map(() => this.activatedRoute)
			.map(route => {
				while (route.firstChild) route = route.firstChild;
				return route;
			})
			.filter(route => route.outlet === 'primary')
			.mergeMap(route => route.data)
			.subscribe((event) => this.titleService.setTitle(event['title']));
	}
}
