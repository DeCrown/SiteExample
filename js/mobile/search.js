
function loadArticles(data, func = function(){}){
	$.ajax({
		method: 'POST',
		url: 'api/подбор-автомобиля/get',
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		dataType: "html",
		success: function(res){
			$('.auto-list').html(res);
			
			$('.unit-auto-photo').each(function(){
				var img = new Image();
				img.src = $(this).attr('src');
			});
			
			func();
		}
	});
}

function animateLoading(data) {
	$('.auto-list').addClass('auto-list-changing');
	setTimeout(function(){
		loadArticles(data, function(){
			$('.auto-list').removeClass('auto-list-changing');
		});
	}, 200);
}

$(document).on('click', '.filters-manage', function(event){
	$(this).toggleClass('filters-manage-opened');
	$('.filters').toggleClass('filters-opened');
});

$(document).ready(function(){
	loadArticles({});
});

$(document).on('change', 'select.filter-condition-value[data-type="number"][data-condition="from"]', function(event){
	
	var val = $(this).val();
	
	$(this).parents('.filter').find('[data-condition="to"] option').each(function(){
		var value = $(this).attr('value');
		if (val == 'any' || value == 'any' || parseInt(value) >= parseInt(val)) {
			$(this).prop("disabled", false);
		} else {
			$(this).prop("disabled", true);
		}
	});
});

$(document).on('change', 'select.filter-condition-value[data-type="number"][data-condition="to"]', function(event){
	
	var val = $(this).val();
	
	$(this).parents('.filter').find('[data-condition="from"] option').each(function(){
		var value = $(this).attr('value');
		if (val == 'any' || value == 'any' || parseInt(value) <= parseInt(val)) {
			$(this).prop("disabled", false);
		} else {
			$(this).prop("disabled", true);
		}
	});
});

$(document).on('change', 'select.filter-condition-value[data-filter="model_main"]', function(event){
	
	var val = $(this).val();
	
	$(this).parents('.filter').find('[data-filter="model_minor"]').val('any');
	
	$(this).parents('.filter').find('[data-filter="model_minor"] option').each(function(){
		var value = $(this).attr('value');
		
		if (value == 'any' || $(this).attr('data-main') == val) {
			$(this).removeClass("filter-condition-value-option-hidden");
		} else {
			$(this).addClass("filter-condition-value-option-hidden");
		}
	});
});

$(document).on('input', 'input.filter-condition-value[data-type="number"][data-condition="to"]', function(event){
	$(this).val($(this).val().replace(/[^0-9]/, ''));
});

$(document).on('change', 'input.filter-condition-value[data-type="number"][data-condition="to"]', function(event){
	var val = parseInt($(this).val());
	
	if (val == 0) {
		$(this).addClass('filter-condition-value-error');
	} else if (val < parseInt($(this).parents('.filter').find('[data-condition="from"]').val())) {
		$(this).addClass('filter-condition-value-error');
	} else {
		$(this).removeClass('filter-condition-value-error');
	}
});

var dict = {"equal": "$eq", "from": "$gte", "to": "$lte"};

$(document).on('click', '.filters-search', function(event){
	
	var data = {};
	
	$('.filter-condition-value').each(function(){
		if ($(this).val() != '' && $(this).val() != 'any') {
			var filter = $(this).attr('data-filter');
			
			if (!Object.keys(data).includes(filter)) {
				data[filter] = {};
			}
			
			if ($(this).attr('data-type') == 'number') {
				data[filter][dict[$(this).attr('data-condition')]] = parseInt($(this).val());
			}
			else {
				data[filter][dict[$(this).attr('data-condition')]] = $(this).val();
			}
		}
	});
	
	animateLoading(data);
});
