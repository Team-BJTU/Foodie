$(document).ready(function () {
	$('input[type="number"], input[type="tel"]').bind('keypress', function (event) {
		var regex = new RegExp("^[0-9,.]+$");
		var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
		if (event.which == 0)
			return true;
		if (!regex.test(key)) {
			event.preventDefault();
			return false;
		}
	});
});

$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip();
});