
$(function () {
    var token = getCookie("token");
    let fileList = [];
    let uploadInstance = null;
    let formInstance = null;
    let params = null;
    layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例
        upload.render({
            elem: '#uploadBannerImg',//绑定元素
            headers: {
                token
            },
            auto: false,
            accept: 'images',
            url: ' http://print-api.wzswznkj.com/version/upload',
            choose: function (obj) {
                if (fileList.length === 1) {
                    return
                }
                //将每次选择的文件追加到文件队列
                // var files = obj.pushFile();
                //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
                obj.preview(function (index, file, result) {
                    fileList = [file];
                    uploadInstance = obj;
                    var img = $('<img>', {
                        src: result,
                        alt: 'hello img!',
                        title: 'just for test',
                        click: function () {
                            alert("hello,img!!!");
                        }
                    }).css({
                        width: '120px',
                        height: '120px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginRight: '10px',
                    });
                    $('.uploadBtnBox').before(img)
                });
            },
            done: function (res) {
                const { data: fileId } = res;
                const { title, content } = params
                const newParams = {
                    fileId,
                    title,
                    content
                }

                $.ajax({
                    method: 'post',
                    headers: {
                        token
                    },
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify(newParams),
                    url: 'http://print-api.wzswznkj.com/banner/add',
                    success: function () {
                        $('.resetBtn').click()
                    }
                })
                console.log(newParams, '===>')
                //上传完毕回调
            }
            , error: function () {
                //请求异常回调
            }
        });
    });

    $('.resetBtn').click(function (e) {
        formInstance.val("addBanner", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
            "title": "",
            "content": ""
        });
        e.preventDefault();
        $('.photoList img').remove()
        fileList = [];
        $('#bannerContent').html('')
    })

    $('.previewBtn').click(function (event) {
        event.preventDefault()
        var formData = formInstance.val("addBanner");
        if (formData.content) {
            $('#bannerContent').html(formData.content)
        }

    })

    layui.use('form', function () {
        var form = layui.form;
        formInstance = form;
        form.on('submit(*)', function (data) {
            if (!uploadInstance) {
                alert('hahah')
                return
            }
            if (fileList.length === 0) {
                return
            }
            uploadInstance.upload(0, fileList[0]);
            params = data.field
            return false;
        });

    });




    // var E = window.wangEditor
    // var editor = new E('#wangEditor');
    // //定义上传图片名
    // editor.customConfig.uploadFileName = 'file'
    // // 配置服务器端地址上传图片地址
    // /** 返回格式
    // 	{
    // 		// errno 即错误代码，0 表示没有错误。
    // 		//       如果有错误，errno != 0，可通过下文中的监听函数 fail 拿到该错误码进行自定义处理
    // 		"errno": 0,
    // 		// data 是一个数组，返回若干图片的线上地址
    // 		"data": [
    // 			"图片1地址",
    // 			"图片2地址",
    // 			"……"
    // 		]
    // 	}
    // **/
    // editor.customConfig.uploadImgShowBase64 = true
    // editor.customConfig.uploadImgServer = "/upload",
    //     editor.customConfig.menus = [
    //         'head',
    //         'bold',
    //         'italic',
    //         'underline'
    //     ]
    // editor.create();

    // $("#viewButton").click(function () {
    //     previewboxShow();
    // });

    // function previewboxShow() {
    //     //获取输入的文本代码
    //     // var sHTML = editor.txt.html();
    //     // var sHTML = editor.txt.text();
    //     var sHTML = $("#wangEditor").text();
    //     console.log(sHTML);
    //     //console.log(sHTML);
    //     $("#previewContent").html(sHTML);
    //     $("#previewbox").show();
    // }

    // $("#btn1").click(function () {
    //     // 获取文件的内容进行上传
    //     var obj = document.getElementById("file");
    //     var files = obj.files;
    //     var formData = new FormData();
    //     var content = $("#wangEditor").text();
    //     var title = $("#title").val()
    //     formData.append("file", files[0])

    //     if (files.length == 0) {
    //         layer.msg("请选择一张图片作为封面")
    //         return
    //     }
    //     if (title == '') {
    //         layer.msg("标题不能为空")
    //         return
    //     }
    //     if (content == '<p><br></p>' || content == undefined || content == null || content == '') {
    //         layer.msg("内容不能为空")
    //         return
    //     }
    //     var fileId = null;
    //     $.ajax({
    //         //请求方式
    //         type: "POST",
    //         //请求地址
    //         url: "http://print-api.wzswznkj.com/version/upload",
    //         //数据，json字符串
    //         data: formData,
    //         processData: false,
    //         contentType: false,
    //         headers: {
    //             token: token
    //         },
    //         //请求成功
    //         success: function (result) {
    //             var obj = eval('(' + result + ')');
    //             if (obj['code'] == 200) {
    //                 fileId = obj['data']
    //                 comfirm(fileId, title, content)
    //             } else if (obj['code'] == 401) {
    //                 parent.location.href = "login.html";
    //             } else {
    //                 console.log(obj)
    //             }
    //         },
    //         //请求失败，包含具体的错误信息
    //         error: function (e) {
    //             // alert(result)
    //         }
    //     });

    // })

    // // 保存内容
    // function comfirm(id, title, content) {
    //     var fileId = id
    //     var data = {
    //         title: title,
    //         fileId: fileId,
    //         content: content
    //     }
    //     $.ajax({
    //         //请求方式
    //         type: "POST",
    //         //请求的媒体类型
    //         contentType: "application/json;charset=UTF-8",
    //         //请求地址
    //         url: "http://print-api.wzswznkj.com/banner/add",
    //         //数据，json字符串
    //         data: JSON.stringify(data),
    //         headers: {
    //             token: token
    //         },
    //         //请求成功
    //         success: function (result) {
    //             if (result['code'] == 200) {
    //                 window.location.href = "appcontentmanager.html";
    //             } else {
    //                 console.log(result['msg'])
    //             }
    //         },
    //         //请求失败，包含具体的错误信息
    //         error: function (e) {
    //             // alert(result)
    //         }
    //     });
    // }
})

function previewboxClose() {
    $("#previewbox").hide();
    $("#previewContent").html("");
}
