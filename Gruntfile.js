/*jshint camelcase: false */
/*global module:false */
module.exports = function(grunt) {

	grunt.initConfig({
		clean: {
			files: {
				src: ['build/', 'dist/', 'report/', 'contants/', 'output/', 'output_tmp/']
			}
		},

		concat: {
			options: {
				separator: ';\n'
			},
			js_libraries: {
				src: [
					'static/js/lib/jquery-1.8.2.min.js',
					'static/js/lib/jquery-ui-1.9.1.custom.min.js',
					'static/js/lib/jquery.ui.autocomplete.html.js',
					'static/js/lib/bootstrap-dropdown-2.0.2.js',
					'static/js/lib/bootstrap-2.2.1.js',
					'static/js/lib/jquery-autosave.js',
					'static/js/lib/jquery-hotkeys.js',
					'static/js/lib/strftime.js',
					'static/js/lib/mustache-0.7.2.js'
				],
				dest: 'contents/static/js/build/balanced.lib.js'
			},

			js_sources: {
				src: [
					'static/js/src/utils.js',
					'static/js/src/loading.js',
					'static/js/src/core.js',
					'static/js/src/marketplaces.js',
					'static/js/src/payouts.js',
					'static/js/src/api_keys.js',
					'static/js/src/transactions.js',
					'static/js/src/root.js',
					'static/js/src/help.js',
					'static/js/src/accounts.js',
					'static/js/src/users.js',
					'static/js/src/docs.js',
					'static/js/src/logs.js',
					'static/js/src/analytics.js',
					'static/js/src/search.js',
					'static/js/src/callbacks.js',
					'static/js/src/layout-v3.js'
				],
				dest: 'contents/static/js/build/balanced.src.js'
			},

			docs: {
				src: [
					'static/js/src/docs/docs.js'
				],
				dest: 'contents/static/js/build/docs/docs.src.js'
			},

			stats: {
				src: [
					'static/js/src/_stats/utils.js',
					'static/js/src/_stats/core.js'
				],
				dest: 'contents/static/js/build/_stats/stats.src.js'
			},

			status: {
				src: [
					'static/js/src/_status/core.js'
				],
				dest: 'contents/static/js/build/_status/core.src.js'
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

		uglify: {
			all: {
				options: {

				},
				files: {
					'contents/static/js/build/_status/core.min.js': 'contents/static/js/build/_status/core.src.js',
					'contents/static/js/build/_stats/stats.min.js': 'contents/static/js/build/_stats/stats.src.js',
					'contents/static/js/build/docs/docs.min.js': 'contents/static/js/build/docs/docs.src.js',
					'contents/static/js/build/balanced.min.js': 'contents/static/js/build/balanced.src.js',
					'contents/static/js/build/balanced.lib.min.js': 'contents/static/js/build/balanced.lib.js',
					'contents/static/js/build/kyc.min.js': 'static/js/src/kyc.js',
					'contents/static/js/build/irc.min.js': 'static/js/src/irc.js',
					'contents/static/js/build/auto_complete.min.js': 'static/js/src/auto_complete.js'
				}
			}
		},

		less: {
			development: {
				options: {
					'paths': ['static/less']
				},
				files: {
					'contents/static/css/bootstrap-2.0.css': 'static/less/bootstrap-2.0/bootstrap-2.0.less',
					'contents/static/css/base.css': 'static/less/base.less',
					'contents/static/css/pygments.css': 'static/less/pygments.less',
					'contents/static/css/docs/old.css': 'static/less/docs/old.less',
					'contents/static/css/docs/new.css': 'static/less/docs/new.less',
					'contents/static/css/public.css': 'static/less/public.less',
					'contents/static/css/ie9.css': 'static/less/ie9.less',
					'contents/static/css/root5.css': 'static/less/root5.less',
					'contents/static/css/root-v3.css': 'static/less/root-v3.less',
					'contents/static/css/root4.css': 'static/less/root4.less',
					'contents/static/css/root3.css': 'static/less/root3.less',
					'contents/static/css/about.css': 'static/less/about.less',
					'contents/static/css/kyc.css': 'static/less/kyc.less'
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
		open: {
			dev: {
				path: 'http://localhost:8080/'
			},
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

	grunt.registerTask('_build', ['clean', 'concat', 'uglify', 'less', 'copy']);
	grunt.registerTask('build', ['_build', 'wintersmith:build']);
	grunt.registerTask('dev', ['_build', 'open', 'wintersmith:preview']);
};
