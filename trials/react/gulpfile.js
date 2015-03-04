var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var reactify = require('reactify');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// var bundler = watchify(browserify('./assets/js/index.js', watchify.args));
// bundler.transform('reactify');
// gulp.task('browserify', bundle);
// bundler.on('update', bundle);
// bundler.on('log', $.gutil.log);
//
// // bundle
// function bundle() {
//   return bundler.bundle()
//     .on('error', $.gutil.log.bind($.gutil, 'Browserify Error'))
//     .pipe(source('bundle.js'))
//       .pipe(buffer())
//       .pipe($.sourcemaps.init({loadMaps: true}))
//       .pipe($.sourcemaps.write('./'))
//     .pipe(gulp.dest('./.tmp'));
// }

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
