'use strict';

module.exports = function (t, a) {
	var result;

	a.h1("Plain text");
	result = t(document, ['razdwa']);
	a(result.nodeType, 3);
	a(result.data, 'razdwa');

	a.h1("Mixed");
	result = t(document, ['<p>raz <strong>elo</strong> dwa</p>']);
	a(result.nodeName, 'P');
	a(result.childNodes.length, 3);
	a(result.childNodes[0].data, 'raz ');
	a(result.childNodes[1].nodeName, 'STRONG');
	a(result.childNodes[1].firstChild.data, 'elo');
	a(result.childNodes[2].data, ' dwa');

	a.h1("Plain with variables");
	result = t(document, ['<p>marko ', 'fura', ' zagalo</p>']);
	a(result.nodeName, 'P');
	a(result.childNodes.length, 3);
	a(result.childNodes[0].data, 'marko ');
	a(result.childNodes[1].data, 'fura');
	a(result.childNodes[2].data, ' zagalo');

	a.h1("Mixed with variables");
	result = t(document, ['<p>marko <strong>marek ', 'fura',
		'<a href="elo.pdf"> zegarek</a></strong> zagalo ',
		{
			toDOM: function (document) {
				var el = document.createElement('p');
				el.innerHTML = 'razdwa';
				return el;
			}
		}, '</p>']);
	a(result.nodeName, 'P');
	a(result.childNodes.length, 4);
	a(result.childNodes[0].data, 'marko ');
	a(result.childNodes[1].nodeName, 'STRONG');
	a(result.childNodes[1].childNodes.length, 3);
	a(result.childNodes[1].childNodes[0].data, 'marek ');
	a(result.childNodes[1].childNodes[1].data, 'fura');
	a(result.childNodes[1].childNodes[2].nodeName, 'A');
	a(result.childNodes[1].childNodes[2].childNodes.length, 1);
	a(result.childNodes[1].childNodes[2].firstChild.data, ' zegarek');
	a(result.childNodes[2].data, ' zagalo ');
	a(result.childNodes[3].nodeName, 'P');
	a(result.childNodes[3].childNodes.length, 1);
	a(result.childNodes[3].childNodes[0].data, 'razdwa');

};
