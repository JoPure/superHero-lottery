/**
 * Created by jo.chan on 2015/12/7.
 */
/**
 * ÄÌÓÍÁìÈ¡Ò³Ãæ
 */
//ÄÌÓÍ²»¿ÉÁì½±×´Ì¬
function awardEnd(index) {
    $(".cake_btn_0" + index).html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/cake/not_met.png' />");
    $(".cake_btn_0" + index).off("click"); 
}

//ÄÌÓÍ¿ÉÒÔÁì½±×´Ì¬
function awardStart(index) {
    $(".cake_btn_0" + index).html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/cake/award.png' />");
    $(".cake_btn_0" + index).on("click");
}

//ÄÌÓÍÒÑÁì×´Ì¬
function awarded(index) {
    $(".cake_btn_0" + index).html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/cake/award_end.png' />");
    $(".cake_btn_0" + index).off("click"); 
}

//³äÖµ²»¿ÉÁì×´Ì¬
function diamondAwardEnd(index) {
    $(".cake_btn2_0" + index).html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/cake/not_met2.png' />");
    $(".cake_btn2_0" + index).off("click"); 
}

//³äÖµ¿ÉÁì×´Ì¬
function diamondAwardStart(index) {
    $(".cake_btn2_0" + index).html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/cake/award2.png' />");
    $(".cake_btn2_0" + index).on("click"); 
}

//³äÖµÒÑÁì×´Ì¬
function diamondAwarded(index, imgURl) {
    $(".cake_btn2_0" + index).html("<img src='http://static.sieuanhhung.pocketgamesol.com/tron1nam/img/cake/award2_end.png' />");
    $(".cake_btn2_0" + index).off("click"); 
}


function getAllCream() {
    var url = pg_config.api_url + "act/platform/stuff/cake?actId="
        + cakeActId
        + '&token=' + localStorage.token;
    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        jsonp: "jsonCallback",
        //jsonpCallback: "jsonCallback",
        url: url,
        success: function (result) {
            if (result.code == 200) {
                $(".cream_box").text(result.data.count);
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


//¼ÓÔØ×êÊ¯×Ü¶îÁ¿
function getAllDiamond() {
    var url = pg_config.api_url + "act/platform/stuff/charge?actId="
        + chargeActId
        + '&token=' + localStorage.token;
    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        jsonp: "jsonCallback",
        //jsonpCallback: "jsonCallback",
        url: url,
        success: function (result) {
            if (result.code == 200) {
                $(".diamond_box").text(result.data.count);
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


//¼ÓÔØÓÐÎÞÁì½±È¨ÏÞ
function loadCream() {
    var url = pg_config.api_url + "act/platform/direct/count?token="
        + localStorage.token
        + "&appKey=" + appKey
        + "&actId=" + cakeActId;
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
                        awardStart(condition.index);
                    }
                    else if (condition.status == 2) {
                        awarded(condition.index);
                    }
                    else {
                        awardEnd(condition.index);
                    }
                }
            }
            else if (result.code == 102) {
                alert(pg_config.status[result.code]);
            } else {
                alert(pg_config.status[result.code]);
            }
        }
        ,
        error: function (err) {
            alert(JSON.stringify(err));
        }
    })
}
;

//ÄÌÓÍÁìÈ¡
function getCream(actId, index) {
    var url = pg_config.api_url + "act/platform/direct/get?token="
        + localStorage.token
        + "&actId=" + cakeActId
        + "&conditionIndex=" + index;
    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        jsonp: "jsonCallback",
        url: url,
        success: function (result) {
            if (result.code == 200) {
                showCakeCode(result.data.code);
                if (result.data.remain == 0) {
                    awarded(index);
                }
            }
            else {
                diamondAwarded(index);
                alert(pg_config.status[result.code]);
            }
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    })
}


//¼ÓÔØ×êÊ¯
function loadDiamond() {
    var url = pg_config.api_url + "act/platform/direct/count?token="
        + localStorage.token
        + "&appKey=" + appKey
        + "&actId=" + chargeActId;
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        jsonp: "jsonCallback",
        async: false,
        url: url,
        success: function (result) {
            if (result.code == 200) {
                var list = result.data;
                for (var i = 0; i < list.length; i++) {
                    var condition = list[i];
                    if (condition.status == 1) {
                        diamondAwardStart(condition.index);
                    }
                    else if (condition.status == 2) {
                        diamondAwarded(condition.index);
                    }
                    else {
                        diamondAwardEnd(condition.index);
                    }
                }
            }
        },
        error: function (err) {
            alert(JSON.stringify(err));
        }
    })
}

//³äÖµÁìÈ¡
function getDiamond(actId, index) {
    var url = pg_config.api_url + "act/platform/direct/get?token="
        + localStorage.token
        + "&actId=" + chargeActId
        + "&conditionIndex=" + index;
    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        jsonp: "jsonCallback",
        //jsonpCallback: "jsonCallback",
        url: url,
        success: function (result) {
            if (result.code == 200) {
                showDiamondCode(result.data.code);
                if (result.data.remain == 0) {
                    diamondAwarded(index);
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

//Ò³Ãæ¼ÓÔØ
$(function () {
    if (isLogin()) {
        getAllCream();
        getAllDiamond();
        loadCream();
        loadDiamond();
    }
    else {
        showLogin();
    }
});


//µ¯³öµ°¸âÁì½±¼¤»îÂë
function showCakeCode(code) {
    $(".resultBox").empty();
    var dom = null;
    var dom = code;
    $(".resultBox").append(dom);
    $(".blackBg").show();
    $(".codeBox").show();
}


//µ¯³ö³äÖµÁì½±¼¤»îÂë
function showDiamondCode(code) {
    $(".resultBox").empty();
    var dom = null;
    var dom = code;
    $(".resultBox").append(dom);
    $(".blackBg").show();
    $(".codeBox").show();
}


//    //µ°¸âÁìÈ¡µã»÷ÊÂ¼þ
$(".cake_btn_01").bind("click", function () {
    getCream(cakeActId, 1);
});

$(".cake_btn_02").bind("click", function () {
    getCream(cakeActId, 2);
});
$(".cake_btn_03").bind("click", function () {
    getCream(cakeActId, 3);
});
$(".cake_btn_04").bind("click", function () {
    getCream(cakeActId, 4);
});
$(".cake_btn_05").bind("click", function () {
    getCream(cakeActId, 5);
});
$(".cake_btn_06").bind("click", function () {
    getCream(cakeActId, 6);
});
$(".cake_btn_07").bind("click", function () {
    getCream(cakeActId, 7);
});


//×êÊ¯ÁìÈ¡µã»÷ÊÂ¼þ
$(".cake_btn2_01").bind("click", function () {
    getDiamond(chargeActId, 1);
});
$(".cake_btn2_02").bind("click", function () {
    getDiamond(chargeActId, 2);
});
$(".cake_btn2_03").bind("click", function () {
    getDiamond(chargeActId, 3);
});
$(".cake_btn2_04").bind("click", function () {
    getDiamond(chargeActId, 4);
});
$(".cake_btn2_05").bind("click", function () {
    getDiamond(chargeActId, 5);
});
$(".cake_btn2_06").bind("click", function () {
    getDiamond(chargeActId, 6);
});
$(".cake_btn2_07").bind("click", function () {
    getDiamond(chargeActId, 7);
});
$(".cake_btn2_08").bind("click", function () {
    getDiamond(chargeActId, 8);
});

