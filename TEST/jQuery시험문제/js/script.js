//1번정답---------


$(function(){


var idx;

// --- A. Hover Menu --------------------
  var headli = $('header nav li');
  headli.mouseenter(function(){
    $(this).children().addClass('hov')
  }).mouseleave(function(){
    $(this).children().removeClass()
  });

// --- B. ScrollMove Menu --------------------
  headli.click(function(){
    idx = $(this).index();
    var spy = $('.content section').eq(idx).offset().top;
    $('body,html').stop().animate({
       scrollTop:spy
    },500)
  })

// --- C. Slide Banner --------------------
var nextbutton = $('.slidebanner .next');
var prevbutton = $('.slidebanner .prev');
var slideli = $('.slidebanner li');
var slwid = slideli.parent('ul').width();

// var ranimg = Math.floor(Math.random()*slideli.length);
var slidx = 0;
// console.log(ranimg)

// slideli.eq(ranimg).addClass('on').find('img').css({'display':'block'})

var slidenextmove = function(){
  slideli.eq(slidx).find('img').stop().animate({
    left:-slwid
  }).parent('li').removeClass().next().addClass('on').find('img').css({
    'display':'block',
    'left':slwid
  }).stop().animate({left:0})

  slidx ++

  if(slidx == slideli.length){
    slidx = 0;
    slideli.eq(slidx).addClass('on').find('img').css({
      'display':'block',
      'left':slwid
    }).stop().animate({left:0})
  }
}

  var slidemotion = setInterval(slidenextmove,4500);

  $('.slidebanner').mouseenter(function(){
    clearInterval(slidemotion)
  }).mouseleave(function(){
    slidemotion = setInterval(slidenextmove,4500);
  })

nextbutton.click(slidenextmove)

prevbutton.click(function(){
  slideli.eq(slidx).find('img').stop().animate({
    left:slwid
  }).parent('li').removeClass().prev().addClass('on').find('img').css({
    'display':'block',
    'left':-slwid
  }).stop().animate({left:0})

  slidx --

  if(slidx < 0){
    slidx = slideli.length-1;
    slideli.eq(slidx).addClass('on').find('img').css({
      'display':'block',
      'left':-slwid
    }).stop().animate({left:0})
  }

})


      // 슬라이드li클릭
slideli.find('a').click(function(){
var onnum = slideli.filter('.on').index();
idx = $(this).parent().index();

    if(idx > onnum){

      slideli.eq(onnum).removeClass().find('img').stop().animate({
        left:-slwid
      })
      slideli.eq(idx).addClass('on').find('img').css({
        'display':'block',
        'left':slwid
      }).stop().animate({left:0})
    }else if (idx < onnum) {
      slideli.eq(onnum).removeClass().find('img').stop().animate({
        left:slwid
      })
      slideli.eq(idx).addClass('on').find('img').css({
        'display':'block',
        'left':-slwid
      }).stop().animate({left:0})
    }

})

// --- D. Fade Banner --------------------
  var fadeli = $('.fadebanner li');
  var faidx = 0;

  var fademotion = setInterval(fademove,4800);

  $('.fadebanner').mouseenter(function(){
    clearInterval(fademotion)
  }).mouseleave(function(){
    fademotion = setInterval(fademove,4800);
  })


  fadeli.click(function(){
    faidx = $(this).index();
    fadeli.filter('.on').removeClass().find('img').stop().fadeOut();
    fadeli.eq(faidx).addClass('on').find('img').stop().fadeIn();
    return false;
  })

  function fademove(){
    fadeli.eq(faidx).removeClass().find('img').stop().fadeOut();
    faidx ++
    fadeli.eq(faidx).addClass('on').find('img').stop().fadeIn();
    if(faidx == fadeli.length){
			faidx=0
			fadeli.eq(faidx).addClass('on').find('img').fadeIn().parent().siblings().removeClass('on')
		}
  }

// --- E. SNS Move List Gellay --------------------

  var movie = $('.movie-view ul li');
  var tt = false;

  movie.click(function(){
    var href = $(this).find('a').attr('href')
    var srcl = 'https://www.youtube.com/embed/'+href+'?rel=0&amp;controls=0&amp;showinfo=0'
    $(this).find('a').parents('.movie-view').find('iframe').attr('src',srcl);
    if(!tt){
      $(this).find('a').fadeTo(500,0.5)
      tt = true
    }else if(tt){
      $(this).find('a').fadeTo(500,1)
      tt=false
    }
    return false; // a의 링크 기능 실행을 막기위해
  })

// --- F. Wing banner --------------------

     $(window).scroll(function(){
         $('.wing').stop().animate({
             top:$(this).scrollTop()
         },1000)
     })

// --- G. Layout Popup --------------------

    $('.btngroup button').click(function(){
      var pw = $(this).next().width();
      var ph = $(this).next().height();
      var scrollT = $(window).scrollTop();
      var windoh = $(window).height();

      $('.bl').fadeTo(500,1)
      $(this).next().slideDown(1000).css({
        left:'50%',
        top:function(){
          return (scrollT+(windoh/2))-(ph/2)+'px'
        },
        marginTop:function(){
          return '-'+(ph/2)+'px'
        },
        marginLeft:function(){
          return '-'+(pw/2)+'px'
        }

      });

      $('.btngroup .pop button').click(function(){
        $('.bl').fadeOut()
        $(this).parent('.pop').slideUp();
      })

    })





})
