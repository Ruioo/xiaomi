

$('#topbar').load('../html/public.html .topbar',function(){
	// 鼠标移入移出购物车效果
	$('.topbar-cart').mouseenter(function(){
		$(this).css({
			'color' : '#ff6700',
			'background' : '#fff'
		})
		$('.cart-menu').stop().slideDown();
	}).mouseleave(function(){
		$('.cart-menu').stop().slideUp(function(){
			$('.topbar-cart').css({
				'color' : '#b0b0b0',
				'background' : '#424242'
			})
		});
	})
})
$('#header').load('../html/public.html .header',function(){
	// 鼠标移入logo动画效果
	$('.header-logo-box').mouseenter(function(){
		$(this).stop().animate({'left':0},100)
	}).mouseleave(function(){
		$(this).stop().animate({'left':-49},100)
	})
	// 鼠标移入搜索框特效
	$('.header-search-button').mouseenter(function(){
		$(this).stop().animate({
			'color' : '#fff',
			'backgroundColor' : '#ff6700',
			'borderColor' : '#ff6700'
		},100)
		$('.header-search').stop().animate({
			'borderColor' : '#999'
		},100)
	}).mouseleave(function(){
		$(this).stop().animate({
			'color' : '#999',
			'backgroundColor' : '#fff',
			'borderColor' : '#dfdfdf'
		},100)
		$('.header-search').stop().animate({
			'borderColor' : '#dfdfdf'
		},100)
	})
	$('.header-search-box button').mouseenter(function(){
		$(this).stop().animate({
			'color' : '#fff',
			'backgroundColor' : '#ff6700'
		},100)
	}).mouseleave(function(){
		$(this).stop().animate({
			'color' : '#776e7f',
			'backgroundColor' : '#ecece6'
		},100)
	})
	// 鼠标点击搜索框特效
	$('.header-search-box input').focus(function(){
		$('.header-search-button').animate({
			'borderColor' : '#ff6700'
		},100)
		$('.header-search').stop().animate({
			'borderColor' : '#ff6700'
		},100)
		$('.header-search-menus').stop().slideDown(100)
	}).blur(function(){
		$('.header-search-button').animate({
			'borderColor' : '#dfdfdf'
		},100)
		$('.header-search').stop().animate({
			'borderColor' : '#dfdfdf'
		},100)
		$('.header-search-menus').stop().slideUp(100)
	})
	// 鼠标移入搜索下拉列表项
	$('.header-search-menus ul li').mouseenter(function(){
		$(this).stop().animate({
			'backgroundColor' : '#bbb'
		},100).siblings('li').stop().animate({
			'backgroundColor' : '#fff'
		},100)
	})

	// 鼠标移入头部导航
	$('.header-nav>ul>li').mouseenter(function(){
		$(this).siblings('li').find('.header-nav-menus').hide();
		$(this).find('.header-nav-menus').stop().slideDown(300);

	}).mouseleave(function(){
		$(this).find('.header-nav-menus').stop().slideUp(300);
	})

	// ajax 请求 json 导入nav里面
	var data = {
		arr : []
	}
	$.ajax({
		type : "GET",
		url : "../json/publicNav.json",
		dataType : "json",
		success : function(res){
			var count = 1;
			for( var value in res ){
				data.arr = res[value];
				var html = template('header-nav-menu',data);
				$('.header-nav>ul>li').eq(count).find('ul').html(html);
				count++;
			}
			$('.header-nav-menus .flag').each(function(){
				if( $(this).html() == "" ){
					$(this).css('border','none')
				}
			})

		},
		error : function(){
			console.log("failed")
		}
	})

	// 鼠标移入li导航出现下拉菜单
	$('.header-nav-items').mouseenter(function(){
		$(this).children('a').css('color','#ff6700')
			   .end().siblings('.header-nav-items').children('a').css('color','#000')
	}).mouseleave(function(){
		$('.header-nav-items').find('a').css('color','#000');
	})
})
$('#footer').load('../html/public.html .footer')

