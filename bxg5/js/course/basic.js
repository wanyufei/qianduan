/**
 * 编辑基本信息模块
 * Author:Wilbert
 *   Date:2017/7/4
 */
define(["jquery","text!tpls/courseBasinEdit.html","common/api","arttemplate"],function ($,courseBasinEditTpl,api,art) {
    return function (cs_id) {

        //alert("基本信息模块的加载"+cs_id);

        api.get("course/basic",{cs_id:cs_id},function(res){

            
            var courseBasinEdit=art.render(courseBasinEditTpl,res.result);

            var $courseBasinEdit=$(courseBasinEdit).on("change",".category-top",function(){
                //alert("切换了");

                //1/获取到一级分类的id
                var topId=$(this).val();

                //2/根据一级分类获取到指定的二级分类
                api.get("category/child",{cg_id:topId},function(res){
                    //二级分类的数据就位于res.result
                    //console.log(res.result);

                    //3/将二级分类的数据放在页面中二级分类的下拉框中

                    var str="";
                    res.result.forEach(function(v,i){
                        str+="<option value='"+v.cg_id+"'>"+v.cg_name+"</option>";
                    })

                    $courseBasinEdit.find(".category-child").html(str);

                })
            }).on("submit","form",function(){

                var formData=$(this).serialize();

                api.post("course/update/basic",formData,function(){

                    
                    //刷新课程管理模块
                    $(".aside .list-group button.btn-course").trigger("click");
                })

                return false;
            });

            $(".menu-content-container").html($courseBasinEdit);
        })


    };
});