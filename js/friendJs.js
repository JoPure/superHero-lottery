//充值不可领状态
function AwardEnd(index) {
    $(".friends_btn_0" + index).html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/friends/not_met.png' />");
    $(".friends_btn_0" + index).on("click"); //已领取，恢复点击事件
}

//充值可领状态
function AwardStart(index) {
    $(".friends_btn_0" + index).html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/friends/award.png' />");
    $(".friends_btn_0" + index).on("click"); //已领取，恢复点击事件
}


//充值已领状态
function Awarded(index) {
    $(".friends_btn_0" + index).html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/friends/award_end.png' />");
    $(".friends_btn_0" + index).on("click"); //已领取，恢复点击事件
}

//加载老玩家有无领奖权限
function loadGift() {
    var url = pg_config.api_url + "act/platform/direct/count?token="
        + localStorage.token
        + "&appKey=" + appKey
        + "&actId=" + userBackActId;
    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        jsonp: "jsonCallback",
        //jsonpCallback: "jsonCallback",
        url: url,
        success: function (result) {
            if (result.code == 200) {
                var list = result.data;
                for (var i = 0; i < list.length; i++) {
                    var condition = list[i];
                    if (condition.status == 1) {
                        AwardStart(condition.index);
                    }
                    else if (condition.status == 2) {
                        Awarded(condition.index);
                    }
                    else {
                        AwardEnd(condition.index);
                    }
                }
            }
            else {
                alert(pg_config.status[result.code]);
            }
        }
        ,
        error: function (err) {
            alert(JSON.stringify(err));
        }
    })
};

//老玩家领取
function getGift(actId, index) {
    var url = pg_config.api_url + "act/platform/direct/get?token="
        + localStorage.token
        + "&actId=" + userBackActId
        + "&conditionIndex=" + index;
    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        jsonp: "jsonCallback",
        //jsonpCallback: "jsonCallback",
        url: url,
        success: function (result) {
            if (result.code == 200) {
                showFriendsCode(result.data.code);
                if (result.data.remain == 0) {
                    Awarded(index);
                }
            }
            else {
                alert(pg_config.status[result.code]);
            }
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    })
}

//页面加载
$(function () {
    if (isLogin()) {
        loadGift();
        loadShareGift();
    }
    else {
        showLogin();
    }
});


//弹出老玩家领奖激活码
function showFriendsCode(code) {
    $(".resultBox").empty();
    var dom = null;
    var dom = code;
    $(".resultBox").append(dom);
    $(".blackBg").show();
    $(".codeBox").show();
}


//第一个领奖按钮点击领取
$(".friends_btn_01").on("click", function () {
    getGift(userBackActId, 1)
});


//FB分享
window.fbAsyncInit = function () {
    FB.init({
        appId: '311294709063394',
        xfbml: true,
        version: 'v2.6'
    });
};
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


//按钮分享
$(".friends_btn_03").on("click", function () {
    if (isLogin()) {
        FB.ui({
            method: 'feed',
            link: '', // 分享活动的链接地址
            picture: 'http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/friends/sharePicture.png', // 示例图显示的图片 绝对路径 最少200*200
            name: 'Cùng chinh ph?t th? gi?i Zombie!', // 分享显示Title
            description: 'B?n còn nh? nh?ng ngày ??i chi?n liên server trong Siêu Anh Hùng ch?? Quay v? ngay ?? nh?n Siêu Th?n, Xu, th? cào!',
            caption: 'Th? cào nhi?u m?nh giá,Siêu Th?n, Xu...mau ??n l?y!'
        }, function friendShare(response) {
            console.log('response:', response);
            if (response.post_id == null || response.post_id == "") {
                return;
            }
            else {
                var url = pg_config.api_url + "act/platform/share?actId="
                    + userBackShareActId
                    + "&token=" + localStorage.token;
                $.ajax({
                    type: "GET",
                    dataType: 'jsonp',
                    jsonp: "jsonCallback",
                    url: url,
                    success: function (result) {
                        if (result.code == 200) {
                            loadShareGift();
                        }
                        else if (result.code == 108) {
                            alert('Acc ?? chia s? thành c?ng, kh?ng th? nh?n thêm ph?n th??ng chia s?');
                        }
                        else {
                            alert(pg_config.status[result.code]);
                        }
                    },
                    error: function (err) {
                        alert(pg_config.status[result.code]);
                    }
                })
            }
        });
    }
});

//加载老玩家有无领奖权限
function loadShareGift() {
    var url = pg_config.api_url + "act/platform/direct/count?token="
        + localStorage.token
        + "&appKey=" + appKey
        + "&actId=" + userBackShareActId;
    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        jsonp: "jsonCallback",
        //jsonpCallback: "jsonCallback",
        url: url,
        success: function (result) {
            if (result.code == 200) {
                var list = result.data;
                for (var i = 0; i < list.length; i++) {
                    var condition = list[i];
                    if (condition.status == 1) {
                        $(".friends_btn_02").html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/friends/award.png' />");
                        $(".friends_btn_02").on("click"); //已领取，恢复点击事件
                    }
                    else if (condition.status == 2) {
                        $(".friends_btn_02").html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/friends/award_end.png' />");
                        $(".friends_btn_02").on("click"); //已领取，恢复点击事件
                    }
                    else {
                        $(".friends_btn_02").html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/friends/not_met.png' />");
                        $(".friends_btn_02").on("click"); //已领取，恢复点击事件
                    }
                }
            }
            else {
                alert(pg_config.status[result.code]);
            }
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    });
};

//分享后领奖点击事件
$(".friends_btn_02").on("click", function () {
    var url = pg_config.api_url + "act/platform/direct/get?token="
        + localStorage.token
        + "&actId=" + userBackShareActId
        + "&conditionIndex=1";
    ;
    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        jsonp: "jsonCallback",
        //jsonpCallback: "jsonCallback",
        url: url,
        success: function (result) {
            if (result.code == 200) {
                showFriendsCode(result.data.code);
                if (result.data.remain == 0) {
                    Awarded();
                }
            }
            else {
                alert(pg_config.status[result.code]);
            }
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    })
});