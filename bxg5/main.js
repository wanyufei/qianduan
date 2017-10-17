/**
 * 这是注释的内容
 * Author:Wilbert
 *   Date:2017/6/28
 */

require.config({
    baseUrl:"js",
    paths:{
        jquery:"lib/jquery-2.1.4",
        cookie:"lib/jquery.cookie",
        text:"lib/text",
        arttemplate:"lib/template-web",

        //配置tpls文件夹路径
        tpls:"../tpls",

        bootstrap:"../assets/bootstrap/js/bootstrap",
        datetime:"../assets/datetimepicker/js/bootstrap-datetimepicker",
        upload:"../assets/uploadify/jquery.uploadify",
        //配置ueditor的2个文件
        ueConf:"../assets/ueditor/ueditor.config",
        ueAll:"../assets/ueditor/ueditor.all",
        zeroClipboard:"../assets/ueditor/third-party/zeroclipboard/ZeroClipboard",
        echarts:"lib/echarts.min"
    },
    shim:{
        bootstrap:{
            deps:["jquery"]
        },
        datetime:{
            deps:["bootstrap"]
        },
        upload:{
            deps:["jquery"]
        }
    }
})

require(["jquery","teacher/list","courseCategory/list","ceshi/list","course/list","course/add",
    "courseTime/list","common/personal","text!tpls/loading.html","common/api","chart","cookie"],
    function($,teacherList,courseCategoryList,ceshiList,courseList,courseAdd,courseTimeList,
        personal,loadingTpl,api,chart){

    var $loading=$(loadingTpl);

    //对ajax请求进行全局的默认设置，一旦覆盖这里面的方法就无法执行
    $.ajaxSetup({

        beforeSend:function(){

            $loading.appendTo("body").modal();

        },

        // success:function(){
        //     console.log("成功");
        // },
        complete:function(jqXHR,code){
            //在这里如果有需要可以通过判断code的值的情况来判断请求成功与否
            //code的值：success'、 'notmodified'、 'error'、 'timeout'、 'abort'或'parsererror'

            // console.log("1");
            // console.log(code);
            $loading.on("hidden.bs.modal",function(){
                $loading.remove();

            }).modal("hide");
        }
    })

    // //1、验证用户登录
    // var userInfoStr=$.cookie("userInfo");

    // //如果获取不到cookie，说明没有登录过，跳转到登录页面
    // if(!userInfoStr){
    //     location.href="login.html";
    // }

    var userInfo=JSON.parse(userInfoStr);

    console.log(userInfo);

    //2、更新用户名和头像
    $(".profile-container .img-container img").attr("src",userInfo.tc_avatar);
    $(".profile-container h4").text(userInfo.tc_name);

    //3、实现菜单栏切换
    $(".aside .list-group").on("click","button",function(){

        //实现菜单背景的切换
        $(this).addClass("active").siblings().removeClass("active");

        //a、讲师管理
        if($(this).hasClass("btn-teacher")){

            teacherList();

        }else if($(this).hasClass("btn-course")){
            // //b、课程管理
            // 

        }else if($(this).hasClass("btn-course-category")){
            //b、课程分类
            courseCategoryList();

        }else if($(this).hasClass("btn-test")){

            //测试菜单
            ceshiList();
        }
    });

    //课程管理
    $(".btn-course").on("click",function(){

        //加载课程管理模块
        courseList();
    });

    $(".btn-add-course").on("click",function(){

        //创建课程
        courseAdd();
    });

    //课时管理
    $(".btn-course-time").on("click",function(){
        
        var cs_id=$(this).attr("cs_id");
        
        courseTimeList(cs_id);
    });

    //个人中心
    $(".link-personal").on("click",function(){
        personal();

    });

    //退出
    $(".link-logout").on("click",function(){

        //a、清除服务器的登录状态(最重要的一步)
        api.post("logout",{},function(){

            //b、清除cookie数据
            $.removeCookie("userInfo");

            //c、跳转到login.html
            location.href="login.html";
        })

    });
    
    //图表统计
    $(".btn-chart").on("click",function(){
        chart();
        
    })


    //4、自动触发讲师管理按钮的点击事件
    $(".aside .list-group button.btn-teacher").trigger("click");
})