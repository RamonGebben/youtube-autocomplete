var gulp = require("gulp");
var babel = require("gulp-babel");
var react = require('gulp-react');

gulp.task("default", function () {
  return gulp.src("src/**/*")
    .pipe(babel())
    .pipe(react({harmony: true}))
    .pipe(gulp.dest("dist"));
});

gulp.task("watch", function(){
    gulp.watch('src/*.js', ['default'])
});