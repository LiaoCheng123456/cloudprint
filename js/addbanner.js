
    var E = window.wangEditor
    var editor = new E('#wangEditor');
	//定义上传图片名
    editor.customConfig.uploadFileName = 'file'
    // 配置服务器端地址上传图片地址
	/** 返回格式
		{
			// errno 即错误代码，0 表示没有错误。
			//       如果有错误，errno != 0，可通过下文中的监听函数 fail 拿到该错误码进行自定义处理
			"errno": 0,
			// data 是一个数组，返回若干图片的线上地址
			"data": [
				"图片1地址",
				"图片2地址",
				"……"
			]
		}
    **/
    editor.customConfig.uploadImgShowBase64 = true
    editor.customConfig.uploadImgServer = "/upload",
    editor.customConfig.menus = [
        'head',
        'bold',
        'italic',
        'underline'
    ]
    editor.create();
 
	function previewboxClose(){
        $("#previewbox").hide();
        $("#previewContent").html("");
    }
 
	$("#viewButton").click(function(){
		previewboxShow();
	});
 
	function previewboxShow(){
        //获取输入的文本代码
		var sHTML = editor.txt.html();
		//console.log(sHTML);
        $("#previewContent").html(sHTML);
        $("#previewbox").show();
    }
    
    $("#btn1").click(function(){
        // 获取文件的内容进行上传
        var token = getCookie("token");
        var obj = document.getElementById("file");
        var files = obj.files;
        var formData = new FormData();
        formData.append("file", files[0])
        console.log(files[0]);
        var fileId = null;
        $.ajax({
            //请求方式
            type : "POST",
            //请求地址
            url : "http://106.54.213.181:9080/version/upload",
            //数据，json字符串
            data : formData,
            processData: false,
            contentType: false,
            headers: {
                token: token
            },
            //请求成功
            success : function(result) {
                var obj = eval('(' + result + ')');
                if(obj['code'] == 200) {
                    fileId = obj['data']
                    comfirm(fileId)
                } else if(obj['code'] == 401){
                    console.log("身份信息失效");
                    window.location.href = "login.html";
                } else {
                    console.log(obj)
                }
            },
            //请求失败，包含具体的错误信息
            error : function(e){
                // alert(result)
            }
            });
        
    })

    // 保存内容
	function comfirm(id) {
        alert(id)
    }