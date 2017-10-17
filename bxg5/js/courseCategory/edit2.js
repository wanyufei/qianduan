/**
 * 编辑分类
 * Author:Wilbert
 *   Date:2017/7/3
 */
define(["jquery","text!tpls/categoryEdit.html","arttemplate","common/api","bootstrap"],function ($,categoryEditTpl,art,api) {
    return function (cg_id) {

        //alert("编辑分类模块的加载")

        //1、获取分类基本信息
        api.get("category/edit",{cg_id:cg_id},function(res){

            //2、获取顶级分类信息
            api.get("category/top",{},function(resTop){
                //顶级分类信息：resTop.result
                res.result.top=resTop.result;
                res.result.top.unshift({
                    "cg_id": 0,
                    "cg_name": "顶级分类"
                });


                $("#modalEditCategory").remove();



                var categoryEdit=art.render(categoryEditTpl,res.result)//-->{{cg_name}};
                //res-->{{result.cg_name}}

                $(categoryEdit).appendTo("body").modal();

            })



        })


    };
});