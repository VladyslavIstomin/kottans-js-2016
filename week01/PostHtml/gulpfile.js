(function(){
	"use strict";

	const postHtml = require('gulp-posthtml');
	const gulp = require('gulp');

	const reqexpBootstrap = /col-(xs|sm|md|lg)-\d{1,2}/g;
	const reqexpJs = /js-[\w{1,}\-]+/g;

	gulp.task('posthtml', function () {
		const plugin = tree => {
				tree.match({}, node => {
					let nodeAttrs = node.attrs;
					let dataArr = [];

					// Delete bootstrap classes
					if(reqexpBootstrap.test(nodeAttrs.class)) {
						node.attrs.class = nodeAttrs.class.replace(reqexpBootstrap, '').trim();
						nodeAttrs = node.attrs;
					}

					// Replace classes with js to data attribute
					if(reqexpJs.test(nodeAttrs.class)) {
						nodeAttrs.class.match(reqexpJs).forEach(data => {
							dataArr.push(data.replace(/js-/, ''));
						});

						nodeAttrs['data-js'] = dataArr.join(' ');

						node.attrs.class = nodeAttrs.class.replace(reqexpJs, '').trim();
						nodeAttrs = node.attrs;
					}

					return node;
				})
			};

		return gulp.src('./src/**/*.html')
				.pipe(postHtml(plugin))
				.pipe(gulp.dest('./dest'));
	});
})();