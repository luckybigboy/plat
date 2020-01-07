import { WebsiteManagementModule } from './website-management.module';

describe('WebsiteManagementModule', () => {
    let websiteManagementModule: WebsiteManagementModule;
    beforeEach(() => {
        websiteManagementModule = new WebsiteManagementModule();
    });
    it('should create an instance', () => {
        expect(websiteManagementModule).toBeTruthy();
    });
});
