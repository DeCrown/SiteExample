
$(document).on('click', '.auto-photos-button-right, .unit-auto-photos-button-right', function(event){
	var photos = $(this).parents('.auto-photos,.unit-auto-photos');
	var now = parseInt(photos.attr('data-photo'));
	var max = parseInt(photos.attr('data-photos-count'));
	
	now = (now + 1) % max;
	
	photos.children('.auto-photos-container, .unit-auto-photos-container').css('left', (-100 * now) + '%');
	photos.attr('data-photo', now);
	photos.find('.auto-photos-count-this, .unit-auto-photos-count-this').text(now + 1);
});

$(document).on('click', '.auto-photos-button-left, .unit-auto-photos-button-left', function(event){
	var photos = $(this).parents('.auto-photos, .unit-auto-photos');
	var now = parseInt(photos.attr('data-photo'));
	var max = parseInt(photos.attr('data-photos-count'));
	
	now = (now + max - 1) % max;
	
	photos.children('.auto-photos-container, .unit-auto-photos-container').css('left', (-100 * now) + '%');
	photos.attr('data-photo', now);
	photos.find('.auto-photos-count-this, .unit-auto-photos-count-this').text(now + 1);
});