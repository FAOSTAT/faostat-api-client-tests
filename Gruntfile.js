'use strict';

module.exports = function (grunt) {

    /* Base URL for FAOSTAT API service. */
    var base_url = 'http://localhost:8080/faostat-api/v1.0/';

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
            'resources/json/schema.json': base_url
        },
        uglify: {
            my_target: {
                files: {
                    'dist/faostat-api.min.js': ['src/js/faostat-api.js']
                }
            }
        }
    });

    /* Load NPM tasks. */
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    /* Create library out of remote JSON Schema. */
    grunt.registerTask('schema2lib', function() {

        /* Load required libraries. */
        var Handlebars = require('handlebars');
        var $ = require('jquery');

        /* Load JSON Schema. */
        var schema = grunt.file.readJSON('resources/json/schema.json');

        /* TODO For each link in links -> create method. */
        var methods = [];
        var method_source = grunt.file.read('src/html/method.hbs', [, {encoding: 'utf8'}]);
        var method_template = Handlebars.compile(method_source);
        for (var i = 0 ; i < schema.links.length ; i++) {

            /* Store current service description. */
            var l = schema.links[i];

            /* Generate method signature. */
            var parameters = '';
            for (var j = 0 ; j < Object.keys(l.schema.properties).length ; j++) {
                parameters += Object.keys(l.schema.properties)[j];
                if (j < Object.keys(l.schema.properties).length - 1)
                    parameters += ', ';
            }

            /* Generate query parameters object. */
            var path_parameters = get_path_parameters(l.href);
            var data = [];
            for (j = 0 ; j < Object.keys(l.schema.properties).length ; j++) {
                var o = Object.keys(l.schema.properties)[j];
                if (path_parameters.indexOf(Object.keys(l.schema.properties)[j]) < 0) {
                    data.push(o);
                }
            }
            var data_source = grunt.file.read('src/html/data.hbs', [, {
                encoding: 'utf8'
            }]);
            var data_template = Handlebars.compile(data_source);
            var data_dynamic_data = {
                data: data
            };
            var data_html = data_template(data_dynamic_data);

            /* Generate the method. */
            var method_dynamic_data = {
                url: '\'' + inject_params(l.href, l.schema.properties, schema.definitions) + '\'',
                method: '\'' + l.method.toString().toUpperCase() + '\'',
                rel: l.rel,
                parameters: parameters,
                data: data_html
            };
            methods.push(method_template(method_dynamic_data));

        }

        /* Load Handlebars template for tiles. */
        var source = grunt.file.read('src/html/archetype.hbs', [, {
            encoding: 'utf8'
        }]);
        var template = Handlebars.compile(source);
        var dynamic_data = {
            methods: methods,
            validators: 'validators'
        };
        var html = template(dynamic_data);
        grunt.file.write('src/js/faostat-api.js', template(dynamic_data), [, {encoding: 'utf8'}]);

        /* TODO For each link in links -> create validator. */
        /* 1. Create JSON file out of the input parameters. */
        /* 2. Validate the JSON file against the JSON Schema. */

        /* TODO Convert functions in strings. */

        /* TODO Load Handlebars template. */

        /* TODO Add the strings to the template. */

        /* TODO Write the file in src/js */

    });

    /* Register tasks. */
    grunt.registerTask('test', ['connect', 'jasmine']);
    //grunt.registerTask('default', ['test']);
    grunt.registerTask('default', ['curl', 'schema2lib', 'uglify']);

    /* Inject parameters in the URL. */
    var inject_params = function(href, properties, definitions) {
        var final_url = base_url + href;
        for (var i = 0 ; i < href.length ; i++) {
            var start, end = null;
            if (href.charAt(i) == '{') start = i;
            if (href.charAt(i) == '}') end   = i;
            if (start != null && end != null) {
                var param = href.substring(1 + start, end);
                final_url = final_url.replace(href.substring(start, 1 + end), '\' + ' + param + ' + \'');
                start = null;
                end = null;
            }
        }
        return final_url;
    };

    var get_path_parameters = function(href) {
        var out = [];
        for (var i = 0 ; i < href.length ; i++) {
            var start, end = null;
            if (href.charAt(i) == '{') start = i;
            if (href.charAt(i) == '}') end = i;
            if (start != null && end != null) {
                out.push(href.substring(1 + start, end));
                start = null;
                end = null;
            }
        }
        return out;
    }

};