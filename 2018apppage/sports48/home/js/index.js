(function(data) {
	var item_url = "";//要跳转的url
	var canloading = true;
	data.init = function(){
	
		LOGIN.addListeners();
	}

	//添加事件
	data.addListeners = function(){

		//登录提交
		$(".submit_btn").click(function(){
			LOGIN.logIn()
		})
		//输入框激活 初始化tip
		$(".loginbox input").blur(function(){
			$(".remind").removeClass("tip").html("")
		})

		//验证码刷新
		$(".token_value").click(function(){
			$(".token_value img").attr("src","")
			$(".token_value img").attr("src",main.getCode())
			
		})

			//打开相对应的弹窗
			$('.listLi').click(function(){
				var val = $(this).attr('val');
				if(val.toString() == "1"){
					main.hrefTo('https://h5.48.cn/2018apppage/sports48/fashion/result.html');
				}else if(val.toString() == "2"){
					main.hrefTo('https://h5.48.cn/2018apppage/sports48/champion/result.html');
				}else if(val.toString() == "3"){
					$('.mask,.divbox'+val).show();
					$('.divbox'+val).find('.close').attr('val',val);
				}
				
			})
			//关闭相对应的弹窗
			$('.close').click(function(){
				var val=$(this).attr('val');
				$(this).parents('.mask,.divbox'+val).hide();
			})
			//跳转最佳表现奖
			$('.fashion_btn').click(function(){
				item_url = "https://h5.48.cn/2018apppage/sports48/fashion/result.html"
				if(checkFromApp()){
					main.hrefTo('https://h5.48.cn/2018apppage/sports48/fashion/result.html');
					//if(!canloading){
						//return false
					//}
					//canloading = false;
					//main.ifvote(function(dt){
						//if(dt.status==200){
							//console.log(dt.content);
							//if(dt.content.hasVoted==true){//已投票
								//main.hrefTo('https://h5.48.cn/2018apppage/sports48/fashion/field.html');
							//}else{
								//main.hrefTo('https://h5.48.cn/2018apppage/sports48/fashion/index.html');
							//}
						//}else{
							//main.hrefTo('https://h5.48.cn/2018apppage/sports48/fashion/index.html');
						//}
						//canloading = true;
					//})
					
				}else{
					//判断是否已经登录
					// main.checkLogIn(function(dt){
					// 	if(dt.status==200){
					// 		main.hrefTo('https://h5.48.cn/2018apppage/sports48/fashion/index.html');
					// 	}else{
					// 		$('#logsec').show();
					// 	}
					// })

					LOGIN.submit(LOGIN.getUname(),LOGIN.getPass())
				}
			})
			//跳转冠军竞猜
			$('.champion_btn').click(function(){
				item_url = "https://h5.48.cn/2018apppage/sports48/champion/result.html"
				if(checkFromApp()){
					main.hrefTo('https://h5.48.cn/2018apppage/sports48/champion/result.html');
				}else{
					//判断是否已经登录
					// main.checkLogIn(function(dt){
					// 	if(dt.status==200){
					// 		main.hrefTo('https://h5.48.cn/2018apppage/sports48/champion/index.html');
					// 	}else{
					// 		$('#logsec').show();
					// 	}
					// })
					LOGIN.submit(LOGIN.getUname(),LOGIN.getPass())
				}
			})
			//跳转排行榜
			$('.ranklink').click(function(){

				main.hrefTo('https://h5.48.cn/2018apppage/sports48/home/ranking.html');
			})
			//百万应援墙
			$(".support_btn").click(function(){
				main.hrefTo('https://1m.48.cn/preview.html');
			})



			$(".back_btn").click(function(){
				$('#logsec').hide();
			})
		
	}
	data.getUname = function(){
        var u_name = localStorage.getItem("sports48_uname");
        console.log("u_name---"+u_name)
        if(u_name == null || u_name == undefined){//
           $('#logsec').show();
           return false;
        }else{
            return u_name;
        }
    }
    data.getPass = function(){
        var u_pass = localStorage.getItem("sports48_upass");
        console.log("u_pass---"+u_pass)
        if(u_pass == null || u_pass == undefined){//
           $('#logsec').show();
           return false;
        }else{
            return u_pass;
        }
    }
	//登录验证
	data.logIn =function(){
		
		if($(".username").val() == ""){
			LOGIN.showTip("请输入口袋48账号！")
			
			return false;
		}

		if($(".password").val() == ""){
			LOGIN.showTip("请输入密码！")
			return false;
		}

		LOGIN.submit($(".username").val(),$(".password").val())
	}
	//登录提交
	data.submit = function(uname,upass){
		if(uname == null || uname == undefined || uname == ""){
			return false;
		}else{
			localStorage.removeItem("sports48_login");
			main.logIn(uname,upass,function(dt){
				if(dt.status  == 200){
					$('#logsec').hide();
					localStorage.setItem("sports48_login",JSON.stringify(dt));
					localStorage.setItem("sports48_uname",uname);
					localStorage.setItem("sports48_upass",upass);
					
					main.ifvote(function(dt){
						if(dt.status==200){
							console.log(dt.content);
							if(item_url.indexOf("/fashion/") >= 0){
								//if(dt.content.hasVoted==true){//已投票
									item_url = 'https://h5.48.cn/2018apppage/sports48/fashion/field.html'
									
								//}else{
									//item_url = 'https://h5.48.cn/2018apppage/sports48/fashion/index.html';
								//}
							}
						}else{
							//item_url = 'https://h5.48.cn/2018apppage/sports48/fashion/index.html';
						}
						canloading = true;
						main.hrefTo(item_url);
					})
					
				}else{
					//alert(dt.errmsg);
				}
			})
		}
	}
	//显示提示信息
	data.showTip = function(str){
		if(!$(".remind").hasClass("tip")){
			$(".remind").addClass("tip")
		}

		$(".remind").html(str)
	}

}(window.LOGIN = {}));

LOGIN.addListeners()