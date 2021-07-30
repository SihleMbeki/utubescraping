
class Homepage{
    get searchbar(){return $("#search-form:nth-child(1) input")}
    submitsearchquery(key){
       // this.searchbar.waitForDisplayed(20000,true,"Search bar field not present");
        this.searchbar.waitForDisplayed();

        /*search query
         *@param key keyword search query
         */
        
        this.searchbar.setValue(key);
        browser.pause(1000);
        this.searchbar.keys("\uE007");
        browser.pause(5000);
    }

}
module.exports = new Homepage();