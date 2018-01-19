const SRC_DIR = './src/';     // 源文件目录  
const DIST_DIR = './dist/';   // 文件处理后存放的目录
const DEV_DIR = './dev/';     // 开发环境下存放目录  
const DIST_FILES = DIST_DIR + '**'; // 目标路径下的所有文件  
const config = {
	src: SRC_DIR, 
	dist: DIST_DIR,
    dev: DEV_DIR,
	dist_files: DIST_FILES,
	    html: {  
        src: SRC_DIR + '*.html',  
        dist: DIST_DIR,
        dev:  DEV_DIR, 
    },  
    assets: {  
        src: SRC_DIR + 'assets/**/*',            // assets目录：./src/assets  
        dist: DIST_DIR + 'assets',                // assets文件build后存放的目录：./dist/assets  
        dev: DEV_DIR + 'assets'
    },  
    css: {  
        src: SRC_DIR + 'css/**/*.css',           // CSS目录：./src/css/  
        dist: DIST_DIR + 'css',                  // CSS文件build后存放的目录：./dist/css  
        dev: DEV_DIR + 'css'
    },  
    less: {  
        src: SRC_DIR + 'less/**/*.less',         // less目录：./src/less/  
        dist: DIST_DIR + 'css',                   // less文件生成CSS后存放的目录：./dist/css  
        dev: DEV_DIR + 'css'
    },  
    js: {  
        src: SRC_DIR + 'js/**/*.js',             // JS目录：./src/js/  
        dist: DIST_DIR + 'js',                   // JS文件build后存放的目录：./dist/js  
        build_name: 'build.js',                   // 合并后的js的文件名 
         dev: DEV_DIR + 'js' 
    },  
    img: {  
        src: SRC_DIR + 'images/**/*',            // images目录：./src/images/  
        dist: DIST_DIR + 'images',               // images文件build后存放的目录：./dist/images  
         dev: DEV_DIR + 'images'
    } 
}
module.exports = config