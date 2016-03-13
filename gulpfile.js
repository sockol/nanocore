// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gutil = require('gulp-util'); 
 
// Compile Our Sass
gulp.task('sass', function() {

    gutil.log('Gulp is sassing...')

    var obj = gulp.src('public/scss/*.scss') 
        .pipe(sass({
            outputStyle: 'compressed',
            debug:true
        }, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }).on('error', sass.logError)) 
        .pipe(gulp.dest('public/css'));
  
    return obj;
});


// Watch Files For Changes
gulp.task('watch', function() {
    // gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'watch']);