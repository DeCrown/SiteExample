
$(document).ready(function(){
	$('.auto-photo').each(function(){
		var img = new Image();
		img.src = $(this).attr('src');
	});
});