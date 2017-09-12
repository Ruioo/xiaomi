// 轮播图
var bannerIndex = 0;
var flag = true;
function banner(){
	flag = false;
	bannerIndex++;
	bannerIndex = bannerIndex==6 ? 0 : bannerIndex;
	bannerIndex = bannerIndex==-1 ? 5 : bannerIndex;
	$(".img-list a").eq(bannerIndex).stop().animate({'opacity':1})
					.siblings().stop().animate({'opacity':0},function(){
						flag = true;
					});
	// flag 用来判断移出时,是否消除current
	$('.picks-list li').eq(bannerIndex).addClass('picks-list-current flag')
					.siblings().removeClass('picks-list-current flag');
}
var bannerTimer = setInterval(banner,3000);
$('.picks-list li').click(function(){
	bannerIndex = $(this).index()-1;
	banner();	
}).mouseenter(function(){
	$(this).addClass('picks-list-current');
}).mouseleave(function(){
	if( $(this).hasClass('flag') ){
		return ;
	}else{
		$(this).removeClass('picks-list-current');
	}
})
$('.banner .container').mouseenter(function(){
	clearInterval(bannerTimer);
}).mouseleave(function(){
	bannerTimer = setInterval(banner,3000);
})
$('.banner .toLeft').click(function(){
	if( flag ){
		bannerIndex -= 2;
		banner();
	}
})
$('.banner .toRight').click(function(){
	if( flag ){
		banner();
	}
})

// 鼠标移入导航栏
$('.nav-item').mouseenter(function(){
	$(this).addClass('back')
		   .find('.nav-item-child').show();
}).mouseleave(function(){
	$(this).removeClass('back')
		   .find('.nav-item-child').hide();
})

// 获取数据存入nav列表
$.ajax({
	type : "GET",
	url : "../json/publicMainNav.json",
	dataType : "json",
	success : function(res){
		var data = {
			arr : []
		}
		var count = 0;
		for( var key in res ){
			data.arr = res[key];
			var html = template('header-nav-item',data);
			$('#main .nav-item').eq(count).find('ul').html(html);
			count++;
		}
		$('.nav-item-child input').each(function(){
			if( $(this).val() == "" ){
				$(this).remove();
			}
		})
	},
	error : function(){
		console.log("failed");
	}
})

// starone
setInterval(function(){
	if( $('.box').css("left") == '0px' ){
		$('.box').animate({
			'left' : -1235
		},700)
	}else{
		console.log(22)
		$('.box').animate({
			'left' : 0
		},1000)
	}
},4000)
$('.startOne .toLeft').click(function(){
	console.log( $('.box').position().left )
	if( $('.box').position().left != 0 ){
		$('.box').stop().animate({
			'left' : 0
		},500)
	}
})
$('.startOne .toRight').click(function(){
	if( $('.box').position().left != -1235 ){
		$('.box').stop().animate({
			'left' : -1235
		},500)
	}
})


