//判断是否登录
function isLogin() {
    if (localStorage.userId && localStorage.token) {
        showUserMessage();
        return true;
    }
    else {
        showLogin();
        return false;
    }
}

//显示登录框
function showLogin() {
    $(".blackBg").show();
    $(".loginForm").show();
}

//关闭登录框
$(".close").on("click", function () {
    $(".blackBg").hide();
    $(this).parent().hide();
});


//展示用户信息
function showUserMessage() {
    $(".logOut").show();
    $(".hover_init").show();
    $(".userMessage").text(localStorage.userName);
};

//全局变量
var
    appKey = '4db93813-6f42-4a0b-898f-b38b2380b1f9',
    lotteryActId = 10004,
    cakeActId = 10000,
    chargeActId = 10001,
    userBackActId = 10002,
    userBackShareActId = 10003,
    awardName = {},
    awardImg = {},
    awardCode = {};

//点击登录
$(".login").on("click", function () {
    var dom = "";
    var username = $(".username").val();
    var password = md5($(".password").val());
    var url = pg_config.api_url
        + "user/login?userName=" + username
        + "&password=" + password
        + "&version=v3";
    if (username == "" || password == "") {
        //用户名或者密码不能为空
        alert("Tên người dùng hoặc mật mã không thể trống");
        return;
    }
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'jsonp',
        jsonp: "jsonCallback",
        jsonpCallback: "jsonCallback",
        success: function (json) {
            handleLogin(json);
        },
        error: function () {
            alert(pg_config.status[result.code]);
        }
    });
});

//登陆成功之后
function handleLogin(result) {
    if (result.code == 200) {
        localStorage.userName = result.data.user.userName;
        localStorage.userId = result.data.user.userId;
        localStorage.token = result.data.token;
        $(".blackBg").hide();
        $(".loginForm").hide();
        showUserMessage();
        location.reload();
    }
    else {
        alert(pg_config.status[result.code]);
    }
}

//点击注销
$("#logout").on("click", function () {
    showLogin();
    $(".logOut").hide();
    localStorage.clear();
});


/**
 * 抽奖转盘页面
 */
var timeOut = function () {
    $("#go_round_box").rotate({
        angle: 0,
        duration: 10000,
        animateTo: 2160,
        callback: function () {
            alert('Network timeout');
            rollingLimit = false;
        }
    })
};

var rotateFunc = function (awards, angle, text) {
    $("#go_round_box").stopRotate();
    $("#go_round_box").rotate({
        angle: 0,
        duration: 5000,
        animateTo: angle + 3600,
        callback: function () {
            $(".blackBg").show();
            showAward();
            rollingLimit = false;
        }
    })
};

//点击事件
$(".go").click(function () {
    if (isLogin() && canLottery() && !rollingLimit) {
        getLottery();
    }
});

//存抽奖次数
function canLottery() {
    if (localStorage.canLotteryCount > 0)
        return true;
    return false;
}

//加载抽奖次数
function loadCount() {
    var url = pg_config.api_url + "act/platform/draw/count?token="
        + localStorage.token
        + "&appKey=" + appKey
        + "&actId=" + lotteryActId;
    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        jsonp: "jsonCallback",
        //jsonpCallback: "jsonCallback",
        url: url,
        success: function (result) {
            if (result.code == 200) {
                localStorage.canLotteryCount = result.data.lotteryCount;
                $(".awardLottery").text(localStorage.canLotteryCount);
            } else if (result.code == 102) {
                localStorage.canLotteryCount = 0;
                $(".awardLottery").text(localStorage.canLotteryCount);
            } else {
                alert(pg_config.status[result.code]);
            }
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    })
};

var rollingLimit = false;

//进行抽奖
function getLottery() {
    rollingLimit = true;
    var url = pg_config.api_url + "act/platform/draw?token="
        + localStorage.token
        + "&actId=" + lotteryActId;
    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        jsonp: "jsonCallback",
        url: url,
        success: function (result) {
            if (result.code == 200) {
                awardImg = result.data.image;
                awardName = result.data.name;
                awardCode = result.data.code;
                rotateFunc(1, result.data.angle, awardCode);
                localStorage.canLotteryCount--;
                $(".awardLottery").text(localStorage.canLotteryCount);
            }
            else {
                alert(pg_config.status[result.code]);
                rollingLimit = false;
            }
        },
        error: function (err) {
            timeOut();
        }
    })
};


//显示中奖以及剩余抽奖次数
function showAward() {
    $(".codeBox").show();
    $(".award").empty();
    var dom = null;
    var dom = '<div class="awardImg">' + '<img src=' + awardImg + '>' + '</div>';
    $(".award").append(dom);
    showCode();
    showCanCount();
};

//中奖码
function showCode() {
    $(".resultBox").empty();
    var dom = null;
    var dom = awardCode;
    $(".resultBox").append(dom);
}

function showCanCount() {
    $(".canCount").empty();
    var showCount = '<p>' + 'Lần quay còn lại của bạn:' + '&emsp;' + localStorage.canLotteryCount + '</p>';
    //append doms
    $(".canCount").append(showCount);
}



