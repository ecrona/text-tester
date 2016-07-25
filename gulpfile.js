var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var webpack = require('gulp-webpack');


gulp.task('webpack', function() {
    return gulp.src('')
        .pipe(webpack( require('./webpack.config.prod.js') ))
        .pipe(gulp.dest('public-prod/js'));
});

gulp.task('css', function() {
    return gulp.src([
            'node_modules/materialize-css/dist/css/materialize.css',
            'public-dev/css/**/*.css'
        ])
        .pipe(minify())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('public-prod/css'));
});

gulp.task('fonts', function() {
    return gulp.src('node_modules/materialize-css/dist/fonts/**/*')
        .pipe(gulp.dest('public-prod/fonts'));
});

gulp.task('default', ['fonts']);