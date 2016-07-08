module.exports = function(grunt){
  grunt.initConfig({
    image: {
      static: {
        options: {
          pngquant: true,
          optipng: false,
          zopflipng: true,
          advpng: true,
          jpegRecompress: false,
          jpegoptim: true,
          mozjpeg: true,
          gifsicle: true,
          svgo: true
        }
      },
      dynamic: {
        files: [{
          expand: true,
          cwd: 'source/img/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dest/img/'
        }]
      }
    },
    pug: {
      compile: {
        files: [{
          cwd: 'source',
          src: ['*.pug'],
          dest: 'dest',
          expand: true,
          ext: '.html',
        }]
      },
      options: {
        pretty: true,
      }
    },
    less: {
      development: {
        options: {
          paths: ['source/']
        },
        files: {
          'dest/css/style.css': 'source/css/style.less'
        }
      }
    },
    cmq: {
      options: {
        log: false
      },
      your_target: {
        files: {
          'tmp': ['dest/css/*.css']
        }
      }
    },
    autoprefixer:{
      options: {
        browsers: ['> 1%', 'last 5 versions', 'Firefox ESR', 'Opera 12.1'],
        cascade: false
      },
      multiple_files: {
        expand: true,
        flatten: true,
        src: 'dest/css/*.css',
        dest: 'dest/css/'
      }
    },
    copy: {
      css: {
        files: [{
          cwd: 'source/css',
          src: '**/*.css',
          dest: 'dest/css',
          expand: true,
        }]
      },
      js: {
        files: [{
          cwd: 'source/js',
          src: '**/*.js',
          dest: 'dest/js',
          expand: true,
        }]
      },
    },
    watch: {
      js: {
        files: ['source/js/**/*.js'],
        tasks: ['copy:js'],
      },
      css: {
        files: ['source/css/**/*.css'],
        tasks: ['copy:css','cmq'],
      },
      pug: {
        files: ['source/*.pug'],
        tasks: ['pug'],
      },
      less: {
        files: ['source/**/*.less'],
        tasks: ['less','autoprefixer'],
        options: {
          spawn: false
        }
      },
      imagemin: {
        files: ['source/**/*.{png,jpg,gif}'],
        tasks: ['image'],
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'dest/css/*.css',
            'dest/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: 'dest'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-image');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.registerTask('default', [
    'image',
    'copy',
    'pug',
    'less',
    'autoprefixer',
    'cmq',
    'browserSync',
    'watch'
  ]);
};
