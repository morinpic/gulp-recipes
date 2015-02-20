var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// server
gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: 'assets/'
    }
  });
});

// watch
gulp.task('watch', ['server'], function(){
  gulp.watch(['assets/*.html'], reload());
  gulp.watch('assets/js/**/*.{js,jsx}', reload());
  gulp.watch('assets/css/**/*.{css}', reload());
});

// default
gulp.task('default', ['watch']);

// build
gulp.task('build', []);
