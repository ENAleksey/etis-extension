const { src, watch, series, parallel, dest } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const cleancss = require('gulp-clean-css');
const concat = require('gulp-concat');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
// const sourcemaps = require('gulp-sourcemaps');
const del = require('del');

function clear() {
    return del(['dist']);
}

function assets() {
    return src('./assets/*.*')
        .pipe(dest('dist/'));
}

function prodManifest() {
    return src('./manifests/prod_manifest.json')
        .pipe(rename('manifest.json'))
        .pipe(dest('dist/'));
}

function devManifest() {
    return src('./manifests/dev_manifest.json')
        .pipe(rename('manifest.json'))
        .pipe(dest('dist/'));
}

function js() {
    return src('./scripts/*.js')
        // .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        // .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/'));
}

function css() {
    return src(['./styles/**/_*.css', './styles/**/*.css'])
        // .pipe(sourcemaps.init())
        .pipe(concat('styles.css'))
        .pipe(autoprefixer('defaults'))
        .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
        // .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/'));
}

function watchAfterCSS() {
    watch(['./styles/**/*.css'], series(css))
}

function watchAfterJS() {
    watch(['./scripts/*.js'], series(js))
}

const build = series(clear, parallel(assets, css, js));

exports.build = series(build, prodManifest);
exports.default = series(series(build, devManifest), parallel(watchAfterCSS, watchAfterJS));