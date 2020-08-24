var host = "http://106.54.213.181:9080";
$(function(){
    var token = getCookie("token");
    getUserList();
    function getUserList(val) {
        var url = host + "/user/list";
        if (val != null) {
            url = host + "/user/list?keyword=" + val;
        }
        $.ajax({
            //请求方式
            type : "GET",
            //请求的媒体类型
            contentType: "application/json;charset=UTF-8",
            //请求地址
            url : url,
            //数据，json字符串
            data : null,
            headers: {
                token: token
            },
            //请求成功
            success : function(result) {
                var code = result['code'];
                var data = result['data'];
                if(code == 200) {
                    var html = '';
                    console.log(data)
                    $.each(data, function(k, v) {
                        var sort = k;
                        sort+=1;
                        var username = data[k]['username'];
                        var registeredTime = data[k]['registeredTime'];
                        registeredTime = getLocalTime(registeredTime)
                        var deviceCount = data[k]['deviceCount'] == undefined ? 0 : data[k]['deviceCount'];
                        var deviceType = data[k]['deviceType'] == undefined ? "未知" : data[k]['deviceType'] == 1 ? "AndroId" : "IOS";
                        var lastLogin = data[k]['lastLogin'];
                        lastLogin = getLocalTime(lastLogin)
                        html += '<tr><td>'+ sort + '</td><td>' +
                        username + '</td><td>' + 
                        registeredTime + '</td><td>' +
                        deviceCount + '</td><td>' +
                        deviceType + '</td><td>' +
                        lastLogin + '</td></tr>'
                    })
                    $(".content").html(html);
                    console.log(html)
                } else if(code == 401){
                    console.log("身份信息失效");
                    window.location.href = "login.html";
                } else {
    
                }
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                // alert(result)
            }
            });
    }
    

    $("#search").click(function(){
        var val = $("#keyword").val();
        getUserList(val);
    })
})