var teamA = [
	"http://www.bej48.com/images/member/zp_20047.jpg",
	"http://www.bej48.com/images/member/zp_20051.jpg",
	"http://www.bej48.com/images/member/zp_20053.jpg",
	"http://www.bej48.com/images/member/zp_20054.jpg",
	"http://www.bej48.com/images/member/zp_20056.jpg",
	"http://www.bej48.com/images/member/zp_20070.jpg",
	"http://www.bej48.com/images/member/zp_20080.jpg"
]
var teamB = [
	"http://www.bej48.com/images/member/zp_20041.jpg",
	"http://www.bej48.com/images/member/zp_20044.jpg",
	"http://www.bej48.com/images/member/zp_20046.jpg",
	"http://www.bej48.com/images/member/zp_20052.jpg",
	"http://www.bej48.com/images/member/zp_20055.jpg",
	"http://www.bej48.com/images/member/zp_20068.jpg",
	"http://www.bej48.com/images/member/zp_20071.jpg"
]

var status = 0;//投票与否 0 未投， 1 投B组红，  2 投A组红， timeOver
var cansubmit = true;
var team1, team2;

init()
addAvata()

function init(){
	main.getStatus(function(dt){
		if(dt.status == 200){
			status = parseInt(dt.content);
			checkStatus()
		}else{
			main.alert(dt.mesage)
		}
	})
}
//根据投票与否显示状态
function checkStatus(){
	console.log("checkStatus>"+status)
	//没投票
	if(status == 0){
		$(".btns").show();
		$(".submit").show();
		$(".vote").html("1");
	}else if(status == 1){//投B组红
		$(".vote").html("0");
		
		$(".result1").show();
		$(".result2").hide();

		$(".tip").show()
		$(".text").hide();
		$(".btns,.submit").hide();//按钮隐藏

	}else if(status ==2){//投A组红
		$(".vote").html("0");
		
		$(".result1").hide();
		$(".result2").show();

		$(".tip").show()
		$(".text").hide();

		$(".btns,.submit").hide();//按钮隐藏
	}else{//投票结束
		$(".vote").html("0").parent().hide();
		$(".time-over").html("非投票时间，禁止投票！")
	}
}
//添加头像
function addAvata(){
	$.each($(".groupAbox li"),function(index,_li){
		
		$(_li).css("background-image","url("+teamA[index]+")");
		
	})
	$.each($(".groupBbox li"),function(index,_li){
		
		$(_li).css("background-image","url("+teamB[index]+")");
		
	})
	$('ul li').height($('ul li').width());
}

$('ul li').height($('ul li').width());

$('.btns div').click(function(){
	$(this).addClass('active');
	$(this).siblings().removeClass('active');

	var  team= $(this).attr("type");
	$(this).parent().parent().attr("team",team);

	var anothor = parseInt($(this).parent().parent().attr("anothor"));
	var anothor_team = "1";
	if(team == "0"){
		anothor_team = "1"
	}else{
		anothor_team = "0"
	}
	//console.log("------"+anothor)
	$(".groupbox").eq(anothor).attr("team",anothor_team).find(".btns").find("div").removeClass("active").eq(team).addClass("active");
	
})

$('.submit').click(function(){
	team1 = $(".groupAbox").attr("team");
	team2 = $(".groupBbox").attr("team");

	if(team1 == ""){
		main.alert("请先选择分组！")
		return false;
	}
	$('.mask').fadeIn();
})

$('.btnsback').click(function(){
	$('.mask').fadeOut();

})
//提交
$(".btnsright").click(function(){
	
	
	if(!cansubmit){
		return false;
	}
	cansubmit = false;
	main.saveUnitInfo(team1,team2,function(dt){
		if(dt.status == 200){
			
			if(team1 == "1"){
				status = 2
			}else{
				status = 1
			}
			
			checkStatus();
			
			
		}else{
			main.alert(dt.message)
		}
		$(".mask").hide();
		cansubmit = true;
	})
})