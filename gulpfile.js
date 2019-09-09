'use strict';

var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var fileinclude = require('gulp-file-include');



// Gulp task to minify CSS files

gulp.task('sass', function () {
    gulp.src(['src/scss/*.scss'])
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest('dist/css/'));
});



  // Clean output directory
gulp.task('clean', () => del(['dist']));

//include global files
gulp.task('fileinclude', function() {
  gulp.src(['src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
  return gulp.src(['src/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'));
});

// Gulp task to minify HTML files
gulp.task('pages', function() {
  return gulp.src(['dist/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'));
});


// Gulp task to minify all files
// gulp.task('default', ['clean'], function () {
//   runSequence(
//     'sass',
//     'html',

//   );
// });

gulp.task('watch', ['clean'], function() {
  gulp.watch(['src/*.html'], ['html']);
  gulp.watch(['src/scss/*.scss'], ['sass']);
});


  