import { LotteryManagementModule } from './lottery-management.module';

describe('LotteryManagementModule', () => {
    let lotteryManagementModule: LotteryManagementModule;
    beforeEach(() => {
        lotteryManagementModule = new LotteryManagementModule();
    });
    it('should create an instance', () => {
        expect(lotteryManagementModule).toBeTruthy();
    });
});
