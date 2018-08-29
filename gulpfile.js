var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var mmq = require('gulp-merge-media-queries');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var rigger = require('gulp-rigger');

gulp.task('html', function(){
  return gulp.src('./src/*.html')
  .pipe(rigger())
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.reload({
    stream:true
  }));
});

gulp.task('css', function(){
  return gulp.src('./src/sass/style.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
}))
  .pipe(cssnano())
  .pipe(mmq({
    log: true
  }))
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.reload({
    stream:true
  }));
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.html', ['html'])
  gulp.watch('./src/sass/**/*.scss', ['css'])
});

gulp.task('img', function(){
  return gulp.src('./src/img/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('./dist/img'))
});

gulp.task('fonts', function(){
  return gulp.src('./src/fonts/**/*.*')
  .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
});

gulp.task('del:dist', function () {
  return del.sync('./dist');
})

gulp.task('build',['html', 'css', 'img', 'fonts']);

gulp.task('start', ['del:dist','build', 'server', 'watch']);