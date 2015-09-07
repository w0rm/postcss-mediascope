var assert = require('assert');
var postcss = require('postcss');
var plugin = require('./index');

function makeTest (input, output, opts) {
	return function () {
		return postcss([plugin(opts)]).process(input).then(function (result) {
			assert.equal(result.css, output);
		});
	}
};

describe('postcss-mediascope', function () {

	it('declares variables for each mediaquery', makeTest(
		'@mediascope {.test{color: $color}}',
		'@media only screen and (max-width: 500px) {\n' +
		'    $color: red;\n' +
		'    .test {\n' +
		'        color: $color\n' +
		'    }\n' +
		'}\n' +
		'@media only screen and (min-width: 501px) and (max-width: 900px) {\n' +
		'    $color: blue;\n' +
		'    .test {\n' +
		'        color: $color\n' +
		'    }\n' +
		'}',
		[
            {
				query: 'only screen and (max-width: 500px)',
				variables: {color: 'red'}
			},
			{
				query: 'only screen and (min-width: 501px) and (max-width: 900px)',
				variables: {color: 'blue'}
			},
        ]
    ));

});
