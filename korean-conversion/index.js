var lis = [
	[" 저는", " 나는"],
	["감습니다.", "감다."],
	["갑니다.", "간다."],
	["갑니다.", "갈다."],
	["갑습니다.", "갑다."],
	["같습니다.", "같다."],
	["갭니다.", "개다."],
	["갰습니다.", "갰다."],
	["겁니다.", "거다."],
	["겁니다.", "건다."],
	["겁니다.", "걸다."],
	["겁습니다.", "겁다."],
	["겠습니다.", "겠다."],
	["겹습니다.", "겹다."],
	["겼습니다.", "겼다."],
	["곱습니다.", "곱다."],
	["깁니다.", "기다."],
	["깁니다.", "긴다."],
	["깎습니다.", "깎다."],
	["꺾습니다.", "꺾다."],
	["낍니다.", "끼다."],
	["낍니다.", "낀다."],
	["납니다.", "나다."],
	["났습니다.", "났다."],
	["낳습니다.", "낳다."],
	["냅니다.", "내다."],
	["냈습니다.", "냈다."],
	["넣습니다.", "넣다."],
	["놉니다.", "놀다."],
	["놓습니다.", "놓다."],
	["닦습니다.", "닦다."],
	["담습니다.", "담다."],
	["답니다.", "달다."],
	["답습니다.", "답다."],
	["댑니다.", "댄다."],
	["덥습니다.", "덥다."],
	["덮습니다.", "덮다."],
	["되었습니다.", "됐다."],
	["됩니다.", "된다."],
	["듣습니다.", "듣다."],
	["듬습니다.", "듬다."],
	["땁니다.", "따다."],
	["때입니다.", "때다."],
	["뗍니다.", "떼다."],
	["뜁니다.", "뛰다."],
	["럽습니다.", "럽다."],
	["렀습니다.", "렀다."],
	["렵습니다.", "렵다."],
	["렸습니다.", "렸다."],
	["릅니다.", "르다."],
	["립니다.", "리다."],
	["립니다.", "린다."],
	["막습니다.", "막다."],
	["많습니다.", "많다."],
	["맞습니다.", "맞다."],
	["맡습니다.", "맡다."],
	["맵니다.", "매다."],
	["맵습니다.", "맵다."],
	["먹습니다.", "먹다."],
	["밉습니다.", "밉다."],
	["바랍니다.", "바란다."],
	["벱니다.", "베다."],
	["봅니다.", "보다."],
	["봤습니다.", "봤다."],
	["쁩니다.", "쁘다."],
	["샀습니다.", "샀다."],
	["샙니다.", "새다."],
	["섞습니다.", "섞다."],
	["셉니다.", "세다."],
	["셨습니다.", "셨다."],
	["쉽니다.", "쉬다."],
	["쉽습니다.", "쉽다."],
	["습니다.", "는다."],
	["싫습니다.", "싫다."],
	["심니다.", "심다."],
	["십니다.", "시다."],
	["십니다.", "신다."],
	["싶습니다.", "싶다."],
	["쌉니다.", "싸다."],
	["쌌습니다.", "쌌다."],
	["쐈습니다.", "쐈다."],
	["씁니다.", "쓰다."],
	["씻습니다.", "씻다."],
	["았습니다.", "았다."],
	["없습니다.", "없다."],
	["었습니다.", "었다."],
	["엽습니다.", "엽다."],
	["였습니다.", "였다."],
	["옳습니다.", "옳다."],
	["옵니다.", "온다."],
	["웁니다.", "우다."],
	["웁니다.", "운다."],
	["웁니다.", "울다."],
	["웃습니다.", "웃다."],
	["웠습니다.", "웠다."],
	["잃습니다.", "잃다."],
	["입니다.", "이다."],
	["입니다.", "인다."],
	["있습니다.", "있다."],
	["작습니다.", "작다."],
	["잡니다.", "자다."],
	["잡습니다.", "잡다."],
	["잽니다.", "재다."],
	["접습니다.", "접다."],
	["졌습니다.", "졌다."],
	["좋습니다.", "좋다."],
	["줍니다.", "주다."],
	["쥡니다.", "쥐다."],
	["쥡니다.", "쥔다."],
	["집니다.", "진다."],
	["찍습니다.", "찍다."],
	["참습니다.", "참다."],
	["찹니다.", "차다."],
	["쳤습니다.", "쳤다."],
	["춥습니다.", "춥다."],
	["칩니다.", "치다."],
	["캡니다.", "캐다."],
	["큽니다.", "크다."],
	["탑니다.", "타다."],
	["탔습니다.", "탔다."],
	["텁니다.", "턴다."],
	["튑니다.", "튀다."],
	["팝니다.", "판다."],
	["팹니다.", "패다."],
	["폅니다.", "펴다."],
	["폈습니다.", "폈다."],
	["픕니다.", "프다."],
	["필수입니다.", "필수다."],
	["합니다.", "하다."],
	["합니다.", "한다."],
	["했습니다.", "했다."],
	["휩니다.", "휜다."]
	];




function value_check(){
    var check_cnt = document.getElementsByName("lan").length;
    for (var i=0; i<check_cnt;i++){
        if (document.getElementsByName("lan")[0].checked == true) {
            low_high();
            break        
        }else if(document.getElementsByName("lan")[1].checked == true){
            high_low();
            break;
        }
    }   
}
String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}

//  입니다 이다 이다 입니다 한다 한다 합니다 합니다
function low_high(){
    for(var i=0; i<lis.length;i++){
        resultString = resultString.replaceAll(lis[i][1],lis[i][0]);
    }
}

function high_low(){
    for(var i=0; i<lis.length;i++){
        resultString = resultString.replaceAll(lis[i][0],lis[i][1]);
    }
}

function resize(obj) {
    obj.style.height = "1px";
    obj.style.height = 12 + obj.scrollHeight + "px";
}