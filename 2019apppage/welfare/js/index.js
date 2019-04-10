
(function(data) {

	//初始化
	data.init = function(){
		Inint.getList();
        
        Inint.addListeners();//事件
	}

	//事件
	data.addListeners = function(){
		//沃钱包
		$('.welfareList').on('click','.wopay',function(){
			snhOpenWebUrl("https://h5.48.cn/2019apppage/welfare/wopay.html");
		})

		//每月48元套餐丝芭畅享卡
		$('.welfareList').on('click','.changxiangka',function(){
			var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
			if(u_info.userInfo.bindInfo.bindType && u_info.userInfo.bindInfo.bindType == "MOBILE"){
				snhOpenWebUrl("https://h5.48.cn/2019apppage/welfare/changxiangka.html");
			}else{
				main.alert("请先绑定手机号码！")
			}
			
		})

		//每月18元套餐丝芭乐享卡
		$('.welfareList').on('click','.lexiangka',function(){
			var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
			if(u_info.userInfo.bindInfo.bindType && u_info.userInfo.bindInfo.bindType == "MOBILE"){
				snhOpenWebUrl("https://h5.48.cn/2019apppage/welfare/lexiangka.html");
			}else{
				main.alert("请先绑定手机号码！")
			}
			
		})


		//星沃卡
		$('.welfareList').on('click','.xingkali',function(){
			snhOpenWebUrl("https://h5.48.cn/2019apppage/welfare/xingka.html");
		})
	}

	data.getList = function(){//朵唯获取福利类别ID
		main.getList(function(dt){
			console.log(dt.content[0].welfareId);
			if(dt.status==200){
		        $('.duowei').attr('welid',dt.content[0].welfareId);
			}else{
				main.alert(dt.message);
			}
		})
	}

}(window.Inint = {}));



$(function(){
    Inint.init();
})