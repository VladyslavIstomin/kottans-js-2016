"use strict";

class MyPromise extends Promise {

	static map(iterable, mapper) {
		return new this((resolve, reject) => {
			let result = [];
			let counter = 0;

			const promiseHendler = (iterable) => {
				for (let item of iterable) {
					counter++;

					if (item instanceof Promise) {
						item.then(val => {
							result.push( mapper(val) );

							if (! --counter) {
								resolve(result);
							}
						}, reject)
					} else {
						Promise.resolve(item).then(val => {
							result.push( mapper(val) );

							if (! --counter) {
								resolve(result);
							}
						}, reject)
					}
				}
			};

			if (iterable instanceof Promise) {
				iterable.then(val => {
					promiseHendler(val);
				})
			} else {
				promiseHendler(iterable);
			}
		})
	}
}

module.exports = MyPromise;