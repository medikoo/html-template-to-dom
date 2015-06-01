'use strict';

var ensureStringifiable = require('es5-ext/object/validate-stringifiable-value')
  , ensureObject        = require('es5-ext/object/valid-object')
  , compile             = require('es6-template-strings/compile')
  , resolve             = require('es6-template-strings/resolve-to-array')
  , fromResolvedTokens  = require('./from-resolved-tokens');

module.exports = function (document, html, context/*, options*/) {
	return fromResolvedTokens(document, resolve(compile(ensureStringifiable(html)),
		ensureObject(context)), arguments[3]);
};
