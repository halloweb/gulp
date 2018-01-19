var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀  
var rename = require('gulp-rename'); //重命名  
var cssnano = require('gulp-cssnano'); // css的层级压缩合并
var less = require('gulp-less'); //less
const babel = require('gulp-babel');
var jshint = require('gulp-jshint'); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）  
var uglify = require('gulp-uglify'); //js压缩  
var rev = require('gulp-rev'); //加版本号
const revCollector = require('gulp-rev-collector'); //替换版本号
var concat = require('gulp-concat'); //合并文件
var sourcemaps = require('gulp-sourcemaps');  
var imagemin = require('gulp-imagemin'); //图片压缩 
var Config = require('./gulpfile.config.js');
//======= gulp build 打包资源 ===============
function prod() {
    /** 
     * HTML处理 
     */
    gulp.task('html', function () {
        return gulp.src(Config.html.src).pipe(gulp.dest(Config.html.dist));
    });
    /** 
     * assets文件夹下的所有文件处理 
     */
    gulp.task('assets', function () {
        return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist));
    });
    /** 
     * CSS样式处理 
     */
    gulp.task('css', function () {
        return gulp.src(Config.css.src).pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(rev())
        .pipe(gulp.dest(Config.css.dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/css'));
    });
    /** 
     * less样式处理 
     */
    gulp.task('less', function () {
        return gulp.src(Config.less.src)
            .pipe(autoprefixer('last 2 version'))
            .pipe(less())
            .pipe(sourcemaps.init())
            .pipe(cssnano())
            .pipe(sourcemaps.write('.'))
            .pipe(rev())
            .pipe(gulp.dest(Config.less.dist))
            .pipe(rev.manifest())
            .pipe(gulp.dest('dist/rev/css'));
    });
    /** 
     * js处理 
     */
    gulp.task('js', function () {
        return gulp.src(Config.js.src)
        .pipe(babel())   
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(rev())
        .pipe(gulp.dest(Config.js.dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/js'));
    });
     /** 
     * 将html中文件路径替换成带版本号的
     */
    gulp.task('rev',function(){   
    return gulp.src(['./dist/rev/*.json','dist/*.html'])
    .pipe(revCollector())
    .pipe(gulp.dest('./dist')); //html更换css,js文件版本，更改完成之后保存的地址
     })

    /** 
     * 合并所有js文件并做压缩处理 
     */
    gulp.task('js-concat', function () {
        return gulp.src(Config.js.src)
        .pipe(babel()) 
        .pipe(concat(Config.js.build_name))  
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(rev())
        .pipe(gulp.dest(Config.js.dist))
        .pipe(rev.manifest())
        .pipe(gulp.dest('dist/rev/js'));
    });
    /** 
     * 图片处理 
     */
    gulp.task('images', function () {
        return gulp.src(Config.img.src).pipe(imagemin({
            optimizationLevel: 3
            , progressive: true
            , interlaced: true
        }))
         .pipe(rev())
         .pipe(gulp.dest(Config.img.dist))
         .pipe(rev.manifest())
         .pipe(gulp.dest('dist/rev/images'));;
    });
    gulp.task('build', ['html', 'css', 'less','js', 'assets', 'images']);
}
module.exports = prod;