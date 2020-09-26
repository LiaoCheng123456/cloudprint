var host = "http://print-api.wzswznkj.com";
$(function () {
    var token = getCookie("token");
    var count = null;
    getDeviceList(null, 1, 10);
    function getDeviceList(val, curr, limit) {
        var url = host + "/device/devicelist";
        if (val != null) {
            url = host + "/device/devicelist?keyword=" + val;
        }
        if (curr != null && limit != null) {
            if (val == null) {
                url += "?page=" + curr + "&limit=" + limit
            } else {
                url += "&page=" + curr + "&limit=" + limit
            }
        }
        $.ajax({
            async: false,
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
                count = result['count'];
                if (code == 200) {
                    var html = '';
                    $.each(data, function (k, v) {
                        var sort = k;
                        sort += 1;
                        var deviceNumber = data[k]['deviceNumber'] == undefined ? "" : data[k]['deviceNumber'];
                        var addTime = data[k]['addTime'] == undefined ? "" : getLocalTime(data[k]['addTime']);
                        var username = data[k]['username'] == undefined ? "" : data[k]['username'];
                        var lastLogin = data[k]['lastLogin'] == undefined ? "" : getLocalTime(data[k]['lastLogin']);
                        var status = data[k]['status'] == 1 ? '在线' : '离线';

                        var buttonvalue = "";
                        console.log(data[k]["id"])
                        if (username != "") {
                            buttonvalue = '<button type="button" data-username = "'+username+'" data-id = "' + data[k]["id"] + '" class="btn btn-danger" id="unbanding">解除绑定</button></td>';
                        }

                        html += '<tr><td>' + sort + '</td><td>' +
                            deviceNumber + '</td><td>' +
                            addTime + '</td><td>' +
                            username + '</td><td>' +
                            lastLogin + '</td><td>' +
                            status + '</td><td>'+buttonvalue+'</tr>'
                            
                    })
                    $(".deviceContent").html(html);
                    console.log(html)
                } else if (code == 401) {
                    console.log("身份信息失效");
                    parent.location.href = "login.html";
                } else {

                }
            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                // alert(result)
            }
        });
    }
    // $.when(myajax).done(function () {
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            $(".count").text(count)
            laypage.render({
                elem: 'yema'
                , count: count //数据总数，从服务端得到
                , jump: function (obj, first) {
                    //obj包含了当前分页的所有参数，比如：
                    console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    console.log(obj.limit); //得到每页显示的条数

                    //首次不执行
                    if (!first) {
                        //do something
                        getDeviceList($("#keyword").val(), obj.curr, obj.limit);
                    }

                }
            });
        });


    // });

    function keywordshow() {
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            laypage.render({
                elem: 'yema'
                , count: count //数据总数，从服务端得到
                , jump: function (obj, first) {
                    //obj包含了当前分页的所有参数，比如：
                    console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                    console.log(obj.limit); //得到每页显示的条数

                    //首次不执行
                    if (!first) {
                        //do something
                        getDeviceList($("#keyword").val(), obj.curr, obj.limit);
                    }

                }
            });
        });
    }


    $("#search").click(function () {
        var val = $("#keyword").val();
        getDeviceList(val, 1, 10);
        keywordshow();
    })

    /**
     * 删除
     */
    $(document).on('click', '#unbanding', function () {
        var deviceId = $(this).attr("data-id");
        var username = $(this).attr("data-username");
        //eg1       
        layer.confirm('确定是否解除绑定', {
            btn: ['确定', '取消']
        }, function (index, layero) {
            unbanding(deviceId, username)
            layer.close(index)
        }, function (index) {
            //按钮【按钮二】的回调
            layer.close(index)
        });

    })
    
    function unbanding(deviceId, username) {
        var data = {
            id: deviceId,
            username: username
        }
        $.ajax({
            //请求方式
            type: "PUT",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url: host + "/device/adminunbanding",
            //数据，json字符串
            data: JSON.stringify(data),
            headers: {
                token: token
            },
            //请求成功
            success: function (result) {
                var code = result['code'];
                if (code == 200) {
                    getDeviceList(null, 1, 10);
                } else if (code == 401) {
                    console.log("身份信息失效");
                    parent.location.href = "login.html";
                } else {

                }
            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                // alert(result)
            }
        });
    }
})