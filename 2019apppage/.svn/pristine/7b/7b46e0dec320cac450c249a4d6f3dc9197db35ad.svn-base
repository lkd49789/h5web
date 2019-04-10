$('.mask_inbox').after(memberHtml);
$('.mask_inbox').after(teamHtml);
var getTeamsList = main.getJson('teams.json',function(data){//读取json写入缓存
		
	localStorage.setItem("teams",JSON.stringify(data))	
	
	$.each(data, function(i,item) {

		localStorage.setItem("teamId"+item.team_id,JSON.stringify(item))
		
	});
})
	
var getMembersList = main.getJson('members.json',function(data){//读取json写入缓存
	
	localStorage.setItem("members",JSON.stringify(data))	

})


var sid = 9001; 
var teams = JSON.parse(localStorage.getItem("teams"));//
//不参加组合投票成员
var del_members = [10027, 10031, 10025, 10114, 10117, 10146, 10067, 10093, 10037, 10005, 10003, 10070, 10015, 10081, 10019]

createMemberList()


//生成成员列表
function createMemberList(){
	var html = "";
	var htmlteam = "";
	$(".mem_con,.mem_cbtn").show();
	// 取得全部成员
	var members = JSON.parse(localStorage.getItem("members")); 
	
	$.each(teams,function(i, team) {
		var _tname = team.tname.split(" ")[2]
		html += "<div class='team member_team_" + _tname.toLowerCase() + "'>" +team.tname + "</div>";
		htmlteam += "<div class='team member_team_" + _tname.toLowerCase() + "'>" +team.tname + "</div>";
		$.each(members,function(j,member){
			if (member.team_name == _tname){
				html += "<div class='mem_ciSingle sid"+member.mid+"'>" +　member.realname + "<input type='hidden' mid='"+ member.mid +"' value='" + member.realname + "'/></div>";
			}
		})
	})

	$("#option_list").html(html);
	$("#teams_list").html(htmlteam);	

	$.each(del_members,function(i,sid){
		$("#option_list").find(".sid"+sid).hide();
	})
}
	
//选中成员
$(".memberList").on("click",".mem_ciSingle",function(){
	console.log("click");
	$(this).addClass("mem_ciSingleSel");
	$(this).siblings('.mem_ciSingle').removeClass("mem_ciSingleSel");
});


$('.close').on('click','.closePop',function(){
	$(this).parents('.addsec').fadeOut();	
	$(".choose").html("");
})



	

	

