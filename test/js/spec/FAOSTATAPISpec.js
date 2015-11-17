/*global define, describe, it, expect*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({});

    describe('FAOSTAT API Client', function () {

        describe('should be configurable by the user', function () {
            it('having "http://fenixapps2.fao.org/api/v1.0/" as default serviceUrl', function () {
                expect(c.CONFIG.base_url).toEqual('http://fenixapps2.fao.org/api/v1.0/');
            });
        });

        //describe("should be able to RETRIEVE data", function () {
        //    it("from SQL databases", function () {
        //        spyOn($, "ajax").and.callFake(function(e) {
        //            e.success({});
        //        });
        //        var success_spy = jasmine.createSpy();
        //        var error_spy = jasmine.createSpy();
        //        w.retrieve({
        //            payload: {
        //                query: 'SELECT AreaCode, AreaNameE FROM Area '
        //            },
        //            success: success_spy,
        //            error: error_spy
        //        });
        //        expect(success_spy).toHaveBeenCalled();
        //        expect(error_spy).not.toHaveBeenCalled();
        //    });
        //});

    });

});