# html-template-to-dom
## Resolves HTML string (with ES6 template literal style inserts) into DOM

```javascript
var htmlTemplateToDom = require('html-template-to-dom');

document.body.appendChild(htmlTemplateToDom(document, '<p class="${ class }">${ data } ${ otherContent }</p>', {
  class: 'foo bar',
	data: "Inserted content",
	otherContent: document.createElement('span')
}));
// Following content got appended to document body:
// <p class="foo bar">Inserted content <span></span></p>
```

As example presents inserts are resolved at DOM level, so DOM (or other objects that resolve to DOM) can also be used as inserts, and they'll be inserted in direct form.

### Installation

	$ npm install html-template-to-dom

### API

#### htmlTemplateToDom(document, html, inserts[, options]);

```javascript
var htmlTemplateToDom = require('html-template-to-dom');

var dom = htmlTemplateToDom(document, '<p class="${ class }">${ data }</p>', {
  class: 'foo bar',
  data: "Inserted content"
});
```

Converts provided `html` to DOM (owned by `document`). Options are described under [domFromResolvedTokens](#supported-options) section.

###### HTML -> DOM Resolution flow:

1. In HTML string ES6 template inserts are replaced with markers (control characters).
2. HTML is resolved to DOM
3. Result DOM tree is iterated, and all found insert markers are replaced with actual inserts

#### domFromResolvedTokens(document, tokens[, options]);

```javascript
var domFromResolvedTokens = require('html-template-to-dom/from-resolved-tokens');

var dom = domFromResolvedTokens(document, ['<p class="', 'foo bar', '">', "Inserted content", '</p>']);
```

Resolves already resolved tokens, into DOM. It's a low-level resolver used internally by main module, which can used directly by external utilities which need better control of resolution process.

###### Supported options:
- __normalizeHtml__ - Additional HTML resolver. If provided, it's used after ES6 templates inserts are removed, but before DOM is resolved
(between 1 and 2 step of [resolution flow](#resolution-flow)).
- __normalizeDom__ - Additional DOM resolver. If provided, it's used after DOM is resolved but before inserts are put in (between 2 and 3 step of [resolution flow](#resolution-flow)).


## Tests [![Build Status](https://travis-ci.org/medikoo/html-template-to-dom.svg)](https://travis-ci.org/medikoo/html-template-to-dom)

	$ npm test
