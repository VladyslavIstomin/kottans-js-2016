(function() {
	'use strict';

	$('.select').on('click', function(e) {
		var selectList = $(this).find('.select-list');
		if (selectList[0].hidden) {
			selectList[0].hidden = false;
		} else {
			selectList[0].hidden = true;
		}
	})
})();