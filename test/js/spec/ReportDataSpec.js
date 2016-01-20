/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            data: null,
            metadata: null
        };

    describe('Report Data Service', function () {

        describe('can fetch the data of a report', function () {
            beforeEach(function (done) {
                c.reportdata({
                    domain_code: 'FBS',
                    report_code: 'FBS',
                    List1Codes: ['9'],
                    List2Codes: ['2011'],
                    List3Codes: null,
                    List4Codes: null,
                    List5Codes: null,
                    List6Codes: null,
                    List7Codes: null,
                    List1AltCodes: null,
                    List2AltCodes: null,
                    List3AltCodes: null,
                    List4AltCodes: null,
                    List5AltCodes: null,
                    List6AltCodes: null,
                    List7AltCodes: null
                }).then(function (response) {
                    services.data = response;
                    done();
                });
            });
            it('made of 117 value', function () {
                expect(services.data.data.length).toEqual(117);
            });
            it('with a "RowShade" field', function () {
                expect(services.data.data[0].RowShade).not.toBeNull();
            });
            it('with a "Col1" field', function () {
                expect(services.data.data[0].Col1).not.toBeNull();
            });
        });

    });

});