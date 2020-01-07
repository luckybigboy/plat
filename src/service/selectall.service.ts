import { Injectable } from '@angular/core';
import { callbackify } from 'util';

@Injectable({
  providedIn: 'root'
})
export class SelectallService {
  selallatate=false;
  batch=[];
  constructor() { }

  	//全选
	public selall(active, opelist,callback) {
		this.batch = []
		this.selallatate = active;
		opelist.forEach(e => {
			e.active = active;
			if (e.active == true) {
				this.batch.push(e)
			}
		})
		callback({'batchSet':this.batch,'seallatate':this.selallatate})
	}
	//单选
	public singelsel(str, i, opelist,callback) {
		let redio = [];
		this.batch=[];
		opelist[i].active = str;
		this.selallatate = true;
		opelist.forEach(e => {
			if (e.active == false) {
				this.selallatate = false;
			} else {
				redio.push(e)
			}
		})
		this.batch = redio
		callback({'batchSet':this.batch,'singelsel':this.selallatate})
	}
}
