// Liveblog custom additions to Backbone.js
'use strict';

define([
    'backbone',
    'underscore',
    'lib/utils'
], function(Backbone, _, utils) {

    Backbone.defaultSync = Backbone.sync;

    Backbone.sync = function(method, model, options) {

        if (!options) { options = {}; }

        // Never delete models from the collection on merge
        options.remove = false;

        if (method === 'read') {
            // Request a date format that all browsers can parse
            options.headers = _.isObject(options.headers) ? options.headers : {};

            options.headers['X-Format-DateTime'] = 'yyyy-MM-ddTHH:mm:ss\'Z\'';
            // Add parameters provided in model.syncParams.headers
            // to the request header
            _.each(model.syncParams.headers, function(value, key) {
                options.headers[key] = value;
            });

            // Add parameters provided in model.syncParams.data
            // as parameters to the request url, unless the same
            // parameter has been provided as an option in fetch method.
            // (params in fetch method have precedence over params in
            // syncParams.data)
            _.each(model.syncParams.data, function(value, key) {
                options.data = options.data || {};
                if (!options.data[key]) {
                    options.data[key] = value;
                }
            });
        }
        return Backbone.defaultSync(method, model, options);
    };

    Backbone.defaultAjax = Backbone.ajax;

    Backbone.ajax = function(options) {

        // send the old headers if liveblog.emulateOLDHEADERS
        if (liveblog.emulateOLDHEADERS) {
            options.dataType = 'json';
            options.headers = _.isObject(options.headers) ? options.headers : {};
            options.headers.Accept = 'text/json';
        }

        // send the headers as GET parametes if liveblog.emulateHEADERSPARAMS
        if (liveblog.emulateHEADERSASPARAMS) {
            options.data = _.extend(options.data, options.headers);
            delete options.headers;
        }

        if (utils.isServer) {
            return Backbone.nodeAjax(options);
        }

        return Backbone.defaultAjax(options);
    };

    Backbone.nodeAjax = function(options) {
        // log the requested url
        if (GLOBAL && GLOBAL.liveblogLogger) {
            liveblogLogger.info('Request to url: %s', options.url);
        }

        var request = require.nodeRequire('request'),
            $ = require.nodeRequire('jquery-deferred');
        var dfd = new $.Deferred();
        // json is default if no dataType option is set.
        if (!options.dataType || options.dataType === 'json') {
            options.json = true;
        }
        // timeout of 2sec per request, not to occupy resources.
        options.timeout = 2000;

        // Set the query string with the options.data params
        if ((!options.type || options.type === 'GET') && options.data) {
            options.qs = options.data;
            delete options.data;
        }

        // set the method from options.type if not set default GET.
        options.method = options.type ? options.type: 'GET';
        delete options.type;

        // Use options.success and options.errors callbacks
        request(options, function(error, response, data) {
            if (!error && response.statusCode === 200) {
                dfd.resolve(data);
                if (options.success) {
                    return options.success(data);
                }
            } else {
                dfd.reject(error);
            }
            if (options.error && _.has(response, 'request')) {
                liveblogLogger.error('Request to url: %s failed with code: %s and body: ', response.request.href, response.statusCode, response.body);
                return options.error(response);
            }
        });
        return dfd.promise();
    };

    return Backbone;
});
