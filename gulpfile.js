var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var plumber  = require('gulp-plumber');
var uglify   = require('gulp-uglify');
var concat   = require('gulp-concat');
var rename   = require('gulp-rename');


/* Production Folders (public) */
var cssFolder = './public/css/';
var jsFolder = './public/js/';

/* Development Folders (src) */
var scssFiles = './src/scss/**/*.scss';
var jsFiles = './src/js/**/*.js';

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

gulp.task('scripts', function() {
	return gulp.src(jsFiles)
        .pipe(plumber())
	      .pipe(uglify())
        .pipe(concat('scripts'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(jsFolder));
});


gulp.task('watch', function(){
  gulp.watch([scssFiles], gulp.series('style'))
  gulp.watch([scssFiles], gulp.series('css'))
});

gulp.task('default', gulp.parallel('style','css','watch'))
