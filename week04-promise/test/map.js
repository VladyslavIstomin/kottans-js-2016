"use strict";

var assert = require("assert");
var MyPromise = require("../script");
describe("Promise.map-test", function () {

	function mapper(val) {
		return val * 2;
	}

	specify("should map input values array", function() {
		var input = [1, 2, 3];
		return MyPromise.map(input, mapper).then(
			function(results) {
				assert.deepEqual(results, [2,4,6]);
			},
			assert.fail
		);
	});

	specify("should map input promises array", function() {
		var input = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
		return MyPromise.map(input, mapper).then(
			function(results) {
				assert.deepEqual(results, [2,4,6]);
			},
			assert.fail
		);
	});

	specify("should map mixed input array", function() {
		var input = [1, Promise.resolve(2), 3];
		return MyPromise.map(input, mapper).then(
			function(results) {
				assert.deepEqual(results, [2,4,6]);
			},
			assert.fail
		);
	});

	specify("should accept a promise for an array", function() {
		return MyPromise.map(Promise.resolve([1, Promise.resolve(2), 3]), mapper).then(
			function(result) {
				assert.deepEqual(result, [2,4,6]);
			},
			assert.fail
		);
	});

	specify("should map input promises when mapper returns a promise", function() {
		var input = [Promise.resolve(1),Promise.resolve(2),Promise.resolve(3)];
		return MyPromise.map(input, mapper).then(
			function(results) {
				assert.deepEqual(results, [2,4,6]);
			},
			assert.fail
		);
	});

	specify("should reject when input contains rejection", function() {
		var input = [Promise.resolve(1), Promise.reject(2), Promise.resolve(3)];
		return MyPromise.map(input, mapper).then(
			assert.fail,
			function(result) {
				assert(result === 2);
			}
		);
	});
});
