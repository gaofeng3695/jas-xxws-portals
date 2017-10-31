//var del = require('del');
var gulp = require('gulp');
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-clean-css");
var minifyHtml = require("gulp-htmlmin");
var imagemin = require('gulp-imagemin');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');




gulp.task('clean', function(){
	return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('html', function() {
    gulp.src(['./src/**/**.html', '!{node_modules,demo,dist,demoHtml}/**/*.html'])
        .pipe(minifyHtml({
            collapseWhitespace: true,
            minifyJS : true,
            minifyCSS : true,
            removeComments : true,
        })) //压缩
        .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
    gulp.src(['src/**/*.css'])
        .pipe(minifyCss()) //压缩css
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
    gulp.src(['src/**/*.js'])
        .pipe(uglify().on('error', function(e) {
            console.log(e);
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('img', function() {
    gulp.src(['src/**/*.{jpg,gif,png}'])
        .pipe(imagemin())
        .pipe(gulp.dest('dist'));
});

gulp.task('font', function() {
    gulp.src(['src/**/*.{otf,eot,svg,ttf,woff,woff2}'])
        .pipe(gulp.dest('dist'));
});

gulp.task('ico', function() {
    gulp.src(['src/**/**.ico'])
        .pipe(gulp.dest('dist'));
});



gulp.task('all', ['clean'],function(callback) {
    runSequence(['html', 'css', 'js', 'img','font', 'ico',]);
});
