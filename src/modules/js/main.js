//index
var index = {
	init: function () {
		require(['jquery','fullpage'],function($,full){
			$(document).ready(function(){
				$('.full').fullpage({
					sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90'],
					navigation: true
				})
			})
		})
	}
}
//about
var about = {
	init: function(num) {
		require(['jquery'],function($){
			$(document).ready(function(){
				console.log(num)
			})
		})
	}
}

exports.index = index;
exports.about = about;