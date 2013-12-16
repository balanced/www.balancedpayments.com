/*jshint camelcase: false */
/*global module:false */
module.exports = function(grunt) {
	grunt.initConfig({
		clean: {
			files: {
				src: ['build/', 'dist/', 'report/', 'contants/', 'contents/images/', 'contents/static/']
			}
		},

		concat: {
			options: {
				separator: ';\n'
			}
		},

		uglify: {
			all: {
				files: {
					'contents/static/js/balanced.min.js': [
						'static/js/balanced.js'
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
					'static/js/**/*.js'
				],
			},
			update: {
				options: {
					mode: 'VERIFY_AND_WRITE'
				},
				src: [
					'Gruntfile.js',
					'static/js/**/*.js'
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
				files: [{
					cwd: 'static/fonts/',
					expand: true,
					src: ['**'],
					dest: 'contents/static/css/fonts'
				}]
			},
			images: {
				files: [{
					cwd: 'static/images/',
					expand: true,
					src: ['**'],
					dest: 'contents/images'
				}]
			}
		},

		watch: {
			js: {
				files: [
					'static/js/*'
				],
				tasks: ['concat', 'uglify', 'wintersmith:build'],
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
					'templates/**/*'
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
			}
		},

		connect: {
			server: {
				options: {
					port: 8080,
					base: './build/'
				}
			},
			vagrant: {
				options: {
					port: 8080,
					hostname: '10.0.0.2',
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
				},
				maxOperations: 20,
				gzipExclude: ['.jpg', '.jpeg', '.png', '.ico', '.gif']
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
					dest: 'images/',
					rel: 'build/images'
				}, {
					src: 'build/static/**/*',
					dest: 'static/',
					rel: 'build/static'
				}, {
					src: 'build/*.{xml,txt,ico}',
					dest: '',
					rel: 'build'
				}]
			},
			previewUncached: {
				options: {
					bucket: 'balanced-www-preview',
				},
				headers: {
					'Cache-Control': 'max-age=60',
					'Content-Type': 'text/html'
				},
				upload: [{
					src: 'build/*',
					dest: '',
					rel: 'build'
				}, {
					src: 'build/terms/*',
					dest: 'terms/',
					rel: 'build/terms'
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
					dest: 'images/',
					rel: 'build/images'
				}, {
					src: 'build/static/**/*',
					dest: 'static/',
					rel: 'build/static'
				}, {
					src: 'build/*.{xml,txt,ico}',
					dest: '',
					rel: 'build'
				}]
			},
			productionUncached: {
				options: {
					bucket: 'balanced-www',
				},
				headers: {
					'Cache-Control': 'max-age=60',
					'Content-Type': 'text/html'
				},
				upload: [{
					src: 'build/*',
					dest: '',
					rel: 'build'
				}, {
					src: 'build/terms/*',
					dest: 'terms/',
					rel: 'build/terms'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					removeCommentsFromCDATA: true,
					removeCDATASectionsFromCDATA: true,
					collapseBooleanAttributes: true,
					removeRedundantAttributes: true,
					removeEmptyAttributes: true
				},
				files: {
					'build/about': 'build/about.html',
					'build/ach-debits': 'build/ach-debits.html',
					'build/customers': 'build/customers.html',
					'build/help': 'build/help.html',
					'build/index': 'build/index.html',
					'build/open': 'build/open.html',
					'build/payouts': 'build/payouts.html',
					'build/pricing': 'build/pricing.html',
					'build/privacy': 'build/privacy.html',
					'build/terms/acceptable_use': 'build/terms/acceptable_use.html',
					'build/terms/marketplaceagreement': 'build/terms/marketplaceagreement.html',
					'build/terms/privacy': 'build/terms/privacy.html',
					'build/terms/selleragreement': 'build/terms/selleragreement.html',
					'build/terms/use': 'build/terms/use.html',
					'build/terms/index': 'build/terms.html'
				}
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
	grunt.registerTask('_builddev', ['clean', 'concat', 'uglify', 'less:development', 'copy']);
	grunt.registerTask('_buildprod', ['clean', 'verify', 'concat', 'uglify', 'less:production', 'copy']);

	// Uploads to s3. Requires environment variables to be set if the bucket
	// you're uploading to doesn't have public write access.
	grunt.registerTask('deploy', ['build', 's3:productionCached', 's3:productionUncached']);
	grunt.registerTask('deployPreview', ['build', 's3:previewCached', 's3:previewUncached']);

	grunt.registerTask('format', ['jsbeautifier:update']);
	grunt.registerTask('verify', ['jshint', 'jsbeautifier:verify']);

	// Register the main build/dev tasks
	grunt.registerTask('build', ['_buildprod', 'wintersmith:build', 'hashres', 'htmlmin:dist']);
	grunt.registerTask('dev', ['_builddev', 'wintersmith:build', 'connect:server', 'open', 'watch']);

	// Register a task in vagrant
	grunt.registerTask('vagrant', ['_builddev', 'wintersmith:build', 'connect:vagrant', 'watch']);

	// Register a test task
	grunt.registerTask('test', ['build']);

	// The Default task
	grunt.registerTask('default', ['dev']);
};
