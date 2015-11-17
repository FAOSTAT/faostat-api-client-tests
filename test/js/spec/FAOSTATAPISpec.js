/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            abbreviations: null,
            groups: null,
            domains: null,
            bulk_downloads: null
        },
        expected = {
            abbreviations: 100,
            groups: 15,
            domains: 7,
            bulk_downloads: 10
        };

    describe('FAOSTAT API Client', function () {

        describe('has a default base URL', function () {
            it('http://fenixapps2.fao.org/api/v1.0/', function () {
                expect(c.CONFIG.base_url).toEqual('http://fenixapps2.fao.org/api/v1.0/');
            });
        });

        describe('has a service for Abbreviations', function () {
            beforeEach(function (done) {
                c.abbreviations().then(function (response) {
                    services.abbreviations = response;
                    done();
                });
            });
            it('that returns ' + expected.abbreviations + ' values', function () {
                expect(services.abbreviations.data.length).toEqual(expected.abbreviations);
            });
        });

        describe('has a service for Groups', function () {
            beforeEach(function (done) {
                c.groups().then(function (response) {
                    services.groups = response;
                    done();
                });
            });
            it('that returns ' + expected.groups + ' values', function () {
                expect(services.groups.data.length).toEqual(expected.groups);
            });
        });

        describe('has a service for Domains', function () {
            beforeEach(function (done) {
                c.domains({
                    group_code: 'Q'
                }).then(function (response) {
                    services.domains = response;
                    done();
                });
            });
            it('that returns ' + expected.domains + ' values for the Q group', function () {
                expect(services.domains.data.length).toEqual(expected.domains);
            });
        });

    });

});