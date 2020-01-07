// Developer：July
// Date:
// Description：开奖结果

import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from './../../../service/websocket.service';
import { AlertComponent } from 'src/app/page/alert/alert.component';

@Component({
    selector: 'app-lottery-result',
    templateUrl: './lottery-result.component.html',
    styleUrls: ['./lottery-result.component.css']
})
export class LotteryResultComponent implements OnInit {
	@ViewChild('child')
	public child: AlertComponent;
	public Issue = '';//期号	
	public totalNum = 0;//数据总条数
	public totalPage = 0;//总页数
	private pageSizeNum = 10;
	public pageSize = this.pageSizeNum;//每页数据条数
	public pageData = this.pageSize;//每页数据
	public currentPage = 1;//当前页数
	public goPage ='';
    private resultList;
    public gameList;//玩法列表
    private gameKey = '';//gamekay
    public staus = false;
	public stock = "";//提示框
	public loadingDiv= true;//loading
	public lists=[];
	private preindex = null;
	private  newnum = [];
    private  gamename = '全部彩种';
    constructor(private socket: WebsocketService) {
    }
    ngOnInit() {
        this.officalResult();
	}
	//清空分页数据
	private emptyPage() {
		this.totalNum = 0;//数据总条数
		this.totalPage = 0;//总页数
		this.pageSize = this.pageSizeNum;//每页数据条数
		this.pageData = this.pageSize;//每页数据
		this.currentPage = 1;//当前页数
	}
    public sete(index) {
        if (this.preindex !== index) {
            this.gameList.forEach(element => {
                element.sate = false;
            });
            this.gameList[index].sate = !this.gameList[index].sate;
            this.preindex = index;
        } else {
            this.gameList[index].sate = !this.gameList[index].sate;
        }
    }
    public officalResult() {
		this.loadingDiv = true;
		this.emptyPage();
		this.lists = [];
        let data = `{}`;
        this.socket.ws_send(this.socket.WS_URL.result_list + "?" + 'v1', data, (res) => {
			this.loadingDiv = false;
            if (res.status == 200) {
                this.gameList = res.game_list;
				this.resultList = res.list;
				this.totalNum = this.resultList.length;
				this.totalPage = Math.ceil(this.totalNum / this.pageSizeNum);//总页数
				this.lists = this.resultList.slice(0, this.pageData);
                for (let index = 0; index < this.lists.length; index++) {
                    if (this.lists[index].game_name == "极速梯子" || this.lists[index].game_name == "五分梯子" || this.resultList[index].game_name == "三分梯子") {
                        this.newnum = this.lists[index].num.split(',');
                        if (this.newnum[0] == '1' && this.newnum[1] == '3') {
                            this.lists[index].num = ['左', '3', '双'];
                        } else if (this.newnum[0] == '1' && this.newnum[1] == '4') {
                            this.lists[index].num = ['左', '4', '单'];
                        } else if (this.newnum[0] == '2' && this.newnum[1] == '3') {
                            this.lists[index].num = ['右', '3', '单'];
                        } else if (this.newnum[0] == '2' && this.newnum[1] == '4') {
                            this.lists[index].num = ['右', '4', '双'];
                        }
                    }
                }
                this.gameList.forEach(e => {
                    e['sate'] = false;
                })
                if (this.resultList.length == 0) {
                    this.staus = true;
                }
            }
        })
    }
    //搜索
    public research() {
		this.emptyPage();
		this.staus = false;
		this.currentPage=1;
		this.pageSize=10;
		this.loadingDiv = true;
		this.lists=[];
		this.resultList='';
        let data = {game_key:this.gameKey,period:this.Issue.trim()};
        this.socket.ws_send(this.socket.WS_URL.result_list + "?" + 'v2', JSON.stringify(data), (res) => {
			this.loadingDiv = false;
            if (res.status == 200) {
				this.resultList = res.list;
				this.totalNum = this.resultList.length;
				this.totalPage = Math.ceil(this.totalNum / this.pageSizeNum);//总页数
				this.lists = this.resultList.slice(0, this.pageData);
                if (this.gamename == "极速梯子" || this.gamename == "五分梯子" || this.gamename == "三分梯子") {
                    this.lists.forEach(element => {
                        this.newnum = element.num.split(',');
                        if (this.newnum[0] == '1' && this.newnum[1] == '3') {
                            element.num = ['左', '3', '双'];
                        } else if (this.newnum[0] == '1' && this.newnum[1] == '4') {
                            element.num = ['左', '4', '单'];
                        } else if (this.newnum[0] == '2' && this.newnum[1] == '3') {
                            element.num = ['右', '3', '单'];
                        } else if (this.newnum[0] == '2' && this.newnum[1] == '4') {
                            element.num = ['右', '4', '双'];
                        }
                    })
                }
                if (this.lists.length == 0) {
                    this.staus = true;
                }
            }
			this.stock =  res.msg;
			this.child.exOuts();
        })
    }
    public getPageData(event) {
		this.pageSize = this.pageSizeNum;
		this.currentPage = event;
		this.pageSize = this.pageSizeNum * event;
		this.lists = this.resultList.slice((event-1)*this.pageSizeNum,event*this.pageSizeNum);
		if (this.gamename == "极速梯子" || this.gamename == "五分梯子" || this.gamename == "三分梯子") {
			this.lists.forEach(element => {
				this.newnum = element.num.split(',');
				if (this.newnum[0] == '1' && this.newnum[1] == '3') {
					element.num = ['左', '3', '双'];
				} else if (this.newnum[0] == '1' && this.newnum[1] == '4') {
					element.num = ['左', '4', '单'];
				} else if (this.newnum[0] == '2' && this.newnum[1] == '3') {
					element.num = ['右', '3', '单'];
				} else if (this.newnum[0] == '2' && this.newnum[1] == '4') {
					element.num = ['右', '4', '双'];
				}
			})
		}
    }
    public gameBtn(game_key, gamename, i, a) {
        this.newnum = [];
        this.gameKey = game_key;
        this.Issue = '';
        this.gamename = gamename;
        this.gameList.forEach(element => {
            element.game_list.forEach(ele => {
                ele.act = false;
            });
        });
        this.gameList[i].sate = true;
        this.gameList[i].game_list[a].act = true;
        this.research();
    }
}