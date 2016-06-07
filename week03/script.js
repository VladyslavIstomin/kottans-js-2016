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

					var keys = Object.keys(source);
					if (keys.length) {
						keys.forEach(function(i, v) {
							if (source.propertyIsEnumerable(i)) {
								obj[i] = source[i]
							}
						});
					} else {
						obj[i] = source;
					}
				}

				return obj
			}
		})

	}
})();
