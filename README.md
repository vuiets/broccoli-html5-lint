# broccoli-html5-lint

> :fallen_leaf: Run [HTML5 lint](https://github.com/mozilla/html5-lint) on [broccoli](https://github.com/joliss/broccoli) nodes.

### Install

Install with [npm](https://github.com/npm/npm#npm1----node-package-manager). (Make sure you have installed [Node](http://nodejs.org/).)

```
npm install --save-dev https://github.com/wizvishak/broccoli-html5-lint.git
```

### Usage

```javascript
var HTML5Lint = require('broccoli-html5-lint');
node = new HTML5Lint(inputNodes, options);
```

### Thanks To
- [@mozilla/html5-lint](https://github.com/mozilla/html5-lint)
- Reporter: [@sindresorhus](https://github.com/sindresorhus)'s [stylish](https://github.com/eslint/eslint/blob/master/tests/lib/formatters/stylish.js) formatter for [eslint](https://github.com/eslint/eslint)

### License
MIT
