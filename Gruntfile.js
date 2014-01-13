'use strict';

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // configurable paths
        watch: {
            options: {
                livereload: true
            },
            coffee: {
                files: ['scripts/coffee/**/*.{coffee,litcoffee,coffee.md}'],
                tasks: ['coffee:dist', 'uglify']
            },
            compass: {
                files: ['styles/sass/**/*.{scss,sass}'],
                tasks: ['compass:server', 'autoprefixer']
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'scripts/RafTimeout.js'
            ]
        },
        coffee: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'scripts/coffee',
                    src: '**/*.{coffee,litcoffee,coffee.md}',
                    dest: 'scripts',
                    ext: '.js'
                }]
            }
        },
        compass: {
            options: {
                sassDir: 'styles/sass',
                cssDir: 'styles/css',
                imagesDir: 'styles/img',
                javascriptsDir: 'scripts',
                fontsDir: 'styles/fonts',
                // importPath: 'bower_components',
                relativeAssets: true,
                assetCacheBuster: false
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! Minified version generated on: <%= grunt.template.today("yyyy-mm-dd") %> at <%= grunt.template.today("HH:MM:ss") %> */'
            },
            target: {
                options: {
                    sourceMap: 'scripts/uglify-sourcemap.map',
                    sourceMapRoot: '../',
                    sourceMappingURL: 'uglify-sourcemap.map',
                    report: 'min'
                },
                files: {
                    'scripts/RafTimeout-min.js': [
                        'scripts/vendor/log.js',
                        'scripts/RafTimeout.js'
                    ]
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'styles/css',
                    src: '**/*.css',
                    dest: 'styles/css'
                }]
            }
        }
    });

    grunt.registerTask('default', [
        'watch'
    ]);
};