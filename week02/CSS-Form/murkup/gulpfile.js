var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

gulp.task('css', function () {
	var processors = [
		autoprefixer({browsers: ['last 4 version']}),
		cssnano()
	];
	return gulp.src('./stylus/*.css')
		.pipe(postcss(processors))
		.pipe(gulp.dest('./css'));
});