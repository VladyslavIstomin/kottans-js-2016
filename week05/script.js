const sum = (val, delim) =>{
	return val.split(delim).reduce((prevVal, curVal, index) => {
		let num = parseInt(curVal, 10);

		if(num < 0) throw new Error('Negative number');

		return prevVal + num;
	}, 0);
};

const add = (str) => {

	if(str === '') return 0;

	if(str.match('^//')) {
		let delimiter = str.split('\n')[0].substring(2,3);
		let value = str.split('\n')[1];

		return sum(value, delimiter);
	}

	let delimiter = ',';
	let value = str.replace('\n', delimiter);

	return sum(value, delimiter)
};

module.exports = add;