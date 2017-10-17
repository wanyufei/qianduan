/**
 * 编辑分类
 * Author:Wilbert
 *   Date:2017/7/3
 */
define(["jquery","text!tpls/categoryEdit.html","arttemplate","common/api","bootstrap"],function ($,categoryEditTpl,art,api) {
    return function (cg_id) {

        //alert("编辑分类模块的加载")

        api.get("category/edit",{cg_id:cg_id},function(res){
            console.log(res);


            $("#modalEditCategory").remove();

            res.result.top.unshift({
                "cg_id": 0,
                "cg_name": "顶级分类"
            });

            var categoryEdit=art.render(categoryEditTpl,res.result)//-->{{cg_name}};
                                                        //res-->{{result.cg_name}}

            var $categoryEdit=$(categoryEdit).on("submit","form",function(){
                var formData=$(this).serialize();

                api.post("category/modify",formData,function(){
                    //说明已经成功的修改了数据
                    $categoryEdit.modal("hide");

                    //刷新课程分类页面
                    $(".aside .list-group button.btn-course-category").trigger("click");
                })


                return false;
            }).appendTo("body").modal();
        })


    };
});