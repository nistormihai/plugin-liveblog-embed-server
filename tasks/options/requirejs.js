module.exports = {
    main: {
        options: {
            mainConfigFile: '<%= paths.scripts %>/main.js',
            baseUrl: '<%= paths.scripts %>/',
            name: 'main',
            out: '<%= paths.build  %>/main.min.js',
            paths: {
                'themeBase':                '../../../gui-themes/themes/base',
                'dustjs-linkedin':          '../../../node_modules/dustjs-linkedin/dist/dust-full',
                'dustjs-helpers':           '../../../node_modules/dustjs-helpers/dist/dust-helpers',
                'jed':                      '../../../node_modules/jed/jed',
                'lodash.compat':            '../../../node_modules/lodash/dist/lodash.compat',
                'backbone':                 '../../../node_modules/backbone/backbone',
                'backbone.layoutmanager':   '../../../node_modules/backbone.layoutmanager/backbone.layoutmanager',
                'moment':                   '../../../node_modules/moment/moment',
                'requireLib':               '../../../node_modules/requirejs/require',
                'themeFile':                'empty:'
            },
            include: [
                'requireLib',
                'router',
                'i18n',
                'tmpl',
                'lib/require/i18n-parse',
                'lib/helpers/find-environment',
                'lib/jquery/xdomainrequest',
                'css',
                'all-plugins'
            ],
            //findNestedDependencies: true,
            namespace: 'liveblog',
            optimize: 'none'
        }
    },
    zeit_desktop: {
        options: {
            paths: {
                'themeBase':                '../../../gui-themes/themes/base',
                'theme':                     '../../../gui-themes/themes/zeit/desktop',
                'themeFile':                 '../../../gui-themes/themes/zeit/desktop',
                'tmpl':                     'lib/require/tmpl',
                'i18n':                     'lib/require/i18n',
                'dustjs-linkedin':          '../../../node_modules/dustjs-linkedin/dist/dust-full',
                'dust':                     'lib/dust',
                'dustjs-helpers':           '../../../node_modules/dustjs-helpers/dist/dust-helpers',
                'jed':                      '../../../node_modules/jed/jed',
                'lodash.compat':            '../../../node_modules/lodash/dist/lodash.compat',
                'underscore':               '../../../node_modules/lodash/dist/lodash.compat',
                'backbone':                 '../../../node_modules/backbone/backbone',
                'backbone.layoutmanager':   '../../../node_modules/backbone.layoutmanager/backbone.layoutmanager',
                'moment':                   '../../../node_modules/moment/moment',
                'jquery':                   'empty:',
                'css':                      'lib/require/css',
                'css-build':                'lib/require/css-build'
            },
            shim: {
                'dustjs-linkedin': {
                    exports: 'dust'
                },
                'dustjs-helpers': {
                    deps: ['dustjs-linkedin']
                }
            },
            excludeShallow: [
                'underscore',
                'jed',
                'tmpl',
                'dustjs-linkedin',
                'dustjs-helpers',
                'dust',
                'dust/dust',
                'dust/core',
                'dust/themed',
                'dust/render-themed',
                'dust/helpers/i18n',
                'dust/helpers/trim',
                'dust/helpers/twitter',
                'backbone',
                'lib/utils',
                'lib/gettext',
                'lib/require/i18n-parse',
                'lib/helpers/object-parse',
                'tmpl!themeBase/item/base'
            ],
            baseUrl: '<%= paths.scripts %>/',
            mainConfigFile: '<%= paths.themes %>zeit/desktop.js',
            name: 'themeFile',
            out:  '<%= paths.build  %>/themes/zeit/desktop.js',
            //findNestedDependencies: true,
            namespace: 'liveblog',
            optimize: 'none'
        }
    }
};
