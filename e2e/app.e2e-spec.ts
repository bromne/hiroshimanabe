import { HiroshimanabePage } from './app.po';

describe('hiroshimanabe App', () => {
  let page: HiroshimanabePage;

  beforeEach(() => {
    page = new HiroshimanabePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
