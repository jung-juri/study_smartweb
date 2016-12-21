//1번정답---------


$(function(){
  var headli = $('header nav li');
  var fadeli = $('.fadebanner li');
  var movie = $('.movie-view ul li');

  var idx;

// --- A. Hover Menu --------------------
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

// --- D. Fade Banner --------------------
  var inters = setInterval(function(){
      fadeli.find('a').click();
      fadeli.find('a').trigger('click');
  },3000);

  fadeli.find('a').click(function(){
    idx = $(this).parent().index();
    fadeli.filter('.on').removeClass().find('img').stop().fadeOut(1000);
    fadeli.eq(idx).addClass('on').find('img').stop().fadeIn(1000);
    return false;
  })

// --- E. SNS Move List Gellay --------------------
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


    return false;

  })

// --- F. Wing banner --------------------

     $(window).scroll(function(){
         $('.wing').stop().animate({
             top:$(this).scrollTop()
         },1000)
     })

// --- G. Layout Popup --------------------

    $('.btngroup button').click(function(){
      $(this).filter('+.pop').fadeIn()
    })



})
