var webdriver = require('selenium-webdriver');
var driver = new webdriver.Builder().
   withCapabilities(webdriver.Capabilities.chrome()).
   build();

var url = "http://www.prakard.com/default.aspx?g=login&ReturnUrl=%2fdefault.aspx%3fg%3dposts%26t%3d641118";
var login = {
	usr: "ekkapob",
	pwd: "5QjTcfl0"
};

driver.get(url);
driver.findElement(webdriver.By.id('forum_ctl00_UserName')).sendKeys(login.usr);
driver.findElement(webdriver.By.id('forum_ctl00_Password')).sendKeys(login.pwd);
driver.findElement(webdriver.By.id('forum_ctl00_ForumLogin')).click().then(clickReply);

function clickReply(){
	driver.findElement(webdriver.By.id('forum_ctl00_PostReplyLink1')).click().then(postReply);
}

function postReply(){
	driver.findElement(webdriver.By.id('forum_ctl00_edit')).sendKeys(":-p");
	// POST
	// driver.findElement(webdriver.By.id('forum_ctl00_PostReply')).click().then(quit);
	quit();
}

function quit(){
	driver.quit();
}