import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CashSystemComponent } from './cash-system.component';
import { ThirdPaymentComponent } from './third-payment/third-payment.component';
import { PageModule } from '../page/page.module';

const routes: Routes = [
	{
		path: 'third-payment',
		component: ThirdPaymentComponent,
		data: {
			title: '第三方支付方式列表'
		}
	}
]
@NgModule({
	imports: [
		CommonModule,
		PageModule,
		RouterModule.forChild(routes)
	],
	declarations: [CashSystemComponent, ThirdPaymentComponent],
	providers: [
	]
})
export class CashSystemModule { }