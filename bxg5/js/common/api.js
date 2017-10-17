/**
 *
 * Author:Wilbert
 *   Date:2017/7/3
 */
define(["jquery"],function ($) {
    return {
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

                //这里的res一定要传(如果不传用户获取不到返回值)，至于用户调用的时候用不用就看用户的需求了
                callback && callback(res);
            });
        },
        get:function(url,data,callback){
            this.ajax("get",url,data,callback);
        },
        post:function(url,data,callback){
            this.ajax("post",url,data,callback);
        }


    }
});