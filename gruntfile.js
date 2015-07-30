/// <vs BeforeBuild='default' SolutionOpened='watch' />
/*jslint nomen: true */
/*global module, require */

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        buildPath: grunt.option('buildpath') || 'build',
        bump: {
            options: {
                files: ['bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        },
        // We used to use grunt-contrib-concat here but the source maps never came out right.  This one works much better.
        concat_sourcemap: {
            options: {
                sourcesContent: true,
                sourceRoot: '../..'
            },
            libs: {
                files: {
                    '<%= buildPath %>/js/libs.js': [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/jquery-ui/jquery-ui.js',
                        'bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.min.js',
                        'bower_components/bootstrap/dist/js/dropdown.min.js',
                        'bower_components/enquire/dist/enquire.js',
                        'bower_components/angular/angular.js',
                        'bower_components/angular-animate/angular-animate.js',
                        'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
                        'bower_components/angular-ui-router/release/angular-ui-router.js',
                        'bower_components/responsive-tabs/js/jquery.responsiveTabs.js',
                        'bower_components/moment/moment.js',
                        'bower_components/autoNumeric/autoNumeric.js',
                        'bower_components/jqgrid/js/jquery.jqGrid.js',
                        'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
                        'bower_components/bootstrap-datepicker-eyecon/js/bootstrap-datepicker.js',
                        'bower_components/blockui/jquery.blockUI.js',
                        'bower_components/jquery-icheck/icheck.js',
                        'bower_components/angular-ui-select/dist/select.js',
                        'bower_components/fastclick/lib/fastclick.js'
                    ]
                }
            },
            app: {
                files: {
                    '<%= buildPath %>/js/app.js': [
                        'src/index.js',
                        'src/**/*.js',
                        'tmp/templates.js'
                    ]
                }
            }
        },
        copy: {
            fonts: {
                files: [{
                    expand: true,
                    src: ['*.*'],
                    cwd: 'bower_components/sky/dist/css/fonts',
                    dest: '<%= buildPath %>/css/fonts'
                }]
            },
            js:  {
                files: [{
                    expand: true,
                    src: ['**/sky.*'],
                    cwd: 'bower_components/sky/dist/js',
                    dest: '<%= buildPath %>/js'
                }]
            },
            html: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['index.html'],
                    dest: '<%= buildPath %>/'
                }]
            },
            data: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['data/**/*.*'],
                    dest: '<%= buildPath %>/'
                }]
            }//,
//            dist: {
//                files: [{
//                    expand: true,
//                    cwd: '../sky/bin/js',
//                    src: ['*.*'],
//                    dest: 'bower_components/sky/dist/js'
//                }, {
//                    expand: true,
//                    cwd: '../sky/scss',
//                    src: ['*.*'],
//                    dest: 'bower_components/sky/scss/'
//                }]
//            }
        },
        sass: {
            libs: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= buildPath %>/css/styles.css': 'src/scss/styles.scss'
                }
            }
        },
        html2js: {
            options: {
                module: 'musicapp.templates',
                quoteChar: '\'',
                indentString: '    ',
                singleModule: true
            },
            main: {
                src: ['src/pages/**/*.html'],
                dest: 'tmp/templates.js'
            }
        },
        watch: {
            sass: {
                files: ['src/scss/*.scss'],
                tasks: ['sass']
            },
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['concat_sourcemap:app', 'copy:js']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['copy:html']
            },
            templates: {
                files: ['src/pages/**/*.html'],
                tasks: ['html2js', 'concat_sourcemap:app', 'copy:js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concat-sourcemap');
    grunt.loadNpmTasks('grunt-html2js');

    grunt.registerTask('default', ['html2js', 'concat_sourcemap', 'sass', 'copy']);
    grunt.registerTask('build', ['default']);
    grunt.registerTask('buildfromsrc', ['copy:dist', 'build']);

};
