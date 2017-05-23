'use strict';

var document;

try {
	document = new (require('jsdom').JSDOM)().window.document;
} catch (ignore) {}

exports.context = document ? {
	document: document,
	setTimeout: setTimeout
} : {};
