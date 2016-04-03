'use strict';

var HTML5Lint = require('./lib');
var mergeTrees = require('broccoli-merge-trees');

var noOption = new HTML5Lint('tests/fixtures', {
	srcDir: '/',
	files: ['index.html']
});

module.exports = noOption;
