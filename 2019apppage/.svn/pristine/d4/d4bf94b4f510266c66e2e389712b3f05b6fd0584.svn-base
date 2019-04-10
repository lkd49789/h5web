/*
1.引入
<link rel="stylesheet" type="text/css" href="css/common.css"/>
<script type="text/javascript" src="js/messageAlert.js"></script>
2.使用
messageAlert.alert("显示的文字","按钮名称",function(){
	alert("回调函数！")
})

*/
(function(data) {

var msk = '<div class="msk"></div>'

var wrapperDom=
'<div class="message-alert">'+
'      <img class="btn-close" src="images/btn-close.png">'+
'      <p>{{message}}</p>'+
'      <a class="btn-ok" href="###">{{btn-message}}</a>'+
'</div>'

	//初始化
	data.alert = function(_message,_btn_message,callback){
		var wDom = wrapperDom;
		wDom = wDom.replace('{{message}}',_message);
		wDom = wDom.replace('{{btn-message}}',_btn_message);

		$("body").append(wDom);
		$("body").append(msk);
		$(".msk").show()

		resize()//初始化弹框位置

		$(".btn-ok").click(function(){//点击确定按钮
			messageAlert.close()
			callback();
		})
		$(".btn-close").click(function(){//点击关闭按钮
			messageAlert.close()

		})

		function resize(){//初始化弹框位置
			var l = (parseInt($(window).width())-parseInt($(".message-alert").width()))/2
			var t = (parseInt($(window).height())-parseInt($(".message-alert").height()))/2
			$(".message-alert").css({'left':l+"px",'top':t+'px'})

		}
	}

	data.close = function(){//关闭
		$(".msk").remove()
		$(".message-alert").remove()
	}

}(window.messageAlert = {}));

