var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var autoprefixer = require('gulp-autoprefixer');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
var replace = require('gulp-replace');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('sass', function(){
	return gulp.src('scss/style.scss')
	.pipe(sass({
		outputStyle: 'expanded'
	}))
	.pipe(autoprefixer())
	.pipe(replace('sprite.png', '../img/sprite.png'))
	.pipe(cssnano())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});

gulp.task('jade', function(){
	return gulp.src('*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('sprite', function () {
	var spriteData = gulp.src('app/img/sprite/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.scss'
	}));

	var imgStream = spriteData.img
		.pipe(gulp.dest('app/img/'));

	var cssStream = spriteData.css
		.pipe(gulp.dest('scss/components'));

	return merge(imgStream, cssStream);
});

gulp.task('scripts', function() {
	gulp.src(['js/jquery-3.0.0.min.js', 'js/placeholders.jquery.min.js', 'js/script.js'])
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('app/js'))
});

gulp.task('watch', ['browserSync', 'sass', 'jade', 'sprite', 'scripts'], function(){
	gulp.watch('**/*.scss', ['sass']);
	gulp.watch('*.jade', ['jade']);
	gulp.watch('app/img/sprite/*.png', ['sprite']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('js/*.js', ['scripts']);
});
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app',
			index: "index.html"
		}
	})
});