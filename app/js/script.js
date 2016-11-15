/*script*/
if($('.js-input').length) {
	var inputChange = $('.js-input-change');

	inputChange.on('click', function() {
		var _this = $(this);
		var input = _this.parent().children('.js-input');

		if(_this.text() == 'изменить') {
			_this.text('сохранить');
		} else {
			_this.text('изменить');
		}

		input.prop('disabled', function() {
			return !input.prop('disabled');
		});

		input.focus();
	});
}

if($('.js-change-address').length) {
	var changeAddress = $('.js-change-address');

	changeAddress.on('click', function() {
		var _this = $(this);
		var addressBlock = _this.closest('.settings-address');

		addressBlock.toggleClass('settings-address--edit');

		if(_this.text() == 'изменить') {
			_this.text('сохранить');
		} else {
			_this.text('изменить');
		}
	});
}

if($('.js-delete-address').length) {
	var deleteAddress = $('.js-delete-address');

	deleteAddress.on('click', function() {
		$(this).parent().remove();
	});
}
/*/script*/