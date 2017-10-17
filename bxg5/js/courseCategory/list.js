/**
 * 课程分类列表
 * Author:Wilbert
 *   Date:2017/7/1
 */
define(["jquery","text!tpls/courseCategoryList.html","arttemplate","courseCategory/add","courseCategory/edit"],function ($,courseCategoryListTpl,art,courseCategoryAdd,courseCategoryEdit) {
    return function () {

        $.get("/api/category",{},function(res){
            if(res.code!=200) throw new Error(res.msg);

            //$(".menu-content-container").empty().append(courseCategoryListTpl);

            var courseCategoryList=art.render(courseCategoryListTpl,res);

            var $courseCategoryList=$(courseCategoryList);

            //添加分类
            $courseCategoryList.on("click",".btn-add-category",function(){
                courseCategoryAdd();
            }).on("click",".btn-edit",function(){
                var cg_id=$(this).parent().attr("cg_id");
                
                courseCategoryEdit(cg_id);
            });

            $(".menu-content-container").html($courseCategoryList);

        })



    };
});