/*jshint camelcase: false */
/*global module:false */
module.exports = function(grunt) {

	grunt.initConfig({
		clean: {
			files: {
				src: ['build/', 'dist/', 'report/', 'contants/']
			}
		},

		concat: {
			options: {
				separator: ';\n'
			},
			kyc: {
				src: [
					'static/js/jquery.parseParams.js',
					'static/js/jquery.serializeObject.js',
					'static/js/kyc.js'
				],
				dest: 'contents/static/js/kyc.js'
			}
		},

		uglify: {
			kyc: {
				files: {
					'contents/static/js/kyc.min.js': [
						'contents/static/js/kyc.js'
					]
				}
			}
		},

		jshint: {
			all: [
				'Gruntfile.js',
				'static/js/**/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			},
			test: {
				files: {
					src: [
						'test/**/*.js',
						'!test/support/lib/*.*',
						'!test/support/*.js'
					],
				},
				options: {
					jshintrc: 'test/.jshintrc'
				}
			}
		},

		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},

		jsbeautifier: {
			options: {
				config: '.jsbeautifyrc'
			},
			verify: {
				options: {
					mode: 'VERIFY_ONLY'
				},
				src: [
					'Gruntfile.js',
					'app/**/*.js',
					'test/**/*.js',
					'!test/support/lib/*.js'
				],
			},
			update: {
				options: {
					mode: 'VERIFY_AND_WRITE'
				},
				src: [
					'Gruntfile.js',
					'app/**/*.js',
					'test/**/*.js',
					'!test/support/lib/*.js'
				],
			}
		},

		wintersmith: {
			build: {},
			preview: {
				options: {
					action: 'preview'
				}
			}
		},

		less: {
			development: {
				options: {
					paths: ['static/less']
				},
				files: {
					'contents/static/css/index.css': 'static/less/index.less',
					'contents/static/css/root.css': 'static/less/root.less',
					'contents/static/css/about.css': 'static/less/about.less'
				}
			},

			production: {
				options: {
					paths: ['static/less'],
					yuicompress: true
				},
				files: {
					'contents/static/css/index.css': 'static/less/index.less',
					'contents/static/css/root.css': 'static/less/root.less',
					'contents/static/css/about.css': 'static/less/about.less'
				}
			}
		},

		copy: {
			fonts: {
				files: [
					{
						cwd: 'static/fonts/',
						expand: true,
						src: ['**'],
						dest: 'contents/static/css/fonts'
					}
				]
			},
			images: {
				files: [
					{
						cwd: 'static/images/',
						expand: true,
						src: ['**'],
						dest: 'contents/images'
					}
				]
			},
			icons: {
				files: [
					{
						cwd: 'static/icons/',
						expand: true,
						src: ['**'],
						dest: 'contents/static/icons'
					}
				]
			}
		},

		watch: {
			js: {
				files: [
					'static/js/*'
				],
				tasks: ['concat', 'wintersmith:build'],
				options: {
					livereload: true
				}
			},
			fonts: {
				files: [
					'static/fonts/*'
				],
				tasks: ['copy:fonts', 'wintersmith:build'],
				options: {
					livereload: true
				}
			},
			images: {
				files: [
					'static/images/*'
				],
				tasks: ['copy:images', 'wintersmith:build'],
				options: {
					livereload: true
				}
			},
			icons: {
				files: [
					'static/icons/*'
				],
				tasks: ['copy:icons', 'wintersmith:build'],
				options: {
					livereload: true
				}
			},
			css: {
				files: [
					'static/less/*'
				],
				tasks: ['less:development', 'wintersmith:build'],
				options: {
					livereload: true
				}
			},
			md: {
				files: [
					'contents/*.md',
					'plugins/*.js',
					'templates/*'
				],
				tasks: ['wintersmith:build'],
				options: {
					livereload: true
				}
			}
		},

		open: {
			dev: {
				path: 'http://localhost:8080/'
			},
		},

		connect: {
			server: {
				options: {
					port: 8080,
					base: './build/'
				}
			}
		},

		hashres: {
			options: {
				fileNameFormat: '${name}-${hash}.${ext}'
			},
			css: {
				src: ['build/static/css/*.css'],
				dest: ['build/**/*.html']
			},
			js: {
				src: ['build/static/js/*.js'],
				dest: ['build/**/*.html']
			},
			images: {
				src: ['build/images/**/*.png', 'build/images/**/*.jpg', 'build/images/**/*.jpeg', 'build/static/images/**/*.png'],
				dest: ['build/**/*.html', 'build/static/css/*.css', 'build/static/js/*.js']
			},
			fonts: {
				src: ['build/static/fonts/**/*'],
				dest: ['build/**/*.html', 'build/static/css/*.css', 'build/static/js/*.js']
			}
		},

		img: {
			crush_them: {
				src: ['build/images/**/*.png', 'build/static/images/**/*.png']
			}
		}
	});

	// Loads all grunt based plugins
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Clean task
	grunt.registerMultiTask('clean', 'Deletes files', function() {
		this.files.forEach(function(file) {
			file.orig.src.forEach(function(f) {
				if (grunt.file.exists(f)) {
					grunt.file.delete(f);
				}
			});
		});
	});

	// Subtasks
	grunt.registerTask('_builddev', ['clean', 'concat', 'less:development', 'copy']);
	grunt.registerTask('_buildprod', ['clean', 'verify', 'concat', 'uglify', 'less:production', 'copy']);

    grunt.registerTask('format', ['jsbeautifier:update']);
    grunt.registerTask('verify', ['jshint', 'jsbeautifier:verify']);

	grunt.registerTask('build', ['_buildprod', 'wintersmith:build', 'hashres']);
	grunt.registerTask('dev', ['_builddev', 'wintersmith:build', 'connect', 'open', 'watch']);

	// The Default task
	grunt.registerTask('default', ['dev']);
};
