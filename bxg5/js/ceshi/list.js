/**
 * 这是注释的内容
 * Author:Wilbert
 *   Date:2017/7/3
 */
define(["jquery","text!tpls/ceshiList.html","arttemplate","common/api2"],function($,ceshiListTpl,art,api2){


    return function(){

        api2.get("teacher",{},function(res){
            console.log(res);
        });

        var ceshiList=art.render(ceshiListTpl,{ ceshi:"测试" });

        var $ceshiList=$(ceshiList);

        $ceshiList.on("click",".btn-add-teacher",function(){
            alert("点击添加测试");
        });

        $(".menu-content-container").html($ceshiList);
    }
})