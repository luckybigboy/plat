// Developer：July
// Date:
// Description：公共分页

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
	@Input() pageParams;
	@Output() changeCurPage: EventEmitter<Number> = new EventEmitter;
	public pageNo = 1;//当前页数
	public nextconsole: boolean = false;
	public preconsole: boolean = false;
	public size = 10;
	public showPage: any;
	private showPageNum: number = 5;
	public inputNum: number;
	public point: boolean = false;
	constructor() {
	}
	ngOnInit() {
		//判断传过来的totalNum总条数为０或者undefined时禁用分页按钮鼠标点击
		if (this.pageParams.totalNum == 0 || this.pageParams.totalNum == undefined) {
			this.point = true;
		}
	}
	public onInput(event) {
		this.inputNum = event;
	}
	public onLimit(event) {
		if (!event) {
			return;
		}
		const target = event.target;
		const regexp = /[^0-9]/ig;
		target.value = target.value.replace(regexp, '');
		if (this.inputNum < 1) {
			target.value = 1;
		}
		if (this.inputNum > this.pageParams.totalpage) {
			target.value = this.pageParams.totalpage;
		}
	}
	//组件值改变触发分页页数改变
	ngOnChanges() {
		//判断传过来的totalNum总条数不为０或者undefined时开启分页按钮鼠标点击
		if (this.pageParams.totalNum == 0 || this.pageParams.totalNum == undefined) {
			this.point = true;
		} else {
			this.point = false;
		}
		this.pageNo = this.pageParams.currentPage;
		this.pageChange(this.showPageNum);
		if (isNaN(this.pageParams.totalpage)) {
			this.pageParams.totalpage = 0;
		}
	}
	public nextPage() {
		if (this.pageParams.totalpage == 0) {
			this.pageNo = 0;
		} else {
			if (this.pageParams.currentPage >= this.pageParams.totalpage) {
				this.pageNo = this.pageParams.totalpage;
			} else {
				this.pageNo += 1;
			}
			this.changeCurPage.emit(this.pageNo);
		}
	}
	public prePage() {
		if (this.pageParams.totalpage == 0) {
			this.pageNo = 0;
		} else {
			if (this.pageParams.currentPage != 1) {
				this.pageNo -= 1;
				if (this.pageNo < 1) {
					this.pageNo = 1;
				}
			} else {
				this.pageNo = 1;
			}
			this.changeCurPage.emit(this.pageNo);
		}
	}
	private pageChange(num = 5) {//可选参数 默认显示页数为5
		this.showPage = [];
		let pageCenter = Math.ceil(num / 2);//位于中心的页数
		if (this.pageParams.totalNum == 0) {
			this.pageNo = 0;
		}
		if (this.pageParams.totalpage <= num) {
			for (let i = 1; i <= this.pageParams.totalpage; i++) {
				this.showPage.push({ showPageSize: i });
			}
		} else if (this.pageParams.totalpage > num) {
			if (this.pageNo < num) {
				if (this.pageNo <= 1) {
					for (let i = 1; i <= num; i++) {
						this.showPage.push({ showPageSize: i });
					}
				} else if (this.pageNo <= pageCenter && this.pageNo > 1) {
					let i;
					for (let j = 1; j <= num; j++) {
						i = j - pageCenter;
						if (this.pageNo + i > 0) {
							this.showPage.push({ showPageSize: this.pageNo + i });
						}
					}
					for (let k = num; k > num - i; k--) {
						this.showPage[k - 1] = { showPageSize: k }
					}
				} else {
					let i;
					for (let j = 1; j <= num; j++) {
						i = j - pageCenter;
						if (this.pageNo + i > 0) {
							this.showPage.push({ showPageSize: this.pageNo + i });
						}
					}
				}
			} else if (this.pageNo >= this.pageParams.totalpage) {
				for (let i = 0; i < num; i++) {
					this.showPage.unshift({ showPageSize: this.pageNo - i })
				}
			} else if (this.pageParams.totalpage - this.pageNo < pageCenter) {
				for (let i = 0; i <= this.pageParams.totalpage - this.pageNo; i++) {
					this.showPage.unshift({ showPageSize: this.pageParams.totalpage - i });
				};
				for (let j = 1; j < num - (this.pageParams.totalpage - this.pageNo); j++) {
					this.showPage.unshift({ showPageSize: this.pageNo - j });
				}
			} else {
				for (let i = 0; i < pageCenter; i++) {
					this.showPage.push({ showPageSize: this.pageNo + i });
				}
				for (let j = 1; j < pageCenter; j++) {
					this.showPage.unshift({ showPageSize: this.pageNo - j });
				}
			}
		}
	}
	public firstPage() {
		this.pageParams.currentPage = 1;
		this.changeCurPage.emit(this.pageParams.currentPage);
		this.pageNo = this.pageParams.currentPage;
		this.pageChange(this.showPageNum);
	}
	public lastPage() {
		this.pageNo = this.pageParams.totalpage;
		this.pageParams.currentPage = this.pageNo;//当前页   
		this.changeCurPage.emit(this.pageParams.currentPage);
	}
	public showPageTo(pageSize) {
		this.pageNo = pageSize;
		this.pageParams.currentPage = this.pageNo;//当前页   
		this.changeCurPage.emit(this.pageParams.currentPage);
	}
	public gotoPage($event) {
		var keycode = $event.code;
		const target = $event.target;
		if (keycode == "Enter") {
			if ($event.path[0].value > 0 && $event.path[0].value <= this.pageParams.totalpage) {
				this.pageParams.goPage = $event.path[0].value;
				this.pageNo = parseInt($event.path[0].value);
				this.pageParams.currentPage = this.pageNo;//当前页   
				this.changeCurPage.emit(this.pageParams.currentPage);
				$event.path[0].value = '';
				this.pageChange(this.showPageNum);
			}
		}
	}
	getPageList() {
		this.pageParams = eval("this.pageParams");
		let pageList = [];
		if (this.pageParams.totalpage <= this.pageParams.pageData) {  //如果总数小于pageData，直接将代码放进去
			//如果总数大于pageData，不用进来
			for (let i = 0; i < this.pageParams.totalpage; i++) {
				pageList.push({
					pageNo: i + 1
				})
			}
		} else if (this.pageParams.totalpage - this.pageParams.currentPage < this.pageParams.totalpage && this.pageParams.currentPage > this.pageParams.totalpage - 1) {
			//如果总的页码数减去当前页码数小于数差，那么直接计算出来显示
			for (let i = this.pageParams.currentPage; i > this.pageParams.totalpage - this.pageParams.currentPage; i--) {
				pageList.push({
					pageNo: this.pageParams.totalpage - i + 1
				})
			}
		} else {
			//在中间的页码数
			pageList.push({
				pageNo: this.pageParams.goPage
			})
		}
		return pageList;
	}
}