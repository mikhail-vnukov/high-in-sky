$(document).ready(function() {

(function() {

	var overlay = $(".md-overlay");

	var callbacks = $.Callbacks();

	var openModalWindow = function(el) {
		el.addClass("md-show");
	}

	var closeModalWindows = function() {
		var popup = $(".md-show");
		popup.css("z-index", 2000);
		popup.removeClass("md-show");
		
	}

	callbacks.add(closeModalWindows);

	window.openVideo = function(url) {
		var $video = $('<iframe>');
		$video.addClass("video");
		$video.addClass("md-modal");
		$video.attr("width", "853");
		$video.attr("height", "480");
		$video.attr("src", url.href);
		$video.attr("frameborder", "0");
		$video.attr("allowfullscreen", "1");

		overlay.before($video);
		openModalWindow($video);

		var disappear = function() {
			$video.remove();
			callbacks.remove(disappear);
		}
		callbacks.add(disappear);
	}

	overlay.click(function() {
		callbacks.fire();
	});
	$(".close-button").click(closeModalWindows);

	$(".form-button").click(function()  {
		openModalWindow($("#popup-form"));
	});

	function showErrorMessage() {
		$("#popup-form").css("z-index", 500);
		$(".form-fail").addClass("md-show");
	}

	function showSuccessMessage() {
		$("#popup-form").css("z-index", 500);
		$(".form-done").addClass("md-show");				
	}
	$("form").each(function() {
		var $form = $(this);
		$form.find("[type='submit']").click(function() {
			$.ajax({
					type: "POST",
					url: "formdata.php",
					data: $form.serialize(),
					success: function(data) {
						showSuccessMessage();
					}, 
					error: function(jqXHR, textStatus, errorThrown) {
						showErrorMessage();
					}

				});
			return false;
		});
	});
})();


// (function() {
// 	var $nav    = $(".fixed-nav"),
// 		 $button = $('#form-trigger');

// 	$(window).resize(function() {
// 		stickElementsIfNecessary();
// 	})
// 	stickElementsIfNecessary();
// 	function stickElementsIfNecessary() {
// 		if ($nav.css("position") === 'static') {
// 			if ($(".sticky-wrapper").length == 0) {
// 				$button.waypoint('sticky', {
// 					stuckClass: 'stuck'
// 				});	
// 			}
// 		} else {
// 			if ($(".sticky-wrapper").length > 0) {
// 				$button.waypoint('unsticky');
// 			}
// 		}

// 	}
	
// })();

});

