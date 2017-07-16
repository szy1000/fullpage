//index
var index = {
	init: function () {
		require(['jquery','fullpage'],function($,full){
			$(document).ready(function(){
				$('.full').fullpage({
					sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90','#d30'],
					navigation: true,
					anchors: ['page1','page2','page3','page4','page5'],
					menu: '.menu',
					afterLoad: function(anchorLink,index){
						if(index == 1){
							$('.section1').addClass('on');
						}
					}
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
