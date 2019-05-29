(function(data) {
	var li =    '<li>'+
'					<span class="time">{{period}}</span>'+
'					<span class="choose-member">{{realname}}</span>'+
'					<span class="status status{{status1}}" logid="{{logid}}">{{status}}</span>'+
'				</li>'
	data.init = function(){
		main.setUserInfo()//设置用户信息
		ORDER.getMeetLog()//获取预约记录
		ORDER.addListeners()//添加事件
	}
	//添加事件
    data.addListeners = function(){

    	//取消预约
    	$(".time-list").on("click",".status0",function(){
    		var logid = $(this).attr("logid");
    		var btnArray = ['取消', '确定'];
                mui.confirm('确定要取消预约吗？', '', btnArray, function(e) {
                    if (e.index == 1) {
			    			main.cancelMeet(logid,function(dt){
								if(dt.errcode == 0){
									ORDER.getMeetLog()
								}else{
									main.alert(dt.errmsg)
								}
							})
                    }else{
                        
                    }
                })
    		
    		console.log($(this).index());
    	})
    }
    //获取可预约成员及场次
    data.getMeetLog = function(){
    	main.getMeetLog(function(dt){
    		if(dt.errcode == "0"){
	    		var html = "";
	    		$.each(dt.rows,function(index,dt1){
	    			var _li = li;
	    			_li = _li.replace("{{period}}",ORDER.configDate(dt1.period));
	    			_li = _li.replace("{{realname}}",dt1.realname);
	    			_li = _li.replace("{{status1}}",dt1.status);
	    			_li = _li.replace("{{status}}",ORDER.configStatus(dt1.status));
	    			_li = _li.replace("{{logid}}",dt1.logid);
	    			html += _li;
	    		})
	    		$(".time-list").html(html);
	    	}else{
	    		main.alert(dt.errmsg)
	    	}
    	})
    }
    //状态文案
    data.configStatus = function(_status){
    	if(_status == 2){
    		return "已选中"
    	}else if(_status == 1){
    		return "已落选"
    	}else{
    		return "取消预约"
    	}
    }
	//预约时间格式
    data.configDate = function(_date){
    	var tep_date = _date.split("")
    	return tep_date[0]+tep_date[1]+":"+tep_date[2]+tep_date[3]+"-"+tep_date[4]+tep_date[5]+":"+tep_date[6]+tep_date[7];
    }
}(window.ORDER = {}));


ORDER.init()