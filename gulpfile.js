const { src, watch, series, parallel, dest } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

function clear() {
    return del(['dist']);
}

function assets() {
    return src('./assets/*.*')
        .pipe(dest('dist/'));
}

function js() {
    return src('./scripts/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/'));
}

function css() {
    return src(['./styles/**/_*.css', './styles/**/*.css'])
        .pipe(concat('styles.css'))
        .pipe(autoprefixer('defaults'))
        .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
        .pipe(dest('dist/'));
}

const build = series(clear, parallel(assets, css, js));

function watchAfter() {
    watch(['./styles/**/*.css', './scripts/*.js'], parallel(css, js))
}

exports.build = build;
exports.default = series(build, watchAfter);