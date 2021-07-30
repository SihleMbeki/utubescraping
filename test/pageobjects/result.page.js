const createCsvWriter = require('csv-writer').createObjectCsvWriter;
class Homepage{
    
    //search result
    get filter(){return $("#filter-menu:nth-child(1)")}
    get resultContainerParent(){return $("(//div[@id='filter-menu']//ancestor::div[@id='header-container']/following-sibling::div)[1]")}
    get textWrapper(){ return this.resultContainerParent.$$("//div[@class='text-wrapper style-scope ytd-video-renderer']//h3/a")}
  
  
    //Meta data
    get title(){return $("div#info-contents h1 yt-formatted-string")}
    get count(){return $("div#info-contents div#info div#count yt-view-count-renderer")}
    get date(){return $("div#info-contents div#info div#date yt-formatted-string")}
    get likes(){return $("(//div[@id='info-contents']//div[@id='info']//yt-formatted-string[@id='text'])[1]")}
    

    ExtractContent(){
     this.filter.waitForDisplayed();
     this.resultContainerParent.waitForDisplayed();
    //  this.textWrapper.waitForDisplayed();
    const filename = new Date();
    let file=filename.toDateString()
     const csvWriter = createCsvWriter({
        path: `C:\\Users\\sihle\\Documents\\WebdriverTestAutomation\\UtubeContentExtraction\\searchResults_${file}.csv`,
        header: [
            {id: 'title', title: 'TITLE'},
            {id: 'count', title: 'COUNT'},
            {id: 'date', title: 'DATE'},
            {id: 'likes', title: 'LIKES'},
            {id: 'url', title: 'URL'}
        ]
    });

    let filledArray = new Array(10);
    //const records = new Array(45);
    //let records=[];
    let i=0;
   
    //  browser.pause(7000);

          
          //records[i] =  {title: this.title.getText(),  count: this.count.getText(),date:this.date.getText(),likes:this.likes.getText()}
        let  records=null;
      
      i++;
       // browser.newWindow("https://www.google.com", 'WebdriverIO window', 'width=420,height=230,resizable,scrollbars=yes,status=1')
         // // browser.closeWindow();
           ////browser.switchWindow(url);
       //    browser.pause(10000);


     this.textWrapper.filter((element)=>{
            let href;
            href=element.getProperty('href');
            browser.url(href);
          
           records= [{title: this.title.getText(),  count: this.count.getText(),date:this.date.getText(),likes:this.likes.getText(),url:href}];//[{title: 'TITLE',count: 'COUNT',date: 'DATE',likes:"test"}];
           csvWriter.writeRecords(records)       // returns a promise
           .then(() => {
               console.log('...Done');
           });
 
           records=null;

   // browser.closeWindow()
   browser.back();
      })
    }

}
module.exports = new Homepage();