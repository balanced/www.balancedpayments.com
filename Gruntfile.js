/*jshint camelcase: false */
/*global module:false */
module.exports = function(grunt) {

	grunt.initConfig({
		clean: {
			files: {
				src: ['build/', 'dist/', 'report/', 'contants/', 'output/', 'output_tmp/']
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
					paths: ['static/less'],
					yuicompress: true
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

	grunt.registerTask('_build', ['clean', 'less', 'copy']);
	grunt.registerTask('build', ['_build', 'wintersmith:build']);
	grunt.registerTask('dev', ['_build', 'open', 'wintersmith:preview']);
};
