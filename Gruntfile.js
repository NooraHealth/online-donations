module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    
    jsconcat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['public/js/*.js'],
        // the location of the resulting JS file
        dest: 'public/dist/built.js'
      }
    },

    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    /** 
    FOR TESTING LATER
    **/
    //hint: {
      //files: ['Gruntfile.js', 'public/js//**/*.js', 'test/**/*.js'],
      //options: {
        //globals: {
          //jQuery: true
        //}
      //}
    //},

    //watch: {
      //files: ['<%= jshint.files %>'],
      //tasks: ['jshint']
    //}
  });

  //grunt.loadNpmTasks('grunt-contrib-jshint');
  //grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat', 'uglify']);

};
