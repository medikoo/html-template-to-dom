'use strict';

var forEachRight        = require('es5-ext/array/#/for-each-right')
  , ensureArray         = require('es5-ext/array/valid-array')
  , isDocumentFragment  = require('dom-ext/document-fragment/is-document-fragment')
  , isElement           = require('dom-ext/element/is-element')
  , isText              = require('dom-ext/text/is-text')
  , normalize           = require('dom-ext/document/#/normalize')
  , validDocument       = require('dom-ext/html-document/valid-html-document')
  , htmlToDom           = require('dom-ext/html-document/#/html-to-dom')

  , insertsRe = /\x01(\d+)\x01/, justInsertRe = /^\x01(\d+)\x01$/

  , isArray = Array.isArray, forEach = Array.prototype.forEach;

var resolveInserts = function (str, inserts, document) {
	var result, index = str.search(insertsRe), match, normalized;
	if (index === -1) return null;
	result = document.createDocumentFragment();
	while ((index = str.search(insertsRe)) !== -1) {
		if (index > 0) result.appendChild(document.createTextNode(str.slice(0, index)));
		str = str.slice(index);
		match = str.match(insertsRe);
		if ((normalized = normalize.call(document, inserts[match[1]]))) {
			if (isArray(normalized)) normalized.forEach(result.appendChild, result);
			else result.appendChild(normalized);
		}
		str = str.slice(match[0].length);
	}
	if (str.length) result.appendChild(document.createTextNode(str));
	return result;
};

var fixInserts = function (dom, inserts, document) {
	if (isText(dom)) return resolveInserts(dom.data, inserts, document) || dom;
	if (isElement(dom)) {
		forEach.call(dom.attributes, function (attr) {
			var match = attr.value.match(justInsertRe), insert;
			if (match) {
				insert = inserts[match[1]];
				if (typeof insert.toDOMAttr === 'function') {
					insert.toDOMAttr(dom, attr.name);
					return;
				}
				attr.value = String(insert);
				return;
			}
			attr.value = attr.value.replace(insertsRe, function (ignore, index) {
				return String(inserts[index]);
			});
		});
	} else if (!isDocumentFragment(dom)) {
		return dom;
	}
	forEachRight.call(dom.childNodes, function (child, index) {
		var nu = fixInserts(child, inserts, document);
		if (nu === child) return;
		dom.insertBefore(nu, child);
		dom.removeChild(child);
	});
	return dom;
};

module.exports = function (document, tokens) {
	var insertsMap, insertIndex = -1, dom, html;
	validDocument(document);
	ensureArray(tokens);
	insertsMap = [];
	html = tokens.reduce(function (a, b, index) {
		if (!(index % 2)) return a + b;
		insertsMap[++insertIndex] = b;
		return a + '\x01' + String(insertIndex) + '\x01';
	}, '');
	dom = htmlToDom.call(document, html);
	if (!insertsMap) return dom;
	return fixInserts(dom, insertsMap, document);
};
