(function(data) {
	//普通块
	var li_empty = '<li type="nomal" class="libox box{{index}}">'+
'					<p class="seatof">第{{blockNum}}<br>号区块</p>'+
'					<div class="manyper">'+
'						<h4>{{voterCount}}人</h4>'+
'					</div>'+
'					<p class="date">{{date}}</p>'+
'					<p class="time">{{time}}</p>'+
'				</li>'
	//我所在的块
	var li_my = '<li type="myinfo" class="libox box{{index}} mylibox">'+
'					<p class="seatof">第{{blockNum}}号区块</p>'+
'					<div class="manyper myper">'+
'						<h4>{{voterCount}}人</h4>'+
'						<div class="mymsgs">'+
'							<span style="background:url({{avatar}}); background-size: cover;"></span>'+
'							<div>'+
'								<p>{{voterName}}为{{memberName}}</p>'+
'								<p>投了{{voteNum}}票</p>'+
'							</div>'+
'						</div>'+
'					</div>'+
'					<p class="date">{{date}}</p>'+
'					<p class="time">{{time}}</p>'+
'				</li>'
	//所验证用户所在的块
	var li_othor = '<li type="othorinfo" class="libox box{{index}} mylibox">'+
'					<p class="seatof">第{{blockNum}}号区块</p>'+
'					<div class="manyper myper">'+
'						<h4>{{voterCount}}人</h4>'+
'						<div class="other">'+
'							<p>{{voterName}}为{{memberName}}</p>'+
'							<p>投了{{voteNum}}票</p>'+
'						</div>'+
'					</div>'+
'					<p class="date">2018-04-14</p>'+
'					<p class="time">16:00:49</p>'+
'				</li>'

	var curdata;//区块数据
	var newdata;//区块数据
	var otherdata;//验证id对应区块数据
	var mydata;//我投票区块数据

	var curIndex ;//当前数据索引
	var curtype;   //当前所选模式 my 自己所在区块   othor id对应区块
	var myvoteid = "";//我的投票id
	var voterData ; //投票者信息
	var itemtime = new Date('2018-4-7 18:30:00').getTime();

	//初始化
	data.init = function(){

		FINDEX.getNewInfo();
		FINDEX.addListeners();

		if(new Date().getTime() >itemtime){
			$(".testbtn").show();
		}
		$(".testbtn").show();
	}
	//最新区块信息
	data.getNewInfo = function(){
		FINDEX.showLoading(true);
		main.getNewInfo(function(dt){
			if(dt.status == 200){
				newdata = dt.content.data;
				curdata = newdata;
				FINDEX.refreshNomalList(dt.content.data)
			}else{
				FINDEX.showPop("message",dt.message);
			}
			FINDEX.showLoading(false);
		})
		
	}
	//看看我在哪里
	data.findMe = function(){
		FINDEX.showLoading(true);
		main.getMyPosInfo(function(dt){
			if(dt.status == 200){
				console.log("findMe-length--"+dt.content.data.length)
				if(dt.content.data.length > 0){
					mydata = dt.content.data;
					curdata = mydata;
					FINDEX.refreshMyList(dt.content.data)
				}else{
					FINDEX.showPop("message","您的投票数据暂时还未上链，请稍后再试!");
				}
				
			}else{
				FINDEX.showPop("message",dt.message);
			}
			FINDEX.showLoading(false);
		})
	}

	//最新区块信息列表
	data.refreshNomalList = function(dt){
		var html = "";
		$.each(dt,function(index,info){
			if(info["mine"]){//有用户信息
				html += FINDEX.getMyBlock(index+1,info);
				voterData = info["mine"]
			}else{
				html += FINDEX.getNomalBlock(index+1,info);
			}
		})
		$(".list-nomal").fadeIn().html(html)
		$(".list-my,.list-othor").hide();

		$(".fieldbtns").fadeIn();//隐藏看看我在哪里按钮
		$(".fieldbtns_my").hide();//显示返回链顶端
		
	}
	//我的区块区间列表
	data.refreshMyList = function(dt){
		var html = "";
		$.each(dt,function(index,info){

			if(info["mine"]){//有用户信息
				html += FINDEX.getMyBlock(index+1,info);
				voterData = info["mine"]
			}else{
				html += FINDEX.getNomalBlock(index+1,info);
			}
		})
		$(".list-my").show().html(html)
		$(".list-nomal, .list-othor").hide();

		$(".fieldbtns").hide();//隐藏看看我在哪里按钮
		$(".fieldbtns_my").fadeIn();//显示返回链顶端
		$(".getself").fadeIn();//隐藏获取自己的投票ID 按钮
		
	}
	//添加验证id对应区块信息列表
	data.refreshOthorList = function(dt){
		var html = "";
		$.each(dt,function(index,info){
			if(info["mine"]){//有用户信息
				html += FINDEX.getOthorBlock(index+1,info);
				voterData = info["mine"]
			}else{
				html += FINDEX.getNomalBlock(index+1,info);
			}
		})
		$(".list-othor").fadeIn().html(html)
		$(".list-nomal,.list-my").hide();

		$(".mask").hide();//浮层隐藏

		$(".fieldbtns").hide();//隐藏看看我在哪里按钮
		$(".fieldbtns_my").fadeIn();//显示返回链顶端
		$(".getself").hide();//隐藏获取自己的投票ID 按钮
	}
	//添加事件
	data.addListeners = function(){
		//看看我在哪里
		$(".lookbtn").click(function(){
			curtype = "my";
			FINDEX.findMe();
		})
		// 验证投票区块信息
		$(".testbtn").click(function(){
			curtype = "othor";
			FINDEX.showPop("checkid");
		})
		//获取自己的投票ID
		$(".getself").click(function(){
			FINDEX.showLoading(true);
			main.getMyId(function(dt){
				if(dt.status == 200){
					if(dt.content.voteId){
						FINDEX.showPop("myid");
						$(".myidnum").html(dt.content.voteId)
					}else{
						FINDEX.showPop("message","您还未投票！");
					}
					
				}else{
					FINDEX.showPop("message",dt.message);
				}
				FINDEX.showLoading(false);
			})
		})
		//根据id验证
		$(".mertest").click(function(){
			if($(".idnum").val()){
				FINDEX.showLoading(true);
				main.getItemList($(".idnum").val(),function(dt){
					if(dt.status == 200){
						if(dt.content.data.length > 0){
							otherdata = dt.content.data;
							curdata = otherdata;
							FINDEX.refreshOthorList(dt.content.data)
						}else{
							FINDEX.showPop("message","此ID无效！");
						}
						
					}else{
						FINDEX.showPop("message",dt.message);
					}
					FINDEX.showLoading(false);
				})
			}else{
				//main.alert("请输入投票ID！")
				$(".tip").show().html("投票ID不能为空！")
			}
			
		})
		//区块详情
		$(".list-nomal,.list-my,.list-othor").on("click","li",function(index,dt){
			curIndex = $(this).index();
			console.log("curIndex---"+curIndex)
			var _type = $(this).attr("type");
			switch(_type){
				case "nomal":
					FINDEX.showPop("nomal")
					break;

				case "myinfo":
					///console.log("myvoteid----------"+myvoteid)
					if(myvoteid == ""){
						FINDEX.showLoading(true);
						main.getMyId(function(dt){
							FINDEX.showLoading(false);
							if(dt.status == 200){
								myvoteid = dt.content.voteId;
								//根据id获取区块详情信息
								main.getItemInfo(myvoteid,function(dt2){
									FINDEX.showLoading(false);
									if(dt2.status == 200){
										FINDEX.showPop("myinfo",dt2.content);//显示区块信息
									}else{
										FINDEX.showPop("message",dt2.message);
									}
									
								})
							}else{
								FINDEX.showPop("message",dt.message);
							}
						})
					}else{
						//根据id获取区块详情信息
						FINDEX.showLoading(true);
						main.getItemInfo(myvoteid,function(dt2){
							FINDEX.showLoading(false);
							if(dt2.status == 200){
								FINDEX.showPop("myinfo",dt2.content);//显示区块信息
							}else{
								FINDEX.showPop("message",dt2.message);
							}
							
						})
					}
					
					break;

				case "othorinfo":
					//根据id获取区块详情信息
					FINDEX.showLoading(true);
					main.getItemInfo($(".idnum").val(),function(dt){
						FINDEX.showLoading(false);
						if(dt.status == 200){
							FINDEX.showPop("othorinfo",dt.content);//显示区块信息
						}else{
							FINDEX.showPop("message",dt.message);
						}
					})
					
					break;
			}
		})

		//关闭
		$(".close,.inputback,.closebtn").click(function(){
			$(".mask").hide();
			$(".tip").hide();
		})

		//返回链顶端
		$(".backup").click(function(){
			$(".list-nomal").fadeIn();//最新区块
			$(".list-othor,.list-my").hide();//id对应区块  我所在区块 
			$(".fieldbtns").fadeIn();//看看我在哪里按钮
			$(".fieldbtns_my").hide();//返回链顶端

			curdata = newdata;
		})
	}
	//弹框展示
	data.showPop = function(_type,dt){
		$(".mask").fadeIn();
		$(".mask > div").hide();

		switch(_type){
			case "message"://我的投票id
				$(".message").fadeIn();
				$(".message > h4").html(dt)
				break;
			case "nomal"://普通区块信息
				console.log(curIndex)
				$(".blockInfobox").show();
				$(".blockInfobox > h4").html("第"+curdata[curIndex].blockNum+"号区块")
				$(".curbox").html("当前块hash:"+curdata[curIndex].currentHash.substr(0,6))
				$(".blockInfobox > p").html("上链时间  "+curdata[curIndex].onChainTime)
				break;
			case "myid"://我的投票id
				$(".myidbox").show();
				break;
			case "checkid"://验证投票id
				$(".inputbox").show();
				break;
			case "othorinfo"://投票ID对应块信息弹窗
				$(".chunkInfobox").show();
				$(".chunkInfobox > h4").html("第"+dt.blockNumber+"号区块");
				$(".chunkInfobox > .root_hash").html("Merkle Tree根节点:"+dt.rootHash.substr(0,6));

				//$(".node_hash_id").remove("p");
				var html = "<h5>证明Hash值</h5>"
				$.each(dt.proof,function(i,info){
					for(var key in info){
						if(key == "left"){
							html += "<p>左："+info[key].substr(0,6)+"</p>";
						}else{
							html += "<p>右："+info[key].substr(0,6)+"</p>";
						}
					}
				})
				$(".node_hash_id").html(html);
				// $(".othor_left").html("左:"+dt.proof.left);
				// $(".othor_right1").html("右:"+dt.proof.right[0]);
				// $(".othor_right2").html("右:"+dt.proof.right[1]);

				$(".chunkname").html(voterData.voterName);
				$(".chunktx").html("为"+voterData.memberName+"投出了"+dt.voteCount+"票");
				$(".chunkMyinfo .chunktime").html("上链时间  "+dt.onChainTime);

				break;
			case "myinfo"://我的投票ID对应块信息弹窗
				$(".chunkMyinfo").show();
				$(".chunkMyinfo > h4").html("第"+dt.blockNumber+"号区块");
				$(".chunkMyinfo > .root_hash").html("Merkle Tree根节点:"+dt.rootHash.substr(0,6));

				//$(".node_hash_my").remove("p");
				var html = "<h5>证明Hash值</h5>"
				$.each(dt.proof,function(i,info){
					for(var key in info){
						if(key == "left"){
							html += "<p>左："+info[key].substr(0,6)+"</p>";
						}else{
							html += "<p>右："+info[key].substr(0,6)+"</p>";
						}
					}
				})
				$(".node_hash_my").html(html);
				// $(".my_left").html("左:"+dt.proof.left);
				// $(".my_right1").html("右:"+dt.proof.right[0]);
				// $(".my_right2").html("右:"+dt.proof.right[1]);
				$(".mychunktx > span").html(voterData.memberName);
				$(".mychunktx > b").html(voterData.voteNum);
				$(".chunkMyinfo .chunktime").html("上链时间  "+dt.onChainTime);
				break;
		}
	}
	
	//获取普通链信息
	data.getNomalBlock = function(_index,_dt){
		var _li = li_empty;
		console.log(_index)
		var date = _dt.onChainTime.split(" ");

		_li = _li.replace("{{index}}",_index);
		_li = _li.replace("{{blockNum}}",_dt.blockNum);
		_li = _li.replace("{{voterCount}}",_dt.voterCount);
		_li = _li.replace("{{date}}",date[0]);
		_li = _li.replace("{{time}}",date[1]);

		return _li;
	}
	//获取本人所在链信息
	data.getMyBlock = function(_index,_dt){
		var _li = li_my;
		var date = _dt.onChainTime.split(" ");

		_li = _li.replace("{{index}}",_index);
		_li = _li.replace("{{blockNum}}",_dt.blockNum);
		_li = _li.replace("{{voterCount}}",_dt.voterCount);
		_li = _li.replace("{{voterName}}",_dt.mine.voterName);
		_li = _li.replace("{{memberName}}",_dt.mine.memberName);
		_li = _li.replace("{{avatar}}",main.formatAvata(_dt.mine.avatar));
		_li = _li.replace("{{voteNum}}",_dt.mine.voteNum);
		_li = _li.replace("{{date}}",date[0]);
		_li = _li.replace("{{time}}",date[1]);

		return _li;
	}
	//获取本人所在链信息
	data.getOthorBlock = function(_index,_dt){
		var _li = li_othor;
		var date = _dt.onChainTime.split(" ");

		_li = _li.replace("{{index}}",_index);
		_li = _li.replace("{{blockNum}}",_dt.blockNum);
		_li = _li.replace("{{voterCount}}",_dt.voterCount);
		_li = _li.replace("{{voterName}}",_dt.mine.voterName);
		_li = _li.replace("{{memberName}}",_dt.mine.memberName);
		_li = _li.replace("{{voteNum}}",_dt.mine.voteNum);
		_li = _li.replace("{{date}}",date[0]);
		_li = _li.replace("{{time}}",date[1]);

		return _li;
	}
	//加载进度
	data.showLoading = function(bol){
		if(bol){
			$(".loadingbox").fadeIn();
		}else{
			$(".loadingbox").hide();
		}
	}
}(window.FINDEX = {}));

FINDEX.init()