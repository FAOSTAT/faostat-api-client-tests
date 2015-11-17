/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        group_code = 'Q',
        domain_code = 'QC',
        services = {
            abbreviations: null,
            groups: null,
            domains: null,
            classifications: null,
            codes: null,
            bulk_downloads: null
        },
        expected = {
            abbreviations: 100,
            groups: 15,
            domains: 7,
            classifications: 236,
            codes: 243,
            bulk_downloads: 9
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

        describe('has a service for Bulk Downloads', function () {
            beforeEach(function (done) {
                c.bulkdownloads({
                    domain_code: domain_code
                }).then(function (response) {
                    services.bulk_downloads = response;
                    done();
                });
            });
            it('that returns ' + expected.bulk_downloads + ' values', function () {
                expect(services.bulk_downloads.data.length).toEqual(expected.bulk_downloads);
            });
        });

        describe('has a service for Classifications', function () {
            beforeEach(function (done) {
                c.classifications({
                    domain_code: domain_code
                }).then(function (response) {
                    services.classifications = response;
                    done();
                });
            });
            it('that returns ' + expected.classifications + ' values', function () {
                expect(services.classifications.data.length).toEqual(expected.classifications);
            });
        });

        describe('has a service for Codes', function () {
            beforeEach(function (done) {
                c.codes({
                    id: 'countries',
                    subcodelists: null,
                    ord: null,
                    domain_code: domain_code
                }).then(function (response) {
                    services.codes = response;
                    done();
                });
            });
            it('that returns ' + expected.codes + ' values', function () {
                expect(services.codes.data.length).toEqual(expected.codes);
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
                    group_code: group_code
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