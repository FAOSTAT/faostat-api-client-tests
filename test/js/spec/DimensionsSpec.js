/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        languages = ['en', 'fr', 'es'],
        i;

    for (i = 0; i < languages.length; i += 1) {

        describe('Dimensions Service (' + languages[i] + ')', function () {

            var lang = languages[i],
                domain_code = 'QC',
                services = {
                    dimensions: null,
                    metadata: null
                },
                expected = {
                    dimensions: 4,
                    metadata: 3
                };

            describe('can fetch the dimensions of the ' + domain_code + ' domain (' + lang + ')', function () {
                beforeEach(function (done) {
                    c.dimensions({
                        domain_code: domain_code
                    }).then(function (response) {
                        services.dimensions = response.data;
                        services.metadata = response.metadata;
                        done();
                    });
                });
                it('and returns ' + expected.dimensions + ' dimensions', function () {
                    expect(services.dimensions.length).toEqual(expected.dimensions);
                });
                it('and ' + expected.metadata + ' metadata parameters', function () {
                    expect(Object.keys(services.metadata.parameters).length).toEqual(expected.metadata);
                });
                it('and it maps "area" to "List1Codes"', function () {
                    expect(services.dimensions[0].parameter).toEqual('List1Codes');
                });
                it('and it maps "element" to "List2Codes"', function () {
                    expect(services.dimensions[1].parameter).toEqual('List2Codes');
                });
                it('and it maps "item" to "List3Codes"', function () {
                    expect(services.dimensions[2].parameter).toEqual('List3Codes');
                });
                it('and it maps "year" to "List4Codes"', function () {
                    expect(services.dimensions[3].parameter).toEqual('List4Codes');
                });
                it('and it provides 3 subdimensions for "area"', function () {
                    expect(services.dimensions[0].subdimensions.length).toEqual(3);
                });
                it('and it provides 1 subdimension for "element"', function () {
                    expect(services.dimensions[1].subdimensions.length).toEqual(1);
                });
                it('and it provides 2 subdimensions for "item"', function () {
                    expect(services.dimensions[2].subdimensions.length).toEqual(2);
                });
                it('and it provides 1 subdimension for "year"', function () {
                    expect(services.dimensions[3].subdimensions.length).toEqual(1);
                });
            });

        });

    }

});