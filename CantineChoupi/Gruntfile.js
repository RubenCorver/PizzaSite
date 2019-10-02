module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'css/main.css': 'scss/main.scss'
        }
      }
    },
    cssmin: {
      options: {
        mergeIntoShorthands: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'css/main.min.css': ['css/main.css']
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'cssmin']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['sass', 'cssmin', 'watch']);
};
