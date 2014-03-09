(function() {

	var overlay = $(".md-overlay");

	var callbacks = $.Callbacks();

	var openModalWindow = function(el) {
		el.addClass("md-show");
	}

	var closeModalWindows = function() {
		$(".md-show").removeClass("md-show");
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

})();
