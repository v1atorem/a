"use strict";

$('.carousel').carousel();
$(function () {
  var header = $('.header');
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      header.addClass('header_fixed');
    } else {
      header.removeClass('header_fixed');
    }
  });
});
$(function () {
  var header = $('.header');
  var hederHeight = header.height(84); // вычисляем высоту шапки

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      header.addClass('header_fixed');
      $('body').css({
        'paddingTop': hederHeight + 'px' // делаем отступ у body, равный высоте шапки

      });
    } else {
      header.removeClass('header_fixed');
      $('body').css({
        'paddingTop': 0 // удаляю отступ у body, равный высоте шапки

      });
    }
  });
});