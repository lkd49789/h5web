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
		                    loadList()
		//				    succ(data)
		                })
		                
		           	}else{
		          		isloading = false;
		          		//alert("data>"+JSON.stringify(data))
		          		if(data.errcode==0){
		          			if(data.rows!=""&&data.rows!=undefined&&data.rows!=null){
		          				$.each(data.rows, function(i,result) {
					       			var html = [];
					       			
					       			
									// if(result.hasOwnProperty("analyse_time") && result.analyse_time!=null){
									// 	html.push("<li><img src='images/icon-arrow.png'><div class='circle'></div><div class='date'><strong>"+ split(result.analyse_time,0) +"</strong><p>"+ split(result.analyse_time,1) +"</p></div>");
				     //   					html.push("<div class='card bg-fault'><h2>故障分析</h2><div class='desc'></div></div></li>")//"+ result.analyseInfo +"
									// }
									if(result.hasOwnProperty("deal_info") && result.deal_time!=null){
						       			html.push("<li><img src='images/icon-arrow.png'><div class='circle'></div><div class='date'><strong>"+ split(result.deal_time,0) +"</strong><p>"+ split(result.deal_time,1) +"</p></div>");					
										html.push("<div class='card bg-fault'><h2>处理意见</h2><div class='desc'>"+ result.deal_info +"</div></div></li>")
									}
									if(result.hasOwnProperty("accept_time") && result.accept_time!=null){
				       					html.push("<li><img src='images/icon-arrow.png'><div class='circle'></div><div class='date'><strong>"+ split(result.accept_time,0) +"</strong><p>"+ split(result.accept_time,1) +"</p></div>");
										html.push("<div class='card bg-fault'><h2>故障受理</h2></div></li>")
					       			}

									html.push("<li><img src='images/icon-arrow.png'><div class='circle'></div><div class='date'><strong>"+ split(result.submit_time,0) +"</strong><p>"+ split(result.submit_time,1) +"</p></div>");
					       			html.push("<div class='card bg-fault'><h2>故障内容</h2><div class='desc'>"+ result.submit_info +"</div></div></li>")
					       			
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
	   		$("#bugHistory").css("height",$("body").height()-$("footer").height()-10)
	   }