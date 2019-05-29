var totalJF = 0;
var totalMoney = 0;
var payType = 0;//购买竞猜花费的类型    0 积分 1 鸡腿
var cansubmit = true;//是否可提交
init();

function init(){
	//获取状态
	main.getStatus(function(dt){
		if(dt.status == 200){

			setMoney(dt.content.userMoney.integral,dt.content.userMoney.money);//显示用户积分  鸡腿数
			var dt = dt;
			//dt.content.isOver = 0;
			//竞猜已结束
			if(dt.content.isOver.toString() == "1"){// 竞猜是否结束  1结束  0没有
				if(dt.content.status == 0){//用户未参与
					$(".tit").html("您未参与本次竞猜！");
					//$(".usebox > div").addClass("nohave");
					$(".usebox").hide();
					return false;
				}else{//用户参与了 显示用户参与信息
					addInfo(dt.content.guessDataList,"over");
					//是否赢取鸡腿
					if(dt.content.num > 0){
						$(".tit").html("恭喜你竞猜成功");
						$(".rewardbox").show().find("div").html("+"+dt.content.num+"鸡腿");
						
						
					}else{
						$(".tit").html("很遗憾你没有竞猜成功");
					}
				}

				$(".usebox").hide();//积分 鸡腿

			}else{//竞猜未结束
				if(dt.content.status == 1){//用户已参与竞猜
					$(".tit").html("您已成功参与，请耐心等到竞猜结果！");
					addInfo(dt.content.guessDataList,"notover");

					//$(".usebox > div").addClass("nohave");//积分 鸡腿
					$(".usebox").hide();//积分 鸡腿
				}else{//用户未参与竞猜
					console.log("用户未参与竞猜")
					getTeamList();
				}
			}
		}else{
			//main.alert(dt.message)
			showPop(dt.message)
		}
	})
}

//添加用户选择信息 以及结果信息
function addInfo(dt,isover){
	$.each(dt,function(index,info){
		if(isover == "over"){// 答案是否公布
			if(info.openStatus == 1){//已开奖
			
				if(info.guessStatus == 1){//已猜中
					$(".motionList").find("span").eq(index).show().css("background-image","url(img/right.png)");
				}else{//未猜中
					$(".motionList").find("span").eq(index).show().css("background-image","url(img/wrong.png)");
				}
			}
		}
		
		//console.log(getTeam(info.winer))
		$(".motionList li em").eq(index).html(getTeam(info.winer));
	})
}
//
function getTeam(_teamid){
	var teams = JSON.parse(localStorage.getItem("teams"));//队伍json数据
	var tname = ""
	$.each(teams,function(index,team){
		
		if(_teamid.toString() == team.teamId.toString()){
			
			tname = team.teamName;
		}
	})
	return tname;
}
function setMoney(_integral,_money){
	$(".integral").html(_integral);
	$(".money").html(_money);

	totalJF = _integral;
	totalMoney = _money;
	//鸡腿不足 请去充值
	if(totalMoney < 50){
		$(".loaded").show();
	}
}
//加载队伍列表
function getTeamList(){
	$('.mask_inbox').after(teamHtml);//生成队伍列表dom

	var getTeamsList = main.getJson('teams.json',function(data){//读取队伍json写入缓存
			
		localStorage.setItem("teams",JSON.stringify(data))	
		
		$.each(data, function(i,item) {

			localStorage.setItem("teamId"+item.team_id,JSON.stringify(item))
			
		});

		createTeamList();
		addListeners();
	})

	
}



//生成队伍列表
function createTeamList(){
	var teams = JSON.parse(localStorage.getItem("teams"));//队伍json数据
	var htmlteam = "";
	$(".mem_con,.mem_cbtn").show();
	
	$.each(teams,function(i, team) {
		var _tname = team.teamName.split(" ")[1]
		htmlteam += "<div teamid="+team.teamId+" class='team member_team_" + _tname.toLowerCase() + "'>" +team.teamName + "</div>";
	})

	$("#teams_list").html(htmlteam);	
}

