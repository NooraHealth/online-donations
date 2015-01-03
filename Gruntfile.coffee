module.exports = (grunt) ->
  #Project config
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    clean: ['public/javascripts/']
    
    wiredep:
      task:
        src: [
          'views/layout.hbs'
        ]
        options:
          directory: 'bower_components/'

  #Tasks
  grunt.loadNpmTasks 'grunt-wiredep'

  #Register tasks
  grunt.registerTask 'default' , ['wiredep']

