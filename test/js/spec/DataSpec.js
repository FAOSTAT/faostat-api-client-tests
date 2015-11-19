/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            data: null,
            metadata: null
        },
        i;

    describe('Data Service', function () {

        describe('can fetch a single year', function () {
            beforeEach(function (done) {
                c.data({
                    domain_code: 'QC',
                    List1Codes: ['2'],
                    List2Codes: ['2510'],
                    List3Codes: ['15'],
                    List4Codes: ['2012'],
                    List5Codes: null,
                    List6Codes: null,
                    List7Codes: null
                }).then(function (response) {
                    services.data = response;
                    done();
                });
            });
            it('made of 1 value', function () {
                expect(services.data.data.length).toEqual(1);
            });
        });

        describe('can fetch a complete timeseries', function () {
            beforeEach(function (done) {
                c.data({
                    domain_code: 'QC',
                    List1Codes: ['2', '8'],
                    List2Codes: ['2510'],
                    List3Codes: ['15'],
                    List4Codes: ['_1'],
                    List5Codes: null,
                    List6Codes: null,
                    List7Codes: null
                }).then(function (response) {
                    services.data = response.data;
                    services.metadata = response.metadata;
                    done();
                });
            });
            it('made of 53 values', function () {
                expect(services.data.length).toEqual(53);
            });
            it('and a DSD with 14 columns', function () {
                expect(services.metadata.dsd.length).toEqual(14);
            });
            it('and each one of them has the configuration for the pivot tables', function () {
                expect(services.metadata.dsd[0].pivot).not.toBeNull();
            });
        });

        describe('can limit the results', function () {
            beforeEach(function (done) {
                c.data({
                    domain_code: 'QC',
                    List1Codes: ['2', '8'],
                    List2Codes: ['2510'],
                    List3Codes: ['15'],
                    List4Codes: ['_1'],
                    List5Codes: null,
                    List6Codes: null,
                    List7Codes: null,
                    page_size: 10
                }).then(function (response) {
                    services.data = response;
                    done();
                });
            });
            it('to 10 values', function () {
                expect(services.data.data.length).toEqual(10);
            });
        });

    });

});