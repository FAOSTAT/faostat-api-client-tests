define(['jquery'], function ($) {

    'use strict';

    function FAOSTATAPIClient() {

        /* Default configuration. */
        this.CONFIG = {
            lang: 'en',
            schema: null,
            base_url: 'http://localhost:8080/faostat-api/v1.0/'
        };

    }

    FAOSTATAPIClient.prototype.init = function(config) {

        /* This... */
        var _this = this;

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

    };

        FAOSTATAPIClient.prototype.groups = function(config) {
    $.ajax({
        url: 'http://localhost:8080/faostat-api/v1.0/{lang}/groups/',
        data: data,
        type: 'GET',
        success: config.success,
        error: config.error
    });
};

    return FAOSTATAPIClient;

});