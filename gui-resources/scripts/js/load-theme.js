'use strict';

define([
    'require-global',
    'module',
    'underscore',
    'plugins',
    'lib/utils'
], function(requirejs, module, _, plugins, utils) {
    // requirejs = liveblog.require ? liveblog.require: require;
    var undefineTheme = function() {
        requirejs.undef('theme');
        requirejs.undef('themeFile');
    };
    // Set theme and theme file paths.
    // Once the paths are correctly set, load the files,
    //  create the blogView and use it as param for the callback function.
    return function(config, callback) {
        config = config || {theme: 'default'};
        callback = callback || function() {};
        var loadPlugins = function() {
            _.each(plugins, function(fn, key) {
                fn(config);
            });
            callback();
        },
        themesPath = liveblog.min ? module.config().buildPath : module.config().themesPath;
        // Set liveblog theme
        liveblog.theme = liveblog.theme ? liveblog.theme : config.theme;
        liveblog.language = liveblog.language ? liveblog.language : config.language;
        // Set the path for theme template files and theme config file
        requirejs.config({
            paths: {
                theme:  themesPath + liveblog.theme,
                themeFile: themesPath + liveblog.theme
            }
        });
        // Load (apply) theme config
        undefineTheme();
        require([
            'themeFile',
            'lib/helpers/find-environment',
            'i18n!livedesk_embed'
        ], function(theme, findEnvironment) {
            // If the theme has different environments reset the
            //  path to theme template files and theme config file to use
            //  the ones for the selected environment
            if (theme && theme.environments) {
                if (!liveblog.environment) {
                    var environment = findEnvironment();
                    liveblog.environment = theme.environments[environment] ?
                        theme.environments[environment] : theme.environments['default'];
                }
                undefineTheme();
                requirejs.config({
                    paths: {
                        theme: themesPath + liveblog.theme + '/' + liveblog.environment,
                        themeFile: themesPath + liveblog.theme + '/' + liveblog.environment
                    }
                });
                requirejs(['themeFile'], function() {
                    loadPlugins();
                }, function(err) {
                    undefineTheme();
                    utils.dispatcher.trigger('sub-theme-file.request-failed');
                });
            } else {
                loadPlugins();
            }
        }, function(err) {
            undefineTheme();
            utils.dispatcher.trigger('theme-file.request-failed');
        });
    };
});
