import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { EchartsNg2Module } from 'echarts-ng2';
import { AccountManagementModule } from './account-management/account-management.module';
import { WebsocketService } from '../service/websocket.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import {CrcService} from '../service/crc';
import {GetExportServiceService} from '../service/get-export.service.service'

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidebarComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        HttpModule,
        AccountManagementModule,//首页
        FormsModule,
        EchartsNg2Module,//echart的插件
    ],
    providers: [
        WebsocketService,
		CrcService,
		GetExportServiceService,
        { provide: LocationStrategy, useClass: HashLocationStrategy, }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
    }
    ngOnInit() {
    }
}
