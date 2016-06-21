"use strict";

class MyPromise extends Promise {

	static map(iterable, mapper) {
		return new this((resolve, reject) => {
			let result = [];
			let counter = 0;

			const promiseHandler = (iterable) => {
				for (let item of iterable) {
					counter++;

					Promise.resolve(item).then(val => {
						result.push( mapper(val) );

						if (! --counter) {
							resolve(result);
						}
					}, reject)
				}
			};

			if (iterable instanceof Promise) {
				iterable.then(val => {
					promiseHandler(val);
				})
			} else {
				promiseHandler(iterable);
			}
		})
	};

	static some(input, count) {
		return new this((resolve, reject) => {
			let result = [];
			let rejectedResult = [];
			let counter = 0;
			let rejectCounter = 0;

			if (count < 0 || isNaN(count) || input.length <  count) {
				reject(new Error('Error'));
				return;
			}

			if(count === 0) {
				resolve([]);
				return;
			}

			Promise.resolve(input).then(iterable => {
				for (let iterableItem of iterable) {
					Promise.resolve(iterableItem).then( item => {
						counter++;
						if (counter > count) return;

						result.push(item);
						if (counter === count) {
							resolve(result);
						}
					}).catch(err => {
						rejectCounter++;
						if (rejectCounter > count) return;

						rejectedResult.push(err);
						if (rejectCounter === count) {
							reject(rejectedResult);
						}
					});
				}
			}).catch(err => {
				reject(err)
			});
		})
	};

	static reduce(input, toReduce, initValue) {
		return new this((resolve, reject) => {
			Promise.resolve(input).then(iterable => {

			}).catch(err => reject(err))
		})
	}
}

module.exports = MyPromise;