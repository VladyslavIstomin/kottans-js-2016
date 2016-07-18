const sum = (val, delim) =>{
	let pattern = new RegExp(delim);

	if(delim.search(/]\[/g) !== -1) {
		pattern = new RegExp(delim.replace(/]\[/g, ''));
	} else if (delim.search(/^(\[)|(])$/g) !== -1) {
		pattern = delim.replace(/^(\[)|(])$/g, '');
	}

	return val.split(pattern).reduce((prevVal, curVal, index) => {
		let num = parseInt(curVal, 10);

		if(num < 0) throw new Error('Negative number');

		if(num > 1000) num = 0;

		return prevVal + num;
	}, 0);
};

const add = (str) => {
	let delimiter = ',';
	let value = str.replace('\n', delimiter);

	if(str === '') return 0;

	if(str.search(/^\/\//) !== -1) {
		delimiter = str.split('\n')[0].substring(2);
		value = str.split('\n')[1];

		return sum(value, delimiter);
	}
	return sum(value, delimiter)
};

module.exports = add;