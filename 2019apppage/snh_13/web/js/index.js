// JavaScript Document
function cf(n){
	return n < 10 ? "0" + n : n;
}

//倒计时函数
function countDown(){
	var current = new Date();
	var end = new Date("2019/7/31 00:00:00");
	var subTime = (end.getTime() - current.getTime()) / 1000; //计算相差毫秒/1000，转化成秒
	var day = Math.floor(subTime / (24 * 60 * 60)); //计算天数
	var hour = Math.floor(subTime / (60 * 60) % 24); //计算小时
	var minute = Math.floor(subTime / 60 % 60); //计算分钟
	var secound = Math.floor(subTime % 60); //计算秒
	
	//console.log(day, hour, minute, secound);
	$(".cd .d").text(cf(day));
	$(".cd .h").text(cf(hour));
	$(".cd .m").text(cf(minute));
	$(".cd .s").text(cf(secound));
	
	//结束倒计时
	if(subTime <= 0){
		console.log("时间到啦");
		clearInterval(cd);
	}
}

countDown();
var cd = setInterval(countDown, 1000);



(function (d) {
	d['okValue'] = '确定';
	d['cancelValue'] = '取消';
	d['title'] = '消息';
	d['lock'] = true;
})($.dialog.defaults);
//确认邮件重发功能
function showid(idname) {
	var isIE = (document.all) ? true : false;
	var isIE6 = isIE && ([/MSIE (\d)\.0/i.exec(navigator.userAgent)][0][1] == 6);
	var newbox = document.getElementById(idname);
	newbox.style.zIndex = "9999";
	newbox.style.display = "block"
	newbox.style.position = !isIE6 ? "fixed" : "absolute";
	newbox.style.top = newbox.style.left = "50%";
	newbox.style.marginTop = - newbox.offsetHeight / 2 + "px";
	newbox.style.marginLeft = - newbox.offsetWidth / 2 + "px";
	var layer = document.createElement("div");
	layer.id = "layer";
	layer.style.width = layer.style.height = "100%";
	layer.style.position = !isIE6 ? "fixed" : "absolute";
	layer.style.top = layer.style.left = 0;
	layer.style.backgroundColor = "#000";
	layer.style.zIndex = "9998";
	layer.style.opacity = "0.6";
	document.body.appendChild(layer);
	var sel = document.getElementsByTagName("select");
	for (var i = 0; i < sel.length; i++) {
		sel[i].style.visibility = "hidden";
	}

	function layer_iestyle() {
		layer.style.width = Math.max(document.documentElement.scrollWidth, document.documentElement.clientWidth) + "px";
		layer.style.height = Math.max(document.documentElement.scrollHeight, document.documentElement.clientHeight) + "px";
	}

	function newbox_iestyle() {
		newbox.style.marginTop = document.documentElement.scrollTop - newbox.offsetHeight / 2 + "px";
		newbox.style.marginLeft = document.documentElement.scrollLeft - newbox.offsetWidth / 2 + "px";
	}
	if (isIE) { layer.style.filter = "alpha(opacity=60)"; }
	if (isIE6) {
		layer_iestyle()
		newbox_iestyle();
		window.attachEvent("onscroll", function () {
			newbox_iestyle();
		})
		window.attachEvent("onresize", layer_iestyle)
	}
	layer.onclick = function () {
		this.remove()
		newbox.style.display = "none"; layer.style.display = "none"; for (var i = 0; i < sel.length; i++) {
			sel[i].style.visibility = "visible";
		}
	}
}

$(function () {
	var isloading = false;
	$("#smallLay1 a").click(function () {
		var act = this.href.split("#")[1];
		$(this).attr("disabled", "disabled");
		var phone = $("#phone").val();
		var email = $("#email").val();
		// 检查输入合法性
		if (phone.length <= 0) {
			alert('请输入手机号码');
			return;
		}
		if (email.length <= 0) {
			alert('请输入邮箱地址');
			return;
		}
		if (!IsPhone(phone)) {
			alert('手机号码有误');
			return;
		}

		if (!IsEmail(email)) {
			alert('邮箱地址有误');
			return;
		}
		var $this = $(this);
		//if (DisableClick($this)) return;
		// 邮箱验证邮件重发处理
		if (isloading) {
			return false;
		} else {
			isloading = true;
		}
	
		EmailSend(phone, email, function (response) {
			isloading = false;
			// ActiveClick($this, '<img src="images/try_btn.png" alt="">');
			if (response.errcode == '0') {
				$('#layer').click()
				$('#phone').val('');
				$(' #email').val('');
				$.dialog('邮件已发送，报名确认邮件可能会被系统误认为垃圾邮件，请仔细查收。', function () {
							
				}, function () { });
				// var html_str = '<span style="font-size:14px; font-weight:bold; margin-right:10px;">邮件已发送</span>';
				// html_str += '<br>报名确认邮件可能会被系统误认为垃圾邮件，请仔细查收。';
				// $(".layui-m-layer #word_h").html(html_str);
			} else {
				alert(response.errmsg);

			}
		}, function (response) {
			// ActiveClick($this, '<img src="images/try_btn.png" alt="">');
			alert(response.errmsg);
			isloading = false;
		});
	});
});








































