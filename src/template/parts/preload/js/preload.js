/* preload */
(function () {
	let preload = document.querySelector(".preload");

	document.addEventListener("PreloadEnd", function () {
		if (preload) preload.remove();
	});

	if (preload) {
		setTimeout(function () {
			preload.classList.add("preload_fade");
		}, (__config.preload.time || 1) * 1000);
		setTimeout(
			preloadDispatchEvent,
			((__config.preload.time || 1) + (__config.preload.delay || 0.5)) * 1000
		);
	} else {
		document.addEventListener("DOMContentLoaded", preloadDispatchEvent);
	}

	function preloadDispatchEvent() {
		document.dispatchEvent(new Event("PreloadEnd"));
		document.querySelector("body").dispatchEvent(new Event("PreloadEnd"));
		document.querySelector("body").classList.add("loaded");
	}
})();
