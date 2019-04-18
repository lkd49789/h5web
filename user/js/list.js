
var group_id= GetQueryString("group_id");
var openid=GetQueryString("openid");
// var group_id= "SNH";
// var openid="o8I2Yjguff0ipSQecMjhqJzuUUOk";
var li = "<li>"+
				"<div class='part1'>"+
					"<img src='img/icon-gift.png'>"+
				"</div>"+
				"<div class='part2'>"+
					"<p>{{ctime}}</p>"+
					"<p>{{reason}}</p>"+
				"</div>"+
				"<div class='part3'>"+
					"<p>+{{points}}积分</p>"+
					"<a href='#' log_id='{{log_id}}' class='{{is_vaild}}'>领取</a>"+
				"</div>"+
			"</li>"

init()
function init(){
	getList()
	
}
//用户丝瓜积分补领记录（按是否已经补领，发生日期顺序）
	function getList(){
		$.ajax({
			type:'get',
			url:"http://h5.snh48.com/wxapi/user/web_point_rest_log.php?openid="+openid+"&group_id="+group_id,
			success:function(dt){
				setList(dt)
			},
			error:function(){
				//alert("请求超时");
			}
		});
	}

	function setList(rs){
		if(rs.total == "0"){ //没有记录
			$(".tips").show()
		}else{
			var html="";
			$.each(rs.rows,function(index,dt){
				var _li = li;
				_li = _li.replace("{{ctime}}",            dt.ctime);
				_li = _li.replace("{{reason}}",           dt.reason);
				_li = _li.replace("{{points}}",           dt.points);
				_li = _li.replace("{{log_id}}",           dt.log_id);
				_li = _li.replace("{{is_vaild}}",         checkVaild(dt.is_vaild));
				html += _li
			})
			$(".page ul").html(html)
			addListeners()
		}
		
	}

	function checkVaild(bol){
		if(bol == "0"){
			return "choose";
		}else{
			return "sel";
		}
	}

	function addListeners(){
		$(".part3 a").click(function(){
			if($(this).attr("class") == "choose")
			{
				getPoint($(this))
			}
			
		})
	}


	function getPoint(obj){
				
		$.ajax({
            url:"http://h5.snh48.com/wxapi/user/web_point_rest.php?openid="+openid+"&group_id="+group_id,
            type: "POST", 
            async:true,
            data: {
            	log_id:$(obj).attr("log_id")
            },
            timeout: 5000, 
            dataType:"json",
            success: function (rs) { 
               
				if(rs.result == "0"){//领取失败
					alert("补领失败！")
				}else if(rs.result == "1"){//领取成功
					
					$(obj).attr("class", "sel") 
				}else{
					alert(rs.errmsg)
				}
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
                
            } 
       }); 
	}
