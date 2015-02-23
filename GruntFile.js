/* ###################################################
 * Title: GruntFile.js
 * Desc: The grunt build configuration file.
 * Author: Anthony Del Ciotto
 * Altered for use by: Matthew Jacobs
 * Date: February 18, 2015
 * License: MIT
 * ################################################### */

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // some constants for various paths and files to be used by
  // the task configurations
  var BUILD_DIR = 'public/';
  var BUILD_DIR_INDEX = BUILD_DIR + 'index.html';
  var BUILD_DIR_LIB = BUILD_DIR + 'lib/';
  var BUILD_DIR_JS = BUILD_DIR + 'scripts/';
  var BUILD_FILE_JS = BUILD_DIR_JS + 'cb.js';  
  var BUILD_FILE_MIN_JS = BUILD_DIR_JS + 'cb.min.js';
  var BUILD_DIR_CSS = BUILD_DIR + 'styles/';

  var INJECT_FILES_JS = [
    BUILD_DIR_JS + 'cloudbudget.js',
    BUILD_DIR_JS + 'cloudbudget.config.js',
    BUILD_DIR_JS + 'common/**/*.js',
    BUILD_DIR_JS + 'controllers/**/*.js'
  ];
  
  var SRC_DIR = 'source/';
  var SRC_DIR_LIB = SRC_DIR + 'lib/';
  var SRC_DIR_JS = SRC_DIR + 'js/';
  var SRC_FILES_JS = [
    SRC_DIR_JS + 'cloudbudget.js',
    SRC_DIR_JS + 'cloudbudget.config.js',
    SRC_DIR_JS + 'common/**/*.js',
    SRC_DIR_JS + 'controllers/**/*.js',
    SRC_DIR_JS + 'views/**/*.html'
  ];
  var SRC_DIR_LESS = SRC_DIR + 'less/';
  var SRC_FILE_LESS = SRC_DIR_LESS + 'style.less';
  var SRC_FILES_LESS = SRC_DIR_LESS + '*.less';

  var AP_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 20',
    'Firefox >= 24', // Firefox 24 is the latest ESR
    'Explorer >= 8',
    'iOS >= 6',
    'Opera >= 12',
    'Safari >= 6'
  ];

  // object to represent the type of environment we are running in.
  // eg. production or development
  var EnvType = {
    prod: 'production',
    dev: 'development'
  };

  // configure the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // wipe the build directory clean
    //  EXCEPT for: index.html
    clean: {
      build: {
        src: [BUILD_DIR + '*', '!' + BUILD_DIR + 'index.html', '!' + BUILD_DIR_LIB + '**'],
        expand: true
      },
      scripts: {
        src: [BUILD_DIR_JS]
      }
    },

    // copy files into dist directory
    copy: {
      build: {
        cwd: SRC_DIR_JS,
        src: ['**'],
        dest: BUILD_DIR_JS,
        expand: true
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [SRC_FILES_JS],
        dest: BUILD_FILE_JS
      }
    },
    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: [{
          src: [BUILD_FILE_JS],
          dest: BUILD_FILE_MIN_JS
        }]
      }
    },
    
    injector: {
      scripts: {
        options: {
          destFile: BUILD_DIR_INDEX,
          relative: true,
          min: true
        },
        files: [{
          expand: true,
          src: [BUILD_DIR_LIB + '**/*.js', INJECT_FILES_JS, BUILD_FILE_MIN_JS, 
                '!' + BUILD_DIR_LIB + 'bower/**', '!*.min.*']
        }]
      },
      bower: {
        options: {
          relative: true,
          bowerPrefix: 'bower:',
          min: true
        },
        src: ['bower.json'],
        dest: BUILD_DIR_INDEX
      }
    },

    // Configure the less compilation for both dev and prod
    //    less: {
    //      development: {
    //        files: {
    //          "dist/css/style.css": SRC_FILE_LESS
    //        }
    //      },
    //      production: {
    //        options: {
    //          // minify css in prod mode
    //          cleancss: true,
    //        },
    //        files: {
    //          "dist/css/style.css": SRC_FILE_LESS
    //        }
    //      }
    //    },

    // configure autoprefixing for compiled output css
    autoprefixer: {
      options: {
        browsers: AP_BROWSERS
      },
      build: {
        expand: true,
        cwd: BUILD_DIR,
        src: ['css/*.css'],
        dest: BUILD_DIR
      }
    },

    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      all: {
        options: {
          port: 3000,
          hostname: "0.0.0.0",
          bases: [BUILD_DIR],
          livereload: true
        }
      }
    },

    // configure grunt-watch to monitor the projects files
    // and perform each specific file type build task.
    watch: {
      scripts: {
        options: { livereload: false },
        files: [SRC_FILES_JS],
        tasks: ['copy']
      },

      stylesless: {
        options: { livereload: false },
        files: [SRC_FILES_LESS],
        tasks: ['less:development', 'autoprefixer']
      }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    }
  });

  /**
   * Utility function to register the stylesheets task to grunt.
   * @param  {[type]} mode  [the mode, either dev, or production]
   */
  var registerStyleSheetsTask = function(mode) {
    grunt.registerTask('stylesheets:' + mode,
                       'Compiles the stylesheets for development mode',
                       [/*'less:' + mode,*/ 'autoprefixer']
                      );
  };

  /**
   * Utility function to register the scripts task to grunt.
   * @param  {[type]} mode  [the mode, either dev, or production]
   */
  var registerScriptsTask = function(mode) {
    // if we are running in dev mode, only copy the scripts
    // otherwise minify them also
    var scriptTasks = (mode === EnvType.dev) ? 'copy' : ['concat', 'uglify'];

    grunt.registerTask('scripts:' + mode,
                       'Compiles the javascript files in ' + mode + ' mode',
                       [ 'clean:scripts' ].concat(scriptTasks)
                      );
  };

  /**
   * Utility function to register the build task to grunt.
   * @param  {[type]} mode  [the mode, either dev, or production]
   */
  var registerBuildTask = function(mode) {
    grunt.registerTask('build:' + mode, 
                       'Compiles all of the assets and copies them' +
                       ' to th build directory', 
                       ['clean:build', 'injector:bower', 'stylesheets:' + mode, 'scripts:' + mode, 'injector:scripts']
                      );
  };

  /**
   * Utility function to register the server task to grunt.
   * @param  {[type]} mode  [the mode, either dev, or production]
   */
  var registerServerTask = function(mode) {
    var tasks = ['express', 'open'];

    // if we are running in development mode, run the watch task
    if (mode === EnvType.dev) {
      tasks.push('watch');
    } else if (mode === EnvType.prod) {
      tasks.push('express-keepalive');
    }

    grunt.registerTask('server:' + mode,
                       'Begins the express server and opens it in a browser' +
                       'constantly watching for changes', 
                       tasks
                      );
  }; 

  /**
   * Utility function to register the main task to grunt.
   * @param  {[type]} mode  [the mode, either dev, or production]
   */
  var registerMainTask = function(mode) {
    grunt.registerTask(mode, 
                       'Watches the project for changes' +
                       'automatically builds them and runs a server', 
                       ['build:' + mode, 'server:' + mode]
                      );
  };

  // register all the tasks for both development and production
  registerStyleSheetsTask(EnvType.dev);
  registerStyleSheetsTask(EnvType.prod);
  registerScriptsTask(EnvType.dev);
  registerScriptsTask(EnvType.prod);
  registerBuildTask(EnvType.dev);
  registerBuildTask(EnvType.prod);
  registerServerTask(EnvType.dev);
  registerServerTask(EnvType.prod);
  registerMainTask(EnvType.dev);
  registerMainTask(EnvType.prod);

  // register development mode as the main task
  grunt.registerTask('default', 'Default task: development', 'development');
};