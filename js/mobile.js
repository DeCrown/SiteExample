
$(document).on('click', '.to-search', function(event){
	window.open('/подбор-автомобиля', '_self', false);
});

$(document).on('click', '.header-to-main', function(event){
	window.open('/главная', '_self', false);
});

$(document).on('click', '.auto-photos-button-right img, .unit-auto-photos-button-right img', function(event){
	var menu = $(this).parents('.unit-auto-photos-menu');
	var photos = menu.prev();
	var now = parseInt(photos.attr('data-photo'));
	var max = parseInt(photos.attr('data-photos-count'));
	
	now = (now + 1) % max;
	
	photos.children('.auto-photos-container, .unit-auto-photos-container').css('left', (-100 * now) + '%');
	photos.attr('data-photo', now);
	menu.find('.auto-photos-count-this, .unit-auto-photos-count-this').text(now + 1);
});

$(document).on('click', '.auto-photos-button-left img, .unit-auto-photos-button-left img', function(event){
	var menu = $(this).parents('.unit-auto-photos-menu');
	var photos = menu.prev();
	var now = parseInt(photos.attr('data-photo'));
	var max = parseInt(photos.attr('data-photos-count'));
	
	now = (now + max - 1) % max;
	
	photos.children('.auto-photos-container, .unit-auto-photos-container').css('left', (-100 * now) + '%');
	photos.attr('data-photo', now);
	menu.find('.auto-photos-count-this, .unit-auto-photos-count-this').text(now + 1);
});

$(document).on('click', '.unit-auto-more', function(event){
	var auto = $(this).parents('.unit-auto');
	window.open('/объявление/' + auto.children('.unit-auto-title').text() + '?id=' + auto.attr('data-id'), '_blank');
});

$(window).on('load', function(){
	$('.unit-auto-photos').each(function(){
		var max = 0;
		$(this).find('.auto-photo, .unit-auto-photo').each(function(){
			var h = $(this).height();
			if (h > max) {
				max = h;
			}
		});
		$(this).css('height', (max + 8) + 'px');
	});
});
