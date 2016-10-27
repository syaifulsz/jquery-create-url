module.exports = function(grunt) {

    // Configurations
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['src/*.js']
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/jquery.<%= pkg.name %>.js',
                dest: 'dist/jquery.<%= pkg.name %>.min.js'
            }
        },
        watch: {
            jslint: {
                files: ['src/*.js'],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                },
            },
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Tasks
    grunt.registerTask('default', ['jslint', 'uglify']);

};
