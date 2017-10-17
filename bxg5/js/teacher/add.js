/**
 * 添加讲师模块
 * Author:Wilbert
 *   Date:2017/7/1
 */
define(["jquery", "text!tpls/teacherAdd.html", "bootstrap","datetime"], function ($, teacherAddTpl) {
    return function () {
        $("#modalAddTeacher").remove();

        //思路：为了实现把同步的表单变成异步的，需要组织表单提交的默认行为，就应该通过给form进行事件绑定来实现
        //      -->form标签是这个模板的一部分，就可以把事件通过事件委托的方式绑定在这个模板中,最终要由form触发
        //          -->事件回调函数中，return false阻止事件的默认行为
        var $teacherAddModal=$(teacherAddTpl)
            .on("submit", "form", function () {
                //a、获取表单数据
                var formData=$(this).serialize();//这里的数据就是最终提交到服务器中的数据，必须有name属性的表单才能提交
                console.log(formData);

                //b、通过ajax请求的方式来进行表单提交
                $.post("/api/teacher/add",formData,function(res){


                    if(res.code!=200) throw new Error(res.msg);

                    //代码可以执行到这里表明添加成功(数据已经进入服务器)-->刷新页面
                    //location.reload();

                    //隐藏模态框：
                    $teacherAddModal.modal("hide");

                    //刷新讲师管理模块
                    $(".aside .list-group button.btn-teacher").trigger("click");
                })


                return false;
            })
            .appendTo("body").modal();

        //初始化日期控件
        $teacherAddModal.find(".date-join").datetimepicker({
            format: 'yyyy-mm-dd',           //格式化日期格式
            language:"zh-CN",               //选择语言，需要引入语言包
            daysOfWeekDisabled:[1,2],        //指定周几不能用
            autoclose:true,      //选完一个日期之后就会自动隐藏日期框
            minView:"month",
            todayBtn:true,
            todayHighlight:true     //当选择其他日期的时候，高亮今天的日期
        });

    };
});