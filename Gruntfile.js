'use strict';

module.exports = function (grunt) {

    /* Project configuration. */
    grunt.initConfig({

        /* Plugin configuration. */
        jsonschema_amd_restclient_generator: {
            custom_options: {
                options: {
                    base_url: 'http://localhost:8080/faostat-api/v1.0/',
                    output_name: 'FAOSTATClient'
                }
            }
        }

    });

    /* Load NPM tasks. */
    grunt.loadNpmTasks('grunt-jsonschema-amd-restclient-generator');

    /* Register task. */
    grunt.registerTask('default', ['jsonschema_amd_restclient_generator']);

};