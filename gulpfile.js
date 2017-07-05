let gulp = require("gulp");
let gutil = require("gulp-util");
let concat_css = require("gulp-concat-css");
let webserver = require("gulp-webserver");
let webpack = require('webpack');
let runSequence = require('run-sequence');

// CSS のバンドルを行なう
gulp.task("bundle-css", () => {
    return gulp.src("node_modules/materialize-css/dist/css/materialize.min.css")
        .pipe(concat_css("assets/bundle.vendor.css"))
        .pipe(gulp.dest("dist/"));
});

gulp.task("build", ["copy-assets", "bundle-css", "webpack"]);

gulp.task("copy-assets", () => {
    return gulp.src(["src/assets/**/*", "src/data/**/*", "src/*.html", "src/*.ico"], { base: 'src' })
        
        .pipe(gulp.dest("dist"));
})

gulp.task("webserver", () => {
    return gulp.src("dist")
        .pipe(webserver({
            livereload: true,
            open: true,
        }));
});

// Webpack を実行する
gulp.task("webpack", (callback) => {
    let config = require('./webpack.config.js');
    webpack(config, (error, stats) => {
        if (error)
            throw new gutil.PluginError("webpack", error);
        gutil.log("[webpack]", stats.toString());
        callback();
    });
});

// 監視モード（watch）
// ["build"], 
gulp.task("watch", ["build"], () => gulp.watch("./src/**/*.{html,scss,ts,tsx}", ["build"]));

// 開発用サーバーを起動する（start）
gulp.task("start", function(done) {
    runSequence("watch", "webserver", function() {
        done();
    });
});

gulp.task("default", ["start"]);

