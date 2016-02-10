/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({});

    describe('Deploy Service', function () {

        describe('has a default base URL', function () {
            it('http://fenixapps2.fao.org/api/v1.0/', function () {
                expect(c.CONFIG.base_url).toEqual('http://fenixapps2.fao.org/api/v1.0/');
            });
        });

    });

});