// include gulp
var gulp = require('gulp');

// include plug-ins
var autoprefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


// JS hint task
gulp.task('styles', function() {
    gulp.src(['./src/styles/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefix())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/styles'));
});