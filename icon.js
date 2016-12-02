var cheerio = require('cheerio');  //string转html,类jQuery
var fs = require("fs") ;

function getAllFiles(root) {
  var result = [], files = fs.readdirSync(root)
  files.forEach(function(file) {
    var pathname = root+ "/" + file
      , stat = fs.lstatSync(pathname)
    if (stat === undefined) return
 
    // 不是文件夹就是文件
    if (!stat.isDirectory()) {
      result.push(pathname)
    // 递归自身
    } else {
      result = result.concat(getAllFiles(pathname))
    }
  });
  return result
}

function filterContent(html){
	var $ = cheerio.load(html);
	var list = $('.home-main').find('li');

	var content = [];

	list.each(function(t){
		var ele = $(this);
		var title = ele.find('strong').find('a').text();
		var text = ele.find('.text').text();

		var eleD = {
			title:title,
			text:text
		};

		content.push(eleD);
	});
	return content;
}

fs.readFile("icon","utf8",function (error,data){
	if(error) throw error ;
	
	var html = ''

	var content = filterContent(html);
	console.log(content);
	
	fs.writeFile("bb.svg",content,function (err) {
    	if (err) throw err ;
	   console.log("File Saved !"); //文件被保存
	}) ;
})
