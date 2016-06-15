"use strict";

class MyPromise extends Promise {

	constructor (...args) {
		super(...args)
	}

	static map(iterable, mapper){
		return new this((resolve, reject) =>{
			let result = [];
			let counter = 0;

			for (let promise of iterable) {
				counter++;

				promise.then(val => {
					result.push( mapper(val) );
					console.log(result, counter);

					if (! --counter) {
						resolve(result);
					}
				}, reject)
			}
		})
	}
}

let promise1 = new Promise((a,b) => a('a'));
let promise2 = new Promise((a,b) => a('b'));
let promise3 = new Promise((a,b) => a('c'));

MyPromise.map([promise1, promise2, promise3], (value)=> value).then((result) => console.log(result));