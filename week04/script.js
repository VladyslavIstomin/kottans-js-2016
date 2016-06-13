(function() {
	"use strict";

	class MyPromise extends Promise {
		constructor() {
		super()
	}

		static map(a) {
			console.log(a)
		}
	}

	let mypromise = new MyPromise();
})();