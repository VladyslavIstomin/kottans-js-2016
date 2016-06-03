(function() {
	'use strict';

	$('.select').on('click', function(e) {
		var selectList = $(this).find('.select-list');
		selectList[0].hidden ? selectList[0].hidden = false : selectList[0].hidden = true
	})
})();