import { Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class JumpService {
 public key = [];
 public names = [];
 public batch=[];
 public stock='';
  constructor(private router: Router) { }
  jumpPage(el,batch,callback){
	this.key = []
		this.names = []
		if (batch.length !== 0) {
			callback({pass:true})
		     batch.forEach(element => {
				this.key.push(element.site_key)
				this.names.push(element.site_name)
			});
			this.router.navigate([el], {
				queryParams: {
					sitekey: this.key,
					sitename: this.names,
					type: 1
				},
				skipLocationChange: true
			});
		} else {
			this.stock = '请选择站点';
			callback({pass:false,'msg':this.stock})
		}
  }
}
