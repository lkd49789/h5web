(function(data) {
	var meetData;
	var sid=[];
	var tid=[]; 
	var period=[];
	var cd_nm=[];

	var li = 
'               <li cd-limit="{{cd_limit}}" status="{{status2}}" tid="{{tid}}" period="{{period}}">'+
'					<span class="icon-check"><img src="images/check{{status}}.jpg"></span>'+
'					<span class="time">{{date}}</span>'+
'					<span class="choose-member choose-member-{{status1}}">'+
'						<em>{{membername}}</em>'+
'						<i class="mui-icon mui-icon-arrowdown"></i>'+
'					</span>'+
'				</li>';

	data.init = function(){
		ORDER.getMeetInfo()
		ORDER.addListeners()
	}
	//添加事件
    data.addListeners = function(){
    	//提交预约
    	$(".btn-submit").click(function(){
    		ORDER.getInfo()//获取提交信息
    		if(sid.length<1 ){
	    		main.alert("请选择要预约的成员")
	    		return false;
	    	}
            main.submitMeetInfo(sid,tid,period,cd_nm,function(dt){
    		//main.submitMeetInfo(sid.toString(),tid.toString(),period.toString(),cd_nm.toString(),function(dt){
    			if(dt.errcode == "0"){
    				
					//重新加载数据
    				ORDER.getMeetInfo()
    				main.alert("预约成功")
    			}else{
    				main.alert(dt.errmsg)
    			}
    			//初始化
    			sid=[];
				tid=[]; 
				period=[];
				cd_nm=[];
    		})
    	})

    	//选择成员
    	$(".time-list").on("click",".choose-member",function(){
    		var index = $(".choose-member").index(this)
    		console.log("index>>"+index)
    		var _this = $(this)
    		if(_this.hasClass("choose-member-0"))//可预约
    		{
    			MEMBER.show(meetData[index].members,function(_sid,_name){
					_this.attr("sid",_sid);
					_this.find("em").html(_name);
                    console.log()
                    _this.parent().find("img").attr("src","images/check-choose.jpg")
				})
    		}
    	})
    }
    //获取提交信息
    data.getInfo = function(){
    	$.each($(".time-list li"),function(index,dt){
    		if($(dt).find(".choose-member").attr("sid") != undefined && $(dt).find(".choose-member").attr("sid") != null){
    			sid.push($(dt).find(".choose-member").attr("sid"))
    			tid.push($(this).attr("tid"))
    			period.push($(this).attr("period"))
    			cd_nm.push($(this).attr("cd-limit"))
    		}
    	})

    	
    }
    //获取可预约成员及场次
    data.getMeetInfo = function(){
    	main.getMeetInfo(function(dt){
    		if(dt.errcode == "0"){
    			meetData = dt.rows;
	    		var html = "";

	    		$.each(dt.rows,function(index,dt1){
	    			var _li = li;
	    			_li = _li.replace("{{cd_limit}}",dt1.cd_limit.substring(1))
	    			_li = _li.replace("{{tid}}",dt1.tid)
	    			_li = _li.replace("{{status2}}",dt1.status)
	    			_li = _li.replace("{{period}}",dt1.period)
	    			_li = _li.replace("{{status}}",dt1.status)
	    			_li = _li.replace("{{date}}",ORDER.configDate(dt1.period))
	    			_li = _li.replace("{{status1}}",dt1.status)
	    			_li = _li.replace("{{membername}}",ORDER.setMeetMember(dt1.status,dt1.members))

	    			html += _li
	    		})
	    		$(".time-list").html(html);
	    		
	    	}else{
	    		main.alert(dt.errmsg)
	    	}
    	})
    }
    //预约时间格式
    data.configDate = function(_date){
    	var tep_date = _date.split("")
    	return tep_date[0]+tep_date[1]+":"+tep_date[2]+tep_date[3]+"-"+tep_date[4]+tep_date[5]+":"+tep_date[6]+tep_date[7];
    }
    //已预约成员
    data.setMeetMember = function(_status,dt){
    	if(_status == 1){//已经预约
    		return dt[0].realname
    	}else{
    		return "请选择预约成员"
    	}
    }
}(window.ORDER = {}));


ORDER.init()