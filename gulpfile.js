// ����gulp��css,js�ļ��ı��룬�ϲ�
// images�ϲ���
// �����߰汾����Ҫѹ��HTML��CSS,JS��ͼƬ��ȥ��ע�ͣ����Ӱ汾�ſ��ƣ�

// include gulp
var gulp = require('gulp');

// include plug-ins
var clean = require('gulp-clean');             // ���Ŀ������ļ���
var autoprefix = require('gulp-autoprefixer'); // postcss֮��������cssǰ׺
var sass = require('gulp-sass');               // ����sassΪcss
var sourcemaps = require('gulp-sourcemaps');   // map�ļ�
var strip  = require('gulp-strip-comments');    // ȥ��ע��
var jshint = require('gulp-jshint');   // js������
var concat = require('gulp-concat');   // �ĵ��ϲ�
var uglify = require('gulp-uglify');   // ����ѹ��
var rename = require('gulp-rename');   // �ļ�����
var notify = require('gulp-notify'),
    minifycss = require('gulp-minify-css');

// Link�������js/Ŀ¼�µ�js�ļ���û�б���򾯸档

//����Sass (gulp-ruby-sass)
//Autoprefixer (gulp-autoprefixer)
//��С��(minify)CSS (gulp-minify-css)
//JSHint (gulp-jshint)
//ƴ�� (gulp-concat)
//��(Uglify) (gulp-uglify)
//ͼƬѹ�� (gulp-imagemin)
//��ʱ����(LiveReload) (gulp-livereload)
//������ (gulp-clean)
//ͼƬ��ȡ��ֻ�и��Ĺ���ͼƬ�����ѹ�� (gulp-cache)
//����֪ͨ (gulp-notify)

// JS hint task

// ��Դmap��ѹ��������Ҫ��һ���ط�
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

// scripts�����ϲ�js/Ŀ¼�µ����е�js�ļ��������dist/Ŀ¼��Ȼ��gulp����������ѹ���ϲ����ļ���Ҳ�����dist/Ŀ¼��
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

    // �����ļ��仯
    //gulp.watch('./js/*.js', function(){
    //    gulp.run('styles', 'scripts');
    //});
});