var sid = localStorage.getItem("CUR_MEMBER_ID");
//alert("sid---"+sid)
		
		var meInfo = new Vue({
	      	el: '#memberInfo',
	      	data: {
	      		submitText:'',
	         	infors:[]
	      	},
	      	methods: {
	       		submitTodo:function(){
	       			if(Number($(".votenum").html()) < Number(meInfo.submitText)){
       					main.alert("可投票数量不足")
       				}else{
			       			var tpn = parseInt(meInfo.submitText*100);
			       			if(tpn>0 && tpn%10==0){
			       			//if (meInfo.submitText) {
			       				$('#submitTicket').attr('disabled',true)
			       				var voteNum = meInfo.submitText;
				      	  	  	//登录用户投票
							    main.userVote(token,sid,voteNum,function(data){
							    	$('#submitTicket').attr('disabled',false);
							    	
							    	if(data.status==401){//登录已失效，请重新登录
						                main.logInApp(function(){
						                    userInfo.setUserInfo(data)
		//				                    succ(data)
						                })
						                
						           	}else if(data.status==200){
							    		main.alert("投票成功");
							    		
							    		userInfo.refreshUserInfo(function(){
							    			main.voteSumList(function(data1){})//添加投票记录缓存
							    		});//投票成功后更新用户信息
							    		meInfo.submitText ='';
							    		
							    		main.refleshAPP();
							    		
							    		localStorage.setItem("voteListRandom",Math.random())
							    			
							    	}else{
							    		main.alert(data.message);
							    	}
							    	
							    },function(data){
							    	$('#submitTicket').attr('disabled',false);
							    });

					      	}else{
					      		main.alert('请输入正确的投票数量')
					      	}

					}
	       		}
	      
	      	}
	    });
	    
		
 		var userRest = userInfo.getUserInfo(function(data){
// 			alert('获取用户信息');
 		});
 		//alert("------"+localStorage.getItem("SID"+sid))
		meInfo.infors = JSON.parse(localStorage.getItem("SID"+sid));
		var arr_1 = JSON.parse(localStorage.getItem("SID"+sid)).hobby.split(/[，、 ]/);			
		var arr_2 = JSON.parse(localStorage.getItem("SID"+sid)).speciality.split(/[，、 ]/);
		
		var arr = arr_1.concat(arr_2);	
		var temp = new Array();
		for (var i in arr) {
			//该元素在tmp内部不存在才允许追加
			if (temp.indexOf(arr[i]) == -1&& arr[i]!='') {
					temp.push(arr[i]);
			}
		}
		
		for (var i in temp) {
			$('.skill dl').append("<dd>"+ temp[i] +"</dd>");
		}

		$('.memberList').html(JSON.parse(localStorage.getItem("SID"+sid)).experience);

// 		alert($('.memberList').css('font-size'))

			
			
   		


 Vue.filter('Avata', function (sid) {
  return CONFIG.getPicUrl()+'zp_'+ sid +'.jpg';
});