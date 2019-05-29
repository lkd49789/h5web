(function(data) {
	var regName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;//验证姓名
	var regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; //15位或者18位
	var regPhone = /^1\d{10}$/; //验证手机号

	var areaData;        //地区数据
	
	var provinceData,curCity,cityindex;//号码归属地
	var postCity,postCountry;////邮寄城市/区县

	var count;//加载次数
	var cusId;//用户id
	var canload = true;//是否可加载接口

	//号码所在地地址
	var provinceCode = "31";
	var cityCode = "310";
	//配送地址
	var postProvinceCode = ""
	var postCityCode = "";
	var postCountryCode = "310";

	//所有号码
	var allPhoneNum = [];
	var curNumArr = [];//当前号码组
	var numindex = 0;   //号索引
	var totalNum;   //10个为一组  计算总组数
	//初始化
	data.init = function(){
		INDEX.getCustomId();//用户id
		INDEX.addListeners();//添加事件

		INDEX.getArea();//加载地区
	}
	//获取customId
	data.getCustomId = function(){
		main.getCustomId(function(dt){
			if(dt.status == 200){
				cusId = dt.content;
			}else{
				if(count < 5){
					INDEX.getCustomId();
					count += 1;
				}
			}
		})
	}
	//加载地区
	data.getArea = function(){
		main.getJson("js/area.json",function(dt){
			areaData = dt;

			INDEX.initProvinceList()
		})
	}
	//添加事件
	data.addListeners = function(){
		//选择号码区域
		$('.choosecity').click(function(){
			$('.maskinfo').show();
			$('#area').show().addClass('bounceInRight');
		})

		//选择邮寄地址
		$('.fromcome').click(function(){

			if($(".phonecome").attr("city") == ""){
				INDEX.showError($(".phonecome").parent())
				INDEX.showTip("请先选择号码归属地")
				return false;
			}

			$('.maskinfo').show();
			$('#post').show().addClass('bounceInRight');
		})

		//关闭选择区域
		$('.maskinfo').click(function(){
			INDEX.hideSelectList();
		})

		//阅读协议
		$('#protocol').click(function(){
			if($('.btn').hasClass('disable')){
				$(this).addClass('agree');
				$('.btn').removeClass('disable').addClass('submit');
			}else{
				$(this).removeClass('agree');
				$('.btn').addClass('disable').removeClass('submit');
			}
		})

		//提交
		$('.btn-box').on('click','.submit',function(){
			//姓名
			if(!regName.test($("#certName").val())){
				
				INDEX.showError($("#certName").parent())
				console.log("姓名非法")
				INDEX.showTip("请输入正确的姓名！")
				return false;
			}
			//身份证
			if(!regId.test($("#certNo").val())){
				INDEX.showError($("#certNo").parent())
				
				INDEX.showTip("请输入正确的身份证！")
				return false;
			}
			//联系电话
			if(!regPhone.test($("#mobilePhone").val())){
				INDEX.showError($("#mobilePhone").parent())
				INDEX.showTip("请输入正确的手机号码！")
				return false;
			}
			
			//号码归属地
			if($(".phonecome").attr("city") == ""){
				INDEX.showError($(".phonecome").parent())
				INDEX.showTip("请选择号码归属地")
				return false;
			}

			//号码选择
			if($(".clickchoose").html() == "点击选择"){

				INDEX.showError($(".clickchoose").parent())
				INDEX.showTip("请先选择号码")
				return false;
			}
				
			//配送地区
			if($(".fromcome").attr("county") == ""){

				INDEX.showError($(".fromcome").parent())
				INDEX.showTip("请选择配送地区")
				return false;
			}
			//详细地址
			if($(".text-area").val().length <5){
				INDEX.showError($(".text-area").parent())
				INDEX.showTip("地址太短")
				return false;
			}else if($(".text-area").val().length > 50){
				INDEX.showError($(".text-area").parent())
				INDEX.showTip("地址太长")
				return false;
			}

			$(".tips").hide();
			INDEX.submitData();
		})

		
		//选择省
		$("#province").on("click","li",function(){
			var id = parseInt($(this).attr("id"));
			INDEX.selectProvince(id);

		})
		//选择市
		$("#city").on("click","li",function(){
			var id = parseInt($(this).attr("id"));
			INDEX.selectCity(id);
			INDEX.hideSelectList();
			
			$(".phonecome").html($("#province .selected").html()+" "+$("#city .selected").html());

			//配送地区
			INDEX.initPostCity(id);

			$(".fromcome").attr("city","").attr("county","").html("请选择区/县");//清空配送地址
		})


		//--------------------------------------------------------------选择号码
		$(".clickchoose").click(function(){
			if($(".phonecome").attr("city") == ""){
				INDEX.showError($(".phonecome").parent())
				INDEX.showTip("请先选择号码归属地")
				return false;
			}
			// $(".mask").fadeIn();
			if(canload){
				$("#search").val("");//清空搜索框的值
				INDEX.refreshNum("");
			}
		})
		//关闭选号
		$(".popup-close").click(function(){
			$(".no-number").hide();
			$(".mask").hide();
		})

		//刷新  换一批
		$("#refresh").click(function(){
			
			INDEX.addNumList()
			
		})
		//查找号码
		$("#search-btn").click(function(){
			if($("#search").val()){
				numindex = 0;
				INDEX.refreshNum($("#search").val());
			}
			
		})
		//配送地址选择
		//选择市
		$("#post-city").on("click","li",function(){
			var id = parseInt($(this).attr("id"));
			
			INDEX.selectPostCity(id);
			
		})
		//区县
		$("#post-district").on("click","li",function(){
			var id = parseInt($(this).attr("id"));
			INDEX.selectPostCountry(id);
		})


		//选择号码
		$(".number-list").on("click","li",function(){
			$(".clickchoose").html($(this).html());
			$(".mask").hide();
		})

	}
	//提交数据
	data.submitData = function(){
		var subdata = {
			"provinceCode":provinceData.PROVINCE_CODE,
			"cityCode":curCity.CITY_CODE,
			"phoneNum":$(".clickchoose").html(),

			"contactNum":$("#mobilePhone").val(),
			"certName":$("#certName").val(),
			"certNo":$("#certNo").val(),

			"postProvinceCode":provinceData.LT_PROVINCE_CODE,
			"postCityCode":postCity.LT_CITY_CODE,
			"postDistrictCode":postCountry.COUNTY_CODE,
			"postAddr":$("#address").val(),

			"custId":cusId,
			"productType":"23"
		}
		if(!canload){
			return false;
		}
		main.buy(subdata,function(dt){
			if(dt.status == 200){
				main.alert(dt.message)
			}else{
				main.alert(dt.message)
			}
			canload = true;
		})
	}
	//添加报错红框
	data.showError = function(obj){
		$(".u-info li").removeClass("error");
		$(obj).addClass("error");
	}
	//去掉提示框
	$(".u-info li").click(function(){
		$(".tips").hide();
		$(this).removeClass("error")
	})
	//换一批号码/根据幸运数字选号
	data.refreshNum = function(str){
		if(!canload){
			return false;
		}
		canload = false;
		main.getNumList(provinceCode,cityCode,str,function(dt){
			if(dt.status == 200){
				$.each(dt.content,function(index,num){
					//html += "<li>"+num+"</li>"
					allPhoneNum.push(num)
				})
				totalNum = allPhoneNum.length;
				if(totalNum <= 0){
					$(".no-number").show().html("抱歉没有匹配的号码");
				}
				INDEX.addNumList()
			}else{
				main.alert(dt.message)
			}
			canload = true;
		})
	}
	//添加号码到选择面板
	data.addNumList = function(){
		$(".mask").show();
		var endindex
		if(numindex<totalNum){
			if((numindex+10) >totalNum){
				endindex = totalNum
				console.log("1")
			}else{
				endindex = numindex+10
				console.log("2")
			}
		}else{
			console.log("<")
			numindex = 0
			endindex = numindex+10;
		}
		console.log(numindex+"------"+endindex)
		var html = "";
		for(var i=numindex; i<endindex;i++){
			if($("#search").val()){
				var front_str = allPhoneNum[i].substr(0,11-$("#search").val().length)
				var last_str = allPhoneNum[i].substr(11-$("#search").val().length)
				if($("#search").val() == last_str){
					html += "<li>"+front_str+"<span>"+last_str+"</span>"+"</li>";
				}
			}else{
				html += "<li>"+allPhoneNum[i]+"</li>"
			}
			
			
			
		}
		$(".number-list").html(html);


		numindex = endindex;
		console.log(numindex+"------"+endindex)
	}
	//隐藏选择框
	data.hideSelectList = function(){
		$('.maskinfo,#area,#post').hide().removeClass('bounceInRight');
	}
	//省市列表
	data.initProvinceList = function(){
		var html = "";
		$.each(areaData,function(index,dt){
			//console.log(index)
			html += "<li id="+index+">"+dt.PROVINCE_NAME+"</li>";
		})

		provinceData = areaData[0];//当前省

		$("#province").html(html);
		INDEX.selectProvince(0);//默认选择第一个省
	}
	//选择省
	data.selectProvince = function(id){
		$("#province li").removeClass("selected").eq(id).addClass("selected");
		provinceData = areaData[id];//当前省数据

		INDEX.initCity();
	}
	//城市列表
	data.initCity = function(){
		var html = "";
		$.each(provinceData.CITY_DATA,function(index,dt){

			html += "<li id="+index+">"+dt.CITY_NAME+"</li>";
		})
		$("#city").html(html);
		
	}
	//选择城市
	data.selectCity = function(id){
		$("#city li").removeClass("selected").eq(id).addClass("selected");
		//号码归属地-省
		$(".phonecome").attr("province",$("#province .selected").html());
		//号码归属地-市
		$(".phonecome").attr("city",$("#city .selected").html());
		curCity = provinceData.CITY_DATA[id];
		cityindex = id;
	}

	//-------------------------------------------------------------------------------------------------------邮寄地址
	//邮寄城市列表
	data.initPostCity = function(){
		var html = "";
		$.each(provinceData.CITY_DATA,function(index,dt){
			html += "<li id="+index+">"+dt.CITY_NAME+"</li>";
		})
		$("#post-city").html(html);
		INDEX.selectPostCity(cityindex);
	}
	//邮寄区县列表
	data.initPostCountry = function(){
		var html = "";
		$.each(postCity.COUNTY_DATA,function(index,dt){
			html += "<li id="+index+">"+dt.COUNTY_NAME+"</li>";
		})
		$("#post-district").html(html);
	}
	//选择邮寄市
	data.selectPostCity = function(id){
		$("#post-city li").removeClass("selected").eq(id).addClass("selected");
		postCity = provinceData.CITY_DATA[id];//邮寄城市数据

		INDEX.initPostCountry();
	}
	//选择邮寄  区县
	data.selectPostCountry = function(id){
		$("#post-district li").removeClass("selected").eq(id).addClass("selected");
		//号码归属地-市
		$(".fromcome").attr("city",$("#post-city .selected").html());
		//号码归属地-区县
		$(".fromcome").attr("county",$("#post-district .selected").html());

		$(".fromcome").html($("#post-city .selected").html()+" "+$("#post-district .selected").html());
		INDEX.hideSelectList();

		postCountry = postCity.COUNTY_DATA[id];//邮寄区县数据
	}
	//提示语
	data.showTip = function(str){
		$(".tips").show().html(str)
	}

	//获取号码
	data.getPhoneNum = function(){

	}
}(window.INDEX = {}));

INDEX.init()