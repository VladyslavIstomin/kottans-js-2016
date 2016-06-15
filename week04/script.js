"use strict";

class MyPromise extends Promise {

	static map(iterable, mapper) {
		return new this((resolve, reject) => {
			let result = [];
			let counter = 0;

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
		})
	}
}

//MyPromise.map([Promise.resolve(1), Promise.resolve(2)], (val)=>{ return val*2}).then((result)=>console.log(result));
//MyPromise.map([1, 1], (val)=>{ return val*2}).then((result)=>console.log(result));
//MyPromise.map([1, Promise.resolve(2), 1], (val)=>{ return val*2}).then((result)=>console.log(result));

module.exports = MyPromise;