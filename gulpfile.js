var gulp         = require('gulp');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var imagemin     = require('gulp-imagemin');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');

var paths = {
  js: './src/js/*.js',
  html: './src/*.html',
  css: './src/*.css',
  images: './src/img/**/*' 
};

gulp.task('clean', function(cb) {  
  return del(['./dest'], cb);
});

gulp.task('autoprefixer', function () { 

  return gulp.src(paths.css)
    .pipe(sourcemaps.init())
    .pipe(postcss([ autoprefixer({ browsers: ['> 0.2%'] }) ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dest'));
});

gulp.task('images', function() {
  return gulp.src(paths.images)    
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('./dest/img'));
});

gulp.task('js', function() {
  return gulp.src(paths.js)    
    .pipe(gulp.dest('./dest/js'))
});

gulp.task('html', function() {
  return gulp.src(paths.html)    
    .pipe(gulp.dest('./dest'))
});



gulp.task('watch', function() {
  gulp.watch(paths.css, ['autoprefixer', 'images', 'js', 'html']);
  gulp.watch(paths.images, ['autoprefixer', 'images', 'js', 'html']);
  gulp.watch(paths.js, ['autoprefixer', 'images', 'js', 'html']);
  gulp.watch(paths.html, ['autoprefixer', 'images', 'js', 'html']);
});

gulp.task('default', function(cb) {
  runSequence('clean',
    ['watch', 'autoprefixer', 'images', 'js', 'html'],
    cb);
});