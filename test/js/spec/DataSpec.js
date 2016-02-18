/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            data: null,
            metadata: null
        };

    describe('Data Bean Service', function () {

        describe('can fetch a single year', function () {
            beforeEach(function (done) {
                c.data({
                    domain_codes: ['QC'],
                    filters: {
                        area: ['2'],
                        elements: ['2510'],
                        items: ['15'],
                        years: ['2012']
                    }
                }).then(function (response) {
                    services.data = response;
                    done();
                });
            });
            it('made of 1 value', function () {
                expect(services.data.data.length).toEqual(1);
            });
        });

    });

});