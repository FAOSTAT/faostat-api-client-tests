/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            tabs: null
        },
        domain_code = 'QC',
        expected = {
            tabs: 4
        };

    describe('Domain Tabs Service', function () {
        beforeEach(function (done) {
            c.domaintabs({
                domain_code: domain_code
            }).then(function (response) {
                services.tabs = response;
                done();
            });
        });
        it('that returns ' + expected.tabs + ' values for ' + domain_code, function () {
            expect(services.tabs.data.length).toEqual(expected.tabs);
        });
        it('with a "DomainCode" field', function () {
            expect(services.tabs.data[0].DomainCode).not.toBeNull();
        });
        it('with a "TabName" field', function () {
            expect(services.tabs.data[0].TabName).not.toBeNull();
        });
        it('with a "TabCode" field', function () {
            expect(services.tabs.data[0].TabCode).not.toBeNull();
        });
        it('with a "Ord" field', function () {
            expect(services.tabs.data[0].Ord).not.toBeNull();
        });
    });

});