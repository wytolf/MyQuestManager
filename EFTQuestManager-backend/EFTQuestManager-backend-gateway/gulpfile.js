const gulp = require('gulp');

gulp.task('move', function () {
    return gulp.src('server.js') // Pfade zu den Quelldateien
        .pipe(gulp.dest('dist')); // Zielverzeichnis
});

gulp.task('default', gulp.series('move'));
