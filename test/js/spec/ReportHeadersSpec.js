/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            data: null,
            metadata: null
        };

    describe('Report Headers Service', function () {

        describe('can fetch a single year', function () {
            beforeEach(function (done) {
                c.reportheaders({
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
            it('made of 26 value', function () {
                expect(services.data.data.length).toEqual(26);
            });
            it('with a "RowNo" field', function () {
                expect(services.data.data[0].RowNo).not.toBeNull();
            });
            it('with a "ColNo" field', function () {
                expect(services.data.data[0].ColNo).not.toBeNull();
            });
            it('with a "RowSpan" field', function () {
                expect(services.data.data[0].RowSpan).not.toBeNull();
            });
            it('with a "ColSpan" field', function () {
                expect(services.data.data[0].ColSpan).not.toBeNull();
            });
            it('with a "Border" field', function () {
                expect(services.data.data[0].Border).not.toBeNull();
            });
            it('with a "Label" field', function () {
                expect(services.data.data[0].Label).not.toBeNull();
            });
        });

    });

});