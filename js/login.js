//点击button按钮处理
var host = "http://print-admin.wzswznkj.com/api";
$(function () {

    /**
     * 登录
     */
    $("#denglubutton").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        console.log(username, password)
        var list = {
            username: null,
            password: null
        }

        list.username = username;
        list.password = password;
        $.ajax({
            //请求方式
            type: "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url: host + "/user/adminlogin",
            //数据，json字符串
            data: JSON.stringify(list),
            //请求成功
            success: function (result) {
                if (result['code'] == 200) {
                    layer.msg(result['msg']);
                    setCookie("username", result['data']['username']);
                    setCookie("token", result['data']['token'])
                    layer.msg(result['msg']);
                    window.location.href = "../index.html";
                } else {
                    layer.msg(result['msg']);
                }
            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                layer.msg(result['网络开小差了...']);
            }
        });
    })
})
