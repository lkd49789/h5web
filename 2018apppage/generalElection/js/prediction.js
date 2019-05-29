	
	var allMembers;

	init();

	function init(){
		main.getAllMembers(function(dt){
			//console.log(dt.rows);
			$.each(dt.rows,function(item,data){

				localStorage.setItem(data.sid,JSON.stringify(data));
				//console.log(data.sid)
			})


			main.getGuessmsg(function(dt){
				$.each(dt.content.memberIds,function(index,info){
					var index = index+1;

					var data = JSON.parse(localStorage.getItem(info));
					//console.log(data);
					if(data==null){

					}else{
						if(index==1){
							$('.topbox').html('<span class="tophead '+data.tname+'-bd" style="background-image:url('+CONFIG.getMerlink()+'zp_'+data.sid+'.jpg)"></span><p class="namebox"><span class="rank gold">'+index+'</span>'+data.sname+'</p><img src="img/crown.png" class="crown">');
							$('.tophead').css('height',$('.topbox').width());
						}else if(index==2 || index==3){
							var html=[];
							html.push('<li class="headbox">');
							html.push('<span class="tophead '+data.tname+'-bd" style="background-image:url('+CONFIG.getMerlink()+'zp_'+data.sid+'.jpg)"></span>');
							if(index==2){
								html.push('<p class="namebox"><span class="rank silver">'+index+'</span>'+data.sname+'</p>');
							}else if(index==3){
								html.push('<p class="namebox"><span class="rank copper">'+index+'</span>'+data.sname+'</p>');
							}else{}
							html.push('</li>');
							$('.list1').append(html.join(""));
							$('.tophead').css('height',$('.topbox').width());
						}else if(index==13 || index==14 || index==15 || index==16){
							var html=[];
							html.push('<li class="headbox">');
							html.push('<span class="tophead '+data.tname+'-bd" style="background-image:url('+CONFIG.getMerlink()+'zp_'+data.sid+'.jpg)"></span>');
							html.push('<p class="namebox"><span class="rank">'+index+'</span>'+data.sname+'</p>');
							html.push('</li>');
							$('.list3').append(html.join(""));
							$('.tophead').css('height',$('.topbox').width());
						}else{
							var html=[];
							html.push('<li class="headbox">');
							html.push('<span class="tophead '+data.tname+'-bd" style="background-image:url('+CONFIG.getMerlink()+'zp_'+data.sid+'.jpg)"></span>');
							html.push('<p class="namebox"><span class="rank">'+index+'</span>'+data.sname+'</p>');
							html.push('</li>');
							$('.list2').append(html.join(""));
							$('.tophead').css('height',$('.topbox').width());
						}
					}
				})

			})

		})

	}
