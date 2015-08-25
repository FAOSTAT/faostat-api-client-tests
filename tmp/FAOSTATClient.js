define(['jquery'], function ($) {

    'use strict';

    function FAOSTATAPIClient(api_key, client_key) {

        /* Store configuration. */
        this.CONFIG = {
            api_key: api_key,
            client_key: client_key
        };

    }

        FAOSTATAPIClient.prototype.groups = function(datasource, lang, success, error) {
    if (this.isValidRequest()) {
        $.ajax({
            url: 'http://localhost:8080/faostat-api/v1.0/' + lang + '/groups/',
            data: {
        "datasource": datasource
},
            type: 'GET',
            success: success,
            error: error
        });
    } else {
        throw 400;
    }
};

    FAOSTATAPIClient.prototype.isValidRequest = function() {
        return true;
    };

    return FAOSTATAPIClient;

});