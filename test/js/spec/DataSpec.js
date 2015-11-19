/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            data: null
        };

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
                    services.data = response;
                    done();
                });
            });
            it('made of 53 values', function () {
                expect(services.data.data.length).toEqual(53);
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