console = chrome.extension.getBackgroundPage().console;

$('#colorSelector').ColorPicker({
	color: '#0000ff',
	onShow: function (colpkr) {
		$(colpkr).fadeIn(300);
		return false;
	},
	onHide: function (colpkr) {
		$(colpkr).fadeOut(300);
		return false;
	},
	onChange: function (hsb, hex, rgb) {
		$('#colorSelector div').css('backgroundColor', '#' + hex);
    document.getElementsByName('textInput')[0].placeholder=hex;
	}
});
