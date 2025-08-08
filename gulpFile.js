const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const noop = require('gulp-noop');

//DETECTAR AMBIENTE
const isProduction = process.env.NODE_ENV === 'production';

//CAMINHOS
const paths = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'build/styles'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'build/images'
    },
    scripts: {
        src: 'src/scripts/main.js',
        dest: 'build/scripts'
    }
};

//COMPILAR LESS + MINIFICAR CSS
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(!isProduction ? sourcemaps.init() : noop())
        .pipe(less())
        .pipe(isProduction ? cleanCSS() : noop())
        .pipe(rename({ suffix: isProduction ? '.min' : '' }))
        .pipe(isProduction ? sourcemaps.write('.') : noop())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

//OTIMIZAR IMAGENS
function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

//MINIFICAR JAVASCRIPT
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(isProduction ? uglify() : noop())
        .pipe(rename({ suffix: isProduction ? '.min' : '' }))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

//SERVIDOR LOCAL + LIVE RELOAD
function serve() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, images);
}

//TAREFAS
exports.styles = styles;
exports.images = images;
exports.scripts = scripts;

exports.server = gulp.series(styles, images, scripts, serve);
exports.default = gulp.series(styles, images, scripts);

