// Gulp.js configuration

const // modules
    gulp = require("gulp"),
    // development mode?
    devBuild = process.env.NODE_ENV !== "production",
    newer = require("gulp-newer"),
    imagemin = require("gulp-imagemin"),
    mozjpeg = require("imagemin-mozjpeg"),
    pngquant = require("imagemin-pngquant"),
    imageminSvgo = require("imagemin-svgo"),
    imageminGifsicle = require("imagemin-gifsicle"),
    sourcemaps = require("gulp-sourcemaps"),
    sass = require("gulp-sass"),
    autoprefixer = require("autoprefixer"),
    mqpacker = require("css-mqpacker"),
    cssnano = require("cssnano"),
    postcss = require("gulp-postcss"),
    purgecss = require("@fullhuman/postcss-purgecss"),
    rollup = require("gulp-better-rollup"),
    uglify = require("gulp-uglify"),
    browserSync = require("browser-sync").create(),


    // Environment
    localEnv = "mamp",
    // If valet, username:
    userName = "your-name",
    // If valet, site name:
    siteName = "your-site-name",

    
    // Folders
    src = "assets/src/",
    build = "assets/prod/";
// Image processing
function images() {
    const out = build + "images/";

    return gulp
        .src(src + "images/**/*")
        .pipe(newer(out))
        .pipe(
            imagemin([
                pngquant({ quality: [0.6, 0.6] }),
                mozjpeg({ quality: 60 }),
                imageminSvgo({
                    plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
                }),
                imageminGifsicle({ interlaced: true })
            ])
        )
        .pipe(gulp.dest(out));
}
exports.images = images;

// JavaScript processing
function js() {
    return gulp
        .src([src + "js/main.js"])
        .pipe(sourcemaps.init())
        .pipe(
            rollup(
                {
                    onwarn: function(message) {
                        if (/external dependency/.test(message)) return;
                    }
                },
                "es"
            )
        )
        .pipe(uglify())
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(build + "js/"));
}
exports.js = js;

// CSS processing
function css() {
    return gulp
        .src(src + "scss/main.scss", { allowEmpty: true })
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: "nested",
                imagePath: "/images/",
                precision: 3,
                errLogToConsole: true
            }).on("error", sass.logError)
        )
        .pipe(
            postcss([
                purgecss({ content: ["**/*.html", "**/*.php"] }),
                autoprefixer(),
                mqpacker,
                cssnano
            ])
        )
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(build + "css/"))
        .pipe(browserSync.reload({ stream: true }));
}
exports.css = css;

// html processing
function html() {
    gulp.task("html", function() {
        return gulp.src(["**/*.html", "**/*.php"]);
    });
}
exports.html = gulp.series(html);

// run all tasks
exports.build = gulp.parallel(exports.css, exports.js);

// production build for CSS
function prodCSS() {
    return gulp
        .src(src + "scss/main.scss", { allowEmpty: true })
        .pipe(
            sass({
                outputStyle: "nested",
                imagePath: "/images/",
                precision: 3,
                errLogToConsole: true
            }).on("error", sass.logError)
        )
        .pipe(
            postcss([
                purgecss({ content: ["**/*.html", "**/*.php"] }),
                autoprefixer(),
                mqpacker,
                cssnano
            ])
        )
        .pipe(gulp.dest(build + "css/"));
}
// production build for JS
function prodJS() {
    return gulp
        .src([src + "js/main.js"])
        .pipe(
            rollup(
                {
                    onwarn: function(message) {
                        if (/external dependency/.test(message)) return;
                    }
                },
                "es"
            )
        )
        .pipe(uglify())
        .pipe(gulp.dest(build + "js/"));
}
exports.prod = gulp.series(prodCSS, prodJS, images);

// watch for file changes
function watch(done) {
    if (localEnv === "valet") {
        browserSync.init({
            tunnel: false,
            proxy: "https://" + siteName + ".test",
            host: siteName + ".test",
            open: "external",
            https: {
                key:
                    "/Users/" +
                    userName +
                    "/.config/valet/Certificates/" +
                    siteName +
                    ".test.key",
                cert:
                    "/Users/" +
                    userName +
                    "/.config/valet/Certificates/" +
                    siteName +
                    ".test.crt"
            }
        });
    } else {
        browserSync.init({
            server: {
                baseDir: "./"
            },
            tunnel: false
        });
    }

    // html changes
    gulp.watch(["**/*.html", "**/*.php"], html).on(
        "change",
        browserSync.reload
    );

    // image changes
    gulp.watch(src + "images/**/*", images).on("change", browserSync.reload);

    // css changes
    gulp.watch(src + "scss/**/*", css);

    // js changes
    gulp.watch(src + "js/**/*", js).on("change", browserSync.reload);

    done();
}

exports.watch = watch;

// default task
exports.default = gulp.series(exports.build, exports.watch);
