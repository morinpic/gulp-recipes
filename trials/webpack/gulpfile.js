var gulp = require('gulp');
var plumber = require('gulp-plumber');
var webpack = require('gulp-webpack');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('html', function() {
	return gulp.src('assets/**/*.html')
		.pipe(gulp.dest('build/'))
		.pipe(reload({stream:true}));
});

gulp.task('js', function() {
	return gulp.src('assets/js/**/*.js')
		.pipe(plumber())
		.pipe(webpack({
      output: {
        filename: 'index.js'
      }
     }))
		.pipe(gulp.dest('build/js/'))
		.pipe(reload({stream:true}));
});

gulp.task('watch',['browser-sync'], function() {
	gulp.watch('assets/**/*.html', ['html']);
	gulp.watch('assets/js/**/*.js', ['js']);
});

gulp.task('browser-sync', function() {
	browserSync({
		server:{
			baseDir:'build/'
		}
	});
});

gulp.task('server', ['html', 'js', 'watch']);