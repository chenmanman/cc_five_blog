module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({

    pkg   : grunt.file.readJSON('package.json'),
      concat: {

        options: {
          separator: ';'
        },

        js: {
            src: ['web/static/js/controller/*.js'],
            dest: 'web/static/js/controller/co.cat.js'
          }
      },
      uglify: {
          options: {
              banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
          },
          build  : {
            src: 'web/static/js/controller/co.cat.js',
            dest: 'web/static/js/controller/co.cat.min.js'
          }
      },


  });
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['concat','uglify']);
};
