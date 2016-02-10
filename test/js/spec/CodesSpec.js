/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        languages = ['en', 'fr', 'es'],
        i;

    for (i = 0; i < languages.length; i += 1) {

        describe('Codes Service (' + languages[i] + ')', function () {

            var lang = languages[i],
                domain_code = 'QC',
                services = {
                    data: null,
                    metadata: null
                },
                expected = {
                    codes: 243,
                    metadata: 11
                };

            describe('can fetch country codes for the ' + domain_code + ' domain (' + lang + ')', function () {
                beforeEach(function (done) {
                    c.codes({
                        id: 'countries',
                        lang: lang,
                        subcodelists: null,
                        ord: null,
                        domain_code: domain_code
                    }).then(function (response) {
                        services.codes = response.data;
                        services.metadata = response.metadata;
                        done();
                    });
                });
                it('and returns ' + expected.codes + ' countries', function () {
                    expect(services.codes.length).toEqual(expected.codes);
                });
                it('and ' + expected.metadata + ' metadata parameters', function () {
                    expect(Object.keys(services.metadata.parameters).length).toEqual(expected.metadata);
                });
                it('and it maps "countries" to "List1Codes"', function () {
                    expect(services.metadata.parameters.parameter).toEqual('List1Codes');
                });
            });

            describe('can fetch all the subdomains of "area" (' + lang + ')', function () {
                beforeEach(function (done) {
                    c.codes({
                        id: 'area',
                        lang: lang,
                        subcodelists: null,
                        ord: null,
                        domain_code: domain_code,
                        group_subdimensions: true
                    }).then(function (response) {
                        services.codes = response.data;
                        services.metadata = response.metadata;
                        done();
                    });
                });
                it('and returns 3 subdomains', function () {
                    expect(services.codes.length).toEqual(3);
                });
                it('the 1st contains ' + expected.codes + ' countries', function () {
                    expect(services.codes[0].data.length).toEqual(expected.codes);
                });
                it('the 2nd contains 28 regions', function () {
                    expect(services.codes[1].data.length).toEqual(28);
                });
                it('the 3rd contains 6 special groups', function () {
                    expect(services.codes[2].data.length).toEqual(6);
                });
                it('and it maps "countries" to "List1Codes"', function () {
                    expect(services.metadata.parameters.parameter).toEqual('List1Codes');
                });
            });

        });

    }

});