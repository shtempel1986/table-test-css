/**
 * Created by Павел on 26.03.2017.
 */
let gulp = require("gulp"), sass = require("gulp-sass"), browserSync = require("browser-sync"),
autoprefixer = require("gulp-autoprefixer"), babel =require("gulp-babel"), rename = require ("gulp-rename");

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

gulp.task("babel", ()=>{
    return gulp.src("default/main.ES6.js")
        .pipe(babel())
        .pipe(rename("main.js"))
        .pipe(gulp.dest("default"));
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

gulp.task("watch", ["browser-sync", "sass", "autoprefixer", "babel"], () => {
    gulp.watch("default/sass/*.sass", ["sass", browserSync.reload]);
    gulp.watch("default/*.html", browserSync.reload);
    gulp.watch("default/css/*.css", ["autoprefixer", browserSync.reload]);
    gulp.watch("default/main.ES6.js", ["babel", browserSync.reload]);
});

gulp.task("default",["watch"]);