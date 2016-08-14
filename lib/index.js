'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _broccoliPersistentFilter = require('broccoli-persistent-filter');

var _broccoliPersistentFilter2 = _interopRequireDefault(_broccoliPersistentFilter);

var _html5Lint = require('html5-lint');

var _html5Lint2 = _interopRequireDefault(_html5Lint);

var _rsvp = require('rsvp');

var _rsvp2 = _interopRequireDefault(_rsvp);

var _reporterStylish = require('./reporter/stylish');

var _reporterStylish2 = _interopRequireDefault(_reporterStylish);

var Promise = _rsvp2['default'].Promise;

function HTML5Lint(inputNode, options) {
	if (!(this instanceof HTML5Lint)) return new HTML5Lint(inputNode, options);

	_broccoliPersistentFilter2['default'].call(this, inputNode, options);

	this.options = options;
}

HTML5Lint.prototype = Object.create(_broccoliPersistentFilter2['default'].prototype);
HTML5Lint.prototype.constructor = HTML5Lint;

HTML5Lint.prototype.processString = function (content, relativePath) {
	var promise = new Promise(function (resolve, reject) {
		(0, _html5Lint2['default'])(content, function (err, results) {
			if (err) reject(err);

			if (results.messages) {
				(0, _reporterStylish2['default'])(relativePath, results.messages);
			}

			resolve(content);
		});
	});

	return promise.then(function (content) {
		return content;
	})['catch'](function (error) {
		throw error;
	});
};

HTML5Lint.prototype.extensions = ['html'];

module.exports = HTML5Lint;