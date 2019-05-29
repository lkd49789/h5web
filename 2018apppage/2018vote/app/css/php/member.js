// 取得分团所属成员数据（group：SNH，BEJ，GNZ）
function GetMembersByGroup(group, data) {

    var Members = new Array();
    for (var idx in data) {
         if (data[idx].group_id == group) Members.push(data[idx]);
    };
    return Members;
}

// 取得队伍所属成员数据（team：SII，NII，HII，X，XII，B，E，G，NIII）
function GetMembersByTeams(team, data) {

    var Members = new Array();
    for (var idx in data) {
         if (data[idx].team_name == team) Members.push(data[idx]);
    };
    return Members;
}

// 取得单个成员数据
function GetMember(sid, data) {

    for (var idx in data) {
        if (data[idx].sid == sid) return data[idx];
    };
}

// 设置成员信息
function setMemberInfo(sid, members) {

  // 取得单个成员数据
  var member = GetMember(sid, members);
	
  // 头像
  $(".vd_img").attr('src', member.photoimage);
  // 头像外框
  $(".vd_img").attr('class', 'vd_img ' + member.group_id.toLowerCase() + '_' + member.team_name.toLowerCase() + '_bor');
  // 队标
  $(".vd_con").attr('class', 'vd_con ' + member.group_id.toLowerCase() + '_' + member.team_name.toLowerCase() + '_bag');
  // 姓名+拼音
  $("#member_name").html(member.realname + ' <span>' + member.pinyin + '</span>');
  // 昵称
  $("#member_nick").html(member.nickname);
  // 特长
  $("#member_techang").html(member.techang);
  // 身高
  $("#member_height").html(member.height);
  // 生日
  $("#member_birthday").html(member.birthday);
  // 星座
  $("#member_xingzuo").html(member.xingzuo);
  // 出生地
  $("#member_birthplace").html(member.birthplace);
  // 所属公司
  $("#member_company").html(member.company);
  // 投票按钮
  $(".vl_i_btn").attr('class', 'vl_i_btn ' + 'btn_' + member.team_name.toLowerCase());

}

// 切换成员信息
function InitMember(sid) {
  
  // 取得全体成员数据
  var file = '../resource/json/members.json';
  $.ajax({
      type: "get",
      url: file,
      dataType: "json",
      success: function(data) {
        // 设置成员信息
        setMemberInfo(sid, data);
      }
  });
}

$(function() {

	// 取得成员ID
  var sid = GetQueryString('id');
  // 切换成员信息
  InitMember(sid);
	
})