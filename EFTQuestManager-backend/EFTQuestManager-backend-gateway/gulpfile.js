const gulp = require('gulp');

gulp.task('transpile', function () {
    return gulp.src('server.js') // Pfade zu den Quelldateien
        .pipe(gulp.dest('dist')); // Zielverzeichnis
});

// Standardaufgabe, die 'transpile' ausführt
gulp.task('default', gulp.series('transpile'));