//添加事件
function addListeners(){
	//点击选择队伍
	$('.motionList li').click(function(){
		//不可点击
		if($(".usebox > div").hasClass("nohave")){
			return false;
		}
		$(this).addClass('chooseTeam');
		$('.teamList').fadeIn();
	})

	//关闭队伍列表弹窗
	$('.closePop').click(function(){
		$('.teamList').fadeOut();
		$(".chooseTeam").removeClass("chooseTeam")
	})

	//点击你所选的队伍
	$('.teamList').on('click','.team',function(){
		$(this).addClass('bgColor');
		$(this).siblings().removeClass('bgColor');
		$('.mem_cbtn').attr('teamName',$(this).html());
		$('.mem_cbtn').attr('teamid',$(this).attr("teamid"));
	})

	//确认你所选择的队伍并关闭队伍列表弹窗
	$('.mem_cbtn').click(function(){
		var teamName = $(this).attr('teamName');
		$('.teamList ').fadeOut();
		$('.chooseTeam em').html(teamName);
		$('.chooseTeam em').attr("teamid",$(this).attr('teamid'))
		$(".chooseTeam").addClass('chooseyes').removeClass('chooseTeam');
		
		//$('.motionList li').removeClass('chooseTeam').addClass('chooseyes');
	})


	//点击是否使用50积分参加竞选
	$('.integral_btn').click(function(){
		//不可提交
		if($(this).hasClass("nohave")){
			return false;
		}
		if(totalJF < 50){
			showPop("积分不足")
			return false;
		}
		//是否选择队伍
		checkIsChoose()
		//显示确认框
		$('.mask_inbox,.mask').fadeIn();
		$('.mask h4').html("是否使用50积分参加竞选？");
		payType = 0;
	})

	//点击是否使用50鸡腿参加竞选
	$('.chicken_btn').click(function(){
		//不可提交
		if($(this).hasClass("nohave")){
			return false;
		}

		if(totalMoney < 50){
			showPop("鸡腿不足")
			return false;
		}
		//是否选择队伍
		checkIsChoose()
		//显示确认框
		$('.mask_inbox,.mask').fadeIn();
		$('.mask h4').html("是否使用50鸡腿参加竞选？");
		payType = 1;
	})

	//点击返回修改
	$('.btnsback').click(function(){
		cansubmit = true;
		$('.mask_inbox,.mask').fadeOut();
	})

	//关闭还有项目没选择的弹窗
	$('.know').click(function(){
		$('.mask_inbox,.prompt').fadeOut();
	})

	//点击确定提交你的选择
	$('.btnsright').click(function(){
		if(!cansubmit){
			return false;
		}
		cansubmit = false;
		main.saveGuess(payType,getSubmitInfo(),function(dt){
			if(dt.status == 200){
				showPop("参与成功！");
				if(payType == 0){
					totalJF -= 50;

				}else if(payType == 1){
					totalMoney -= 50;
				}
				setMoney(totalJF,totalMoney);
				$(".usebox > div").addClass("nohave");
				$(".tit").html("您已成功参与，请耐心等待竞猜结果！")
			}else{
				showPop(dt.message)
			}
			cansubmit = true;
		})
	})
	
}

//跳到充值页面
$(".loaded").click(function(){
	window.web.gotoPage("recharge/detail")
})

//判断是否已选择
function checkIsChoose(){
	$.each($(".motionList").find("li"),function(index,dt){
		if($(dt).hasClass('chooseyes')==false){
			//$('.mask_inbox,.prompt').fadeIn();
			showPop("您还有竞猜<br>项目没有选择哦~")
			return false;
		}else{
			console.log("1")
		}
	})
}
//显示弹出框
function showPop(msg){
	console.log("showPop")
	$(".mask").hide();
	$('.mask_inbox,.prompt').fadeIn();
	$(".prompt").find("p").html(msg)

}

//获取提交数据
function getSubmitInfo(){
	var info = [];

	$.each($(".motionList li"),function(index,_li){
		var obj = {"actId":(index+1),"winer":parseInt($(_li).find("em").attr("teamid"))}
        
		info.push(obj);
	})
	return info;
}