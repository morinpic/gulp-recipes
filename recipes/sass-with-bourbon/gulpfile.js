var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var bourbon = require('node-bourbon');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Global Task: server
gulp.task('server', [
  'build:sass',
  'watch'
]);

// build: Sass
gulp.task('build:sass', function() {
  return gulp.src('assets/sass/**/*.{sass,scss}')
    .pipe(plumber())
    .pipe(sass({includePaths: bourbon.includePaths}))
    .pipe(gulp.dest('assets/css'))
    .pipe(reload({stream:true}));
});

// browser-sync
gulp.task('browser-sync', function() {
  browserSync({server: {baseDir: 'assets/'}});
});

// watch
gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('assets/sass/**/*.{sass,scss}', ['build:sass']);
})
