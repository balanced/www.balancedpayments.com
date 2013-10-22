/*jshint camelcase: false */
/*global module:false */
module.exports = function(grunt) {

	grunt.initConfig({
		clean: {
			files: {
				src: ['build/', 'dist/', 'report/', 'contants/', 'contents/images/', 'contents/static/']
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
			fonts: {
				files: [
					'static/fonts/*'
				],
				tasks: ['copy:fonts'],
				options: {
					livereload: true
				}
			},
			images: {
				files: [
					'static/images/*'
				],
				tasks: ['copy:images'],
				options: {
					livereload: true
				}
			},
			icons: {
				files: [
					'static/icons/*'
				],
				tasks: ['copy:icons'],
				options: {
					livereload: true
				}
			},
			css: {
				files: [
					'static/less/*'
				],
				tasks: ['less:development'],
				options: {
					livereload: true
				}
			},
			md: {
				files: [
					'contents/*.md',
					'plugins/*.js'
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
				src: ['build/images/**/*.png', 'build/static/images/**/*.png'],
				dest: ['build/**/*.html', 'build/static/css/*.css', 'build/static/js/*.js']
			},
			fonts: {
				src: ['build/static/css/fonts/**/*'],
				dest: ['build/**/*.html', 'build/static/css/*.css', 'build/static/js/*.js']
			}
		},

		img: {
			crush_them: {
				src: ['build/images/**/*.png', 'build/static/images/**/*.png']
			}
		},

		s3: {
			options: {
				access: 'public-read',
				region: 'us-west-1',
				gzip: true,
				headers: {
					'X-Employment': 'aXdhbnR0b21ha2VhZGlmZmVyZW5jZStobkBiYWxhbmNlZHBheW1lbnRzLmNvbQ=='
				}
			},
			previewCached: {
				options: {
					bucket: 'balanced-www-preview',
				},
				headers: {
					'Cache-Control': 'public, max-age=86400'
				},
				upload: [{
					src: 'build/images/**/*',
					dest: 'images/'
				}, {
					src: 'build/static/**/*',
					dest: 'static/'
				}]
			},
			previewUncached: {
				options: {
					bucket: 'balanced-www-preview',
				},
				headers: {
					'Cache-Control': 'max-age=60'
				},
				upload: [{
					src: 'build/*',
					dest: ''
				}]
			},
			productionCached: {
				options: {
					bucket: 'balanced-www',
				},
				headers: {
					'Cache-Control': 'public, max-age=86400'
				},
				upload: [{
					src: 'build/images/**/*',
					dest: 'images/'
				}, {
					src: 'build/static/**/*',
					dest: 'static/'
				}]
			},
			productionUncached: {
				options: {
					bucket: 'balanced-www',
				},
				headers: {
					'Cache-Control': 'max-age=60'
				},
				upload: [{
					src: 'build/*',
					dest: ''
				}]
			},
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
					'static/js/**/*.js',
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
					'static/js/**/*.js',
					'test/**/*.js',
					'!test/support/lib/*.js'
				],
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
	grunt.registerTask('_builddev', ['clean', 'less:development', 'copy']);
	grunt.registerTask('_buildprod', ['clean', 'less:production', 'copy']);

	// Uploads to s3. Requires environment variables to be set if the bucket
	// you're uploading to doesn't have public write access.
	grunt.registerTask('deploy', ['build', 's3:productionCached', 's3:productionUncached']);
	grunt.registerTask('deployPreview', ['build', 's3:previewCached', 's3:previewUncached']);

	// Register the main build/dev tasks
	grunt.registerTask('build', ['_buildprod', 'wintersmith:build', 'hashres']);
	grunt.registerTask('dev', ['_builddev', 'wintersmith:build', 'connect', 'open', 'watch']);

	// Register a test task
	grunt.registerTask('test', ['build']);

	// The Default task
	grunt.registerTask('default', ['dev']);
};
