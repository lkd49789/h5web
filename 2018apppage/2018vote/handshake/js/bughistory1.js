var isloading = false;//是否在加载
var flag = false;
var limit = 3;
var offset = 0-limit;



	loadList()
	    
    	
	    function loadList(){
	   		if(!isloading){
	   			offset += limit;
	   			isloading = true;
	   			//alert(offset+"=="+limit)
		   		var bugList = main.feedback(offset,limit,function(data){
					if(data.errcode == "119" || data.errcode == "114" || data.errcode == "101"){//登录已失效，请重新登录
		                main.logInApp(function(){
		//				    succ(data)
							loadList()
		                })
		                
		           	}else{
		          		isloading = false;
		          		if(data.errcode==0){
		          			if(data.rows!=""&&data.rows!=undefined&&data.rows!=null){
		          				$.each(data.rows, function(i,result) {
					       			var html = [];
					       			html.push("<li><div class='date'><strong>"+ result.submit_time +"</strong></div>");
					       			html.push("<div class='info'><p class='result'>故障内容</p><p class='intro'>"+ result.submit_info +"</p></div></li>")
					       			
					       			if(result.hasOwnProperty("accept_time") && result.accept_time!=null){
										html.push("<li><div class='date'><strong>"+ result.submit_time +"</strong></div>");
					       				html.push("<div class='info'><p class='result'>故障受理</p><p class='intro'></p></div></li>")
					       			}
									if(result.hasOwnProperty("deal_info") && result.deal_time!=null){
										html.push("<li><div class='date'><strong>"+ result.deal_info +"</strong></div>");
					       				html.push("<div class='info'><p class='result'>处理意见</p><p class='intro'></p></div></li>")
									}
									//html.push("</ul>")
									$(".mui-table-view").append(html.join(""));
				
				           		});
		          			}else{
		          				
		          				if(offset == 0){
		          					$(".listDiv").html("<h1 style='margin: 50px auto;text-align: center;'>您没有未处理的故障</h1>")
		          				}
		          			}
		          			if(data.rows.length <limit){//数据小于一页 则表示后面无数据
		          				flag = true;
		          			}
		          		}else{
		          			main.alert(data.errmsg)
		          		}
		           	}
	    		},function(){//error
	    			offset -= limit;
	    			isloading = false;
	    		})
			}
	   }

	   
	   init()
		function init(){
			resetScrollHeight()
			mui.init({
					pullRefresh: {
						container: '#pullrefresh',	
						up: {//上拉加载
							contentrefresh : "正在加载",//可选，正在加载状态时，上拉加载控件上显示的标题内容
							contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
							callback: callback
						}
					}
				});
				function callback(){				
					var self = this;
					setTimeout(function(){
			            loadList();
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(flag);
//						this.endPullupToRefresh(flag);
			        }, 300);
				}
		}
	   
	   
	   function split(string,i){
	   		var arr = string.substring(5).split(" ");
	   		return arr[i];
	   }
	    
	   function resetScrollHeight(){
	   		$("#bugHistory").css("height",$("body").height()-10)
	   }