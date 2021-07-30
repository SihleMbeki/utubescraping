const homepage = require('./pageobjects/home.page');
const videoPage = require('./pageobjects/comments.page');
const data=require("./data/testData");



describe('Extract video comments', () => {
    it('navigate to the video URL', () => {
        browser.url("https://www.youtube.com/watch?v=JO0KjMapUqY&list=RDJO0KjMapUqY&start_radio=1");
       // browser.windowHandleMaximize('{'+windowHandle.value+'}');
        var elem = $('div#primary');
       // elem.scroll(10, 2500);
        /*    browser.keys("\uE055");
        browser.keys("\uE05B");*/
       /* browser.waitUntil(function () {
			returnvideoPage.video.isExisting() === true;
		}, 12000, 'expected text to be different!');*/
        elem.keys("\uE055");
        browser.pause(10000);
       // expect(videoPage.video).toBeExisting();
       elem.keys("\uE00D");
       let i=0;
       while(i<20){
        elem.keys("\uE055");
        i=i+1;
       }

       // expect(SecurePage.flashAlert).toHaveTextContaining(
           // 'You logged into a secure area!');
    });

    it('should extract comments list', () => {
        videoPage.ExtractContent();
    });
});


