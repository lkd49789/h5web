var urlpath = "https://h5.48.cn/2018apppage/playingCard/"
$(".card-btn").click(function() {
	window.web.scanCode();
})

function showresult(code_str) {

	window.web.gotoDetail(urlpath + "?code=" + code_str);
}

// $.ajax({
//     url:  interUrl+"api/currency/v1/countWeight",
//     type: "POST", 
//     async:true,
//     contentType: "application/json; charset=utf-8",
//    /* beforeSend: function (request) {
//         request.setRequestHeader("token", main.getAppUserInfo().apptoken);
//     },*/
//     data: JSON.stringify({
//         appToken:_apptoken,
//         wxToken:_wxtoken,
//         eventId:_eventId
//     }),
//     timeout: 15000, 
//     dataType:"json",
//     success: function (data) { 
//         succ(data)
//     }, 
//     error: function (jqXHR, textStatus, errorThrown) { 
//         // alert("eee");
//     } 
// });

var li_team = '<li>' +
	'						<div class="row">' +
	'							<div class="col-xs-1 num hl">{{rank}}</div>' +
	'							<div class="col-xs-2 Photo">' +
	'								<img src="{{avatar}}" />' +
	'							</div>' +
	'							<div class="col-xs-3 id hl">{{memberName}}<img class="team" src="{{teamName}}"/></div>' +
	'							<div class="col-xs-3 knife hl">' +
	'								<led>{{score}}</led>分</div>' +
	'						</div>' +
	'					</li>'

var listData;

main.getInfo(function(dt) {
	listData = dt.content
	if(dt.status == 200) {
		var html = "";
		$.each(dt.content, function(index, team) {

			var _li = li_team;
			_li = _li.replace("{{rank}}", team.rank);
			_li = _li.replace("{{avatar}}", team.avatar);
			_li = _li.replace("{{memberName}}", team.memberName);
			_li = _li.replace("{{teamName}}", team.teamName);
			_li = _li.replace("{{score}}", team.score);

			html += _li
		})
       		
		$(".list").html(html)
		
		if (dt.content.length==0) {
			$('.text3').show();
		} else{
			$('.text3').hide();
		}
	}
	
	
})

$('.rule-btn').click(function() {
	if($('.msk').css('display') == 'none') {
		$('.msk').fadeIn();
	} else {
		$('.msk').fadeOut();
	}
});

$('.btn-know').click(function(){
	$('.msk').fadeOut();
});
