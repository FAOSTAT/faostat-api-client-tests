/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            domains: null
        },
        expected = {
            domains: 75
        };

   /* describe('Domains Tree Service', function () {
        beforeEach(function (done) {
            c.domainstree().then(function (response) {
                services.domains = response;
                done();
            });
        });
        it('with a "DomainCode" field', function () {
            expect(services.domains.data[0].DomainCode).not.toBeNull();
        });
        it('with a "DomainName" field', function () {
            expect(services.domains.data[0].DomainName).not.toBeNull();
        });
        it('with a "GroupCode" field', function () {
            expect(services.domains.data[0].GroupCode).not.toBeNull();
        });
        it('with a "GroupName" field', function () {
            expect(services.domains.data[0].GroupName).not.toBeNull();
        });
        it('with a "Ord" field', function () {
            expect(services.domains.data[0].Ord).not.toBeNull();
        });
    });*/

});