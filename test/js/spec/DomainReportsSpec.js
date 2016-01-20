/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            reports: null
        },
        domain_code = 'FBS',
        expected = {
            reports: 1
        };

    describe('Domain Reports Service', function () {
        beforeEach(function (done) {
            c.domainreports({
                domain_code: domain_code
            }).then(function (response) {
                services.reports = response;
                done();
            });
        });
        it('that returns ' + expected.reports + ' values for ' + domain_code, function () {
            expect(services.reports.data.length).toEqual(expected.reports);
        });
        it('with a "DomainCode" field', function () {
            expect(services.reports.data[0].DomainCode).not.toBeNull();
        });
        it('with a "ReportName" field', function () {
            expect(services.reports.data[0].TabName).not.toBeNull();
        });
        it('with a "ReportCode" field', function () {
            expect(services.reports.data[0].TabCode).not.toBeNull();
        });
    });

});