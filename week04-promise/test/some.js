"use strict";

var assert = require("assert");
var MyPromise = require("../script");

function isSubset(result, input) {
	for (var i=0; i < result.length; i++) {
		if (input.indexOf(result[i]) === -1) return false;
	}
	return true;
}

describe("Promise.some", function(){
	it("should reject on negative number", function(){
		return MyPromise.some([1,2,3], -1)
			.then(assert.fail)
			.catch(function(err) {
				assert(err instanceof Error)
			});
	});

	it("should reject on NaN", function(){
		return MyPromise.some([1,2,3], -0/0)
			.then(assert.fail)
			.catch(function(err) {
				assert(err instanceof Error)
			});
	});

	it("should reject on non-array", function(){
		return MyPromise.some({}, 2)
			.then(assert.fail)
			.catch(function(err) {
				assert(err instanceof Error)
			})
	});

	it("should reject with rangeerror when impossible to fulfill", function(){
		return MyPromise.some([1,2,3], 4)
			.then(assert.fail)
			.catch(function(err) {
				assert(err instanceof Error)
			})
	});

	it("should fulfill with empty array with 0", function(){
		return MyPromise.some([1,2,3], 0).then(function(result){
			assert.deepEqual(result, []);
		});
	});
});

describe("Promise.some-test", function () {

	specify("should reject empty input", function() {
		return MyPromise.some([], 1)
			.catch(function (err) {
				assert(err instanceof Error)
			});
	});

	specify("should resolve values array", function() {
		var input = [1, 2, 3];
		return MyPromise.some(input, 2).then(
			function(results) {
				assert(isSubset(results, input));
			},
			assert.fail
		)
	});

	specify("should resolve promises array", function() {
		var input = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
		return MyPromise.some(input, 2).then(
			function(results) {
				assert(isSubset(results, [1, 2, 3]));
			},
			assert.fail
		)
	});

	specify("should not resolve sparse array input", function() {
		var input = [, 1, , 2, 3 ];
		return MyPromise.some(input, 3).then(
			function(results) {
				assert.deepEqual(results, [void 0, 1, void 0]);
			},
			function() {
				console.error(arguments);
				assert.fail();
			}
		)
	});

	specify("should reject with all rejected input values if resolving howMany becomes impossible", function() {
		var input = [Promise.resolve(1), Promise.reject(2), Promise.reject(3), Promise.reject(4)];
		return MyPromise.some(input, 2).then(assert.fail, function(err) {
			assert(err[0] === 2);
			assert(err[1] === 3);
		})
	});

	specify("should accept a promise for an array", function() {
		var expected, input;

		expected = [1, 2, 3];
		input = Promise.resolve(expected);

		return MyPromise.some(input, 2).then(
			function(results) {
				assert.deepEqual(results.length, 2);
			},
			assert.fail
		)
	});

	specify("should reject when input promise does not resolve to array", function() {
		return MyPromise.some(Promise.resolve(1), 1).catch(function(err) {
			assert(err instanceof Error)
		})
	});

	specify("should reject when given immediately rejected promise", function() {
		var err = new Error();
		return MyPromise.some(Promise.reject(err), 1).then(assert.fail, function(e) {
			assert.strictEqual(err, e);
		});
	});
});