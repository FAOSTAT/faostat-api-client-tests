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
            data: null,
            classifications: null,
            codes: null,
            dimensions: null,
            glossary: null,
            groupsanddomains: null,
            methodologies: null,
            methodology: null,
            units: null,
            rankings: null,
            bulk_downloads: null
        },
        expected = {
            abbreviations: 100,
            groups: 15,
            data: 3,
            domains: 7,
            classifications: 236,
            dimensions: 4,
            glossary: 337,
            groupsanddomains: 71,
            methodologies: 42,
            methodology: 1,
            units: 37,
            rankings: 10,
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

        describe('has a service for Data', function () {
            beforeEach(function (done) {
                c.data({
                    domain_codes: [domain_code],
                    List1Codes: ['2', '8'],
                    List2Codes: ['2510'],
                    List3Codes: ['15'],
                    List4Codes: ['2012', '2011', '2010'],
                    List5Codes: null,
                    List6Codes: null,
                    List7Codes: null
                }).then(function (response) {
                    services.data = response;
                    done();
                });
            });
            it('that returns ' + expected.data + ' values', function () {
                expect(services.data.data.length).toEqual(expected.data);
            });
        });

        describe('has a service for Dimensions', function () {
            beforeEach(function (done) {
                c.dimensions({
                    domain_code: domain_code
                }).then(function (response) {
                    services.dimensions = response;
                    done();
                });
            });
            it('that returns ' + expected.dimensions + ' values', function () {
                expect(services.dimensions.data.length).toEqual(expected.dimensions);
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

        describe('has a service for Glossary', function () {
            beforeEach(function (done) {
                c.glossary().then(function (response) {
                    services.glossary = response;
                    done();
                });
            });
            it('that returns ' + expected.glossary + ' values', function () {
                expect(services.glossary.data.length).toEqual(expected.glossary);
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

        describe('has a service for Groups and Domains', function () {
            beforeEach(function (done) {
                c.groupsanddomains().then(function (response) {
                    services.groupsanddomains = response;
                    done();
                });
            });
            it('that returns ' + expected.groupsanddomains + ' values', function () {
                expect(services.groupsanddomains.data.length).toEqual(expected.groupsanddomains);
            });
        });

        describe('has a service for Methodologies', function () {
            beforeEach(function (done) {
                c.methodologies().then(function (response) {
                    services.methodologies = response;
                    done();
                });
            });
            it('that returns ' + expected.methodologies + ' values', function () {
                expect(services.methodologies.data.length).toEqual(expected.methodologies);
            });
        });

        describe('has a service for Methodology', function () {
            beforeEach(function (done) {
                c.methodology({
                    id: '4'
                }).then(function (response) {
                    services.methodology = response;
                    done();
                });
            });
            it('that returns ' + expected.methodology + ' values', function () {
                expect(services.methodology.data.length).toEqual(expected.methodology);
            });
        });

        describe('has a service for Rankings', function () {
            beforeEach(function (done) {
                c.rankings({
                    domain_codes: ['QA', 'QC', 'QD', 'QL', 'QP'],
                    List1Codes: ['2'],
                    List2Codes: ['5510'],
                    List3Codes: ['_1'],
                    List4Codes: ['2013'],
                    List5Codes: null,
                    List6Codes: null,
                    List7Codes: null,
                    filter_list: 1,
                    rank_type: 'DESC',
                    limit: '10'
                }).then(function (response) {
                    services.rankings = response;
                    done();
                });
            });
            it('that returns ' + expected.rankings + ' values', function () {
                expect(services.rankings.data.length).toEqual(expected.rankings);
            });
        });

        describe('has a service for Units', function () {
            beforeEach(function (done) {
                c.units().then(function (response) {
                    services.units = response;
                    done();
                });
            });
            it('that returns ' + expected.units + ' values', function () {
                expect(services.units.data.length).toEqual(expected.units);
            });
        });

    });

});