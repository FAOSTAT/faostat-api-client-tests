define(['jquery'], function ($) {

    'use strict';

    function FAOSTATAPIClient() {

        /* Default configuration. */
        this.CONFIG = {
            lang: 'en',
            schema: null,
            base_url: 'http://localhost:8080/faostat-api/v1.0/'
        };

        /* Store the schema describing the available services. */
        $.ajax({
            url: this.CONFIG.base_url,
            type: 'GET',
            success: function (response) {
                console.debug(response);
            }
        });

    }

    FAOSTATAPIClient.prototype.init = function(config) {

        /* This... */
        var _this = this;

        /* Extend default configuration. */
        this.CONFIG = $.extend(true, {}, this.CONFIG, config);

    };

    FAOSTATAPIClient.prototype.get_version = function(response) {
        return $.fn.jquery;
    };

    return FAOSTATAPIClient;

});
