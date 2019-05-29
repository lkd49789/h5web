console.log(token);
var isloading = false;//是否在加载
		var flag = false;
		var _limit = 10;
		var _lastTime = 0;
		
		var activeInfo = new Vue({
	      	el: '#activeInfo',
	      	data: {
	      		activeNum:''
	      	},
	      	methods: {
	       		avtiveTodo:function(){	
	       			if(activeInfo.activeNum){
	       				$('#actBtn').attr("disabled",true)
       					var tpcdNum = activeInfo.activeNum;	       				
	       				var act = main.codeAct(token,tpcdNum,function(data){
	       					if(data.status==401){//登录已失效，请重新登录
	       						alert('aaa')
				                main.logInApp(function(){
				                    userInfo.setUserInfo(data)
				                   /* succ(data)*/
				                })    				                
				           	}else if(data.status == 200){
				           		main.alert("激活成功")
				           		activeInfo.activeNum='';
				           		userInfo.getUserInfo(function(){
				           			refleshList();//激活成功后更新列表
				           		});//投票成功后更新用户信息
				           		
				           		main.refleshAPP();
  		
				           	}else{
		       					main.alert(data.message)
		       					activeInfo.activeNum='';
//				           		main.alert("连续5次激活不存在的投票券30分钟内会被禁止再次激活");
				           }
		       				$('#actBtn').attr('disabled',false)
		       			},function(data){
		       				$('#actBtn').attr('disabled',false)
		       			})

	       			}else{
	       				main.alert("请输入投票券")
	       			}
	       		},
	       		scanCode:function(){	
	       			window.web.scanCode();
	       			
	       		}
	      	}
	    });
		    
		userInfo.getUserInfo(function(data){
			loadList()
		});//获取用户信息
		
		
		function loadList(){
			if(!isloading){
				isloading = true;
				main.codeActList(token,_limit,_lastTime,function(data){
//					alert('offset>>>'+offset)
					if(data.status==401){//登录已失效，请重新登录
		                // main.logInApp(function(){
		                //     userInfo.setUserInfo(data)
		                //     succ(data)
		                // })   
		           	}else if(data.status==200){
	//	           		activeInfo.infors = data.rows;
//						alert(JSON.stringify(data))
						if(data.content.data.length == 0){
							flag = true;
						}else{
							$.each(data.content.data, function(index,dt) {
								console.log(dt);
								var html = [];
								
								html.push("<li><span class='time'>"+ getDate(dt.actTime) +"</span><span class='form'>"+ dt.platform +"</span>激活<span class='piao'><i>"+ dt.actNum +"</i>票</span></li>")
								$('.activeList .mui-table-view').append(html.join(""));
							});
							_lastTime = data.content.lastTime
						}
		           	}else{
		           		main.alert(data.message);
		           	}
		           	isloading = false;
		           	
		        });
	        
			}

		}
		
	        
		
		function showresult(code_str){
   			activeInfo.activeNum = code_str;
   		}
	
			
       	function refleshList(){
       		$('.activeList .mui-table-view').html("");
       		flag = false;
       		_lastTime = 0;
       		loadList();
       		mui('#pullrefresh').pullRefresh().refresh(true);
       	}
	

	
//		document.getElementById("actBtn").addEventListener('tap', function() {
//		
//			alertPop("已经激活过了，不能重复")
//		});

		
		
		
		$('.mui-popup-button').on('tap',function(){
			var index = $(this).index();
			if(index==0){//确定
				$('.mui-popup').hide();
			}else{//取消
				$('.mui-popup').hide();
			}
		})
		
		
		function alertPop(da){
			$('.mui-popup-text').html(da);
			$('.mui-popup').show();
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
		
		
