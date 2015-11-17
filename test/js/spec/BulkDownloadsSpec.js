/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            bulk_downloads: null
        },
        domains = ['hs', 'qc', 'qd', 'qa', 'ql', 'qp', 'qi', 'qv'],
        domain_code = null,
        expected = {
            hs: 0,
            qc: 9,
            qd: 9,
            qa: 9,
            ql: 9,
            qp: 9,
            qi: 9,
            qv: 9
        },
        i;

    describe('Bulk Downloads Service', function () {

        describe('has a default base URL', function () {
            it('http://fenixapps2.fao.org/api/v1.0/', function () {
                expect(c.CONFIG.base_url).toEqual('http://fenixapps2.fao.org/api/v1.0/');
            });
        });

        for (i = 0; i < domains.length; i += 1) {
            domain_code = domains[i];
            describe('can query the ' + domain_code + ' domain', function () {
                beforeEach(function (done) {
                    c.bulkdownloads({
                        domain_code: domain_code
                    }).then(function (response) {
                        services.bulk_downloads = response;
                        done();
                    });
                });
                it('that returns ' + expected[domain_code] + ' values', function () {
                    expect(services.bulk_downloads.data.length).toEqual(expected[domain_code]);
                });
            });
        }

    });

});