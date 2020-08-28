var host = "http://print-admin.wzswznkj.com/api";
$(function(){

    $(".daohang li").click(function() {

        $(this).siblings('li').removeClass('layui-this');  // 删除其他li元素的样式
        $(this).addClass('layui-this');
                                    // 添加当前元素的样式
                                    
        getversionlist($(this).val());
    });

    $("#createversion").click(function(){
        window.location.href = "createversion.html";

    })


    var token = getCookie("token");
    getversionlist();
    function getversionlist(val) {
        var url = host + "/version/list";
        if (val != null) {
            url = host + "/version/list?targetType=" + val;
        } else {
            url = host + "/version/list?targetType=1";
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
                console.log(data)
                if(code == 200) {
                    var html = '';
                    $.each(data, function(k, v) {
                        var sort = k;
                        sort+=1;
                        var addTime = data[k]['addTime'];
                        var content = data[k]['content'];
                        var targetType = data[k]['targetType'] == 1 ? "家长端":"设备端";
                        var title = data[k]['title'];
                        var type = data[k]['type'] == 1 ? "安卓" : "IOS";
                        var version = data[k]['version'];
                        html += '<tr><td>' + sort +'</td><td>' + title +'</td><td>' + content +'</td><td>' + type +'</td><td>' + targetType +'</td><td>' + version +'</td></tr>'
                    })
                    $(".versionContent").html(html);
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

    $("#jiazhang").click(function(){
        getversionlist(1);
        event.preventDefault();
    })

    $("#shebei").click(function(){
        getversionlist(2);
        event.preventDefault();
    })
    
})