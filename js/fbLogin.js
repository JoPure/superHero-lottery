/**
 * Created by jo.chan on 2015/11/27.
 */

if (!navigator.cookieEnabled) {
    alert("Your browser does not support cookie, please change your browser settings after use!");
}


/*Random Number*/
function getRndStr() {
    var sRnd;
    sRnd = "-" + Math.random();
    sRnd = sRnd.replace("-0.", "");
    return sRnd;
};


/*getParameterByName*/
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

/*CheckIsLogin*/
function CheckIsLogin() {
    var fbname = $.cookie("fbname");
    if (fbname != "" && typeof (fbname) != "undefined" && fbname != "null") {
        return true;
    }
    return false;
};

/*Re-login*/
var reLogin = function () {
    localStorage.fbname = null;
    window.location.href = pg_config.fb_redirect_uri;
};


function CheckFBCallback() {
    if (isLogin()) {
        showUserMessage();
        return;
    }
    var FB_CODE = $.trim(getParameterByName("code"));
    if (FB_CODE == "") {
        return;
    }
    var requestURL = pg_config.fb_login_url
        + "?code=" + FB_CODE
        + "&client_id=" + pg_config.fb_app_id
        + "&redirect_uri=" + pg_config.fb_redirect_uri
        + "&version=v3";
    $.ajax({
        type: "GET",
        async: true,
        url: requestURL,
        dataType: 'jsonp',
        jsonp: "jsonCallback",
        jsonpCallback: "jsonCallback",
        success: function (result) {
            handleLogin(result);
        },
        error: function () {
            alert(pg_config.status[result.code]);
        }
    });
};
$(function () {
    $('#FB_btn').click(function () {
        var LoginURL = "https://www.facebook.com/v2.2/dialog/oauth?client_id=" + pg_config.fb_app_id
            + "&redirect_uri=" + encodeURIComponent(pg_config.fb_redirect_uri) + "&state=" + getRndStr()
            + "&scope=public_profile,email,read_stream";
        window.location.href = LoginURL;
    });
    CheckFBCallback();
});


