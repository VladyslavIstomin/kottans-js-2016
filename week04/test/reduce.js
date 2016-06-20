"use strict";

var assert = require("assert");
var MyPromise = require("../script");

describe("Promise.prototype.reduce", function() {
	it("works with no values", function() {
		return MyPromise.resolve([]).reduce(function(total, value) {
			return total + value + 5;
		}).then(function(total) {
			assert.strictEqual(total, undefined);
		});
	});

	/*it("works with a single value", function() {
		return Promise.resolve([ 1 ]).reduce(function(total, value) {
			return total + value + 5;
		}).then(function(total) {
			assert.strictEqual(total, 1);
		});
	});

	it("works when the iterator returns a value", function() {
		return Promise.resolve([ 1, 2, 3 ]).reduce(function(total, value) {
			return total + value + 5;
		}).then(function(total) {
			assert.strictEqual(total, (1 + 2+5 + 3+5));
		});
	});

	it("works when the iterator returns a Promise", function() {
		return Promise.resolve([ 1, 2, 3 ]).reduce(function(total, value) {
			return promised(5).then(function(bonus) {
				return total + value + bonus;
			});
		}).then(function(total) {
			assert.strictEqual(total, (1 + 2+5 + 3+5));
		});
	});

	it("works when the iterator returns a thenable", function() {
		return Promise.resolve([ 1, 2, 3 ]).reduce(function(total, value) {
			return thenabled(total + value + 5);
		}).then(function(total) {
			assert.strictEqual(total, (1 + 2+5 + 3+5));
		});
	});*/
});

