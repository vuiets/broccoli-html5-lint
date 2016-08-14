'use strict';

import Filter from 'broccoli-persistent-filter';
import html5Lint from 'html5-lint';
import RSVP from 'rsvp';
import reporter from './reporter/stylish';

const { Promise } = RSVP;

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
				reporter(relativePath, results.messages);
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
