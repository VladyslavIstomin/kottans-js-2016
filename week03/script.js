(function() {
	"use strict";

	if (!Object.assign) {

		Object.defineProperty(Object, 'deepAssign', {
			writable: false,
			enumerable: true,
			configurable: false,
			value: function(target, sources) {

				if (target === undefined || target === null) {
					throw new TypeError('First argument isn`t an object');
				}

				var obj = Object(target);

				for (var i = 1; i < arguments.length; i++) {
					var source = arguments[i];
					if (source === undefined || source === null || source !== Object(source)) continue;

					if ( source instanceof Date ||
							source instanceof RegExp ||
							source instanceof Map ||
							source instanceof Set ) {
						obj[source] = new source.constructor(source);
					}

					else {
						Object.keys(Object(source)).forEach(function(key) {
							obj[key] = source[key];
						});
					}
				}

				return obj
			}
		})

	}
})();
