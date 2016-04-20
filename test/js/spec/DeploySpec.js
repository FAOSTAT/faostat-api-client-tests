/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({});

    describe('Deploy Service', function () {

        describe('has a default base URL', function () {
            it('http://fenix.fao.org/faostat/api/v1/', function () {
                expect(c.CONFIG.base_url).toEqual('http://fenix.fao.org/faostat/api/v1/');
            });
        });

    });

});