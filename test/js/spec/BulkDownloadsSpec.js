/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            bulk_downloads: null
        },
        domain_code = 'QC',
        expected = {
            // TODO: this could change if 'QC' bulk_downloads number will change
            bulk_downloads: 9
        };

    describe('Bulk Downloads Service', function () {
        beforeEach(function (done) {
            c.bulkdownloads({
                domain_code: domain_code
            }).then(function (response) {
                services.bulk_downloads = response;
                done();
            });
        });
        it('that returns ' + expected.bulk_downloads + ' values for ' + domain_code, function () {
            expect(services.bulk_downloads.data.length).toEqual(expected.bulk_downloads);
        });
    });

});