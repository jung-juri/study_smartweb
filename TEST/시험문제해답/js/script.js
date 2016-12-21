$(function(){

	$('.content>section:odd').css('background-color','#f3f3f3');

	/*아래 부터 스크립트시작*/

	var secH = []
	var globlaSct = null
	var windowheight = null
	$(window).on({
		resize:function(){
			secH = []
			windowheight=$('body').height()
			$.each($('.content>section'),function(i,e){
				secH.push($(e).offset().top)	
			})
		},
		scroll:function(){
			var sct = $(this).scrollTop()
			globlaSct = sct
			$('.wing').stop().animate({
				top:sct
			},1000)
		}
	})
	$(window).trigger('resize')

	// hover & scroll
	$('header nav li').on({
		mouseenter:function(){
			$(this).css('background-color','red').children('a').css('color','#FFF')
		},
		mouseleave:function(){
			$(this).css('background-color','#CCC').children('a').css('color','#000')
		},
		click:function(){
			var scIdx = $(this).index()
			
			$('body,html').animate({
				scrollTop:secH[scIdx]
			})
			return false;
		}
	})


	//슬라이드 베너
	var st = $('.slidebanner li');
	var stIdx = Math.floor(Math.random()*st.length);
	var hisnum = null;
	var stimg = null;

	st.eq(stIdx).addClass('on').find('img').css('display','block')
	
	var sliderhend = setInterval(function(){
		$('.slidebanner .next').trigger('click')
	},4800)

	//번호크기에 따라 이동이변함
	st.on({
		click:function(){

			hisnum=stIdx;
			stIdx = $(this).index()
			
			if(hisnum < stIdx){
				stimg = st.eq(hisnum).find('img')
				slideMotion(stimg,0,"-100%",800)
				stimg = st.eq(stIdx).find('img')
				slideMotion(stimg,"100%",0,800)
			}else if(hisnum > stIdx){
				stimg = st.eq(hisnum).find('img')
				slideMotion(stimg,0,"100%",800)
				stimg = st.eq(stIdx).find('img')
				slideMotion(stimg,"-100%",0,800)
			}else if(hisnum == stIdx){
				return false
			}

			return false;
		}
	})

	//마우스오버시 정지/실행
	$('.slidebanner').on({
		mouseenter:function(){
			clearInterval(sliderhend);
		},
		mouseleave:function(){
			sliderhend = setInterval(function(){
				$('.slidebanner .next').trigger('click');
			},4800);
		}
	})

	//다음클릭
	$('.slidebanner .next').click(function(){
		stimg = st.eq(stIdx).find('img')
		slideMotion(stimg,0,"-100%",800)
		stIdx ++
		stimg = st.eq(stIdx).find('img')
		slideMotion(stimg,"100%",0,800)
	});

	//이전클릭
	$('.slidebanner .prev').click(function(){
		stimg = st.eq(stIdx).find('img')
		slideMotion(stimg,0,"100%",800)
		stIdx --
		stimg = st.eq(stIdx).find('img')
		slideMotion(stimg,"-100%",0,800)
	});

	//다음이전함수 재사용
	function slideMotion(select,start,end,speed){
		select.parent('li').addClass('on').siblings("li").removeClass('on')
		select.css({
			left:start,
			display:'block'
			
		}).stop().animate({
			left:end
		},speed)

		if(stIdx == st.length){
			stIdx=0;
			stimg = st.eq(stIdx).find('img');
			slideMotion(stimg,"100%",0,800);
		}else if(0>stIdx){
			console.log(stIdx)
			stIdx=st.length-1;
			stimg = st.eq(stIdx).find('img');
			slideMotion(stimg,"-100%",0,800);
		}

	}

	//fadebanner
	var fadeIdx = 0
	
	var hisfadeIdx = null
	var fadeheand = setInterval(fademotion,4800)

	$('.fadebanner').on({
		mouseenter:function(){
			clearInterval(fadeheand)
		},
		mouseleave:function(){
			fadeheand = setInterval(fademotion,4800)
		}
	})

	$('.fadebanner li').on({
		click:function(){

			hisfadeIdx=fadeIdx;
			fadeIdx = $(this).index();
			$('.fadebanner li').eq(hisfadeIdx).removeClass('on').find('img').fadeOut()
			$('.fadebanner li').eq(fadeIdx).addClass('on').find('img').fadeIn()
			return false;
		}
	})

	function fademotion(){
		$('.fadebanner li').eq(fadeIdx).removeClass('on').find('img').fadeOut()
		fadeIdx ++
		$('.fadebanner li').eq(fadeIdx).addClass('on').find('img').fadeIn()

		if(fadeIdx == $('.fadebanner li').length){
			fadeIdx=0
			$('.fadebanner li').eq(fadeIdx).addClass('on').find('img').fadeIn().parent().siblings().removeClass('on')
		}
	}
	

	//youtube
	$('.movie-view ul li').on({
		click:function(){

			var url = $(this).find('a').attr('href');
			
			$('iframe').attr('src',"https://www.youtube.com/embed/"+url+"?rel=0&amp;controls=0&amp;showinfo=0")

			return false;
		},
		mouseenter:function(){
			$(this).fadeTo(300,0.5)
		},
		mouseleave:function(){
			$(this).fadeTo(300,1)
		}
	})
	

	//popup
	var event1 = $('.event1').html()
	var event2 = $('.event2').html()
	var event3 = $('.event3').html()
	var event4 = $('.event4').html()

	$('.pop').remove()

	$('.btngroup .btnevent1').click(function(){
		blaind()
		openbox(300,500,event1)
	})

	$('.btngroup .btnevent2').click(function(){
		blaind()
		openbox(300,500,event2)
	})

	$('.btngroup .btnevent3').click(function(){
		blaind()
		openbox(300,500,event3)
	})

	$('.btngroup .btnevent4').click(function(){
		blaind()
		openbox(300,500,event4)
	})
	
	function blaind(){
		$('body').append('<div class="blaind"></div>').find(".blaind").fadeTo(500,0.8)
	}



	function openbox(w,h,c){

		$('body').append("<div class='popwrap popde'>"+
			"<div>"+c+"</div>"+
			"</div>")

		$('.popwrap').prepend('<button class="close">닫기</button>')
			$('.popwrap').css({
					position:'absolute',
					width:w,
					height:h,
					backgroundColor:"#FFF",
					left:-w/2,
					marginLeft:'50%'
					// marginTop:100%
				})


			$('.popwrap').animate({
				top:globlaSct+200
			},800,function(){
				$(this).animate({
					top:globlaSct+200-150
				})
			})

			$('.close').click(function(){
				$('.blaind').fadeOut(1000,function(){
					$(this).remove()
				})
				$('.popwrap').animate({
						top:"10000px"
				},function(){
					$(this).remove()
				})
			})

		}
		
		function blaind(){
			$('body').append("<div class='blaind'></div>");
			$('.blaind').fadeTo(1000,0.5)
		}









})