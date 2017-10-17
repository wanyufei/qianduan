/**
 * 添加分类
 * Author:Wilbert
 *   Date:2017/7/3
 */
define(["jquery","text!tpls/categoryAdd.html","arttemplate","common/api","bootstrap"],function ($,categoryAddTpl,art,api) {
    return function () {
        $("#modalAddCategory").remove();

        api.get("category/top",{},function(res){
            res.result.unshift({cg_id:0,cg_name:"顶级分类"});

            var categoryAdd=art.render(categoryAddTpl,res)

            var $categoryAdd=$(categoryAdd).on("submit","form",function(){
                var formData=$(this).serialize();
                //alert(formData);

                api.post("category/add",formData,function(){
                    // console.log(arguments[0]);

                    $categoryAdd.modal("hide");

                    //刷新课程分类页面
                    $(".aside .list-group button.btn-course-category").trigger("click");
                })

                return false;
            }).appendTo("body").modal();

        })


    };
});