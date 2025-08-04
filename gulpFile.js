const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const imagemin = require('gulp-imagemin');

//CAMINHOS
const paths = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'build/styles'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'build/images'
    }
};

//COMPILAR LESS + MINIFICAR CSS
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

//OTIMIZAR IMAGENS
function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
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
    gulp.watch(paths.images.src, images);
}

//TAREFAS
exports.styles = styles;
exports.images = images;
exports.server = gulp.series(styles, images, serve);
exports.default = gulp.series(styles, images);

