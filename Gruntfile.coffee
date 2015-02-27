module.exports = (grunt) ->
  grunt.initConfig(
    pkg: grunt.file.readJSON 'package.json'
    
    env:
      dev:
        src: '.env/dev.json'

      prod:
        src: '.env/production.json'

    nodemon:
      nodeArgs: ['--debug']
      dev:
        script: 'bin/www'

        callback: (nodemon) ->
          nodemon.on 'log', (event) ->
            console.log event.color
    
  )

  grunt.loadNpmTasks 'grunt-env'
  grunt.loadNpmTasks 'grunt-nodemon'

  grunt.registerTask 'default', ['env:dev', 'nodemon']
  grunt.registerTask 'production', ['env:prod', 'nodemon']
  grunt.registerTask 'build:dev', ['env:dev']
  grunt.registerTask 'build:prod', ['env:prod']
