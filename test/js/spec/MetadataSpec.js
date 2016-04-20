/*global define, describe, it, expect, beforeEach*/
define(['faostat-api-client'], function (FAOSTATAPIClient) {

    'use strict';

    var c = new FAOSTATAPIClient({}),
        services = {
            data: null,
            metadata: null
        };

    describe('Metadata Service', function () {

        describe('can fetch the metadata of a domain', function () {
            beforeEach(function (done) {
                c.metadata({
                    domain_code: 'QC'
                }).then(function (response) {
                    services.data = response;
                    done();
                });
            });
            it('with a "metadata_code" field', function () {
                expect(services.data.data[0].metadata_code).not.toBeNull();
            });
            it('with a "metadata_label" field', function () {
                expect(services.data.data[0].metadata_label).not.toBeNull();
            });
        });

    });

});