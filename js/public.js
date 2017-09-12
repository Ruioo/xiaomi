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
			'backgroundColor' : '#eee'
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
	$.ajax({
		type : "GET",
		url : "../json/publicNav.json",
		dataType : "json",
		success : function(res){
			var data = {
				arr : []
			}
			var count = 1;
			for( var value in res ){
				data.arr = res[value];
				// console.log(data.arr)
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

	// ajax请求导入 mainNav
	$.ajax({
		type : "GET",
		url : "../json/publicMainNav.json",
		dataType : "json",
		success : function(res){
			if( $('.header-mainnav').css('display') != "none" ){
				var data = {
					arr : []
				}
				var count = 0;
				for( var value in res ){
					data.arr = res[value];
					var html = template('header-mainNav-menu',data);
					$('.header-mainnav-menus .mainnav-menu').eq(count).find('ul').html(html);
					count++;
				}
				$('.mainnav-items .flag').each(function(){
					if( $(this).val() == "" ){
						$(this).remove()
					}
				})
			}
		},
		error : function(){
			console.log("failed")
		}
	})
	// 鼠标移入mainNav导航
	$('.header-mainnav').mouseenter(function(){
		$('.header-mainnav-boxs').show()
	}).mouseleave(function(){
		$('.header-mainnav-boxs').hide()
	})
	$('.mainnav-menu').mouseenter(function(){
		$('.mainnav-menu-self').eq($(this).index()).stop().animate({
			'color' : '#fff',
			'backgroundColor' : '#ff6700'
		},200)
		$('.mainnav-menu-self').eq($(this).index()).find('a').stop().animate({
			'color' : '#fff'
			// 'backgroundColor' : '#ff6700'
		},200)
		$(this).find('.mainnav-items').show()
		   	   .end().siblings('.mainnav-menu').find('.mainnav-items').hide()
	}).mouseleave(function(){
		$('.mainnav-menu-self').eq($(this).index()).stop().animate({
			'color' : '#444',
			'backgroundColor' : '#fff'
		},200)
		$('.mainnav-menu-self').eq($(this).index()).find('a').stop().animate({
			'color' : '#444'
			// 'backgroundColor' : '#ff6700'
		},200)
		$(this).find('.mainnav-items').hide()
	})
	$('.header-mainnav-menus').mouseleave(function(){
		$('.header-mainnav-boxs').hide()
	})
})
$('#footer').load('../html/public.html .footer',function(){
	$('.footer-nav-contact>a').mouseenter(function(){
		$(this).stop().animate({
			'color' : '#fff',
			'backgroundColor' : '#ff6700'
		},200)
	}).mouseleave(function(){
		$(this).stop().animate({
			'color' : '#ff6700',
			'backgroundColor' : '#fff'
		},200)
	})
})

