var add = require('./script');
var assert = require('chai').assert;

describe('Kata #1 test', function() {

	it('should return 0 if empty string', function() {
		assert.equal(add(''), 0)
	});

	it('should return 1 if pass string 1', function() {
		assert.equal(add('1'), 1)
	});

	it('should return 3 if pass string 1,2', function() {
		assert.equal(add('1,2'), 3)
	});

	it('should return 6 if pass string 1\n2,3', function() {
		assert.equal(add('1\n2,3'), 6)
	});

	it('should return 3 if pass string //;\n1;2', function() {
		assert.equal(add('//;\n1;2'), 3)
	});

	it('should return Error if pass string -5', function() {
		assert.throw(function(){add('-5')}, 'Negative number')
	});

	it('should return Error if pass string 1\n2,3', function() {
		assert.throw(function(){add('1\n-2,3')}, 'Negative number')
	});

	it('should return Error if pass string //;\n1;2', function() {
		assert.throw(function(){add('//;\n1;-2')}, 'Negative number')
	});

	it('Numbers bigger than 1000 should be ignored', function() {
		assert.equal(add('1001,2'), 2)
	});

	it('should return 6 if pass string //[***]\n1***2***3', function() {
		assert.equal(add('//[***]\n1***2***3'), 6)
	});

	it('should return 6 if pass multiple delimiters //[*][%]\n1*2%3', function() {
		assert.equal(add('//[*][%][&]\n1*2%3&4'), 10)
	});
});