/**
 * 编辑课时
 * Author:Wilbert
 *   Date:2017/7/4
 */
define(["jquery","text!tpls/courseTimeEdit.html","common/api","arttemplate"],function ($,courseTimeEditTpl,api,art) {
    return function (ct_id) {
        api.get("course/chapter/edit",{ct_id:ct_id},function(res){

            var courseTimeEdit=art.render(courseTimeEditTpl,res.result);


            var $courseTimeEdit=$(courseTimeEdit).on("submit","form",function(){

                var formData=$(this).serialize();

                api.post("course/chapter/modify",formData,function(){

                    //获取课程id
                    var cs_id=res.result.ct_cs_id;

                    //-->ps：同步的方式解决循环引用的问题
                    var courseTimeList=require("courseTime/list");

                    courseTimeList(cs_id);


                    //隐藏模态框
                    $courseTimeEdit.modal("hide");
                })

                return false;
            }).appendTo("body").modal();
        })

        
    };
});