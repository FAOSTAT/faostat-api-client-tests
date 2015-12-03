/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            documents: null
        },
        domain_code = 'Q',
        expected = {
            documents: 1
        };

    describe('Documents Service', function () {
        beforeEach(function (done) {
            c.documents({
                domain_code: domain_code
            }).then(function (response) {
                services.documents = response;
                done();
            });
        });
        it('that returns ' + expected.documents + ' values for ' + domain_code, function () {
            expect(services.documents.data.length).toEqual(expected.documents);
        });
        it('with a "DomainCode" field', function () {
            expect(services.documents.data[0].DomainCode).not.toBeNull();
        });
        it('with a "FileName" field', function () {
            expect(services.documents.data[0].FileName).not.toBeNull();
        });
        it('with a "FilePath" field', function () {
            expect(services.documents.data[0].FilePath).not.toBeNull();
        });
        it('with a "CreatedDate" field', function () {
            expect(services.documents.data[0].CreatedDate).not.toBeNull();
        });
    });

});