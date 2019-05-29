var info1,info2,info3,info4;
var addressId=null;
var security=null;
var finish = GetQueryString('finish');

init();
function init(){
	main.ifSubmit(function(dt){
		if(dt.content){
			$(".wrapper-submit").show();
			$(".wrapper-preview").hide();
			$('.info1').val(dt.content.contactName);
			$('.info2').val(dt.content.contactPhone);
			$('.info3').val(dt.content.provinceName+' '+dt.content.cityName+' '+dt.content.countyName);
			$('.info4').val(dt.content.specificAddress);
			$(".info3").attr({'provinceNum':dt.content.provinceNum,'cityNum':dt.content.cityNum,'countyNum':dt.content.countyNum});
			addressId=dt.content.addressId;
			security = dt.content.security;
		}else{
			$(".wrapper-submit").show();
			$(".wrapper-preview").hide();
		}
	})
}

$(".btn-preview").click(function(){
	info1 = $(".info1").val()
	info2 = $(".info2").val()
	info3 = $(".info3").val()
	info4 = $(".info4").val()

	if(!info1){
		main.alert("请输入您的真实姓名")
		return false;
	}
	if(!info2){
		main.alert("请输入您的联系电话")
		return false;
	}
	if(!info3){
		main.alert("请输入您的收货地址")
		return false;
	}
	if(!info4){
		main.alert("请输入您的详细地址")
		return false;
	}
	if(info2.length < 5 || info2.length > 20){
		main.alert("请输入正确的手机号码")
		return false;
	}

	$(".p-info1").html(info1);
	$(".p-info2").html(info2);
	$(".p-info3").html(info3);
	$(".p-info4").html(info4);
	$(".wrapper-preview").show();
	$(".wrapper-submit").hide();

})


$(".btn-edit").click(function(){
	$(".wrapper-preview").hide();
	$(".wrapper-submit").show();

})

var city_picker = new mui.PopPicker({layer:3});
city_picker.setData(init_city_picker);
$(".info3").on("tap", function(){
	setTimeout(function(){
		city_picker.show(function(items){
			$(".info3").val((items[0] || {}).text + " " + (items[1] || {}).text + " " + (items[2] || {}).text);
			$(".info3").attr({'provinceNum':(items[0] || {}).value,'cityNum':(items[1] || {}).value,'countyNum':(items[2] || {}).value});
		});
	},200);
});


$(".btn-submit").click(function(){
	var provinceNum = $('.info3').attr('provinceNum');
	var cityNum = $('.info3').attr('cityNum');
	var countyNum = $('.info3').attr('countyNum');
	var specificAddress = info4;
	var contactName = info1;
	var contactPhone = info2;
	main.addRess(addressId,security,provinceNum,cityNum,countyNum,specificAddress,contactName,contactPhone,function(dt){
		if(dt.status==200){
			addressId = dt.content.addressId; 
			security = dt.content.security;
			/*console.log(addressId);
			console.log(security);*/
			main.bindAddress(getPara(),addressId,security,function(dt){
				if(dt.status==200){
					$(".wrapper-preview > h1").html("以下是您填写的收货信息，我们尽快将奖品送到您的手中，请耐心等待。")
					$(".btn-wrapper-submit").hide()	
				}else{
					main.alert(dt.message);
				}
			})
		}else{
			main.alert(dt.message);
		}
	})
})


function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


function getPara(){
	var Request = new Object();
	Request = GetRequest();
	return Request;
}