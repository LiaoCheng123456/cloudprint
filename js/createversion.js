$(function () {
    var filedids = null;
    var token = getCookie("token");
    layui.use('form', function () {
        var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    });

    layui.use('upload', function () {
        var upload = layui.upload;


        //执行实例
        var uploadInst = upload.render({
            elem: '#test1' //绑定元素
            , url: 'http://print-admin.wzswznkj.com/api/version/upload' //上传接口
            , accept: 'file'
            , headers: {
                "token": token
            }
            , done: function (res) {
                filedids = res['data']
                layer.msg("文件已成功上传到服务器，请继续您的操作")
            }
            , error: function () {
                //请求异常回调
                console.log(res)
            }
        });
    });

    $("#sendData").click(function () {
        // 版本号
        var tv = $("#tv").val();
        // 类型
        var type = $("input[name='r']:checked").val();
        // 标题
        var title = $("#title").val()
        // 内容
        var content = $("#content").val()
        // 端
        var device = $("input[name='d']:checked").val();
        var data = {
            version: tv,
            type: type,
            title: title,
            content: content,
            targetType: device,
            fileId: filedids
        }
        if (tv == '' || type == '' || title == '' || content == '') {
            return
        }

        if (filedids == null) {
            layer.msg("请选择一个更新包文件在进行上传")
            return
        }

        var re = /^\d+(?=\.{0,1}\d+$|$)/
        if (tv != "") {
            if (!re.test(tv)) {
                layer.msg("版本号只能是小数或数字")
                tv = "";
                return
            }
        }
        $.ajax({
            //请求方式
            type: "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url: "http://print-admin.wzswznkj.com/api/version/add",
            //数据，json字符串
            data: JSON.stringify(data),
            headers: {
                token: token
            },
            //请求成功
            success: function (result) {
                if (result['code'] == 200) {
                    layer.msg(result['msg'])
                    window.location.href = "appversionmanager.html";
                } else {
                    layer.msg(result['msg'])
                }
            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                layer.msg(result['msg'])
            }

        });
    })
})