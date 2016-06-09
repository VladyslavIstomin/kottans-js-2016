(function() {
	"use strict";

	function isOtherObject(obj) {
		return obj instanceof Date || obj instanceof RegExp || obj instanceof Map || obj instanceof Set;
	}

	if (Object.assign) {

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

					if (isOtherObject(source)) {
						obj[source] = new source.constructor(source);
					}

					else {
						Object.keys(Object(source)).forEach(function(key) {
							if (source.propertyIsEnumerable(key)) {

								if (typeof source[key] === 'object' && typeof obj[key] === 'object') {
									obj[key] = Object.deepAssign(obj[key], source[key]);
								}

								else if (isOtherObject(source[key])) {
									obj[key] = new source[key].constructor(source[key]);
								}

								else {
									obj[key] = source[key];
								}
							}
						});
					}
				}

				return obj
			}
		});

	}
})();
