var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// clean:tmp
gulp.task('clean:tmp', function(cb) {
  rimraf('.tmp', cb);
});

// browserify
gulp.task('browserify', function() {
  var b = browserify({
    entries: ['./assets/js/app.js'],
    transform: [reactify]
  });
  return b.bundle()
    .on('error', $.notify.onError('<%= error.message %>'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.tmp/js'))
    .pipe(reload({stream:true}));
});

// copy:html
gulp.task('copy:html', function() {
  return gulp.src('assets/**/*.html')
    .pipe(gulp.dest('.tmp'))
    .pipe(reload({stream:true}));
});

// copy:css
gulp.task('copy:css', function() {
  return gulp.src('assets/css/**/*.css')
    .pipe(gulp.dest('.tmp/css'))
    .pipe(reload({stream:true}));
});

// browser-sync
gulp.task('browser-sync', function() {
  browserSync({server: {baseDir: '.tmp'}});
});

// watch
gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('assets/**/*.html', ['copy:html']);
  gulp.watch('assets/js/**/*.{js,jsx}', ['browserify']);
  gulp.watch('assets/css/**/*.css', ['copy:css']);
});

// server
gulp.task('server', function() {
  runSequence(
    'clean:tmp',
    ['browserify', 'copy:html', 'copy:css'],
    'watch'
  );
});
