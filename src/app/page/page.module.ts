import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
import { FormsModule } from '@angular/forms';
import { TochinesePipe, StringPiPipe, lotteryDicPiPipe, gameDicyPipe, gamelistsPipe, NumberPipe, threegameDicyPiPipe } from './common/pipe.pipe';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule
	],
	exports: [
		PaginationComponent,
		AlertComponent,
		TochinesePipe, StringPiPipe, lotteryDicPiPipe, gameDicyPipe, gamelistsPipe, NumberPipe,
		threegameDicyPiPipe
	],
	declarations: [PaginationComponent, AlertComponent, TochinesePipe, StringPiPipe, lotteryDicPiPipe, gameDicyPipe, gamelistsPipe, NumberPipe, threegameDicyPiPipe]
})
export class PageModule { }