'use strict';

import Filter from 'broccoli-filter';
import editorconfig from 'editorconfig';

EditorConfigStyle.prototype = Object.create(Filter.prototype);
EditorConfigStyle.prototype.constructor = EditorConfigStyle;

EditorConfigStyle = (inputNode, options) => {
	if(!(this instanceof EditorConfigStyle)) {
		return new EditorConfigStyle(inputNode, options);
	}

	this.options = options || {};
	Filter.call(this, inputNode);
};

export default EditorConfigStyle;
