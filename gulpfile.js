const autoprefixer = require('autoprefixer');
const concat = require('gulp-concat-css');
const postcss = require('gulp-postcss');
const { src, watch, series, parallel, dest } = require('gulp');
const cssnano = require('cssnano');
const del = require('del');

function clear() {
    return del(['dist']);
}

function assets() {
    return src('./assets/*.*')
        .pipe(dest('dist/'));
}

function js() {
    return src('./scripts/scripts.js')
        .pipe(dest('dist/'));
}

function css() {
    return src(['./styles/base/*.css', './styles/*.css'])
        .pipe(concat('styles.css'))
        .pipe(postcss([autoprefixer()]))
        .pipe(dest('dist/'));
}

const build = series(clear, parallel(assets, css, js));

function watchAfter() {
    watch(['./styles/**/*.css', './scripts/*.js'], parallel(css, js))
}

// function minifyCSS() {
//     return src(['./dist/styles.css'])
//         .pipe(postcss([cssnano()]))
//         .pipe(dest('dist/'));
// }

exports.build = build;
exports.default = series(build, watchAfter);