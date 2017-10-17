/**
 *
 * Author:Wilbert
 *   Date:2017/7/3
 */
define(["jquery","text!tpls/courseList.html","common/api","courseTime/list","course/basic","course/pic","arttemplate"],function ($,courseListTpl,api,courseTimList,courseBasic,coursePic,art) {
    return function () {

        //获取课程列表数据
        api.get("course",{},function(res){


            var $courseList=$(art.render(courseListTpl,res));


            //编辑课时按钮
            $courseList.on("click",".btn-edit-time",function(){

                var cs_id=$(this).parent().attr("cs_id");

                //进入课时管理模块
                // $(".aside .list-group button.btn-course-time").attr("cs_id",cs_id).trigger("click");


                courseTimList(cs_id);

            }).on("click",".btn-edit-basic",function(){

                var cs_id=$(this).parent().attr("cs_id");
                
                //编辑基本信息
                courseBasic(cs_id);
            }).on("click","img",function(){
                
                var cs_id=$(this).parent().attr("cs_id");

                coursePic(cs_id);
            })

            $(".menu-content-container").html($courseList);
        })


    };
});