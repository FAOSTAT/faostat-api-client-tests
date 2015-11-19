/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            codes: null,
            metadata: null
        },
        domain_code = 'QC',
        expected = {
            codes: 243,
            metadata: 10
        };

    describe('Codes Service', function () {
        beforeEach(function (done) {
            c.codes({
                id: 'countries',
                subcodelists: null,
                ord: null,
                domain_code: domain_code
            }).then(function (response) {
                services.codes = response.data;
                services.metadata = response.metadata;
                done();
            });
        });
        it('returns ' + expected.codes + ' countries', function () {
            expect(services.codes.length).toEqual(expected.codes);
        });
        it('it is described by 9 metadata parameters', function () {
            expect(Object.keys(services.metadata.parameters).length).toEqual(expected.metadata);
        });
        it('and it maps "countries" to "List1Codes"', function () {
            expect(services.metadata.parameters.parameter).toEqual('List1Codes');
        });
    });

});