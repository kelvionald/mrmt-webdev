var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject'),
    gulpSequence = require('gulp-sequence'),
    browserSync = require('browser-sync').create(),
    coffee = require('gulp-coffee'),
    gutil  = require('gulp-util');
  
gulp.task('minify-js', function () {
  gulp.src('src/js/*.js')
  .pipe(uglify())
  .pipe(rename({suffix: '.min'}))
  .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(gulp.dest('build/js'))
});

gulp.task('minify-css', function () {
  gulp.src('src/css/*.css')
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
  .pipe(gulp.dest('build/css'))
});

gulp.task('html-build', function () {
  gulp.src('src/*.html')
  .pipe(gulp.dest('build/'))
  .on('end', function () {
    gulp.src('build/index.html')
    .pipe(inject(gulp.src('./build/js/*.min.js', {read: false}), {relative: true}))
    .pipe(inject(gulp.src('./build/css/*.min.css', {read: false}), {relative: true}))
    .pipe(gulp.dest('build/'));
  })
});

gulp.task('dev', function () {
  function updateHtml() {
    browserSync.reload();
  }

  function updateCoffee() {

    gulp.src('./src/coffee/*.coffee')
    .pipe(coffee({bare: true})
      .on('error', function (error) {
        console.error("Compilation error: " + error.stack);
        console.log(error.toString())
        this.emit('end')
      })
    )
    .pipe(gulp.dest('./src/js/'));

    updateHtml();
  }

  updateCoffee();

  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
  gulp.watch("./src/*").on('change', updateHtml);
  gulp.watch("./src/coffee/*").on('change', updateCoffee);
  gulp.watch("./src/css/*").on('change', updateHtml);
});