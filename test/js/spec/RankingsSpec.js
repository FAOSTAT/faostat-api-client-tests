/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            rankings: null
        },
        expected = {
            rankings: 10
        };

    describe('Rankings Service', function () {

        describe('Commodities by regions/country: Quantity', function () {
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

        describe('Commodities by regions/country: Trade', function () {
            beforeEach(function (done) {
                c.rankings({
                    domain_codes: ['TA', 'TP'],
                    List1Codes: ['5000'],
                    List2Codes: ['5610'],
                    List3Codes: ['_1'],
                    List4Codes: ['2012'],
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

        describe('Countries by commodity: Value', function () {
            beforeEach(function (done) {
                c.rankings({
                    domain_codes: ['QV'],
                    List1Codes: ['_1'],
                    List2Codes: ['154'],
                    List3Codes: ['15'],
                    List4Codes: ['2013'],
                    List5Codes: null,
                    List6Codes: null,
                    List7Codes: null,
                    filter_list: 3,
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

        describe('Countries by commodity: Trade', function () {
            beforeEach(function (done) {
                c.rankings({
                    domain_codes: ['TA', 'TP'],
                    List1Codes: ['_1'],
                    List2Codes: ['5922'],
                    List3Codes: ['15'],
                    List4Codes: ['2012'],
                    List5Codes: null,
                    List6Codes: null,
                    List7Codes: null,
                    filter_list: 3,
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

    });

});