
$(document).ready(function(){
	$.ajax({
		method: 'POST',
		url: 'api/главная/get',
		contentType: "application/json; charset=utf-8",
		dataType: "html",
		success: function(res){
			$('.auto-list').html(res);
			
			$('.unit-auto-photo').each(function(){
				var img = new Image();
				img.src = $(this).attr('src');
			});
		}
	});
});