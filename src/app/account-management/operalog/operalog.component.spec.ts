// Developer：July
// Date:
// Description：操作日志

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OperalogComponent } from './operalog.component';

describe('OperalogComponent', () => {
    let component: OperalogComponent;
    let fixture: ComponentFixture<OperalogComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OperalogComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(OperalogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
