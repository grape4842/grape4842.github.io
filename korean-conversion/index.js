var lis = [
    [" 저는", " 나는"],
    ["입니다.", "이다."],
    ["합니다.", "한다."],
    ["합니다.", "하다."],
    ["됩니다.", "된다."],
    ["없습니다.", "없다."],
    ["옵니다.", "온다."],
    ["했습니다.", "했다."],
    ["하십니다.", "하신다."],
    ["칩니다.", "치다."],
    ["렵습니다.", "렵다."],
    ["겠습니다.", "겠다."],
    ["봤습니다.", "봤다."],
    ["쳤습니다.", "쳤다."],
    ["쌌습니다.", "쌌다."],
    ["샀습니다.", "샀다."],
    ["셨습니다.", "셨다."],
    ["었습니다.", "었다."],
    ["웠습니다.", "웠다."],
    ["였습니다.", "였다."],
    ["았습니다.", "았다."],
    ["있습니다.", "있다."],
    ["먹습니다.", "먹다."],
    ["좋습니다.", "좋다."],
    ["싫습니다.", "싫다."],
    ["많습니다.", "많다."],
    ["필수입니다.", "필수다."],
    ["생깁니다.", "생긴다."],
    ["않습니다.", "않는다."],
    ["바랍니다.", "바란다."],
    ["놓습니다.", "놓다."],
    ["줍습니다.", "줍다."],
    ["춥습니다.", "춥다."],
    ["덥습니다.", "덥다."],
    ["쉽습니다.", "쉽다."]
];




function value_check() {
    var check_cnt = document.getElementsByName("lan").length;
    for (var i = 0; i < check_cnt; i++) {
        if (document.getElementsByName("lan")[0].checked == true) {
            low_high();
            break
        } else if (document.getElementsByName("lan")[1].checked == true) {
            high_low();
            break;
        }
    }
}
String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

//  입니다 이다 이다 입니다 한다 한다 합니다 합니다
function low_high() {
    for (var i = 0; i < lis.length; i++) {
        resultString = resultString.replaceAll(lis[i][1], lis[i][0]);
    }
}

function high_low() {
    for (var i = 0; i < lis.length; i++) {
        resultString = resultString.replaceAll(lis[i][0], lis[i][1]);
    }
}

function resize(obj) {
    obj.style.height = "1px";
    obj.style.height = 12 + obj.scrollHeight + "px";
}