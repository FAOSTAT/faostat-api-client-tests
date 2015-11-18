/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            abbreviations: null
        },
        expected = {
            abbreviations_production: 100,
            abbreviations_test: 100
        };

    describe('Abbreviations Service', function () {

        describe('has a default base URL', function () {
            it('http://fenixapps2.fao.org/api/v1.0/', function () {
                expect(c.CONFIG.base_url).toEqual('http://fenixapps2.fao.org/api/v1.0/');
            });
        });

        describe('can query the PRODUCTION database', function () {
            beforeEach(function (done) {
                c.abbreviations({
                    datasource: 'production'
                }).then(function (response) {
                    services.abbreviations = response;
                    done();
                });
            });
            it('that returns ' + expected.abbreviations_production + ' values', function () {
                expect(services.abbreviations.data.length).toEqual(expected.abbreviations_production);
            });
        });

        describe('can query the TEST database', function () {
            beforeEach(function (done) {
                c.abbreviations({
                    datasource: 'test'
                }).then(function (response) {
                    services.abbreviations = response;
                    done();
                });
            });
            it('that returns ' + expected.abbreviations_test + ' values', function () {
                expect(services.abbreviations.data.length).toEqual(expected.abbreviations_test);
            });
        });

    });

});