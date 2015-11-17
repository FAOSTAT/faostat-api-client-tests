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
        'abbreviations-spec': ['../test/js/spec/AbbreviationsSpec']
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