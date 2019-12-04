// Gulp.js configuration

const
    // modules
    gulp = require('gulp'),
    // development mode?
    devBuild = (process.env.NODE_ENV !== 'production'),
    noop = require('gulp-noop'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    mozjpeg = require('imagemin-mozjpeg'),
    pngquant = require('imagemin-pngquant'),
    imageminSvgo = require('imagemin-svgo'),
    imageminGifsicle = require('imagemin-gifsicle'),
    concat = require('gulp-concat'),
    deporder = require('gulp-deporder'),
    terser = require('gulp-terser'),
    stripdebug = require('gulp-strip-debug'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    assets = require('postcss-assets'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    cssnano = require('cssnano'),
    postcss = require('gulp-postcss'),
    purgecss = require('@fullhuman/postcss-purgecss'),
    rollup = require('gulp-better-rollup'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync').create(),

    // Environment
    localEnv = 'valet',

    // If valet, username:
    userName = 'lance',

    // If valet, site name:
    siteName = 'html-boilerplate',

    // Folders
    src = 'assets/src/',
    build = 'assets/prod/'
;



// Image processing
function images() {

    const out = build + 'images/';

    return gulp.src(src + 'images/**/*')
        .pipe(newer(out))
        .pipe(imagemin([
            pngquant({quality: [06, 06]}),
            mozjpeg({quality: 60}),
            imageminSvgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            }),
            imageminGifsicle({interlaced: true})
        ]))
        .pipe(gulp.dest(out));
}
exports.images = images;

// JavaScript processing
function js() {

    return gulp.src([src + 'js/main.js'])
        .pipe(sourcemaps.init())
        .pipe(rollup({
            onwarn: function ( message ) {
                if ( /external dependency/.test( message ) ) return;
            }
        }, 'es'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(build + 'js/'));
}
exports.js = js;

// CSS processing
function css() {

    return gulp.src(src + 'scss/main.scss', {allowEmpty: true})
        .pipe(sourcemaps.init())
        .pipe(
        	sass({
				outputStyle: 'nested',
				imagePath: '/images/',
				precision: 3,
				errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(
        	postcss(
        		[
                    assets({loadPaths: ['images/']}),
                    purgecss({content: ['*.html', '*.php']}),
					autoprefixer(),
					mqpacker,
					cssnano
        		]
			))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(build + 'css/'))
        .pipe(browserSync.reload({stream: true}));

}
exports.css = gulp.series(images, css);

// html processing
function html() {
    gulp.task('html', function() {
        return gulp.src(['**/*.html', '**/*.php'])
            .pipe(browserSync.reload({stream: true}));
    });
}
exports.html = gulp.series(html);

// run all tasks
exports.build = gulp.parallel(exports.css, exports.js);

// watch for file changes
function watch(done) {

    if(localEnv === 'valet') {
        browserSync.init({
            tunnel: false,
            proxy: 'https://' + siteName + '.test',
            host: siteName + '.test',
            open: 'external',
            https: {
                key:
                    '/Users/' +
                    userName +
                    '/.config/valet/Certificates/' +
                    siteName +
                    '.test.key',
                cert:
                    '/Users/' +
                    userName +
                    '/.config/valet/Certificates/' +
                    siteName +
                    '.test.crt'
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
    gulp.watch(['*.html', '*.php'], html)

    // image changes
    gulp.watch(src + 'images/**/*', images).on('change', browserSync.reload);

    // css changes
    gulp.watch(src + 'scss/**/*', css);

    // js changes
    gulp.watch(src + 'js/**/*', js).on('change', browserSync.reload);

    done();
}

exports.watch = watch;

// default task
exports.default = gulp.series(exports.build, exports.watch);
