//定义id选择器
function Id(id) {
  return document.getElementById(id);
}
function changeToop() {
  var file = Id("file");
  if (file.value == '') {
    //设置默认图片
    Id("myimg").src = 'http://sandbox.runjs.cn/uploads/rs/72/huvtowwn/zanwu.png';
  } else {
    preImg("file", "myimg");
  }
}
//获取input[file]图片的url Important
function getFileUrl(fileId) {
  var url;
  var file = Id(fileId);
  var agent = navigator.userAgent;
  if (agent.indexOf("MSIE") >= 1) {
    url = file.value;
  } else if (agent.indexOf("Firefox") > 0) {
    url = window.URL.createObjectURL(file.files.item(0));
  } else if (agent.indexOf("Chrome") > 0) {
    url = window.URL.createObjectURL(file.files.item(0));
  }
  return url;
}
//读取图片后预览
function preImg(fileId, imgId) {
  var imgPre = Id(imgId);
  imgPre.src = getFileUrl(fileId);
}

function postData() {
  var formData = new FormData();
  formData.append("photo", $("#photo")[0].files[0]);
  formData.append("service", 'App.Passion.UploadFile');
  formData.append("token", token);
  $.ajax({
    url: 'http://www.baidu.com/', /*接口域名地址*/
    type: 'post',
    data: formData,
    contentType: false,
    processData: false,
    success: function (res) {
      console.log(res.data);
      if (res.data["code"] == "succ") {
        alert('成功');
      } else if (res.data["code"] == "err") {
        alert('失败');
      } else {
        console.log(res);
      }
    }
  })
}