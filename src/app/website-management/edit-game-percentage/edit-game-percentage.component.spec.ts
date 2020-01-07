// Developer：July
// Date:
// Description：修改站点游戏提成比例

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditGamePercentageComponent } from './edit-game-percentage.component';

describe('EditGamePercentageComponent', () => {
    let component: EditGamePercentageComponent;
    let fixture: ComponentFixture<EditGamePercentageComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditGamePercentageComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(EditGamePercentageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
