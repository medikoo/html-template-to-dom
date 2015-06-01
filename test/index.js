'use strict';

module.exports = function (t, a) {
	var toDOM = t(document), result;

	a.h1("Plain text");
	result = toDOM('razdwa', {});
	a(result.nodeType, 3);
	a(result.data, 'razdwa');

	a.h1("Mixed");
	result = toDOM('<p>raz <strong>elo</strong> dwa</p>', {});
	a(result.nodeName, 'P');
	a(result.childNodes.length, 3);
	a(result.childNodes[0].data, 'raz ');
	a(result.childNodes[1].nodeName, 'STRONG');
	a(result.childNodes[1].firstChild.data, 'elo');
	a(result.childNodes[2].data, ' dwa');

	a.h1("Plain with variables");
	result = toDOM('<p>marko ${ miszel } zagalo</p>', { miszel: 'fura' });
	a(result.nodeName, 'P');
	a(result.childNodes.length, 3);
	a(result.childNodes[0].data, 'marko ');
	a(result.childNodes[1].data, 'fura');
	a(result.childNodes[2].data, ' zagalo');

	a.h1("Mixed with variables");
	result = toDOM('<p>marko <strong>marek ${ miszel }<a href="elo.pdf"> zegarek</a></strong> ' +
		'zagalo ${ fuszka }</p>', {
			miszel: 'fura',
			fuszka: {
				toDOM: function (document) {
					var el = document.createElement('p');
					el.innerHTML = 'razdwa';
					return el;
				}
			}
		});
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
