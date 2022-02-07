
function moveImages(delta, photos) {
	var menu = photos.next();
	var now = parseInt(photos.attr('data-photo'));
	var max = parseInt(photos.attr('data-photos-count'));
	
	now = (now + max + delta) % max;
	
	photos.children('.auto-photos-container, .unit-auto-photos-container').css('left', (-100 * now) + '%');
	photos.attr('data-photo', now);
	menu.find('.auto-photos-count-this, .unit-auto-photos-count-this').text(now + 1);
}

$(document).on('click', '.auto-photos-button-right img, .unit-auto-photos-button-right img', function(event){
	moveImages(1, $(this).parents('.auto-photos-menu, .unit-auto-photos-menu').prev());
});

$(document).on('click', '.auto-photos-button-left img, .unit-auto-photos-button-left img', function(event){
	moveImages(-1, $(this).parents('.auto-photos-menu, .unit-auto-photos-menu').prev());
});

$(document).on('click', '.white-button', function(event){
	$(this).addClass('white-button-animated');
	var but = $(this);
	setTimeout(function(){
		but.removeClass('white-button-animated');
	}, 200);
});

/*function imageLoaded(obj) {
	var photos = $(obj).parents('.auto-photos, .unit-auto-photos');
	photos.attr('data-loaded', parseInt(photos.attr('data-loaded')) + 1);
	
	if (photos.attr('data-loaded') == photos.attr('data-photos-count')) {
		var max = 0;
		photos.find('.auto-photo, .unit-auto-photo').each(function(){
			var h = $(this).height();
			if (h > max) {
				max = h;
			}
		});
		photos.css('height', (max + 8) + 'px');
	}
}*/

function imageLoaded(obj) {
	var photos = $(obj).parents('.auto-photos, .unit-auto-photos');
	photos.attr('data-loaded', parseInt(photos.attr('data-loaded')) + 1);
	
	if (photos.attr('data-loaded') == photos.attr('data-photos-count')) {
		var sum = 0;
		var count = 0;
		photos.find('.auto-photo, .unit-auto-photo').each(function(){
			sum += $(this).height();
			count += 1;
		});
		photos.css('height', (sum / count + 8) + 'px');
	}
}



$(document).on('touchstart', '.auto-photo, .unit-auto-photo', function(event){
	$(this).addClass('auto-photo-flipping');
	$(this).data('flipping-start-pos', event.originalEvent.changedTouches[0].clientX);
});

$(document).on('touchmove', function(event){
	var objs = $('.auto-photo-flipping');
	if (objs.length) {
		var obj = objs[0];
		var deltaX = ($(obj).data('flipping-start-pos') - event.originalEvent.changedTouches[0].clientX) / $(document).width() * 100;
		var photos = $(obj).parents('.auto-photos, .unit-auto-photos');
		photos.children('.auto-photos-container, .unit-auto-photos-container').css('left', (-100 * parseInt(photos.attr('data-photo')) - deltaX) + '%');
	}
});

$(document).on('touchend', function(event){
	var objs = $('.auto-photo-flipping');
	if (objs.length) {
		var obj = objs[0];
		var deltaX = ($(obj).data('flipping-start-pos') - event.originalEvent.changedTouches[0].clientX) / $(document).width() * 100;
		var photos = $(obj).parents('.auto-photos, .unit-auto-photos');
		
		if (deltaX >= 20) {
			moveImages(1, photos);
		} else if (deltaX <= -20) {
			moveImages(-1, photos);
		} else {
			moveImages(0, photos);
		}
		
		$('.auto-photo-flipping').removeClass('auto-photo-flipping');
	}
});