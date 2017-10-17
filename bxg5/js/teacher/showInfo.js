/**
 * 查看讲师信息
 * Author:Wilbert
 *   Date:2017/6/30
 */
define(["jquery","text!tpls/teacherShowInfo.html","arttemplate","bootstrap"],function ($,teacherShowInfoTpl,art) {
    return function (tc_id) {

        //获取指定讲师的信息
        $.get("/api/teacher/view",{tc_id:tc_id},function(res){
            if(res.code!=200) throw new Error(res.msg);


            $("#modalTeacherInfo").remove();

            var teacherShowInfo=art.render(teacherShowInfoTpl,res.result);

            $(teacherShowInfo).appendTo("body").modal();
        });


    };
});