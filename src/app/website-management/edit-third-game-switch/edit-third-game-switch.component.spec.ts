// Developer：July
// Date:
// Description：修改第三方游戏开关-详情

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditThirdGameSwitchComponent } from './edit-third-game-switch.component';

describe('EditThirdGameSwitchComponent', () => {
    let component: EditThirdGameSwitchComponent;
    let fixture: ComponentFixture<EditThirdGameSwitchComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditThirdGameSwitchComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(EditThirdGameSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
