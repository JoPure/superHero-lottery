//��ֵ������״̬
function AwardEnd(index) {
    $(".friends_btn_0" + index).html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/friends/not_met.png' />");
    $(".friends_btn_0" + index).on("click"); //����ȡ���ָ�����¼�
}

//��ֵ����״̬
function AwardStart(index) {
    $(".friends_btn_0" + index).html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/friends/award.png' />");
    $(".friends_btn_0" + index).on("click"); //����ȡ���ָ�����¼�
}


//��ֵ����״̬
function Awarded(index) {
    $(".friends_btn_0" + index).html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/friends/award_end.png' />");
    $(".friends_btn_0" + index).on("click"); //����ȡ���ָ�����¼�
}

//��������������콱Ȩ��
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

//�������ȡ
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

//ҳ�����
$(function () {
    if (isLogin()) {
        loadGift();
        loadShareGift();
    }
    else {
        showLogin();
    }
});


//����������콱������
function showFriendsCode(code) {
    $(".resultBox").empty();
    var dom = null;
    var dom = code;
    $(".resultBox").append(dom);
    $(".blackBg").show();
    $(".codeBox").show();
}


//��һ���콱��ť�����ȡ
$(".friends_btn_01").on("click", function () {
    getGift(userBackActId, 1)
});


//FB����
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


//��ť����
$(".friends_btn_03").on("click", function () {
    if (isLogin()) {
        FB.ui({
            method: 'feed',
            link: '', // ���������ӵ�ַ
            picture: 'http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/friends/sharePicture.png', // ʾ��ͼ��ʾ��ͼƬ ����·�� ����200*200
            name: 'C��ng chinh ph?t th? gi?i Zombie!', // ������ʾTitle
            description: 'B?n c��n nh? nh?ng ng��y ??i chi?n li��n server trong Si��u Anh H��ng ch?? Quay v? ngay ?? nh?n Si��u Th?n, Xu, th? c��o!',
            caption: 'Th? c��o nhi?u m?nh gi��,Si��u Th?n, Xu...mau ??n l?y!'
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
                            alert('Acc ?? chia s? th��nh c?ng, kh?ng th? nh?n th��m ph?n th??ng chia s?');
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

//��������������콱Ȩ��
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
                        $(".friends_btn_02").on("click"); //����ȡ���ָ�����¼�
                    }
                    else if (condition.status == 2) {
                        $(".friends_btn_02").html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/friends/award_end.png' />");
                        $(".friends_btn_02").on("click"); //����ȡ���ָ�����¼�
                    }
                    else {
                        $(".friends_btn_02").html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/friends/not_met.png' />");
                        $(".friends_btn_02").on("click"); //����ȡ���ָ�����¼�
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

//������콱����¼�
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