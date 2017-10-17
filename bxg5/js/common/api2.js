/**
 *
 * Author:Wilbert
 *   Date:2017/7/3
 */
define(["jquery"],function ($) {
     var obj={
        /**
         * api.ajax("get","teacher",{},function(res){})
         * @param type 必填：类型-->"post" or "get"
         * @param url 必填：地址
         * @param data 必填：数据
         * @param callback 可选：回调函数
         */
        ajax:function(type,url,data,callback){
            // $.ajax({
            //     type:type,
            //     url:url,
            //     data:data,
            //     success:callback
            // })

            $[type]("/api/"+url,data,function(res){
                if(res.code!=200) throw new Error(res.msg);

                callback && callback(res);
            });
        }
        // ,get:function(url,data,callback){
        //     this.ajax("get",url,data,callback);
        // },
        // post:function(url,data,callback){
        //     this.ajax("post",url,data,callback);
        // }


    };

    var arr=["get","post"];
    arr.forEach(function(v,i){
        //this-->window

        //api2.get()才最终调用了这个函数
        obj[v]=function(url,data,callback){
            //console.log(obj==this);

            this.ajax(v,url,data,callback);
            //-->相当于：obj.ajax(v,url,data,callback);
        }
    });



    return obj;
});