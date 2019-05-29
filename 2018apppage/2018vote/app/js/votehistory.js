var isloading = false;//是否在加载
		var flag = false;
		var _limit = 10;
		var _lastTime = 0;
		
		
	    var voteListVM = new Vue({
		      el: '#vue-votelist',
		      data: {
		        voteSums : []
		      },
		      methods: {
		       	hrefTo:function(num){//点击投票
			        localStorage.setItem("CUR_MEMBER_ID",num)
			        main.hrefTo("member.html")				       				       		
		       	}
		      
		      }
	    });

	 
	    userInfo.getUserInfo(function(data){
	    	loadList()
	    });
	    

			
		
		function loadList(){
			if(!isloading){
				isloading = true;
				main.voteList(token,_limit,_lastTime,function(data){
//					alert('offset>>>'+offset)
					if(data.status==401){//登录已失效，请重新登录
		                main.logInApp(function(){
		                    userInfo.setUserInfo(data)
		                    succ(data)
		                })   
		           }else if(data.status==200){
//						alert(JSON.stringify(data))
						if(data.content.data.length == 0){
							flag = true;
						}else{
							$.each(data.content.data, function(index,dt) {
								var html = [];
							
								html.push("<li><span class='time'>"+ getDate(dt.voteTime) +"</span><span class='form'>"+dt.platform+"</span><span class='mername'>"+ dt.memberName +"</span><span class='piao'><i>"+ dt.voteNum +"</i>票</span></li>")
								$('.voteList .mui-table-view').append(html.join(""));
							});
							_lastTime = data.content.lastTime;
							
							var vote_Sumlist = main.voteSumList(token,function(data){ //获取投票top5列表
								console.log(data);
					         	if(data.status==401){//登录已失效，请重新登录
					                main.logInApp(function(){
					                    userInfo.setUserInfo(data)
					                    succ(data)
					                })
					                
					           	}else if(data.status==200){
					           		var tepdata= data.content.data
					           		$.each(tepdata,function(j,mdt){
					           			var curM = JSON.parse(localStorage.getItem("SID"+mdt.sid));
					           			tepdata[j].photoimage = CONFIG.getPicUrl()+'zp_'+ mdt.sid +'.jpg';
					           			tepdata[j].group_id= curM.gname;
					           			tepdata[j].team_name= curM.tname;
					           		})
						          	voteListVM.voteSums = tepdata;
						        }else{
						        	main.alert(data.message);
						        }
					        });
					        
					        userInfo.setLocalUserInfo();
						}					
		           	}else{
						main.alert(data.message)
					}
					isloading = false;	
		        });
	        
			}

		}

	
		init()
		function init(){
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
		
		
		$('.vote-num').on('click',function(){
			$('.memberNumList').slideToggle();
			$('.vote-num span:last-child').toggleClass("rotate")
		})
		
		
		//监测投票记录信息
		var NUM_1 = localStorage.getItem("voteListRandom");
		 if(localRandom != null){
            clearInterval(localRandom)
       }		
		var localRandom = setInterval(function(){
			
			if(NUM_1!=localStorage.getItem("voteListRandom")){
//				alert(NUM_1)
       			voteListVM.voteSums = JSON.parse(localStorage.getItem("localVoteSumList")).data;
       			refleshList()
       			NUM_1 = localStorage.getItem("voteListRandom");
			}
		},1000);

    	
    						
		function refleshList(){
       		$('.voteList .mui-table-view').html("");
       		flag = false;
       		_lastTime = 0;
       		loadList();
       		mui('#pullrefresh').pullRefresh().refresh(true);
       	}
		