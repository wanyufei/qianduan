/**
 * 讲师主模块-->讲师列表
 * Author:Wilbert
 *   Date:2017/6/30
 */
define(["jquery", "text!tpls/teacherList.html", "arttemplate", "teacher/showInfo","teacher/add","teacher/edit"], function ($, teacherListTpl, art, teacherShowInfo,teacherAdd,teacherEdit) {
    //art接受了arttemplate模板引擎的返回值-->全局函数：template


    return function () {
        //3个参数：url/参数/success方法的回调函数
        $.get("/api/teacher", {}, function (res) {
            //优化前：
            // if(res.code==200){
            //     //数据正常返回-->数据加载到表格中
            // }else {
            //     //数据发生了异常
            //     throw new Error(res.msg);
            // }

            //优化后：
            if (res.code != 200) throw new Error(res.msg);

            //----->代码能够执行到这里，数据一定成功返回
            var teacherList = art.render(teacherListTpl, res);//teacherList:"<div></div>"

            //console.log(teacherList);

            var $teacherList = $(teacherList);//把html字符串转换为dom元素，并存放在一个jquery对象中

            //console.log($teacherList);

            $teacherList
                .on("click",".btn-add-teacher",function(){
                    //添加讲师：
                    teacherAdd();
                    
                })
                .on("click",".btn-status",function(){
                    var $btnStatus=$(this);

                    //1、修改服务器中的数据
                    var data={
                        tc_id:$(this).parent().attr("tc_id"),
                        tc_status:$(this).parent().attr("tc_status")
                    };

                    //a、
                    $.post("/api/teacher/handle",data,function(res){
                        //c

                        if(res.code!=200) throw new Error(res.msg);

                        //获取更改后的状态值
                        var tc_status=res.result.tc_status;

                        //2、修改页面中的文本
                        //2.1、状态列       //this-->window
                        $btnStatus.parent().siblings(".td-status").text(tc_status==0?"启用":"注销");
                        //2.2、修改按钮的文本
                        $btnStatus.text(tc_status==0?"注销":"启用");
                        //2.3、修改父元素中保存的tc_status属性的值
                        $btnStatus.parent().attr("tc_status",tc_status);

                    });
                    //b


                })
                .on("click", ".btn-show", function () {
                    var tc_id = $(this).parent().attr("tc_id");

                    //实现查看讲师信息
                    teacherShowInfo(tc_id);

                })
                .on("click",".btn-edit",function(){
                    //alert("编辑讲师");

                    //需要调用teacher/edit模块
                    
                    var tc_id=$(this).parent().attr("tc_id");
                    teacherEdit(tc_id);
                });

            //$("<div></div>").appendTo("body");    //-->将字符串转换为dom元素，把该dom元素放到body中


            //$(".menu-content-container").html(teacherList);//又会将字符串转换为另一个dom元素，将dom元素放到页面中

            $(".menu-content-container").empty().append($teacherList);
        })


    };
});