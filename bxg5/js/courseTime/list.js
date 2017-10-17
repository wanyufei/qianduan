/**
 *
 * Author:Wilbert
 *   Date:2017/7/3
 */
define(["jquery","text!tpls/courseTimeList.html","common/api","arttemplate","courseTime/edit"],function ($,courseTimeListTpl,api,art,courseTimeEdit) {
    //通过课程id加载课时管理模块
    return function (cs_id) {

        api.get("course/lesson",{cs_id:cs_id},function(res){

            var courseTimeList=art.render(courseTimeListTpl,res.result);

            var $courseTimeList=$(courseTimeList).on("click",".btn-edit",function(){
                //alert("编辑课时");
                
                var ct_id=$(this).parent().attr("ct_id");
                courseTimeEdit(ct_id);
            });

            $(".menu-content-container").html($courseTimeList);
        });


    };
});