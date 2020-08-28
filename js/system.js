var host = "http://print-api.wzswznkj.com";
$(function () {
    var token = getCookie("token");
    getAdminList();
    function getAdminList(val) {
        var url = host + "/user/adminlist";
        if (val != null) {
            url = host + "/user/adminlist?keyword=" + val;
        }
        $.ajax({
            //请求方式
            type: "GET",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url: url,
            //数据，json字符串
            data: null,
            headers: {
                token: token
            },
            //请求成功
            success: function (result) {
                var code = result['code'];
                var data = result['data'];
                if (code == 200) {
                    var html = '';
                    console.log(data)
                    $.each(data, function (k, v) {
                        if (data[k]['username'] == 'admin') {
                            var sort = k;
                            sort += 1;
                            var username = data[k]['username'];
                            var jurisdiction = data[k]['jurisdiction'] == 1 ? "全部" : "";
                            var status = data[k]['status'] == 1 ? "点击禁用" : "点击激活";
                            html += '<tr><td>' + sort + '</td><td>' +
                                username + '</td><td>' +
                                jurisdiction + '</td><td><button type="button" data-status = "' + data[k]["status"] + '" data-id = "' + data[k]["id"] + '" class="layui-btn layui-btn-sm layui-btn-disabled" id="stopuser">' + status + '</button>' +
                                '</td><td><button type="button" data-id = "' + data[k]["id"] + '" class="layui-btn layui-btn-sm layui-btn-disabled" id="modifypassword">修改密码</button></td></tr>'
                        } else {
                            var sort = k;
                            sort += 1;
                            var username = data[k]['username'];
                            var jurisdiction = data[k]['jurisdiction'] == 1 ? "全部" : "";
                            var status = data[k]['status'] == 1 ? "点击禁用" : "点击激活";
                            html += '<tr><td>' + sort + '</td><td>' +
                                username + '</td><td>' +
                                jurisdiction + '</td><td><button type="button" data-status = "' + data[k]["status"] + '" data-id = "' + data[k]["id"] + '" class="btn " id="stopuser">' + status + '</button>' +
                                '</td><td><button type="button" data-id = "' + data[k]["id"] + '" class="btn btn-danger" id="modifypassword">修改密码</button></td></tr>'

                        }
                    })
                    $(".systemContent").html(html);
                    console.log(html)
                } else if (code == 401) {
                    console.log("身份信息失效");
                    window.location.href = "login.html";
                } else {

                }
            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                // alert(result)
            }
        });
    }

    /**
     * 修改密码
     */
    $(document).on('click', '#modifypassword', function () {
        if ($(this).attr('data-id') == 1) {
            return;
        }
        layer.open({
            type: 1,
            content: $('#xiugaimim'), //这里content是一个普通的String
            area: ['350px', '200px'],
            ooffset: ['100px', '40px']
        });
    })

    $("#onpush").click(function () {
        var userid = $("#modifypassword").attr("data-id");
        var password = $("#password").val();

        var data = {
            userId: userid,
            password: password
        }
        if (password != "" && password != undefined) {
            var url = host + "/user/modifyAdminPassword";
            $.ajax({
                //请求方式
                type: "POST",
                //请求的媒体类型
                contentType: "application/json;charset=UTF-8",
                //请求地址
                url: url,
                //数据，json字符串
                data: JSON.stringify(data),
                headers: {
                    token: token
                },
                //请求成功
                success: function (result) {
                    var code = result['code'];
                    var data = result['data'];
                    if (code == 200) {
                        window.location.href = "systemsettings.html";
                    } else if (code == 401) {
                        console.log("身份信息失效");
                        window.location.href = "login.html";
                    } else {

                    }
                },
                //请求失败，包含具体的错误信息
                error: function (e) {
                    // alert(result)
                }
            });
        } else {
            layer.msg("请输入密码")
        }
    });

    /**
     * 禁用账户
     */
    $(document).on('click', '#stopuser', function () {
        var userid = $(this).attr("data-id");
        var status = $(this).attr("data-status");
        if ($(this).attr('data-id') == 1) {
            return;
        }
        if (status == 1) {
            status = 2
        } else {
            status = 1
        }

        var data = {
            userId: userid,
            status: status
        }
        $.ajax({
            //请求方式
            type: "POST",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url: host + "/user/modifyAdminStatus",
            //数据，json字符串
            data: JSON.stringify(data),
            headers: {
                token: token
            },
            //请求成功
            success: function (result) {
                var code = result['code'];
                var data = result['data'];
                if (code == 200) {
                    getAdminList();
                } else if (code == 401) {
                    console.log("身份信息失效");
                    window.location.href = "login.html";
                } else {

                }
            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                // alert(result)
            }
        });
    })

})



