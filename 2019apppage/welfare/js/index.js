
(function(data) {

	//初始化
	data.init = function(){
		//Inint.getList();
        
        Inint.addListeners();//事件
	}

	//事件
	data.addListeners = function(){
		//沃钱包
		$('.welfareList').on('click','.wopay',function(){
			snhOpenNewWebview(CONFIG.getPath()+"wopay.html");
		})

		//每月48元套餐丝芭畅享卡
		$('.welfareList').on('click','.changxiangka',function(){
			var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
			var bind_info = null
			
			$.each(u_info.userInfo.bindInfo,function(index,dt){
				if(dt.bindType == "MOBILE"){
					bind_info = dt
				}
			})
			if(bind_info != null){
				snhOpenNewWebview(CONFIG.getPath()+"changxiangka.html?phone="+bind_info.uniqueId);
			}else{
				main.alert("请先绑定手机号码！")
			}
			
		})

		//每月18元套餐丝芭乐享卡
		$('.welfareList').on('click','.lexiangka',function(){
			var u_info = JSON.parse(dsBridge.call("snhUserInfo"))
			var bind_info = null
			$.each(u_info.userInfo.bindInfo,function(index,dt){
				if(dt.bindType == "MOBILE"){
					bind_info = dt
				}
			})
			if(bind_info != null){
				snhOpenNewWebview(CONFIG.getPath()+"lexiangka.html?phone="+bind_info.uniqueId);
			}else{
				main.alert("请先绑定手机号码！")
			}
			
		})


		//星沃卡
		$('.welfareList').on('click','.xingkali',function(){
			snhOpenNewWebview(CONFIG.getPath()+"xingka.html");
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