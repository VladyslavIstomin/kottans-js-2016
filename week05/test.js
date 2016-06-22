const add = require('./script');
const assert = require('chai').assert;

describe('Kata #1 test', () => {

	it('should return 0 if empty string', () => {
		assert.equal(add(''), 0)
	});

	it('should return 1 if pass string 1', () => {
		assert.equal(add('1'), 1)
	});

	it('should return 3 if pass string 1,2', () => {
		assert.equal(add('1,2'), 3)
	});

	it('should return 6 if pass string 1\n2,3', () => {
		assert.equal(add('1\n2,3'), 6)
	});

	it('should return 3 if pass string //;\n1;2', () => {
		assert.equal(add('//;\n1;2'), 3)
	});

	it('should return Error if pass string -5', () => {
		assert.throw(()=>{add('-5')}, 'Negative number')
	});

	it('should return Error if pass string 1\n2,3', () => {
		assert.throw(()=>{add('1\n-2,3')}, 'Negative number')
	});

	it('should return Error if pass string //;\n1;2', () => {
		assert.throw(()=>{add('//;\n1;-2')}, 'Negative number')
	});
});