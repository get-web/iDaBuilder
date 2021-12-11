/* Google fonts */
var WebFontConfig = {
	google: {
		families: __config.gFonts.fonts,
	},
	timeout: __config.gFonts.delay, // Set the timeout to two seconds
};
(function () {
	var wf = document.createElement("script");
	wf.src = "https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
	wf.type = "text/javascript";
	wf.async = "true";
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(wf, s);
})();
