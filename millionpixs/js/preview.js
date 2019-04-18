init();
	
	//初始化
	function init(){
		$.ajax({
            url:  CONFIG.getLink()+"api/48game/v1/query/index",
            type: "POST", 
            async:true,
            contentType: "application/json; charset=utf-8",
            // beforeSend: function (request) {
            //      request.setRequestHeader("token", main.getToken());
            // },
            data: JSON.stringify({
                "userId":"0"
            }),
            timeout: 15000, 
            dataType:"json",
            success: function (data) { 

                if(data.status == 200){
                    createWall(data)
                }
                setTimeout(function(){
                    init();
                },10*1000)
            }, 
            error: function (jqXHR, textStatus, errorThrown) { 
//               alert("eee");
            } 
        });
		
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
		})
	}


    $(".btn-go").click(function(){
        window.location.href = "login.html"
    })

    $(".img-wrapper").mousemove(function(e){
            
            /*鼠标按下的时候才有事件响应*/
            var Y = e.pageY-$(this).position().top;
            var X = e.pageX-$(this).position().left;
            //
            $(".tip-alt").css({"left":(X+10)+"px","top":(Y-15)+"px"});
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
            console.log("mouseout")
            $(".tip-alt").hide();
            
        })