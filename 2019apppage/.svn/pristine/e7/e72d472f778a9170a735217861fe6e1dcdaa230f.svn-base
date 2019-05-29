$.getScript("../js/jquery.artDialog.min.js",function(){
	(function (d) {
		d['okValue'] = '确定';
		d['cancelValue'] = '取消';
		d['title'] = '消息';
		d['lock'] = true;
	})($.dialog.defaults);
});

$(function(){
	$("#postform a").click(function(){
		//$.dialog('四期生招募报名已结束！',function(){});
		//return false;
		var act = this.href.substr(this.href.lastIndexOf("#")+1);
		switch(act)
		{
			case "reset":
				$("#postform").get(0).reset();
				window.scrollTo(0,964);
			break;
			case "submit":
				if(!/^[\u4E00-\u9FA5]{2,6}$/.test($("#name").val()))
				{
					$.dialog('请正确填写姓名！',function(){});
					return false;
				}
				else if(!/^[\u4E00-\u9FA5]+$/.test($("#nation").val()))
				{
					$.dialog('请正确填写民族！',function(){});
					return false;
				}
				else if(!/^[\d\w]{5,18}$/.test($("#idcard").val()))
				{
					$.dialog('请正确填写身份证或海外护照！',function(){});
					return false;
				}

				var d = new Date(parseInt($("#birthday_year").val()),parseInt($("#birthday_month").val())-1,parseInt($("#birthday_day").val()));

				if(isNaN(d.getMonth()) || $("#birthday_month").val() != d.getMonth()+1)
				{
					$.dialog('请正确选择出生年月！',function(){});
					return false;
				}
				else if(isNaN(parseFloat($("#height").val())) || isNaN(parseFloat($("#weight").val())))
				{
					$.dialog('请正确填写身高和体重！',function(){});
					return false;
				}
				else if(!/\w@\w+\.\w/.test($("#email").val()))
				{
					$.dialog('请正确填写邮箱地址！',function(){});
					return false;
				}
				else if(!/1\d{10}/.test($("#phone_own").val()) && $("#phone_non_prc").val().length < 5)
				{
					$.dialog('请正确填写你的手机号码！',function(){});
					return false;
				}
				else if(!/1\d{10}/.test($("#phone_guardian").val()) && $("#phone_non_prc").val().length < 5)
				{
					$.dialog('请正确填写你的监护人手机号码！',function(){});
					return false;
				}

				else if($("#weibo").val().length < 5)
				{
					$.dialog('请正确填写你的新浪微博！',function(){});
					return false;
				}
				else if($("#city").val() == '' || $("#city").val().indexOf("选择") > -1)
				{
					$.dialog('请选择你所在的地区！',function(){});
					return false;
				}
				else if($("#address").val().length < 5 && $("#address_non_prc").val().length < 5)
				{
					$.dialog('请正确填写你的家庭住址！',function(){});
					return false;
				}
				else if($("#postform input:hidden[name='upload_idcard']").size() == 0)
				{
					$.dialog('请上传身份证件图！',function(){});
					return false;
				}
				else if($("#postform input:hidden[name^='upload_bust']").size() == 0)
				{
					$.dialog('请上传上半身正面照！',function(){});
					return false;
				}
				else if($("#postform input:hidden[name^='upload_full']").size() == 0)
				{
					$.dialog('请上传单人全身照！',function(){});
					return false;
				}
				$(this).attr("disabled","disabled");
				$("#postform").submit();
			break;
			default:
				return true;
		}
		return false;
	});
	var sel = $("#postform select[name='birthday_year']");
	for(var i=1985;i<2013;i++)
	{
		sel.append($("<option />",{"text":i}));
	}
	var sel = $("#postform select[name='birthday_month']");
	for(var i=1;i<13;i++)
	{
		sel.append($("<option />",{"text":i}));
	}
	var sel = $("#postform select[name='birthday_day']");
	for(var i=1;i<32;i++)
	{
		sel.append($("<option />",{"text":i}));
	}

	//城市选择
	new PCAS("province","city");

	//上传控件
	$.getScript("join/static/fileuploader/fileuploader.js",function(){
		var dialog = null;
		new qq.FileUploader({
			allowedExtensions: ['gif','jpg','png','bmp'],
			element: document.getElementById('upload_idcard'),
			action: 'join/upload.php',
			onComplete: function(id, name, ret){
							if(ret.success)
							{
								if($("#postform input:hidden[name='upload_idcard']").size() > 0){
									return;
								}
								$("#postform").append($("<input />",{"value":ret.filename,"type":"hidden","name":"upload_idcard"}));
								$("#idcard_show").append(
									$("<img />",{
													"src":'join/'+ret.filename.substring(0,ret.filename.lastIndexOf("."))+"_thumb.jpg",

													"title":"点击取消图片，重新上传",

													"click":function(){
																var that = $(this);
																$.dialog('是否取消该图片，重新上传？',function(){
																	that.remove();
																	$("#postform input:hidden[value='"+ret.filename+"']").remove();
																	$("#idcard_show").hide();
																},function(){});
															}
												})
								);



								$("#idcard_show").show();
							}
							if(dialog) dialog.time(2200).content("身份证件图上传成功！");
						},
			onSubmit: function(){
							if($("#postform input:hidden[name='upload_idcard']").size() > 0)
							{
								if(confirm("您已经上传过身份证件图，是否需要重新上传？"))
									$("#postform input:hidden[name='upload_idcard']").remove();
								else
									return false;
							}
							dialog = $.dialog('身份证件图上传中...');
					  }
		});


		$.each(['upload_bust','upload_full'],function(i,id){
			var dialog = null;
			new qq.FileUploader({
				allowedExtensions: ['gif','jpg','png','bmp'],
				element: document.getElementById(id),
				action: 'join/upload.php',
				sizeLimit: 1024*1024,
				onComplete: function(i, name, ret){
								if(ret.success)
								{
									if($("#postform input:hidden[name^='"+this.element.id+"']").size() >= 3){

											return ;	

									}
									$("#postform").append($("<input />",{"value":ret.filename,"type":"hidden","name":this.element.id+"[]"}));
									$("#"+this.element.id).parent().children(".ppbox:empty:eq(0)").append(
										$("<img />",{
														"src":'join/'+ret.filename.substring(0,ret.filename.lastIndexOf("."))+"_thumb.jpg",
														"width":78,
														"title":"点击取消该照片",
														"click":function(){
																	var that = $(this);
																	$.dialog('是否取消该照片？',function(){
																		that.remove();
																		$("#postform input:hidden[value='"+ret.filename+"']").remove();
																	},function(){});
																}
													})
									);
								}
								if(dialog) dialog.close();
								$(".d-mask").remove();
							   $(".d-state-lock").parent().remove();
							},
				onSubmit: function(){
								if($("#postform input:hidden[name^='"+this.element.id+"']").size() >= 3)
								{
									alert("只允许上传3张！");
									return false;
								}
								dialog = $.dialog('照片上传中...');
						  }
			});
		});
	});
});





















