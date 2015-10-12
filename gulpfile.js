// 利用gulp做css,js文件的编译，合并
// images合并，
// （上线版本还需要压缩HTML，CSS,JS，图片，去除注释，并加版本号控制）

// include gulp
var gulp = require('gulp');

// include plug-ins
var clean = require('gulp-clean');             // 清空目标编译文件夹
var autoprefix = require('gulp-autoprefixer'); // postcss之智能增加css前缀
var sass = require('gulp-sass');               // 编译sass为css
var sourcemaps = require('gulp-sourcemaps');   // map文件
var strip  = require('gulp-strip-comments');    // 去除注释
var jshint = require('gulp-jshint');   // js错误检查
var concat = require('gulp-concat');   // 文档合并
var uglify = require('gulp-uglify');   // 代码压缩
var rename = require('gulp-rename');   // 文件更名
var notify = require('gulp-notify'),
    minifycss = require('gulp-minify-css');

// Link任务会检查js/目录下得js文件有没有报错或警告。

//编译Sass (gulp-ruby-sass)
//Autoprefixer (gulp-autoprefixer)
//缩小化(minify)CSS (gulp-minify-css)
//JSHint (gulp-jshint)
//拼接 (gulp-concat)
//丑化(Uglify) (gulp-uglify)
//图片压缩 (gulp-imagemin)
//即时重整(LiveReload) (gulp-livereload)
//清理档案 (gulp-clean)
//图片快取，只有更改过得图片会进行压缩 (gulp-cache)
//更动通知 (gulp-notify)

// JS hint task

// 资源map和压缩并不需要在一个地方
gulp.task('styles', function() {
    gulp.src(['./src/styles/*.scss'])
        .pipe(concat('all.css'))
        //.pipe(minifycss())
        .pipe(autoprefix())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass({sourceComments: 'map'}))
        .pipe(sourcemaps.write('.',{sourceMappingURLPrefix: './build/styles'}))
        .pipe(gulp.dest('./build/styles'));
});

// scripts任务会合并js/目录下得所有得js文件并输出到dist/目录，然后gulp会重命名、压缩合并的文件，也输出到dist/目录。
gulp.task('scripts', function() {
    gulp.src('./src/javascripts/*.js')
        .pipe(concat('all-a.js'))
        .pipe(rename('all.js'))
        .pipe(uglify())
        .pipe(strip ())
        //.pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('default',function(){
    gulp.src(['./build/'])
        .pipe(clean());
    gulp.run('styles', 'scripts');

    // 监听文件变化
    //gulp.watch('./js/*.js', function(){
    //    gulp.run('styles', 'scripts');
    //});
});