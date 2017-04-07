/**
 * Created by Павел on 26.03.2017.
 */
let gulp = require("gulp"), sass = require("gulp-sass"), browserSync = require("browser-sync"), autoprefixer = require("gulp-autoprefixer");

gulp.task("sass", () => {
    return gulp.src("default/sass/main.sass")
        .pipe(sass())
        .pipe(gulp.dest("default/css"));
});

gulp.task("browser-sync", () => {
    browserSync({
        server:{
            baseDir: "default"
        },
        notify: false
    });
});

gulp.task("autoprefixer", () => {
    return gulp.src("default/css/main.css").
        pipe(autoprefixer([
            'last 15 version',
            '>1%',
            'ie 8',
            'ie 7'
        ], {
            cascade: true
        }))
        .pipe(gulp.dest("default/css"));
});

gulp.task("watch", ["browser-sync", "sass", "autoprefixer"], () => {
    gulp.watch("default/sass/*.sass", ["sass", browserSync.reload]);
    gulp.watch("default/*.html", browserSync.reload);
    gulp.watch("default/css/*.css", ["autoprefixer", browserSync.reload]);
});

gulp.task("default",["watch"]);