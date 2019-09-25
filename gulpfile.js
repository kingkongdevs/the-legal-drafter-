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
    stripdebug = devBuild ? null : require('gulp-strip-debug'),
    sourcemaps = devBuild ? require('gulp-sourcemaps') : null,
    sass = require('gulp-sass'),
    assets = require('postcss-assets'),
    autoprefixer = require('autoprefixer'),
    uncss = require('postcss-uncss'),
    mqpacker = require('css-mqpacker'),
    cssnano = require('cssnano'),
    postcss = require('gulp-postcss'),
    browserSync = require('browser-sync').create(),

    // Environment
    localEnv = 'mamp',
    userName = 'lance',

    // Site Specifics
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
            pngquant({quality: [0.5, 0.5]}),
            mozjpeg({quality: 50}),
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

    return gulp.src([
        src + 'js/jquery.viewportchecker.min.js',
        src + 'js/custom.js'
        ])
        .pipe(sourcemaps ? sourcemaps.init() : noop())
        .pipe(deporder())
        .pipe(concat('main.js'))
        .pipe(stripdebug ? stripdebug() : noop())
        .pipe(terser())
        .pipe(sourcemaps ? sourcemaps.write() : noop())
        .pipe(gulp.dest(build + 'js/'));

}
exports.js = js;

// CSS processing
function css() {

    return gulp.src(src + 'scss/main.scss', {allowEmpty: true})
        .pipe(sourcemaps ? sourcemaps.init() : noop())
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
                    uncss({ html: ['index.html', '**/*.html', '**/*.php'] }),
					autoprefixer(),//{ browsers: ['last 2 versions', '> 2%'] }
					mqpacker,
					cssnano
        		]
			))
        // .pipe(sourcemaps ? sourcemaps.write() : noop())
        .pipe(gulp.dest(build + 'css/'))
        .pipe(browserSync.stream());

}
exports.css = gulp.series(images, css);

// html processing
function html() {
    gulp.task('html', function() {
        return gulp.src('**/*.html')
            .pipe(gulp.dest(''))
            .pipe(livereload(server))
            .pipe(notify({ message: 'HTML task complete' }));
    });
}
exports.html = gulp.series(html);

// run all tasks
exports.build = gulp.parallel(exports.css, exports.js);

// watch for file changes
function watch(done) {

    // Cos Lance has to be a special little snowflake
    if(localEnv === 'valet') {
        browserSync.init({
            tunnel: true,
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
            tunnel: true
        });
    }
    
    // html changes
    gulp.watch('*.html', html).on('change', browserSync.reload);

    // image changes
    gulp.watch(src + 'images/**/*', images).on('change', browserSync.reload);

    // css changes
    gulp.watch(src + 'scss/**/*', css).on('change', browserSync.reload);

    // js changes
    gulp.watch(src + 'js/**/*', js).on('change', browserSync.reload);

    done();
}

exports.watch = watch;

// default task
exports.default = gulp.series(exports.build, exports.watch);
