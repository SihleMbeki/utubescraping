const createCsvWriter = require('csv-writer').createObjectCsvWriter;
class Trends{
   static  nametest="//yt-formatted-string[text()='Trending']";
    get menuBurgure(){return $("#guide-button [aria-label='Guide'] #guide-icon") }
    get trending(){return $("ytd-destination-button-renderer > #destination-content-root[href ^='/feed/trending']")}
    get videTitle(){return $("a#video-title")}
    get videTitleText(){return $("a#video-title yt-formatted-string")}
    get exploreSideBar(){return $("//yt-formatted-string[contains(@class,ytd-guide-entry-renderer) and text()='Explore']")}
    get videoViews(){return $("div#metadata #metadata-line span:nth-child(1)")}
    get videoPublishDuration(){return $("div#metadata #metadata-line span:nth-child(2)")}
    get exploreButton(){return $("//yt-formatted-string[text()='Trending']")}////yt-formatted-string[text()='Popular']

    Trends(){
    this.explore=$("//yt-formatted-string[text()='Trending']"); //"//*[text()='Popular'])[1]|//yt-formatted-string[text()='Trending']";
    this.trendingTitle="div#channel-header-container #text";
    }
    get results(){return $$("div#contents>ytd-item-section-renderer>#contents #grid-container ytd-video-renderer")}

    navigateToTrends() {
        browser.url("/");
       this.menuBurgure.waitForDisplayed({ timeout: 3000 });
       browser.waitUntil(()=> {
        return  this.menuBurgure.waitForDisplayed({ timeout: 3000 })===true;
         //return this.explore.getText()==='Trending';
     },10000,'burger button');
      // this.menuBurgure.click(); 
       browser.waitUntil(()=> {
        return $(this.exploreSideBar).getText()==="Explore";
         //return this.explore.getText()==='Trending';
     },10000,'Explore button');
       this.exploreSideBar.click();
       browser.waitUntil(()=> {
          return $(Trends.nametest).getText()==="Trending";
           //return this.explore.getText()==='Trending';
       },10000,'Explore button');
       this.exploreButton.waitForDisplayed({ timeout: 3000 });
       this.exploreButton.click();
       browser.pause(30000);
    }
 

     extractTrends () {
        let  records=null;
        const filename = new Date();
        let file=filename.getUTCMilliseconds();
        const csvWriter = createCsvWriter({
            path: `C:\\Users\\sihle\\Documents\\WebdriverTestAutomation\\UtubeContentExtraction\\searchResult_${file}.csv`,
            header: [
                {id: 'title', title: 'TITLE'},
                {id: 'link', title: 'LINK'}, {id: 'time', title: 'TIME'},
                {id: 'views', title: 'VIEWS'}
            ]
        });
        this.results.filter((element)=>{
           let text=element.$("div#title-wrapper h3").getText();
           let link=element.$("div#title-wrapper a").getProperty('href');
           let views=element.$("ytd-video-meta-block div#metadata-line span:nth-child(1)").getText();
           let time=element.$("ytd-video-meta-block div#metadata-line span:nth-child(2").getText();
           console.log(text);
          // browser.pause(30000);

           records= [{title: text,views: views,time: time,link: link}];//[{title: 'TITLE',count: 'COUNT',date: 'DATE',likes:"test"}];
           csvWriter.writeRecords(records)       // returns a promise
           .then(() => {
               console.log('...Done');
           });
        })
        
     }
}
module.exports = new Trends();