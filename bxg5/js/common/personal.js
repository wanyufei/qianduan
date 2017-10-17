/**
 * 个人中心模块
 * Author:Wilbert
 *   Date:2017/7/4
 */
define(["jquery","text!tpls/personal.html","common/api","arttemplate","bootstrap","datetime","ueConf","ueAll"],
  function ($,personalTpl,api,art) {
    return function () {



       api.get("teacher/profile",{},function(res){

           //获取json数据
           $.getJSON("/js/city.json",function(provinceCityArea){

               var personal=art.render(personalTpl,res.result);

               var $personal=$(personal).on("submit","form",function(){
                   var formData=$(this).serialize();

                   api.post("teacher/modify",formData,function(){

                       //刷新页面
                       location.href="index.html";
                   })


                   return false;
               }).on("change",".select-province",function(){
                   //点击了省一级的下拉框--->触发加载该省对应的市级的数据

                   //1、获取点击的省
                   var province=$(this).val();

                   //2、获取该省对应的市级数据
                   var citys=provinceCityArea[province].data;

                   //3、把市级数据放到市级对应的下拉框
                   $personal.find(".select-city").empty();
                   for (var city in citys) {
                       $personal.find(".select-city").append("<option>"+city+"</option>")
                   }


                   $personal.find(".select-city").trigger("change");

               }).on("change",".select-city",function(){
                   //点击市级-->触发县级
                   
                   var province=$(".select-province").val();
                   var city=$(this).val();

                   //获取到市对应的县级数据
                   var areas=provinceCityArea[province].data[city].data;

                   var areaStr="";

                   for (var area in areas) {
                       areaStr+="<option>"+area+"</option>";
                   }
                   //将县级数据放到县级下拉框中
                   $personal.find(".select-area").html(areaStr);




               }).appendTo("body").modal();


               //初始化富文本编辑器
               var ue = UE.getEditor('introduce');

               ue.ready(function(){

                   ue.setContent(res.result.tc_introduce);
               })




               //初始化出生日期日期控件
               $personal.find(".date-birthday").datetimepicker({
                   format: 'yyyy-mm-dd',           //格式化日期格式
                   language:"zh-CN",               //选择语言，需要引入语言包
                   daysOfWeekDisabled:[1,2],        //指定周几不能用
                   autoclose:true,      //选完一个日期之后就会自动隐藏日期框
                   minView:"month",
                   todayBtn:true,
                   todayHighlight:true     //当选择其他日期的时候，高亮今天的日期
               });

               for (var province in provinceCityArea) {
                   $personal.find(".select-province").append("<option>"+province+"</option>")
               }

               //省级数据已加载完毕就去触发一下-->直接加载该省对应的市级数据
               $personal.find(".select-province").trigger("change");


               //a、绑定省级数据
               //b、触发省change事件
               //c、在省绑定市级-->触发市change事件
               //d、在市绑定县级

           })


       })


    };
});