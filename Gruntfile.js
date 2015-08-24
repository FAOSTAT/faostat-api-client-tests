'use strict';

module.exports = function (grunt) {

    /* Initiate configuration. */
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            test : {
                port : 8000
            }
        },
        jasmine: {
            src : 'src/*.js',
            options: {
                specs: 'test/js/spec/*Spec.js',
                host: 'http://127.0.0.1:8000/',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfig: {
                        baseUrl: './src',
                        paths: {
                            'jquery': ['../test/js/libs/jquery.min'],
                            'jasmine': ['../test/js/libs/jasmine'],
                            'jasmine-html': ['../test/js/libs/jasmine-html'],
                            'jasmine-boot': ['../test/js/libs/boot'],
                            'faostat-api-client-spec': ['../test/js/spec/FAOSTATAPIClientSpec'],
                            'faostat-api-client': ['../src/js/FAOSTATAPIClient']
                            //,'wds-client': ['../src/WDSClient'],
                            //'wds-client-spec': ['../test/js/spec/WDSClientSpec']
                        },
                        shim: {
                            'jasmine-html': {
                                deps: ['jasmine']
                            },
                            'jasmine-boot': {
                                deps: ['jasmine', 'jasmine-html']
                            }
                        }
                    }
                }
            }
        },
        curl: {
            'resources/json/schema.json': 'http://localhost:8080/faostat-api/v1.0/'
        }
    });

    /* Load NPM tasks. */
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-curl');

    /* Create library out of remote JSON Schema. */
    grunt.registerTask('schema2lib', function() {
        grunt.log.writeln('pippo');
    });

    /* Register tasks. */
    grunt.registerTask('test', ['connect', 'jasmine']);
    //grunt.registerTask('default', ['test']);
    grunt.registerTask('default', ['curl', 'schema2lib']);

};