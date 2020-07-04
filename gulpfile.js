var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');

var scssFiles = './src/scss/**/*.scss';
var cssFolder = './public/css/';

gulp.task('style', function(){
  gulp.src(scssFiles)
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    })).on('error', console.error.bind(console))
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(cssFolder))
});

gulp.task('css', function(){
  gulp.src('./public/css/*.css')
  .pipe(uglifycss({
    "uglyComments": true
  }))
  .pipe(gulp.dest(cssFolder))

  gulp.series('watch');
})

gulp.task('watch', function(){
  gulp.watch([scssFiles], gulp.series('style'))
  gulp.watch([scssFiles], gulp.series('css'))
});

gulp.task('default', gulp.parallel('style','css','watch'))
