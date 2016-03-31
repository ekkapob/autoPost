var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
var wd = require('wd');
chaiAsPromised.transferPromiseness = wd.transferPromiseness;
var config = require('./config');

var headless = true;
var browser = headless ? wd.promiseChainRemote('localhost', 9134) : wd.promiseChainRemote();

var postId = config.postId;
var prakard = {
  url: config.url + postId,
  usr: config.username,
  pwd: config.password
}

var browserName = headless ? 'phantomjs' : 'chrome';

browser
  .init({browserName: browserName})
  .get(prakard.url)
  .then(login)
  .elementById('forum_ctl00_PostReplyLink1').click()
  .then(postReply)
  .fin(function(){ return browser.quit(); })
  .done();

function login(){
  return browser
    .elementById('forum_ctl00_UserName').type(prakard.usr)
    .elementById('forum_ctl00_Password').type(prakard.pwd)
    .elementById('forum_ctl00_ForumLogin').click();
}

function postReply(){
  return browser
    .elementById('forum_ctl00_edit').type(':-p')
    .elementById('forum_ctl00_PostReply').click();
}
