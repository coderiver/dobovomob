head.ready(function() {

	// click function
	$('body').on('click', function() {
		$('.js-town').removeClass('is-active');
	});
	$("body").on("click", ".js-open-town", function(event){
		event.stopPropagation();
	});

	// drop-town
	$('.js-open-town').on('click', function() {
		$('.js-town').toggleClass('is-active');
	});

	// chosen
	$(".select-chosen").chosen({
		template: function (text, value, templateData) {
			return [
				text +  "<span>" + templateData.user + "</span> "
			].join("");
		},
		max_selected_options: 1
	});
	
	//slick
	$('.slider').slick({
		arrows: false,
		dots: true,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		adaptiveHeight: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});
	$('.slider-auto').on('init', function(slick){
		var totalReviews = $('.slider-auto .slick-slide').length;
		$('.js-number-total').text(totalReviews);
		$('.js-number-current').text('1');
	});
	$('.slider-auto').slick({
		arrows: false,
		dots: false,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		adaptiveHeight: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});
	$('.slider-auto').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		nextSlide++;
		$('.js-number-current').text(nextSlide);
	});

	// filter open
	$('.js-open').on('click', function() {
		$(this).parent().toggleClass('is-active');
	});

	// choose
	function choose() {
		var number = $(".js-choose");
		number.each(function(){
			var max_number = +($(this).attr("data-max-number"));
			var input = $(this).find("input");
			var plus = $(this).find(".js-plus");
			var minus = $(this).find(".js-minus");
			var plus_guests = $(this).find(".js-choose-guests .js-plus");
			var minus_guests = $(this).find(".js-choose-guests .js-minus");
			plus.bind("click", function(){
				var val = +(input.val());
				if (val >= max_number) {
					return false
				}
				else {
					val += 1;
					input.val(val);
				}
			});
			minus.bind("click", function(){
				var val = +(input.val());
				if (val > 1) {
					val -= 1;
					input.val(val);
				}
				else {
					input.val('');
					return false
				}
			});
			plus_guests.bind("click", function(){
				var val = +(input.val());
				if (val >= max_number) {
					return false
				}
				else {
					val += 1;
					input.val(val);
					$('.js-guests').text("гостей");
				}
			});
			minus_guests.bind("click", function(){
				var val = +(input.val());
				if (val > 1) {
					val -= 1;
					input.val(val);
					if (val == 1) {
						$('.js-guests').text("гость");
					}
				}
				else {
					return false;
				}
			});
		});
	}
	choose();
	
	// datepicker
	$('#from').on('click', function(){
		$(this).parent().parent().parent().addClass('is-active');
		var array = ["2015-03-18","2015-03-19","2015-03-20"]
		$( "#from" ).datepicker({
			 beforeShowDay: function(date){
		        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
		        return [ array.indexOf(string) == -1 ]
		    },
			inline: true,
			dateFormat: 'd MM D',
			monthNamesShort: ['янв.', 'фев.', 'март.', 'апр.', 'май.', 'июнь.', 'июль.', 'авг.', 'сент.', 'окт.', 'ноя.', 'дек.'],
			monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			dayNamesShort: ['вс','пн','вт','ср', 'чт', 'пт','сб'],
			dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
			firstDay: 1,
			minDate: 0,
			onSelect: function( selectedDate ) {
				$( "#to" ).datepicker({
					inline: true,
					minDate: selectedDate,
					dateFormat: 'd MM D',
					monthNamesShort: ['янв.', 'фев.', 'март.', 'апр.', 'май.', 'июнь.', 'июль.', 'авг.', 'сент.', 'окт.', 'ноя.', 'дек.'],
					monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
					dayNamesShort: ['вс','пн','вт','ср','чт','пт','сб'],
					dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
					firstDay: 1,
					onSelect: function( selectedDate ) {
						$('#to').removeClass('hasDatepicker');
						$('#to .ui-datepicker').hide();
						$(".datepicker__to-text").text(selectedDate);
						var OurString = $(".datepicker__to-text").html();
						var NewOurString = "";
							OurString = OurString.split(" ");
							for ( i = 0; i < OurString.length; i++ ) {
							NewOurString = NewOurString + "<span>" + OurString[i] + "</span>";
						}
						$(".datepicker__to-text").html(NewOurString);
						$(this).parent().parent().parent().removeClass('is-active');
					}
				});
				$('#from').removeClass('hasDatepicker');
				$('#from .ui-datepicker').hide();
				$(".datepicker__from-text").text(selectedDate);
				var OurString = $(".datepicker__from-text").html();
				var NewOurString = "";
					OurString = OurString.split(" ");
					for ( i = 0; i < OurString.length; i++ ) {
					NewOurString = NewOurString + "<span>" + OurString[i] + "</span>";
				}
				$(".datepicker__from-text").html(NewOurString);
			}
		});
	});
	$('#to').on('click', function(){
		$( "#to" ).datepicker({
			inline: true,
			dateFormat: 'd MM D',
			monthNamesShort: ['янв.', 'фев.', 'март.', 'апр.', 'май.', 'июнь.', 'июль.', 'авг.', 'сент.', 'окт.', 'ноя.', 'дек.'],
			monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			dayNamesShort: ['вс','пн','вт','ср','чт','пт','сб'],
			dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
			firstDay: 1,
			minDate: 0,
			onSelect: function( selectedDate ) {
				$('#to').removeClass('hasDatepicker');
				$('#to .ui-datepicker').hide();
				$(".datepicker__to-text").text(selectedDate);
				var OurString = $(".datepicker__to-text").html();
				var NewOurString = "";
					OurString = OurString.split(" ");
					for ( i = 0; i < OurString.length; i++ ) {
					NewOurString = NewOurString + "<span>" + OurString[i] + "</span>";
				}
				$(".datepicker__to-text").html(NewOurString);
				$(this).parent().parent().parent().removeClass('is-active');
			}
		});
		$(".datepicker__from-text").text('--');
	});
	
	// cost
	$('.js-cost-input').on('input', function (){
		if ( $(this).val().length) {
			$('.js-cost-checkbox').attr('disabled', 'disabled');
		}
		else {
			$('.js-cost-checkbox').removeAttr('disabled');
		}
	});

	// gmap
	function initialize() {
		var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
		var mapOptions = {
			zoom: 10,
			center: myLatlng
		};

		var map = new google.maps.Map(document.getElementById('map'), mapOptions);

		var contentString = '<div class="popup-map">'+
				'<div class="popup-map__top">'+
					'<div class="popup-map__img">'+
						'<img src="img/img-map.png" alt="">'+
						'<div class="price-black">'+
							'<strong class="price-black__top">9.1</strong>'+
							'<span class="price-black__bott">12 отзывов</span>'+
						'</div>'+
					'</div>'+
					'<div class="popup-map__right">'+
						'<a href="#" class="popup-map__title">Двухуровневая квартира в самом центре столицы</a>'+
						'<div class="popup-map__id">(AV 2478)</div>'+
						'<div class="popup-map__address">Двухкомнатная</div>'+
						'<div class="popup-map__row">'+
							'<div class="popup-map__col">'+
								'<div class="popup-map__price popup-map__price_green"><span>320</span>грн. в сутки</div>'+
								'<p>без предоплаты</p>'+
							'</div>'+
							'<div class="popup-map__col">'+
								'<div class="popup-map__price"><span>960</span>грн.</div>'+
								'<p>за 3 ночи</p>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div class="popup-map__bottom">'+
					'<button class="btn btn_green-arr">Забронировать</button>'+
				'</div>'+
			'</div>';

		var infowindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 1
		});
		var image = new google.maps.MarkerImage('img/marker2x.png', null, null, null, new google.maps.Size(20,30));
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			icon: image,
			title: 'Двухуровневая квартира в самом центре столицы'
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize);

	// gmap-card
	function initialize_card_map() {
		var myLatlng_card = new google.maps.LatLng(-25.303882,131.034922);
		var mapOptions = {
			zoom: 10,
			center: myLatlng_card
		};

		var map_card = new google.maps.Map(document.getElementById('map-card'), mapOptions);
		var contentString_card = '<div class="popup-map">'+
				'<div class="popup-map__top">'+
					'<div class="popup-map__img">'+
						'<img src="img/img-map.png" alt="">'+
						'<div class="price-black">'+
							'<strong class="price-black__top">9.1</strong>'+
							'<span class="price-black__bott">12 отзывов</span>'+
						'</div>'+
					'</div>'+
					'<div class="popup-map__right">'+
						'<a href="#" class="popup-map__title">Двухуровневая квартира в самом центре столицы</a>'+
						'<div class="popup-map__id">(AV 2478)</div>'+
						'<div class="popup-map__address">Двухкомнатная</div>'+
						'<div class="popup-map__row">'+
							'<div class="popup-map__col">'+
								'<div class="popup-map__price popup-map__price_green"><span>320</span>грн. в сутки</div>'+
								'<p>без предоплаты</p>'+
							'</div>'+
							'<div class="popup-map__col">'+
								'<div class="popup-map__price"><span>960</span>грн.</div>'+
								'<p>за 3 ночи</p>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div class="popup-map__bottom">'+
					'<button class="btn btn_green-arr">Забронировать</button>'+
				'</div>'+
			'</div>';

		var infowindow_card = new google.maps.InfoWindow({
			content: contentString_card,
			maxWidth: 1
		});

		var image_card = new google.maps.MarkerImage('img/marker2x2.png', null, null, null, new google.maps.Size(35,50));
		var marker_card = new google.maps.Marker({
			position: myLatlng_card,
			map: map_card,
			icon: image_card,
			title: 'Двухуровневая квартира в самом центре столицы'
		});

		google.maps.event.addListener(marker_card, 'click', function() {
			infowindow_card.open(map_card,marker_card);
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize_card_map);

	// description
	$('.js-description-btn').on("click", function () {
		$('.js-description').toggleClass('is-active');
		return false;
	});

	// discounts open block
	$('.js-open-block').on('click', function (){
		var this_par = $(this).parent();
		var text = $('.js-open-block span');
		if (this_par.hasClass('is-active')) {
			this_par.removeClass('is-active');
			text.text('все акции и скидки');
		}
		else {
			this_par.addClass('is-active');
			text.text('скрыть');
		}
		return false;
	});

	// tabs
	$( "#tabs" ).tabs();
	$('#tabs li a').on('click', function (){
		$('.slick-slider').slick('reinit');
	});

});