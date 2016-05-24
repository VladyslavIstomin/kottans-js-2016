(function(){
	"use strict";

	const postHtml = require('gulp-posthtml');
	const gulp = require('gulp');

	const reqexpBootstrap = /col-(xs|sm|md|lg)-\d{1,2}/g;
	const reqexpJs = /js-/g;

	gulp.task('posthtml', function () {
		const plugin = tree => {
				tree.match({}, node => {
					let nodeClass = node.attrs.class;

					if(reqexpBootstrap.test(nodeClass)) {
						node.attrs.class = nodeClass.replace(reqexpBootstrap, '').trim();
						nodeClass = node.attrs.class;
					}

					if(reqexpJs.test(node.attrs.class)) {
						node.attrs.class = nodeClass.replace(reqexpJs, 'data-');
						nodeClass = node.attrs.class;
					}

					return node;
				})
			};

		return gulp.src('./src/**/*.html')
				.pipe(postHtml(plugin))
				.pipe(gulp.dest('./dest'));
	});
})();