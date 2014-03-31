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

gulp.task("copy", function() {
    return gulp.src(["src/images/**/*", "src/index.html"], { base: 'src' })
        .pipe(gulp.dest("build/gulp"));
});

gulp.task("styles", function() {
    return gulp.src([
        "src/lib/bootstrap/css/bootstrap.css", 
        "src/css/custom.css"
    ])
        .pipe(minifyCss())
        .pipe(concat('application.min.css'))
        .pipe(gulp.dest('build/gulp/css'));
    
});

gulp.task("scripts", function() {
    return gulp.src([
        "src/lib/jquery-2.1.0/jquery-2.1.0.js", 
        "src/lib/bootstrap/js/bootstrap.js",
        "src/js/custom.js"      
    ])
        .pipe(uglify())
        .pipe(concat('application.min.js'))
        .pipe(gulp.dest('build/gulp/js'));  
});

gulp.task("default", ["copy", "styles", "scripts"]);

gulp.task("watch", function() {
    gulp.src(["src/**/*.css"])
        .pipe(watch(function() {
            gulp.start("styles");
        }));

    gulp.src(["src/**/*.js"])
        .pipe(watch(function() {
            gulp.start("scripts");
        }));
        
    gulp.src(["src/images/**/*", "src/index.html"])
        .pipe(watch(function() {
            gulp.start("copy");
        }));
        
});

gulp.task("server", ["watch"], function() {
    serve("build/gulp");
});

gulp.task("zip", ["copy", "styles", "scripts"], function() {
    return gulp.start("compress");
});

gulp.task("compress", function() {
    gulp.src("build/gulp/**/*")
        .pipe(zip("gulp-app.zip"))
        .pipe(gulp.dest("build"));
});

