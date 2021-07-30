const createCsvWriter = require('csv-writer').createObjectCsvWriter;
class Homepage{
    
    //search result
    get video(){return $("div#container video")}
    get comments(){return $$("ytd-comment-thread-renderer.ytd-item-section-renderer")}
  
  
    //Meta data
    get title(){return $("div#info-contents h1 yt-formatted-string")}
    get count(){return $("div#info-contents div#info div#count yt-view-count-renderer")}
    get date(){return $("div#info-contents div#info div#date yt-formatted-string")}
    get likes(){return $("(//div[@id='info-contents']//div[@id='info']//yt-formatted-string[@id='text'])[1]")}
    get repliesButton(){return $$("ytd-comment-thread-renderer.ytd-item-section-renderer div#replies ytd-button-renderer #button")}
    static viewRepliesButton(index){
      return $(`ytd-comment-thread-renderer.ytd-item-section-renderer:nth-child(${index}) div#replies ytd-button-renderer #button[aria-label ^='View']`);
    }
    static getreplycomments(index)
    {
      return $$(`ytd-comment-thread-renderer.ytd-item-section-renderer:nth-child(${index}) div#replies  #expander-contents ytd-comment-renderer`);
     }

    ExtractContent(){
     this.video.waitForDisplayed();
    //  this.textWrapper.waitForDisplayed();
    const filename = new Date();
    let file=filename.toDateString()
     const csvWriter = createCsvWriter({
        path: `C:\\Users\\sihle\\Documents\\WebdriverTestAutomation\\UtubeContentExtraction\\comments_${file}.csv`,
        header: [
            {id: 'comment', title: 'COMMENT'},
            {id: 'likes', title: 'LIKES'},
            {id: 'reply', title: 'REPLY'},
            {id: 'replylikes', title: 'Reply Likes'}
        ]
    });
    let i=0;
        let  records=null;
      // expect(this.comments).toBeExisting();
    let inx=1;
    let max=this.comments.length;
   /* while(inx<max){
    //this.comments.filter((element)=>{
      var elem = $('div#primary');
      // if(element.isExisting()){
        this.comments[inx].scrollIntoView();
        this.comments[inx].keys("\uE055");
        this.comments[inx].pause(1000);
        this.comments[inx].waitForDisplayed();
      inx=inx+1;
    }*/
    
    let index=1;
    max=this.comments.length;
    this.comments.filter((element)=>{
      var elem = $('div#primary');
      // if(element.isExisting()){
        element.scrollIntoView();
        element.waitForDisplayed();
       /* {id: 'comment', title: 'COMMENT'},
       {id: 'likes', title: 'LIKES'},
       {id: 'reply', title: 'REPLY'},
       {id: 'replylikes', title: 'Reply Likes'}
       */

       //comments likes span#vote-count-middle
       let likes=element.$("span#vote-count-middle");
       //comment text yt-formatted-string#content-text
       let comment=element.$("yt-formatted-string#content-text");
       //aria-label div#replies ytd-button-renderer #button
       let replies=null;
       /*if(this.comments[index].$("div#replies ytd-button-renderer #button").isExisting()){
       replies=this.comments[index].$("div#replies ytd-button-renderer #button");
      }*/
       //expanded content
       //array after clicking expan content  div#replies  #expander-contents
       /*if(replies.isExisting()){
       let replies=element.$("div#replies  #expander-contents"); // visible or not
       }
       //aria-label expanded likes vote-count-left
       if(replies.isExisting()){
       let repliesCommentLikes=replies.$("#vote-count-left");
      }
              //#expander
              if(replies.isExisting()){
        let repliesCommentLikes=replies.$("#expander");
              }*/
          /* records= [{comment: comment.getText(),  likes: likes.getText(),reply:repliesComment,replylikes:repliesCommentLikes}];//[{title: 'TITLE',count: 'COUNT',date: 'DATE',likes:"test"}];
           csvWriter.writeRecords(records)       // returns a promise
           .then(() => {
               console.log('...Done');
           });*/
let commentmessage= comment.getText();
let commentLikes=likes.getText();
console.log(i);
browser.pause(1000);
records= [{comment: commentmessage,  likes:  commentLikes,reply:"repliesComment",replylikes:"repliesCommentLikes"}];//[{title: 'TITLE',count: 'COUNT',date: 'DATE',likes:"test"}];
            csvWriter.writeRecords(records)       // returns a promise
            .then(() => {
                console.log('...Done');
            });

          if(Homepage.viewRepliesButton(index).isExisting()){
            replies=Homepage.viewRepliesButton(index);
            replies.scrollIntoView();
            browser.pause(1000);
            replies.waitForDisplayed();
            replies.waitForClickable();
            replies.click();
            browser.pause(5000);
            // browser.waitUntil(function() {
            //return Homepage.getreplycomments(index).isExisting===true;});
          // Homepage.getreplycomments(index).waitForDisplayed;
            //Homepage.getreplycomments(index).scrollIntoView;
           
           let maxR=Homepage.getreplycomments(index).length;
            let x=0;
            if(maxR>0){
          //  while(x<maxR){/
            Homepage.getreplycomments(index).filter((reply)=>{
              console.log(x);
            let repliesCommentLikes=reply.$("#vote-count-left").getAttribute("aria-label");
            let repliesComment=reply.$("#expander").getText();
            records= [{comment:"",  likes: "",reply:repliesComment,replylikes:repliesCommentLikes}];//[{title: 'TITLE',count: 'COUNT',date: 'DATE',likes:"test"}];
           csvWriter.writeRecords(records)       // returns a promise
           .then(() => {
               console.log('...Done');
           });
        //     x=x+1;
        //     records=null;
            });
         }
        }//else{
        //     records= [{comment: commentmessage,  likes:  commentLikes,reply:"repliesComment",replylikes:"repliesCommentLikes"}];//[{title: 'TITLE',count: 'COUNT',date: 'DATE',likes:"test"}];
        //     csvWriter.writeRecords(records)       // returns a promise
        //     .then(() => {
        //         console.log('...Done');
        //     });
        //    //elem.keys("\uE00D");
        //    records=null;
        //   }
          i=i+1;
          index=index+1;
      });
    }

}
module.exports = new Homepage();