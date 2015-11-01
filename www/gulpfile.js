var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      port: 3300,
      root: './app/',
      livereload: true,
        directoryListing: true,
        open: false
    }));
});

gulp.task('default', ['webserver']);