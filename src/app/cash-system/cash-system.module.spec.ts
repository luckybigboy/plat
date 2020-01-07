import { CashSystemModule } from './cash-system.module';

describe('CashSystemModule', () => {
    let cashSystemModule: CashSystemModule;
    beforeEach(() => {
        cashSystemModule = new CashSystemModule();
    });
    it('should create an instance', () => {
        expect(cashSystemModule).toBeTruthy();
    });
});
