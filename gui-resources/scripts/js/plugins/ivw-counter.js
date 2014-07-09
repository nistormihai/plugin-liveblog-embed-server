'use strict';
define([
    'plugins',
    'lib/utils'
], function(plugins, utils) {

    plugins['ivw-counter'] = {
        deps: ['button-pagination'],
        init: function(config) {

            utils.dispatcher.once('initialize.posts-view', function(view) {
                view.clientEvents({'click [data-gimme="posts.nextPage"]': 'ivwCounter'});
                view.ivwCounter = function() {
                    /* global RPO */
                    view.buttonNextPage();
                    if ((typeof(RPO) !== 'undefined') && RPO.reloadIVW) {
                        RPO.reloadIVW();
                    }
                };
            });
        }
    };
});
