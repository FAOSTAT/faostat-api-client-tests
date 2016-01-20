/*global require, window*/
require.config({
    baseUrl: '../src',
    paths: {
        'jquery': ['../test/js/libs/jquery.min'],
        'q': ['../test/js/libs/q'],
        'jasmine': ['../test/js/libs/jasmine'],
        'jasmine-html': ['../test/js/libs/jasmine-html'],
        'jasmine-boot': ['../test/js/libs/boot'],
        'faostat-api-client': ['../src/js/FAOSTATAPIClient'],
        'faostat-api-spec': ['../test/js/spec/FAOSTATAPISpec'],
        'abbreviations-spec': ['../test/js/spec/AbbreviationsSpec'],
        'data-bean-spec': ['../test/js/spec/DataBeanSpec'],
        'data-spec': ['../test/js/spec/DataSpec'],
        'data-size-spec': ['../test/js/spec/DataSizeSpec'],
        'codes-spec': ['../test/js/spec/CodesSpec'],
        'rankings-spec': ['../test/js/spec/RankingsSpec'],
        'bulk-downloads-spec': ['../test/js/spec/BulkDownloadsSpec'],
        'documents-spec': ['../test/js/spec/DocumentsSpec'],
        'domains-tree-spec': ['../test/js/spec/DomainsTreeSpec'],
        'domain-tabs-spec': ['../test/js/spec/DomainTabsSpec'],
        'domain-reports-spec': ['../test/js/spec/DomainReportsSpec'],
        'report-headers-spec': ['../test/js/spec/ReportHeadersSpec']
    },
    shim: {
        'jasmine-html': {
            deps: ['jasmine']
        },
        'jasmine-boot': {
            deps: ['jasmine', 'jasmine-html']
        }
    }
});

(function () {

    'use strict';

    require(['jasmine-boot'], function () {
        require(['hello-world-spec'], function () {
            window.onload();
        });
    });

}());