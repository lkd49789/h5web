$.fn.initWall = function(){
	var defaults = { 
		APPLYCOUNT: 200,
		gridwidth: 10
	};
	

	//$(".home").css("cursor", "url('images/cross.cur'),default");
	
	var totalGrid = [];//包括用户已支付区域   以及  用户选择区域
	var usedGrid = [];//用户选择区域

	//线条粗
	var borderwidth = 2;
	//当前选区
	
	var curid = 1;//当前选区id
	var rectangle ;//当前选区area
	
	var area1 = 0;//选区是否可用   0 可用  1 不可用 
	var area2 = 0;
	var area3 = 0;

	var isDown = false;//是否按下
	var beginX = 0;
	var beginY = 0;
	var endX = 0;
	var endY = 0;

	var lengthX = 0;//宽
	var minX = 0;//坐标X
	var lengthY = 0;//宽
	var minY = 0;//坐标Y

	var step = 1;//只有在第一步可画选区
	var totalPix = 0;//总像素

	
	//已登录 则开始初始化
	if(checkTimeOut()){
		init();

	}

	//检查是否过期
	function checkTimeOut(){
		var lastTime = localStorage.getItem("USER_millionpixs_TIME");
		var loginInfo = localStorage.getItem("USER_millionpixs");

		var line_time = new Date().getTime() -lastTime - 1000*60*60*24*2;//间隔时间超过2天
		console.log(new Date().getTime() -lastTime)
		console.log(line_time)
		if(loginInfo == null || loginInfo == undefined || loginInfo == ""){
			gotoLogin()
		}
		if(lastTime == null || lastTime == undefined || lastTime == "" || line_time >= 0){
			gotoLogin()
		}else{
			return true;
		}
	}
	
	
	//初始化
	function init(){
		main.getData(function(dt){
			createWall(dt)
			if(dt.content.has_buy == 1){
				$(".right-panel").hide();
				$(".self-box").css("display","inline-block");
				console.log(dt.content.buy_time)
				$(".time").html("购买时间："+getDFormat(dt.content.buy_time))
			}else if(dt.content.has_buy == 0){
				$(".right-panel").css("display","inline-block");
				$(".self-box").hide();
			}
		})
		addUserInfo()
	}
	//个人信息
	function addUserInfo(){
		$(".u-info").attr("src",CONFIG.getSourceUrl()+main.getUserInfo().userInfo.avatar);
		$(".u-name").html(main.getUserInfo().userInfo.nickName);

	}
	//创建广告墙
	function createWall(dt){
		$.each(dt.content.buy_area,function(index,imgdata){
			var x = (parseInt(imgdata.startcol)-1)*10+"px";
			var y = (parseInt(imgdata.startrow)-1)*10+"px";
			var w = imgdata.colcount*10 + "px";
			var h = imgdata.rowcount*10 + "px";

			var img = "<img avata='"+CONFIG.getSourceUrl()+imgdata.userHeadimgurl+"' content='"+imgdata.content+"' uname='"+imgdata.userName+"' src='"+imgdata.imgUrl+"' style='left:"+x+";top:"+y+";width:"+w+";height:"+h+"'>"
			$(".img-wrapper").append(img);

			totalGrid.push(imgdata);
		})
		usedGrid = totalGrid;
	}
	
	function gotoLogin(){
		window.location.href = CONFIG.getWebUrl()+"index.html";
	}
	/*根据加入点的坐标和插入的宽高判断是否能够插入*/
	function checkAddableRecByPoint(startcol, startrow,x, y){
		//只要一个到边就返回false
		COLCOUNT = ROWCOUNT = 100;
		
		if (COLCOUNT + 1 <= startcol + x - 1 || ROWCOUNT + 1 <= startrow + y - 1) {
			return false;
		}

		//如果和任意点有交集返回false
		var gridNeedCheck = new Array();
		gridNeedCheck["startcol"] = startcol;
		gridNeedCheck["startrow"] = startrow;
		gridNeedCheck["colcount"] = x;
		gridNeedCheck["rowcount"] = y;

		for (var i = usedGrid.length - 1; i >= 0; i--) {
			if (checkIsIntersectAboutTwoPoint(usedGrid[i], gridNeedCheck)) {//两区域重合
				return false;
			}
		}
		return true;
	}

	/*判断两个格子是否相交*/
	function checkIsIntersectAboutTwoPoint(Grid1, Grid2){
		Grid1["startcol"] = parseInt(Grid1["startcol"]);
		Grid1["startrow"] = parseInt(Grid1["startrow"]);
		Grid1["colcount"] = parseInt(Grid1["colcount"]);
		Grid1["rowcount"] = parseInt(Grid1["rowcount"]);
		
		for (col = Grid1["startcol"] ; col < Grid1["startcol"] + Grid1["colcount"] ; col++) {
			for (row = Grid1["startrow"] ; row < Grid1["startrow"] + Grid1["rowcount"] ; row++) {
				if (col >= Grid2["startcol"]
					&& col <= Grid2["startcol"] + Grid2["colcount"] - 1
					&& row >= Grid2["startrow"]
					&& row <= Grid2["startrow"] + Grid2["rowcount"] - 1) {
					return true;
				}
			}
		}
		return false;
	}
	//添加事件
	// function addListeners(){
		$(this).mousedown(function(e){
			if(step != 1){
				return false;
			}
			if (isDown) {
				$(this).mouseup();
				return false;
			}

			/*初始化旋框的大小为1格子*/
			var Y = e.pageY-$(this).position().top;
			var X = e.pageX-$(this).position().left;
			beginX = parseInt(X/defaults.gridwidth)+1;
			beginY = parseInt(Y/defaults.gridwidth)+1;

			if (!checkAddableRecByPoint(beginX, beginY, 1, 1)) {
				//不许重叠
				return false;
			}
			rectangle = $(".area"+curid);
			rectangle.show();
			rectangle.css({
				"top":((beginY-1)*defaults.gridwidth)+"px", 
				"left":((beginX-1)*defaults.gridwidth)+"px",
				"width":(defaults.gridwidth-borderwidth*2)+"px",
				"height":(defaults.gridwidth-borderwidth*2)+"px"
			});

			minX = beginX;
			minY = beginY;
			lengthX = 1;
			lengthY = 1;
			rectangle.attr({"startcol":beginX,"startrow":beginY,"colcount":1,"rowcount":1})
			isDown = true;

			getTotalMoney();
		});
		$(this).mousemove(function(e){
			
			/*鼠标按下的时候才有事件响应*/
			var Y = e.pageY-$(this).position().top;
			var X = e.pageX-$(this).position().left;
			//
			$(".tip-alt").css({"left":(X+10)+"px","top":(Y-15)+"px"});
			if(step != 1){
				return false;
			}

			if (isDown) {
				
				endX = parseInt(X/defaults.gridwidth)+1;
				endY = parseInt(Y/defaults.gridwidth)+1;

				var maxX = Math.max(beginX, endX);
				varminX = Math.min(beginX, endX);
				var maxY = Math.max(beginY, endY);
				varminY = Math.min(beginY, endY);

				varlengthX = maxX - varminX + 1;
				varlengthY = maxY - varminY + 1;

				if (varlengthY * varlengthX > defaults.APPLYCOUNT /*||和其他重叠的情况*/) {
					return false;
				}
				if (!checkAddableRecByPoint(varminX, varminY, varlengthX, varlengthY)) {
					//有重叠部分不允许选中
					return false;
				}

				//通过后才赋值
				minX = varminX;
				minY = varminY;
				lengthX = varlengthX;
				lengthY = varlengthY;

				rectangle.attr({"startcol":varminX,"startrow":varminY,"colcount":lengthX,"rowcount":lengthY})

				rectangle.css({
					"top":((minY-1)*defaults.gridwidth)+"px", 
					"left":((minX-1)*defaults.gridwidth)+"px", 
					"width":(lengthX*defaults.gridwidth-borderwidth*2)+"px", 
					"height":(lengthY*defaults.gridwidth-borderwidth*2)+"px"
				});

				getTotalMoney()
				

				window.document.execCommand("Unselect",null,null);
			}
			
		});
		$(this).mouseup(function(){
			isDown = false;
		});
		//添加选区
		$(".btn-addarea").click(function(){

			if($(".area:visible").length <=0){
				showPop("msg","请先选择选区！");
				return false;
			}
			addArea(curid);

			
			$.each($(".area"),function(index,_dom){
				if($(_dom).css("display") == "none"){
					curid = index+1;
					return false;
				}else{
					curid = 0;
				}
				
			})
			
		})
		//删除选区
		$(".btn-delete").click(function(){
			$(this).parent().hide();
			var id = parseInt($(this).attr("id"));
			curid = id;
			$(".area"+curid).hide();
			$(".area"+curid).find("img").attr("src","").attr("style","");
			$(".btn-upload"+curid).attr("img-src","")

			getAreaInfo();//更新选区

			if(id == 1){
				area1 = 0;
			}else if(id == 2){
				area2 = 0;
			}else if(id == 3){
				area3 = 0;
			}
			//
			getTotalMoney()//刷新价格
		})
		//下一步 到上传图片页面
		$(".btn-next").click(function(){
			//不选选区无法下一步
			if($(".toolPanel .area-info-box").find("p:visible").length <= 0){
				showPop("msg","您还未添加选区！")
				return false;
			}

			step = 2;//第二步
			
			$(".toolPanel").hide();
			$(".uploadPanel").css("display","inline-block");

			$.each($(".toolPanel .area-info"),function(index,_dom){
				if($(_dom).css("display") != "none"){
					$(".uploadPanel .area-info").eq(index).show();
				}else{
					$(".uploadPanel .area-info").eq(index).hide();
					$(".area").eq(index).hide();
				}
			})
			
		})
		//上一步
		$(".btn-prev").click(function(){
			$(".toolPanel").show();
			$(".uploadPanel").hide()

			step = 1;//第1步
		})
		//上传图片
		$(".btn-upload").click(function(){
			if($(this).html() == "上传中"){//上传中时不允许继续上传
				return false;
			}
			var curid = $(this).attr("id");
			$(".fileToUpload").attr("curid",curid);
			$(".fileToUpload").click();
			//document.getElementById("fileToUpload1").click(); 
		})
		$(".fileToUpload").change(function(){
			var file = $(".fileToUpload").get(0).files[0];
			//console.log(file)
			//图片格式限定
			if(file.type.toLowerCase().indexOf("jpeg") < 0){
				showPop("msg","请上传JPEG格式的图片")
            	return false;
			}
			//图片不能超过1M
			if(file.size > 1000*1024){
				showPop("msg","图片不能超过1M")
            	return false;
        	}
        	console.log("file.type----"+file.type)
			var reader = new FileReader();
			if (file.type.match(/image*/))
	        {
	        	reader.onload = function (e)
	            {
	            	var formData = new FormData();
	            	var curid = $(".fileToUpload").attr("curid")
	            	var area = $(".area"+curid)
	            	var img = $(area).find("img");
	            	var w = parseInt($(area).attr("colcount"))*10-4+"px";
	            	var h = parseInt($(area).attr("rowcount"))*10-4+"px";
	            	
	            	img.attr("src", e.target.result);
	            	img.css({'width':w,'height':h,'vertical-align':'middle'});

	            	formData.append("file1", file);

	            	//解决同一个图片不能再次上传
				    $('input[type=file]').wrap('<form>').closest('form').get(0).reset();

	            	uploadToServer(formData,curid);
	            }
	            reader.readAsDataURL(file);
	        }
		})
		//提交购买
		$(".btn-buy").click(function(){
			
			var canupload = true;
			$.each($(".btn-upload:visible"),function(index,_dom){
				if($(_dom).attr("img-src") == ""){
					showPop("msg","请为选区上传图片！")
					canupload = false;
					return false;
				}
			})
			if(!canupload){
				return false;
			}
			showPop("pay",totalPix+"鸡腿")
			//console.log("upload")
			
		})
		//确认支付
		$(".btn-pay").click(function(){
			main.submitData(getSubmitData(),function(dt){
				if(dt.status == 400001){
					$(".tips").eq(0).css("opacity",1).html("所选区域已有像素被使用！");
					$(".uploadPanel .area-info").eq(0).addClass("light")
					$(".pop-panel").hide();
				}else if(dt.status == 400002){
					$(".tips").eq(1).css("opacity",1).html("所选区域已有像素被使用！");
					$(".uploadPanel .area-info").eq(1).addClass("light")
					$(".pop-panel").hide();
				}else if(dt.status == 400003){
					$(".tips").eq(2).css("opacity",1).html("所选区域已有像素被使用！");
					$(".uploadPanel .area-info").eq(2).addClass("light")
					$(".pop-panel").hide();
				}else if(dt.status == 200){
					$(".right-panel").hide();
					$(".self-box").css("display","inline-block");

					$(".pop-panel").hide();
				}else{
					showPop("msg",dt.message);
				}
				
			})
		})
		//添加鼠标移到选区后状态
		$(".img-wrapper").on("mouseover","img",function(){
			console.log("uavata")
			var uavata = $(this).attr("avata");
            var content = $(this).attr("content");
            var uname = $(this).attr("uname");

            $(".tip-alt").show();
            $(".u-avata").attr("src",uavata);
            $(".tip-alt > p").html(uname+":"+content)
		})
		$(".img-wrapper").on("mouseout","img",function(){
			
			$(".tip-alt").hide();
			
		})
		//关闭浮层
		$(".btn-close,.btn-cancel,.msk").click(function(){
			$(".pop-panel").hide()
		})
		//退出登录
		$(".btn-quit").click(function(){
			localStorage.removeItem('USER_millionpixs');
			gotoLogin();
		})
	// }
	//添加右侧选区信息
	function addArea(id){
		//console.log(id+":::"+area1+"---"+area2+"---"+area3)
		if(id == 1){
			area1 = 1;
		}else if(id == 2){
			area2 = 1;
		}else if(id == 3){
			area3 = 1;
		}else{

		}
		//console.log(area1+"---"+area2+"---"+area3)
		//添加已用选区到数组
		getAreaInfo()
	}
	//获取当前选区数据
	function getAreaInfo(){
		usedGrid = [];
		$.each($(".area"),function(index,_dom){
			//console.log($(_dom).css("display"))
			if($(_dom).css("display") != "none"){
				var startcol = parseInt($(_dom).attr("startcol"))
				var startrow = parseInt($(_dom).attr("startrow"))
				var colcount = parseInt($(_dom).attr("colcount"))
				var rowcount = parseInt($(_dom).attr("rowcount"))
				usedGrid.push({"startcol":startcol,"startrow":startrow,"colcount":colcount,"rowcount":rowcount});


				$(".area-info"+(index+1)).show();
				$(".info"+(index+1)).show().html("长 "+colcount*10+"像素 x 宽 "+rowcount*10+" 像素");
				$(".btn-upload"+(index+1)).attr({"w":colcount*10,"h":rowcount*10})
			}
		})
		usedGrid = usedGrid.concat(totalGrid);
		console.log(usedGrid)
	}

	/**
     * 上传文件到服务器
     * @private
    */

	function uploadToServer(formData,curid)
    {

    	$(".btn-upload"+curid).html("上传中");

        var settings = {
              "async": true,
              "crossDomain": true,
              "url": CONFIG.getUploadSmall(),
              "method": "POST",
              "headers": {},
              "processData": false,
              "contentType": false,
              "mimeType": "multipart/form-data",
              "data": formData
            }

            $.ajax(settings).done(function (data) {
                var dt = JSON.parse(data);
               	
                if(dt.status ==200){
                	// if(dt.content[0].picWidth.toString() != $(".btn-upload"+curid).attr("w") || dt.content[0].picHeight.toString() != $(".btn-upload"+curid).attr("h")){
                	// 	$(".tips").eq(curid-1).css("opacity",1).html("图片尺寸和所选区域不符，请重新选择!");
                	// 	$(".btn-upload"+curid).html("重新上传");
                	// 	$(".area"+curid).find("img").attr("src","").removeAttr("style");
                	// 	return false;
                	// }
                    $(".btn-upload"+curid).html("重新上传");
                    $(".btn-upload"+curid).attr("img-src",CONFIG.getUploadSourceUrl()+dt.content[0].picPath)
                }else{
                    
                    
                }
            });
    }
    //计算所有像素 总价
    function getTotalMoney(){
    	totalPix = 0;
    	$.each($(".area"),function(index,_dom){
    		if($(_dom).css("display") != "none"){//此选区被选择
    			var colcount = $(_dom).attr("colcount")
				var rowcount = $(_dom).attr("rowcount")
				var total = colcount*10*rowcount*10;
				totalPix += total;
    		}
    	})
    	$(".money-info").html(totalPix+"鸡腿 "+totalPix+"像素")
    }
    //获取需要提交的数据
    function getSubmitData(){
    	var areaData = [];
    	
    	$.each($(".area"),function(index,_dom){
    		if($(_dom).css("display") != "none"){//此选区被选择
    			
				var dt = {
					"startcol":$(_dom).attr("startcol"),
					"startrow":$(_dom).attr("startrow"),
					"colcount":$(_dom).attr("colcount"),
					"rowcount":$(_dom).attr("rowcount"),
					"content":$(".txt").eq(index).val(),
					"imgUrl":$(".btn-upload").eq(index).attr("img-src")
				}
				areaData.push(dt);
    		}
    	})

    	var submitData = {
    		"userId":main.getUserInfo().userInfo.userId, 
    		"userName":main.getUserInfo().userInfo.nickName,
    		"userHeadimgurl":main.getUserInfo().userInfo.avatar, 
    		"selectedList":areaData,
    		"version":"new"
    	};

    	submitData = JSON.stringify(submitData);
    	return submitData;
    	//console.log(submitData)
    }

    //弹出提示框
    function showPop(_type,_str){
    	$(".pop-panel").fadeIn();

    	if(_type == "pay"){
    		$(".pop-pay").show();
    		$(".pop-result").hide();
    		$(".money").html(_str);
    	}else{
    		$(".pop-pay").hide();
    		$(".pop-result").show();
    		$(".message").html(_str);
    	}
    }
}

