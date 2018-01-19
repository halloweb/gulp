const gulp = require('gulp');
const rename = require('gulp-rename'); //重命名  
const cssnano = require('gulp-cssnano'); // css的层级压缩合并
const less = require('gulp-less'); //less
const autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀  
const babel = require('gulp-babel');
const jshint = require('gulp-jshint'); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）  
const eslint = require('gulp-eslint'); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）  
const concat = require('gulp-concat'); //合并文件  
const imagemin = require('gulp-imagemin'); //图片压缩 
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const Config = require('./gulpfile.config.js');
//======= gulp dev 开发环境下 ===============
function dev() {
    /** 
     * HTML处理 
     */
    gulp.task('html:dev', function () {
        return gulp.src(Config.html.src).pipe(gulp.dest(Config.html.dev)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * assets文件夹下的所有文件处理 
     */
    gulp.task('assets:dev', function () {
        return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dev)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * CSS样式处理 
     */
    gulp.task('css:dev', function () {
        return gulp.src(Config.css.src).pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        })).pipe(gulp.dest(Config.css.dev)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * less样式处理 
     */
    gulp.task('less:dev', function () {
        return gulp.src(Config.less.src).pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        })).pipe(gulp.dest(Config.less.dev)).pipe(reload({
            stream: true
        }));
    });
    /**  
     * js处理 
     */
    gulp.task('js:dev', function () {
        return gulp.src(Config.js.src).pipe(babel()).pipe(eslint()).pipe(eslint.format()).pipe(gulp.dest(Config.js.dev)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * 图片处理 
     */
    gulp.task('images:dev', function () {
        return gulp.src(Config.img.src).pipe(imagemin({
            optimizationLevel: 3
            , progressive: true
            , interlaced: true
        })).pipe(gulp.dest(Config.img.dev)).pipe(reload({
            stream: true
        }));
    });
    gulp.task('dev', ['html:dev', 'css:dev', 'less:dev', 'js:dev', 'assets:dev', 'images:dev'], function () {
        browserSync.init({
            server: {
                baseDir: Config.dev
            }, 
            open: 'external',// 决定Browsersync启动时自动打开的网址 external 表示 可外部打开 url, 可以在同一 wifi 下不同终端测试
            notify: false
        });
        // Watch .html files  
        gulp.watch(Config.html.src, ['html:dev']);
        // Watch .css files  
        gulp.watch(Config.css.src, ['css:dev']);
        // Watch .scss files  
        gulp.watch(Config.less.src, ['less:dev']);
        // Watch assets files  
        gulp.watch(Config.assets.src, ['assets:dev']);
        // Watch .js files  
        gulp.watch(Config.js.src, ['js:dev']);
        // Watch image files  
        gulp.watch(Config.img.src, ['images:dev']);
    });
}
//======= gulp dev 开发环境下 ===============
module.exports = dev;