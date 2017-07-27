import { EmployeeManagementPage } from './app.po';

describe('employee-management App', () => {
  let page: EmployeeManagementPage;

  beforeEach(() => {
    page = new EmployeeManagementPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
