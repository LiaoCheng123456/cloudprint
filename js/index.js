$(function(){
    var token = getCookie('token');
    console.log(token)
    if (token == null || token == "") {
        window.location.href = "html/login.html";
    }

    // 用户
    $(".badge").html(getCookie('username'));

    $("#loginout").click(function() {
        clearCookie('token');
        event.preventDefault();
        window.location.href = "index.html";
    })
})