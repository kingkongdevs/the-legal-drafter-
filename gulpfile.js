// Gulp.js configuration

const // modules
    gulp = require("gulp"),
    sourcemaps = require("gulp-sourcemaps"),
    sass = require("gulp-sass")(require("node-sass")),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    postcss = require("gulp-postcss"),
    purgecss = require("@fullhuman/postcss-purgecss"),
    rollup = require("gulp-better-rollup"),
    uglify = require("gulp-uglify"),
    browserSync = require("browser-sync").create(),
    imagemin = require('gulp-imagemin'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    imageResize = require('gulp-image-resize'),
    rename = require('gulp-rename'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    svgmin = require('gulp-svgmin'),
    webp = require('gulp-webp'),
    zip = require('gulp-zip'),

    // Folders
    src = "assets/src/",
    build = "assets/prod/";

function font() {

    let native = gulp
        .src([src + 'fonts/**/*.{woff,woff2}'])
        .pipe(gulp.dest(build + "fonts/"));
    let woff = gulp
        .src([src + 'fonts/**/*.ttf'])
        .pipe(ttf2woff())
        .pipe(gulp.dest(build + "fonts/"));
    let woff2 = gulp
        .src([src + 'fonts/**/*.ttf'])
        .pipe(ttf2woff2())
        .pipe(gulp.dest(build + "fonts/"));

    return (native, woff, woff2);
}
exports.font = font;

function svg() {
    return gulp
        .src([src + 'svgs/**/*.svg'])
        .pipe(svgmin())
        .pipe(gulp.dest(build + "svgs/"));
}
exports.svg = svg;

function imagesResponsive() {

    const sizes = [
        { width: 320, suffix: 'small' },
        { width: 480, suffix: 'medium' },
        { width: 800, suffix: 'large' },
        { width: 1200, suffix: 'extra-large' },
        { width: 2000, suffix: 'cover' }
    ];

    let stream;
    // responsive sizes for webp
    sizes.forEach((size) => {
        stream = gulp
            .src(src + "images/**/*")
            .pipe(imageResize({ width: size.width, upscale: false }))
            .pipe(
                rename((path) => {
                    path.basename += `-${size.suffix}`;
                }),
            )
            .pipe(webp())
            .pipe(gulp.dest(build + "images/"))
    });

    // generate single size for jpg/pngs
    stream = gulp
        .src(src + "images/**/*")
        .pipe(
            imagemin(
                [
                    imageminMozjpeg({
                        quality: 90,
                    }),
                ],
                {
                    verbose: true,
                },
            ),
        )
        .pipe(gulp.dest(build + "images/"));

    return stream;
}
exports.imagesResponsive = imagesResponsive;

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
        .pipe(gulp.dest(build + "js/"))
        .pipe(browserSync.reload({ stream: true }));
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
    return gulp
        .src(["**/*.html", "**/*.php", "!**/node_modules/**", "!**/vendor/**"])
        .pipe(browserSync.reload({ stream: true }));
}
exports.html = html;

// watch for file changes
function watch(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        // proxy: {
        //     target: 'http://website.local'
        // },
        tunnel: false
    });

    // html changes
    gulp.watch(["**/*.html", "**/*.php", "!**/node_modules/**", "!**/vendor/**"], gulp.series(exports.html, exports.css));

    // image changes
    gulp.watch(src + "images/**/*", imagesResponsive);

    // svg changes
    gulp.watch(src + "svgs/**/*", svg);

    // css changes
    gulp.watch(src + "scss/**/*", css);

    // js changes
    gulp.watch(src + "js/**/*", js);

    // font changes
    gulp.watch(src + "fonts/**/*", font);

    done();
}
exports.watch = watch;

// zips up all the files and folders ready for production
function package() {
    var date = Math.floor(new Date().getTime() / 1000);

    return gulp
        .src(["**/*", "!node_modules/**", "!vendor/**", "!package.json", "!gulpfile.js", "!README.md", "!.gitignore", "!assets/src/**", "!*.zip", "!package-lock.json", ".htaccess"])
        .pipe(zip("offer-"+date+".zip"))
        .pipe(gulp.dest('.'));
}
exports.package = package;

// run all tasks
exports.build = gulp.parallel(exports.css, exports.js, exports.font, exports.svg, exports.imagesResponsive);

// default task
exports.default = gulp.series(exports.build, exports.watch);