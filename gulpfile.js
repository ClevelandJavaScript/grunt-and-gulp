var gulp = require("gulp");

var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");
var clean = require("gulp-clean");
var serve = require("gulp-serve");
var watch = require("gulp-watch");
var zip = require('gulp-zip');

gulp.task("clean", function() {
	gulp.src("build").pipe(clean());
});

/** TODO: insert additional code here **/


