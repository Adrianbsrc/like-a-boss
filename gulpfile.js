var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');

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
})

gulp.task('watch', function(){
  gulp.watch([scssFiles], gulp.series('style'))
})