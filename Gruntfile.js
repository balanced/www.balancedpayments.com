/*jshint camelcase: false */
/*global module:false */
module.exports = function(grunt) {

	grunt.initConfig({
		clean: {
			files: {
				src: ['build/', 'dist/', 'report/', 'contants/']
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
					'contents/*.md'
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
	grunt.registerTask('_builddev', ['clean', 'less:development', 'copy']);
	grunt.registerTask('_buildprod', ['clean', 'less:production', 'copy']);


	grunt.registerTask('build', ['_buildprod', 'wintersmith:build', 'hashres']);
	grunt.registerTask('dev', ['_builddev', 'wintersmith:build', 'connect', 'open', 'watch']);

	// The Default task
	grunt.registerTask('default', ['dev']);
};
