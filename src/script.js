  //Menu//
$(window).on('load scroll', function() { 
    if ($(this).scrollTop() >= '1') {
        $('nav').css('background', 'rgba(29, 72, 81, 0.7)');
    if ($(this).scrollTop()>='964') {
      $('nav').css('background', 'rgba(0,0,0, 0.8)');
    }

    } else {
        $('nav').css('background', 'none');
    }
});

  // Glass//
  function magnify(imgID, zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById(imgID);
  
    /* Создать увеличительное стекло: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");
  
    /* Вставить увеличительное стекло: */
    img.parentElement.insertBefore(glass, img);
  
    /* Установите свойства фона для стекла лупы: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;
  
    /* Выполните функцию, когда кто-то перемещает лупу по изображению: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);
  
    /* а также для сенсорных экранов: */
    glass.addEventListener("touchmove", moveMagnifier);
    img.addEventListener("touchmove", moveMagnifier);
    function moveMagnifier(e) {
      var pos, x, y;
      /* Предотвратите любые другие действия, которые могут возникнуть при перемещении по изображению */
      e.preventDefault();
      /* Получить позиции курсора x и y: */
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      /* Не допускайте, чтобы лупа находилась вне изображения: */
      if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
      if (x < w / zoom) {x = w / zoom;}
      if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
      if (y < h / zoom) {y = h / zoom;}
      /* Установите положение стекла лупы: */
      glass.style.left = (x - w) + "px";
      glass.style.top = (y - h) + "px";
      /* Покажите, что такое увеличительное стекло "смотреть": */
      glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }
  
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Получить x и y позиции изображения: */
      a = img.getBoundingClientRect();
      /* Вычислите координаты курсора x и y относительно изображения: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }

  // form
  $(function() {
    $(".g-form").submit(function (event) {
      event.preventDefault();
   
      // Ссылка, которую получили на этапе публикации приложения
      let appLink = "https://script.google.com/macros/s/AKfycbwIvTlclg0uxuFuQOJlAGfrJlpN9WLwfAsDXW5x6IbcBJewngfA4680Hq0uXAqLnYrz/exec";
   
      // Сообщение при успешной отправке данных
      let successRespond = 'Сообщение успешно отправлено. Посмотрите результат <a target="_blank" href="https://docs.google.com/spreadsheets/d/1XcTivCQL4EZJf1x2kB4UwGj5bAi0sfpx1PwtaKgOWHo/edit?usp=sharing">тут</a>';
   
      // Сообщение при ошибке в отправке данных
      let errorRespond = 'Не удалось отправить сообщение. Cвяжитесь с администратором сайта по адресу <a href="mailto:smart-landing@ya.ru">smart-landing@ya.ru</a>';
   
      // Id текущей формы
      let form = $('#' + $(this).attr('id'))[0];
   
      // h2 с ответом формы
      let formRespond = $(this).find('.g-form__title_respond');
   
      // h2 с заголовком формы
      let formTitle = $(this).find('.g-form__title_main');
   
      // Блок прелоадера
      let preloader = $(this).find('.g-form__preloader');
   
      // Кнопка отправки формы
      let submitButton = $(this).find('.form_btn');
   
   
      // FormData
      let fd = new FormData(form);
   
   
      $.ajax({
   
        url: appLink,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        beforeSend: function(){
   
          if(fd.get('honeypot').length) {
            return false;
          } else {
            fd.delete('honeypot');
          }
   
        // Показываем прелоадер
        preloader.css('opacity', '1');
   
        // Делаем неактивной кнопку отправки
        submitButton.prop('disabled', true);
   
        // валидация других полей.
   
      },
   
    }).done(function(res, textStatus, jqXHR) {
   
      if(jqXHR.readyState === 4 && jqXHR.status === 200) {
   
      // Прячем заголовок формы
      formTitle.css({
        'display': 'none'
      });
   
      // Прячем прелоадер
      preloader.css('opacity', '0');
   
      // Выводим ответ формы.
      formRespond.html(successRespond).css('color', '#37b599');
       
      // Возвращаем активность кнопке отправки
      submitButton.prop('disabled', false);
   
        // Очищаем поля формы
        form.reset();
   
      } else {
        formTitle.css({
          'display': 'none'
        });
        formRespond.html(errorRespond).css('color', '#c64b4b');
        preloader.css('opacity', '0');
        setTimeout( () => {
          formRespond.css({
            'display': 'none'
          });
          formTitle.css({
            'display': 'block'
          });
   
          submitButton.prop('disabled', false);
        }, 5000);
   
        console.log('Гугл не ответил статусом 200');
      }
    }).fail(function(res, textStatus, jqXHR) {
      formTitle.css({
        'display': 'none'
      });
      preloader.css('opacity', '0');
      formRespond.html('Не удалось отправить сообщение. Cвяжитесь с администратором сайта другим способом').css('color', '#c64b4b');
      setTimeout( () => {
        formRespond.css({
          'display': 'none'
        });
        formTitle.css({
          'display': 'block'
        });
        submitButton.prop('disabled', false); 
      }, 5000);
   
      console.log('Не удалось выполнить запрос по указанному в скрипте пути');
    }); 
  });
  }(jQuery));


  function Sim(sldrId) {

    let id = document.getElementById(sldrId);
    if(id) {
      this.sldrRoot = id
    }
    else {
      this.sldrRoot = document.querySelector('.sim-slider')
    };
  
    // Slider objects
    this.sldrList = this.sldrRoot.querySelector('.sim-slider-list');
    this.sldrElements = this.sldrList.querySelectorAll('.sim-slider-element');
    this.sldrElemFirst = this.sldrList.querySelector('.sim-slider-element');
    this.leftArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-left');
    this.rightArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-right');
    this.indicatorDots = this.sldrRoot.querySelector('div.sim-slider-dots');
  
    // Initialization
    this.options = Sim.defaults;
    Sim.initialize(this)
  };
  
  Sim.defaults = {
  
    // Default options for the slider
    loop: true,     // Бесконечное зацикливание слайдера
    auto: true,     // Автоматическое пролистывание
    interval: 4000, // Интервал между пролистыванием элементов (мс)
    arrows: true,   // Пролистывание стрелками
    dots: false      // Индикаторные точки
  };
  
  Sim.prototype.elemPrev = function(num) {
    num = num || 1;
  
    let prevElement = this.currentElement;
    this.currentElement -= num;
    if(this.currentElement < 0) this.currentElement = this.elemCount-1;
  
    if(!this.options.loop) {
      if(this.currentElement == 0) {
        this.leftArrow.style.display = 'none'
      };
      this.rightArrow.style.display = 'block'
    };
    
    this.sldrElements[this.currentElement].style.opacity = '1';
    this.sldrElements[prevElement].style.opacity = '0';
  
    if(this.options.dots) {
      this.dotOn(prevElement); this.dotOff(this.currentElement)
    }
  };
  
  Sim.prototype.elemNext = function(num) {
    num = num || 1;
    
    let prevElement = this.currentElement;
    this.currentElement += num;
    if(this.currentElement >= this.elemCount) this.currentElement = 0;
  
    if(!this.options.loop) {
      if(this.currentElement == this.elemCount-1) {
        this.rightArrow.style.display = 'none'
      };
      this.leftArrow.style.display = 'block'
    };
  
    this.sldrElements[this.currentElement].style.opacity = '1';
    this.sldrElements[prevElement].style.opacity = '0';
  
    if(this.options.dots) {
      this.dotOn(prevElement); this.dotOff(this.currentElement)
    }
  };
  
  Sim.prototype.dotOn = function(num) {
    this.indicatorDotsAll[num].style.cssText =
               'background-color:#BBB; cursor:pointer;'
  };
  
  Sim.prototype.dotOff = function(num) {
    this.indicatorDotsAll[num].style.cssText =
               'background-color:#556; cursor:default;'
  };
  
  Sim.initialize = function(that) {
  
    // Constants
    that.elemCount = that.sldrElements.length; // Количество элементов
  
    // Variables
    that.currentElement = 0;
    let bgTime = getTime();
  
    // Functions
    function getTime() {
      return new Date().getTime();
    };
    function setAutoScroll() {
      that.autoScroll = setInterval(function() {
        let fnTime = getTime();
        if(fnTime - bgTime + 10 > that.options.interval) {
          bgTime = fnTime; that.elemNext()
        }
      }, that.options.interval)
    };
  
    // Start initialization
    if(that.elemCount <= 1) {   // Отключить навигацию
      that.options.auto = true;
                  that.options.arrows = true; that.options.dots = true;
      that.leftArrow.style.display = 'none';
                  that.rightArrow.style.display = 'none'
    };
    if(that.elemCount >= 1) {   // показать первый элемент
      that.sldrElemFirst.style.opacity = '1';
    };
  
    if(!that.options.loop) {
      that.leftArrow.style.display = 'none';  // отключить левую стрелку
      that.options.auto = false; // отключить автопркрутку
    }
    else if(that.options.auto) {   // инициализация автопрокруки
      setAutoScroll();
      // Остановка прокрутки при наведении мыши на элемент
      that.sldrList.addEventListener('mouseenter', function() {
                        clearInterval(that.autoScroll)
                  }, false);
      that.sldrList.addEventListener('mouseleave', setAutoScroll, false)
    };
  
    if(that.options.arrows) {  // инициализация стрелок
      that.leftArrow.addEventListener('click', function() {
        let fnTime = getTime();
        if(fnTime - bgTime > 0) {
          bgTime = fnTime; that.elemPrev()
        }
      }, false);
      that.rightArrow.addEventListener('click', function() {
        let fnTime = getTime();
        if(fnTime - bgTime > 0) {
          bgTime = fnTime; that.elemNext()
        }
      }, false)
    }
    else {
      that.leftArrow.style.display = 'none';
                  that.rightArrow.style.display = 'none'
    };
  
    if(that.options.dots) {  // инициализация индикаторных точек
      let sum = '', diffNum;
      for(let i=0; i<that.elemCount; i++) {
        sum += '<span class="sim-dot"></span>'
      };
      that.indicatorDots.innerHTML = sum;
      that.indicatorDotsAll =
                         that.sldrRoot.querySelectorAll('span.sim-dot');
      // Назначаем точкам обработчик события 'click'
      for(let n=0; n<that.elemCount; n++) {
        that.indicatorDotsAll[n].addEventListener('click', function(){
          diffNum = Math.abs(n - that.currentElement);
          if(n < that.currentElement) {
            bgTime = getTime(); that.elemPrev(diffNum)
          }
          else if(n > that.currentElement) {
            bgTime = getTime(); that.elemNext(diffNum)
          }
          // Если n == that.currentElement ничего не делаем
        }, false)
      };
      that.dotOff(0);  // точка[0] выключена, остальные включены
      for(let i=1; i<that.elemCount; i++) {
        that.dotOn(i)
      }
    }
  };