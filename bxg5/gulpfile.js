/**
 * 这是注释的内容
 * Author:Wilbert
 *   Date:2017/7/6
 */


//找到gulp这个模块的依赖
var gulp=require("gulp");

//压缩js
var uglify=require("gulp-uglify");

//压缩css
var miniCSS=require("gulp-minify-css");


//执行一个任务的基本规范
gulp.task("readFile",function(){

    console.log("在执行读取文件的任务");

});


gulp.task("run",function(){

    console.log("前方发现了猎物");

});

//拷贝一个文件
gulp.task("copy",function(){
    //1、读取到源文件
    gulp.src("js/chart.js")
        .pipe(
            //2、将源文件输出到一个新的文件夹
            gulp.dest("js_min")
        )

});


//拷贝多个文件
gulp.task("copyCss",function(){
    gulp.src("css/*")
        .pipe(
            gulp.dest("css_min")
        )
});

//压缩js
gulp.task("miniJS",function(){
    gulp.src("js/chart.js")
        .pipe(
            uglify()
        )
        .pipe(
            gulp.dest("js_min")
        )

});

gulp.task("miniCSS",function(){
    gulp.src("css/*.css")
        .pipe(
            miniCSS()
        )
        .pipe(
            gulp.dest("css_min")
        )


});

//一个任务可以同时做多个事情
gulp.task("mini",function(){
    gulp.src("js/chart.js")
        .pipe(
            uglify()
        )
        .pipe(
            gulp.dest("js_min")
        );

    gulp.src("css/*.css")
        .pipe(
            miniCSS()
        )
        .pipe(
            gulp.dest("css_min")
        )
})

