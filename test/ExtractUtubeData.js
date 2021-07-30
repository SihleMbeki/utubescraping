const homepage = require('./pageobjects/home.page');
const resultpage = require('./pageobjects/result.page');
const data=require("./data/testData");



describe('Extract Youtube content', () => {
    it('should submit search query', () => {
        browser.url("/");
        expect(homepage.searchbar).toBeExisting();
        homepage.submitsearchquery(data.keyword);
       // expect(SecurePage.flashAlert).toHaveTextContaining(
           // 'You logged into a secure area!');
    });

    it('should extract result list', () => {
    expect(resultpage.filter).toBeExisting();
       resultpage.ExtractContent();
    });
});


