define([
    'lib/require-global',
    'backbone-custom',
    'dust',
    'lib/require/i18n-parse'
], function(requirejs, Backbone, dust, i18nParse) {
	return function(name) {
		var path = requirejs.toUrl(name + '.dust');
		Backbone.ajax(options);
	}
});
