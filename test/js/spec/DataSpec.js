/*global define, describe, it, expect, beforeEach, jasmine*/
define(['faostat-api-client', 'jquery'], function (FAOSTATAPIClient, $) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        languages = ['en', 'fr', 'es'],
        i;

    for (i = 0; i < languages.length; i += 1) {

        console.log('JQuery Version: ' + $.fn.jquery);

        describe('Data Service (' + languages[i] + ')', function () {

            var lang = languages[i],
                services = {
                    data: null,
                    metadata: null
                };

            describe('returns data (' + lang + ')', function () {
                beforeEach(function (done) {
                    c.data({
                        domain_codes: ['QC'],
                        lang: lang,
                        List1Codes: ['2'],
                        List2Codes: ['2510'],
                        List3Codes: ['15'],
                        List4Codes: ['2012'],
                        List5Codes: null,
                        List6Codes: null,
                        List7Codes: null
                    }).then(function (response) {
                        services.data = response.data;
                        services.metadata = response.metadata;
                        done();
                    });
                });
                it('and every row contains all the KEYS declared in the DSD', function () {
                    var z,
                        col,
                        row = services.data[0];
                    for (z = 0; z < services.metadata.dsd.length; z += 1) {
                        col = services.metadata.dsd[z];
                        expect(row[col.key]).not.toBeUndefined();
                    }
                });
            });

            describe('can fetch a single year (' + lang + ')', function () {
                beforeEach(function (done) {
                    c.data({
                        domain_codes: ['QC'],
                        lang: lang,
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

            describe('can fetch a complete timeseries (' + lang + ')', function () {
                beforeEach(function (done) {
                    c.data({
                        domain_codes: ['QC'],
                        lang: lang,
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

                /* it('and data.key should match with dsd.key', function () {
                 console.log("HERE!");
                 console.log($);
                 console.log(services.data.length);
                 console.log(services.data[0].length);
                 console.log(JSON.stringify(services.data[0]));
                 var data = $.parseJSON(services.data[0]);
                 console.log(JSON.stringify(data));
                 console.log(data);
                 for(var k=0; k < data.length; k+=1) {
                 console.log("HERE2!");
                 var key = JSON.parse(data[k]);
                 console.log(JSON.stringify(key));
                 var dataKey = data[k],
                 check = false;
                 console.log(JSON.stringify(dataKey));
                 dataKey = "taccitua";
                 console.log(dataKey);
                 for(var z=0; z < services.metadata.dsd.length; z += 1 ) {
                 if( dataKey === services.metadata.dsd[z].key) {
                 console.log(dataKey, services.metadata.dsd[z].key);
                 check = true;
                 break;
                 }
                 }
                 if ( !check ) {
                 // error
                 expect("test").toEqual(services.metadata.dsd);
                 }
                 }
                 //expect(services.metadata.dsd[0].pivot).not.toBeNull();
                 });*/
            });

            describe('can limit the results (' + lang + ')', function () {
                beforeEach(function (done) {
                    c.data({
                        domain_codes: ['QC'],
                        lang: lang,
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

            describe('can produce CSV files (' + lang + ')', function () {
                beforeEach(function (done) {
                    c.data({
                        domain_codes: ['QC'],
                        lang: lang,
                        List1Codes: ['2', '8'],
                        List2Codes: ['2510'],
                        List3Codes: ['15'],
                        List4Codes: ['2010'],
                        List5Codes: null,
                        List6Codes: null,
                        List7Codes: null,
                        limit: -1,
                        output_type: 'csv'
                    }).then(function (response) {
                        services.data = response;
                        done();
                    }).fail(function (e) {
                        services.data = e.responseText;
                        done();
                    });
                });
                it('as this one', function () {
                    expect(services.data).not.toBeNull();
                    //expect(services.data.length).toEqual(268);
                });
            });

            describe('can use different coding systems (' + lang + ')', function () {
                beforeEach(function (done) {
                    c.data({
                        domain_codes: ['QC'],
                        lang: lang,
                        List1Codes: ['2'],
                        List2Codes: ['2510'],
                        List3Codes: ['15'],
                        List4Codes: ['2010'],
                        List5Codes: null,
                        List6Codes: null,
                        List7Codes: null,
                        List1AltCodes: ['ISO3'],
                        page_size: 10
                    }).then(function (response) {
                        services.data = response;
                        done();
                    });
                });
                it('for example to ISO3 codes', function () {

                    // multilanguage test
                    if (lang === 'en') {
                        expect(services.data.data[0]['Country Code']).toEqual('AFG');
                    }
                    if (lang === 'es') {
                        expect(services.data.data[0]['Código País']).toEqual('AFG');
                    }
                    if (lang === 'fr') {
                        expect(services.data.data[0]['Code Pays']).toEqual('AFG');
                    }

                });
            });

            describe('can group by (' + lang + ')', function () {
                beforeEach(function (done) {
                    c.data({
                        datasource: 'production',
                        domain_codes: 'QC',
                        decimal_places: 2,
                        List1Codes: '5000>',
                        List2Codes: 2510,
                        List3Codes: 1717,
                        List4Codes: 2010,
                        List5Codes: null,
                        List6Codes: null,
                        List7Codes: null,
                        group_by: 'year',
                        order_by: 'area',
                        operator: 'AVG',
                        page_size: 0,
                        limit: -1
                    }).then(function (response) {
                        services.data = response;
                        done();
                    });
                });
                it('to 186 values', function () {
                    expect(services.data.data.length).toEqual(186);
                });
            });

        });
    }

});