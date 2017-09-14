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
// part1
// $('.part1 .container>a>img').mouseenter(function(){
// 	$(this).css('boxShadow', '0 15px 30px rgba(0,0,0,0.3)')
// })

// 明星单品
setInterval(function(){
	if( $('.startOne .box').css("left") == '0px' ){
		$('.startOne .box').animate({
			'left' : -1235
		},700,function(){
			$('.startOne .toLeft').css('color','#666')
			$('.startOne .toRight').css('color','#ccc')
		})
	}else{
		$('.startOne .box').animate({
			'left' : 0
		},1000,function(){
			$('.startOne .toLeft').css('color','#ccc')
			$('.startOne .toRight').css('color','#666')
		})
	}
},4000)
$('.startOne .toLeft').click(function(){
	if( $('.startOne .box').position().left != 0 ){
		$('.startOne .box').stop().animate({
			'left' : 0
		},500,function(){
			$('.startOne .toLeft').css('color','#ccc')
			$('.startOne .toRight').css('color','#666')
		})
	}
})
$('.startOne .toRight').click(function(){
	if( $('.startOne .box').position().left != -1235 ){
		$('.startOne .box').stop().animate({
			'left' : -1235
		},500,function(){
			$('.startOne .toLeft').css('color','#666')
			$('.startOne .toRight').css('color','#ccc')
		})
	}
})

// 产品的特效
// 移入小导航进行切换
$('.allProducts .prod-title').find('li').mouseenter(function(){
	$(this).css('color',' #ff6700').stop().animate({
		'borderColor' : '#ff6700'
	},300).siblings().css('color','#000').stop().animate({
		'borderColor' : '#f5f5f5'
	},300);
	
})


// 获取产品json 存入产品列表
$.ajax({
	type : "GET",
	url : "../json/indexProducts.json",
	dataType : "json",
	success : function(res){
		var data = {
			arr : []
		}
		var count = 0;
		for( var key1 in res ){
			for( var key2 in res[key1] ){
				if( key2 == "热门" ){
					data.arr = res[key1][key2];
					var html = template('all-products-info',data);
					$('.allProducts').find('.infoList').eq(count).find('ul').prepend(html);
					count++;
				}
			}
		}
		// 鼠标移入切换
		$('.prod-title li').mouseenter(function(){

			var data = {
				arr : []
			};
			var index = $(this).index();
			var type = $(this).parent().prev().html();
			var name = $(this).html();
			console.log(type) 
			for( var i in res ){
				if( i == type ){
					for( var j in res[i] ){
						if( j == name ){
							$(this).parent().parent().next().find('li').not(':last').remove();
							data.arr = res[i][j];
							var html = template('all-products-info',data);
							$(this).parent().parent().next().find('ul').prepend(html);
						}
					}
				}
			}
			// 去除内容为空的 flag
			$('.allProducts .flag').each(function(){
				if( $(this).html() == "" ){
					$(this).remove()
				}
			})
		})
		// 去除内容为空的 flag
		$('.allProducts .flag').each(function(){
			if( $(this).html() == "" ){
				$(this).remove()
			}
		})
		// 移入产品上出现评论
		$('.infoList li').hover(function(){
			$(this).find('.comment').stop().animate({
				'bottom' : 0
			},200)
		},function(){
			$(this).find('.comment').stop().animate({
				'bottom' : -75
			},200)
		})
	},
	error : function(){
		console.log("failed")
	}
})

// 为你推荐
$('.recommend .toLeft').click(function(){
	if( $('.recommend .box').position().left != 0 ){
		$('.recommend .box').stop().animate({
			'left' : 0
		},500,function(){
			$('.recommend .toLeft').css('color','#ccc')
			$('.recommend .toRight').css('color','#666')
		})
	}
})
$('.recommend .toRight').click(function(){
	if( $('.recommend .box').position().left != -1235 ){
		$('.recommend .box').stop().animate({
			'left' : -1235
		},500,function(){
			$('.recommend .toLeft').css('color','#666')
			$('.recommend .toRight').css('color','#ccc')
		})
	}
})

// 内容的左右移动
var conIndex = 0;
var conflag = true;
$('.content-list li').click(function(){
	$(this).stop().animate({
		'borderColor' : '#ff6700',
		'backgroundColor' : '#fff'
	},50).siblings().stop().animate({
		'borderColor' : '#fff',
		'backgroundColor' : '#b0b0b0'
	},50)
	conIndex = $(this).index();
	$(this).parent().prev().animate({
		'left' : -295*conIndex
	})
})
// 左右出现
$('.content-info>li').hover(function(){
	$(this).find('.toLeft,.toRight').stop().fadeIn()
},function(){
	$(this).find('.toLeft,.toRight').stop().fadeOut()
})
// 点击左右移动
$('.content-info .toLeft').click(function(){
	if( conflag ){
		conIndex = Math.abs( parseInt( $(this).parent().find('.content').css('left') )/295 );
		conIndex--;
		conIndex = conIndex==-1 ? 0 : conIndex;
		$(this).parent().find('.content').stop().animate({
			'left' : -295*conIndex
		},function(){
			conflag = true;
		})
		$(this).parent().find('.content-list').find('li').eq(conIndex).stop().animate({
			'borderColor' : '#ff6700',
			'backgroundColor' : '#fff'
		},50).siblings().stop().animate({
			'borderColor' : '#fff',
			'backgroundColor' : '#b0b0b0'
		},50)
		conflag=false;
	}
})
$('.content-info .toRight').click(function(){
	if( conflag ){
		var count = $(this).parent().find('.content-list').find('li').size()-1;
		conIndex = Math.abs( parseInt( $(this).parent().find('.content').css('left') )/295 );
		conIndex++;
		conIndex = conIndex==count+1 ? count : conIndex;
		
		$(this).parent().find('.content').stop().animate({
			'left' : -295*conIndex
		},function(){
			conflag = true;
		})
		$(this).parent().find('.content-list').find('li').eq(conIndex).stop().animate({
			'borderColor' : '#ff6700',
			'backgroundColor' : '#fff'
		},50).siblings().stop().animate({
			'borderColor' : '#fff',
			'backgroundColor' : '#b0b0b0'
		},50)
		conflag=false;
	}
})

// video
$('.movie-box').find('i').click(function(){
	var index = $(this).parent().index();
	$('.video').show().find('div').eq(index).fadeIn(800)
})
$('.video').find('i').click(function(){
	$(this).parent().parent().fadeOut(800).parent().fadeOut(800);
})
$('.movie-box i').hover(function(){
	$(this).stop().animate({
		'color' : '#ff6700',
	},200)
},function(){
	$(this).stop().animate({
		'color' : '#fff',
	})
},200)
