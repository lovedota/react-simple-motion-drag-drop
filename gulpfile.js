var gulp = require('gulp'),
    tslint = require('gulp-tslint'),
    typescriptPaths = ['app/**/*.ts', 'app/**/*.tsx'];

function testReporter(output, file, options) {
    // file is a reference to the vinyl File object 
    console.log("Found " + output.length + " errors in " + file.path);
    // options is a reference to the reporter options, e.g. including the emitError boolean 
};
/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
    return gulp.src(typescriptPaths)
            .pipe(tslint())
            .pipe(tslint.report('full', {
              emitError: false
            }));
});

gulp.task('watch', function() {
    gulp.watch(typescriptPaths, ['ts-lint']);
});

gulp.task('default', ['watch', 'ts-lint']);