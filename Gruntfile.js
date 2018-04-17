const grunt = require('grunt');

grunt.loadNpmTasks('grunt-browserify');
grunt.loadNpmTasks('grunt-contrib-clean');

grunt.initConfig({
    clean: {
        dist: {
            src: ['dist']
        },
        tmp: {
            src: ['dist/tmp']
        },
        optionull: {
            src: ['dist/optionull.js']
        }
    },
    browserify: {
        dist: {
            files: {
                'dist/optionull.min.js': 'src/optionull.js'
            },
            options: {
                transform: [
                    ['babelify', { presets: [ 'env' ] }],
                    ['uglifyify']
                ],
                browserifyOptions: {
                    standalone: 'Optional'
                }
            }
        }
    }
});

grunt.registerTask('build', ['clean', 'browserify'])
grunt.registerTask('default', ['build']);
