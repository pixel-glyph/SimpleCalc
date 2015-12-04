/*----------------------------------------------------
CONGID OBJECT
----------------------------------------------------*/

var config = {
	jsConcatFiles: [
		'./app/js/module1.js',
		'./app/js/app.js'
	],
	buildFilesFoldersRemove: [
		'build/scss/',
		'build/js/!(*.min.js)',
		'build/maps/'
	]
};

/*----------------------------------------------------
REQUIRED
----------------------------------------------------*/

var gulp = require('gulp'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),
		uglify = require('gulp-uglify'),
		browserSync = require('browser-sync'),
		reload = browserSync.reload,
		concat = require('gulp-concat'),
		autoprefixer = require('gulp-autoprefixer'),
		del = require('del'),
		rename = require('gulp-rename');

/*----------------------------------------------------
LOG ERRORS
----------------------------------------------------*/

function errorlog(err){
	console.log(err.message);
	this.emit('end');
}

/*----------------------------------------------------
SCIRPT TASKS
----------------------------------------------------*/

gulp.task('scripts', function() {
  return gulp.src(config.jsConcatFiles)
	.pipe(sourcemaps.init())
		.pipe(concat('temp.js'))
		.pipe(uglify())
		.on('error', errorlog)
		.pipe(rename('app.min.js'))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('./app/js/'))

    .pipe(reload({stream:true}));
});

/*----------------------------------------------------
STYLES TASK
----------------------------------------------------*/

gulp.task('styles', function() {
	gulp.src('app/scss/main.scss')
		.pipe(sourcemaps.init())
			.pipe(sass({outputStyle: 'compressed'}))
			.on('error', errorlog)
			.pipe(autoprefixer({
	            browsers: ['last 3 versions'],
	            cascade: false
	        }))
		.pipe(sourcemaps.write('../maps'))
		.pipe(gulp.dest('app/css'))
		.pipe(reload({stream:true}));
});

/*----------------------------------------------------
HTML TASKS
----------------------------------------------------*/

gulp.task('html', function(){
	gulp.src('app/**/*.html')
			.pipe(reload({stream:true}));
});

/*----------------------------------------------------
BUILD TASKS
----------------------------------------------------*/

// clear out files and folders from build dir
gulp.task('build:cleanfolder', function () {
	return del([
		'build/**'
	]);
});

// create build dir for all files in app dir
gulp.task('build:copy', ['build:cleanfolder'], function(){
    return gulp.src(['app/**/*/','!app/scss/**'])
    .pipe(gulp.dest('build/'));
});

//tasks to remove unwanted build files
//list all files and dirs that we don't want to include
gulp.task('build:remove', ['build:copy'], function () {
	return del(config.buildFilesFoldersRemove);
});

gulp.task('build', ['build:copy', 'build:remove']);


/*----------------------------------------------------
BROWSER-SYNC TASKS
----------------------------------------------------*/

gulp.task('browser-sync', function(){
	browserSync({
		server:{
			baseDir: "./app/"
		}
	});
});

// task to run build server for testing final app
gulp.task('build:serve', function() {
	browserSync({
		server:{
			baseDir: "./build/"
		}
	});
});

/*----------------------------------------------------
WATCH TASKS
----------------------------------------------------*/

gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/scss/**/*.scss', ['styles']);
	gulp.watch('app/**/*.html', ['html']);
});

/*----------------------------------------------------
DEFAULT
----------------------------------------------------*/

gulp.task('default', ['scripts', 'styles', 'html', 'browser-sync', 'watch']);