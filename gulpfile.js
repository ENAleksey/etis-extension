import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import cleancss from 'gulp-clean-css';
import concat from 'gulp-concat';
import gulpEsbuild from 'gulp-esbuild';
import del from 'del';

export const clear = () => {
  return del(['dist']);
}

export const assets = () => {
  return gulp.src('./assets/**/*.*')
    .pipe(gulp.dest('dist'));
}

export const scripts = () => {
  return gulp.src('src/extension.js')
    .pipe(gulpEsbuild({
      outfile: "extension.js",
      bundle: true,
      // tsconfig: "./tsconfig.json"
    }))
    .pipe(gulp.dest('dist'));
}

export const styles = () => {
  return gulp.src(['src/styles/**/_*.css', 'src/styles/**/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefixer('defaults'))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
    .pipe(gulp.dest('dist'));
}

export const watch = () => {
  gulp.watch(['./assets/**/*.*'], gulp.series(assets));
  gulp.watch(['./src/**/*.js'], gulp.series(scripts));
  gulp.watch(['./src/styles/**/*.css'], gulp.series(styles));
}

export const build = gulp.series(
  clear,
  gulp.parallel(
    assets,
    styles,
    scripts
  )
);

export default gulp.series(
  build,
  watch,
)
