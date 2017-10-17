/**
 *
 * Author:Wilbert
 *   Date:2017/7/4
 */
define(["jquery", "text!tpls/coursePic.html", "common/api", "arttemplate", "upload"], function ($, coursePicTpl, api, art) {
    return function (cs_id) {

        api.get("course/picture", {cs_id: cs_id}, function (res) {


            var coursePic = art.render(coursePicTpl, res.result);


            $(".menu-content-container").html(coursePic);

            //初始化上传插件
            $("#picUpload").uploadify({
                fileObjName: "cs_cover_original",    //提交到服务器的name值
                formData: {cs_id: cs_id},                 //需要提交到服务器的额外的数据
                height: 30,
                swf: '../../assets/uploadify/uploadify.swf', //必填、放一个swf文件
                uploader: '/api/uploader/cover',      //请求的地址
                width: 120,
                itemTemplate: "<span></span>",        //指定上传的内容模板

                //文件上传成功之后执行的函数
                onUploadSuccess: function (file, data, response) {
                    // alert('The file ' + file.name + ' was successfully uploaded with a response of ' + response + ':' + data);

                    //跳转到课程列表界面
                    $(".aside .list-group button.btn-course").trigger("click");
                }
            });

        })


    };
});