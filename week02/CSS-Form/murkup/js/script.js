(function() {
	'use strict';

	const select =  document.querySelectorAll('.select');

	const dropDown = () => {
		console.log('hi');
	};

	for (let i=0; i < select.length; i++) {
		select[i].addEventListener('click', dropDown, false)
	}
})();