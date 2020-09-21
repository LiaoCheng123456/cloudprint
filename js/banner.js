var host = "http://print-api.wzswznkj.com";
$(function () {
    var token = getCookie("token");
    var count = null;
    getBannerList(null, 1, 10);
    function getBannerList(val, curr, limit) {
        var url = host + "/banner/adminlist";
        if (val != null) {
            url = host + "/banner/adminlist?keyword=" + val;
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
                        var title = data[k]['title'];
                        var publishTime = data[k]['publishTime'] == undefined ? "" : getLocalTime(data[k]['publishTime']);
                        var status = data[k]['status'] == 1 ? "发布中" : "未发布";
                        var option = data[k]['status'] == 1 ? "取消发布" : "发布";
                        html += '<tr><td>' + sort + '</td><td>' +
                            title + '</td><td>' +
                            publishTime + '</td><td>' +
                            status + '</td><td>' +
                            '<button type="button" data-status = "' + data[k]["status"] + '" data-id = "' + data[k]["id"] + '" class="btn " id="option">' + option + '</button>' +
                            '<button type="button" data-id = "' + data[k]["id"] + '" class="btn " id="delete" style="margin-left: 30px">删除</button>' +
                            '</td></tr>'
                    })
                    $(".bannerContent").html(html);
                } else if (code == 401) {
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

    /**
     * 发布/取消发布
     */
    $(document).on('click', '#option', function () {
        var bannerId = $(this).attr("data-id");
        var status = $(this).attr("data-status") == 1 ? 2 : 1;
        var data = {
            bannerId: bannerId,
            status: status
        }
        $.ajax({
            //请求方式
            type: "PUT",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url: host + "/banner/update",
            //数据，json字符串
            data: JSON.stringify(data),
            headers: {
                token: token
            },
            //请求成功
            success: function (result) {
                var code = result['code'];
                if (code == 200) {
                    getBannerList();
                } else if (code == 401) {
                    parent.location.href = "login.html";
                } else {

                }
            },
            //请求失败，包含具体的错误信息
            error: function (e) {
                // alert(result)
            }
        });
    })


    /**
     * 删除
     */
    $(document).on('click', '#delete', function () {
        var bannerId = $(this).attr("data-id");
        //eg1       
        layer.confirm('确定是否删除', {
            btn: ['确定', '取消']
        }, function (index, layero) {
            deleteBanner(bannerId)
            layer.close(index)
        }, function (index) {
            //按钮【按钮二】的回调
            layer.close(index)
        });

    })

    layui.use('laypage', function () {
        var laypage = layui.laypage;
        laypage.render({
            elem: 'yema'
            , count: count //数据总数，从服务端得到
            , jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：

                //首次不执行
                if (!first) {
                    //do something
                    getBannerList($("#keyword").val(), obj.curr, obj.limit);
                }

            }
        });
    });

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
                        getBannerList($("#keyword").val(), obj.curr, obj.limit);
                    }

                }
            });
        });
    }

    $("#search").click(function () {
        var val = $("#keyword").val();
        getBannerList(val, 1, 10);
        keywordshow();
    })

    function deleteBanner(bannerId) {
        var data = {
            id: bannerId
        }
        $.ajax({
            //请求方式
            type: "DELETE",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url: host + "/banner/delete",
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
                    getBannerList();
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