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
					if (arguments[i] === undefined || arguments[i] === null || arguments[i] !== Object(source)) continue;

					Object.keys(source).forEach(function(i, v) {
						if (source.propertyIsEnumerable(i)) {
							obj[i] = source[i]
						}
					});
				}

				return obj
			}
		})

	}
})();
