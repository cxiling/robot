var http = require('http');
var cheerio = require('cheerio');  //string转html,类jQuery
var iconv = require('iconv-lite');  //转码
var url = 'http://bbs.uc.cn';  //uc官网论坛

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

http.get(url, function(res) {
	var html = '';

	res.on('data', function(data) {
		html += iconv.decode(data, 'gb2312');
	});

	res.on('end', function() {
		var content = filterContent(html);
		console.log(content);
	});
}).on('error', function() {
	console.log('访问失败')
});
