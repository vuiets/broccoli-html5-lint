'use strict';

const Filter = require('broccoli-persistent-filter'),
	html5Lint = require('html5-lint'),
	Promise = require('rsvp').Promise;

function pluralize(word, count) {
	return (count === 1 ? word : `${word}s`);
}

function formatOp(filePath, messages) {
	// lazy load output format helper libs
	const chalk = require('chalk'),
		table = require('text-table');

	let output = '\n',
		infos = 0,
		warnings = 0,
		errors = 0,
		total = 0,
		summaryColor = 'yellow';

	output += chalk.underline(`${filePath}\n\n`);

	const msgRows = messages.map((message) => {
		const lineNumber = [message.lastLine, message.firstColumn].join(':');
		let messageType = message.type;

		switch (messageType) {
			case 'info':
				messageType = chalk.cyan(messageType);
				infos++;
				break;
			case 'error':
				messageType = chalk.red(messageType);
				errors++;
				summaryColor = 'red';
				break;
			case 'default':
				messageType = chalk.white(messageType)
		}

		return [
			'',
			chalk.dim(lineNumber),
			messageType,
			message.message,
			''
		]
	});

	total = errors + warnings + infos;

	output += table(msgRows, {
			align: ['', 'c', 'c', 'l', ''],
			stringLength: function (str) {
				return chalk.stripColor(str).length;
			}
		}) + '\n\n';

	output += chalk[summaryColor].bold([
		'\u2716 ',
		total, pluralize(' problem', total),
		' (',
		errors, pluralize(' error', errors),
		', ',
		warnings, pluralize(' warning', warnings),
		', ',
		infos, pluralize(' info', infos),
		')\n'
	].join(''));

	output += '\n\n';

	console.log(output);
}

function HTML5Lint(inputNode, options) {
	if (!(this instanceof HTML5Lint)) return new HTML5Lint(inputNode, options);

	Filter.call(this, inputNode, options);

	this.options = options;
}

HTML5Lint.prototype = Object.create(Filter.prototype);
HTML5Lint.prototype.constructor = HTML5Lint;

HTML5Lint.prototype.processString = function (content, relativePath) {
	const promise = new Promise((resolve, reject) => {
		html5Lint(content, (err, results) => {
			if (err) reject(err);

			if (results.messages) {
				formatOp(relativePath, results.messages);
			}

			resolve(content);
		});

	});

	return promise.then((content) => {
		return content;
	}).catch((error) => {
		throw error;
	});
};

HTML5Lint.prototype.extensions = ['html'];

module.exports = HTML5Lint;
