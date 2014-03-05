'use strict';

define([
    'backboneCustom',
    'core/poller'
], function(Backbone, poller) {

    return Backbone.Collection.extend(_.extend({

        poller: function(options) {
            this.fetch(options);
        }

    }, poller));
});