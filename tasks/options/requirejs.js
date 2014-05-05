module.exports = {
    compile: {
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
    }
};
