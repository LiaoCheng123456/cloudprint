var host = "http://106.54.213.181:9080";
$(function () {
    var token = getCookie("token");
    getDeviceList();
    function getDeviceList(val) {
        var url = host + "/device/devicelist";
        if (val != null) {
            url = host + "/device/devicelist?keyword=" + val;
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
                        var sort = k;
                        sort += 1;
                        var deviceNumber = data[k]['deviceNumber'];
                        var addTime = data[k]['addTime'] == undefined ? "" : getLocalTime(data[k]['addTime']);
                        var username = data[k]['username'] == undefined ? 0 : data[k]['username'];
                        var lastLogin = data[k]['lastLogin'] == undefined ? "" : getLocalTime(data[k]['lastLogin']);
                        var status = data[k]['status'] == 1 ? '在线' : '离线';

                        html += '<tr><td>' + sort + '</td><td>' +
                            deviceNumber + '</td><td>' +
                            addTime + '</td><td>' +
                            username + '</td><td>' +
                            lastLogin + '</td><td>' +
                            status + '</td></tr>'
                    })
                    $(".deviceContent").html(html);
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


    $("#search").click(function () {
        var val = $("#keyword").val();
        getDeviceList(val);
    })
})