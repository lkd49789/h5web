var code = GetQueryString("code")

var token = window.web.getAccessToken();
//token = "=="

//code = "I4tpk1I0skKJYZS0estO"
var mname = "";
var thumb = '<div class="card">' +
	'                    <img src="{{img}}" />' +
	'               </div>'
getResult()

$(".btn-know").click(function() {
	$(".msk").hide()
})

$(".btn-back img").click(function() {
	window.web.gotoPage('membercard/list');
})

function getResult() {
	$.ajax({
		url: "https://48game.48.cn/fans/api/poker/v1/scanGetPoker",
		type: "POST",
		async: true,
		contentType: "application/json; charset=utf-8",
		beforeSend: function(request) {
			request.setRequestHeader("token", token);
		},
		data: JSON.stringify({
			code: code
		}),
		timeout: 15000,
		dataType: "json",
		success: function(data) {
			if(data.status == 200) {
				$(".mname").html()
				var html = "";
				$.each(data.content, function(index, dt) {
					var card = thumb;
					card = card.replace("{{img}}", dt.poker)
					html += card
					mname += dt.memberName + "、"
				})
				mname = mname.substring(0, mname.length - 1)
				$(".show-card").html(html)
				$(".mname").html(mname)
				
				$(".msg").show();
			} else {
				//alert(data.message)
				$(".msk").fadeIn()
				$(".tip").html(data.message)
				$(".msg").hide();
			}
		},
		error: function(jqXHR, textStatus, errorThrown) {
			// alert("eee");
		}
	});
}

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

setTimeout(function() {
	console.log('2s到了')
}, 2000)