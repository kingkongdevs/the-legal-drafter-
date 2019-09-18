// Gulp.js configuration

const
    // modules
    gulp = require('gulp'),
    // development mode?
    devBuild = (process.env.NODE_ENV !== 'production'),
    noop = require('gulp-noop'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    deporder = require('gulp-deporder'),
    terser = require('gulp-terser'),
    stripdebug = devBuild ? null : require('gulp-strip-debug'),
    sourcemaps = devBuild ? require('gulp-sourcemaps') : null,
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    assets = require('postcss-assets'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    cssnano = require('cssnano'),
    uncss = require('postcss-uncss'),
    browserSync = require('browser-sync').create(),

    // Site Specifics
    siteName = 'sample-landing-page',
    userName = 'lance',

    // Folders
    src = 'assets/src/',
    build = 'assets/prod/'
;

// Image processing
function images() {

    const out = build + 'images/';

    return gulp.src(src + 'images/**/*')
        .pipe(newer(out))
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(out));
}
exports.images = images;

// JavaScript processing
function js() {

    return gulp.src(src + 'js/**/*')
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

    browserSync.init({
        server: {
            baseDir: "./"
        },
        tunnel: true,
        // proxy: 'https://' + siteName + '.test',
        // host: siteName + '.test',
        // open: 'external',
        // port: 8000,
        // https: {
        //     key:
        //         '/Users/' +
        //         userName +
        //         '/.config/valet/Certificates/' +
        //         siteName +
        //         '.test.key',
        //     cert:
        //         '/Users/' +
        //         userName +
        //         '/.config/valet/Certificates/' +
        //         siteName +
        //         '.test.crt'
        // }
    });
    
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
