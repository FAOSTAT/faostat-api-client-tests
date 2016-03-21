/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            data: null,
            metadata: null
        },
        expected = {
            data: 54
        };

    describe('Data Size Service', function () {

        describe('can determine the size of the result of a query', function () {
            beforeEach(function (done) {
                c.datasize({
                    domain_codes: ['QC'],
                    List1Codes: ['2'],
                    List2Codes: ['2510'],
                    List3Codes: ['15'],
                    List4Codes: ['_1'],
                    List5Codes: null,
                    List6Codes: null,
                    List7Codes: null
                }).then(function (response) {
                    services.data = response;
                    done();
                });
            });
            it('that returns 60 results', function () {
                expect(services.data.data[0].NoRecords).toEqual(expected.data);
            });
        });

    });

});