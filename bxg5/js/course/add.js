/**
 *
 * Author:Wilbert
 *   Date:2017/7/3
 */
define(["jquery","text!tpls/courseAdd.html","common/api"],function ($,courseAddTpl,api) {
    return function () {
        $("#modalAddCourse").remove();

        var $courseAdd=$(courseAddTpl).on("submit","form",function(){

            var formData=$(this).serialize();

            api.post("course/create",formData,function(){
                $courseAdd.modal("hide");

                //刷新课程管理模块
                $(".aside .list-group button.btn-course").trigger("click");
            })

            return false;
        }).appendTo("body").modal();
    };
});