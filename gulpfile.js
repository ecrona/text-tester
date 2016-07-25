var gulp = require('gulp');
var uglify = require('gulp-uglify');
var webpack = require('gulp-webpack');


gulp.task('webpack', function() {
    return gulp.src('')
        .pipe(webpack( require('./webpack.config.prod.js') ))
        .pipe(gulp.dest('public-prod/js'));
});

gulp.task('js', function() {
    return gulp.src('public-dev/js/bundle.js')
        .pipe(uglify())
        .pipe(gulp.dest('public-prod'));
});

gulp.task('default', ['webpack']);