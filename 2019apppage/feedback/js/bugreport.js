		var picArr = [];//上传图片数组
		var src = [];
		var pic = "";
		var flag = false;
		// var sys = GetQueryString("systemdata")
		// if(sys != undefined && sys != null){
		// 	sys = sys.toLowerCase()

		// 	if(sys.indexOf("ios10")>0 ||sys.indexOf("ios9")>0 || sys.indexOf("ios8")>0 || sys.indexOf("ios7")>0){
		// 		$("#postform").hide()
		// 	}
		// }
		


			$('.applyBtn').click(function(){
				var phone = $('.tel').val();
				//var type = $("#selected").val();
				var submit_info = $("#textarea").val();	
			
				if(submit_info==""||submit_info==null||submit_info==undefined){
					main.alert("请写下您的建议和问题");
				// }else if(phone==""||phone==null||phone==undefined){
				// 	main.alert("请输入手机号");
				}else{
					
					$(":file").each(function(index, element) {
						var files = $(this)[0].files;
	                    if (files.length > 0) {
	                        picArr.push(files[0]);
	                    }
					});
					if(!flag){
						flag = true;
						$('.applyBtn').attr({
								'value':'提交中...',
								'disabled':true
							})
						if (picArr.length > 0) {
								uploadFile(picArr, function(){
//									alert("phone----"+phone+"type------"+type+"submit_info------"+submit_info+"pic----"+pic)	
									subreport(phone,pic,submit_info)
								})
						}else{
							subreport(phone,pic,submit_info)
						}
	
					}
				}
		})
		
		
		function subreport(phone,pic,submit_info){
			if(checkLoginApp()){
				main.submitReport(pic,submit_info,function(data){
					if(data.status == 200){
		            	picArr = []
		            	pic = ""
		            	$('.tel').val('');
						$("#textarea").val('');	
						$('.count-content span').html("0")
						localStorage.setItem("FEEDBACK_APP_NEW","1")
						
						//main.alert('提交成功');
						mui.alert('提交成功', '', function() {
	            			snhGoBack()
	        			});
		            }else{
						main.alert(data.errmsg)
		           	}
					flag = false;	
					$('.applyBtn').attr({'value':'提交','disabled':false})
				},function(data){
					flag = false;	
					$('.applyBtn').attr({'value':'提交','disabled':false})
				})
			
			}else{
				main.submitReport1(pic,submit_info,function(data){
					if(data.status == 200){
		            	picArr = []
		            	pic = ""
		            	$('.tel').val('');
						$("#textarea").val('');	
						$('.count-content span').html("0")
						localStorage.setItem("FEEDBACK_APP_NEW","1")
						
						//main.alert('提交成功');
						mui.alert('提交成功', '', function() {
	            			snhGoBack()
	        			});
		            }else{
						main.alert(data.errmsg)
		           	}
					flag = false;	
					$('.applyBtn').attr({'value':'提交','disabled':false})
				},function(data){
					flag = false;	
					$('.applyBtn').attr({'value':'提交','disabled':false})
				})
			}
		}

		
		
		function uploadFile(files, callback,error) {
		    var form = new FormData();
		    for (var i in files) {
	            if (files.hasOwnProperty(i)) {
		            var file = files[i];
		            form.append("file" + i, file);
		        }
		    }
		    $.ajax({
		        "async": true,
                "crossDomain": true,
		        "url": 'https://gsupload.48.cn/filesystem/upload/smallfile',
		        //"url": 'https://pfile.48.cn/filesystem/upload/image',
		        "method": "POST",
                "headers": {},
                "processData": false,
                "contentType": false,
                "mimeType": "multipart/form-data",
		        "data": form,
		        success: function (response) {
		        	var data = JSON.parse(response);
		        	if(data.status==200){
//		        		main.alert("上传图片成功");
		        		$(":file").remove();
						$("#preview img:visible").remove();
						$("#preview :hidden,#addimg").show();
						countImg=0;
		        		$.each(data.content, function(i,item) {
		        			src.push(CONFIG.getUploadPicPath()+item.picPath);
		        		});
		        		pic = src.join(";");
	        			console.log(pic);
	        			callback();
	
		        	}
		           
		        }, error: function (err) {
					error();
		        }
		    });
		}
		

		function checkLength(num,which,obj) {
		    var maxChars = num;
		    if (which.value.length > maxChars){
		        alert("您出入的字数超多限制!");
		        which.value = which.value.substring(0,maxChars);
		        return false;
		    }else{
		        var curr = which.value.length; 
		        obj.html( curr.toString() );
		        return true;
		    }
		}
	
	
		$('.content').on('input',function(){
			checkLength(200,this,$('.count-content span'))
		});
		
		//图片上传预览    IE是用了滤镜。
	var countImg = 0;
	var size = '';

	function previewImage(file) {
		var MAXWIDTH = 80;
		var MAXHEIGHT = 80;
		var div = document.getElementById('preview');
		countImg++;
		size = file.files[0].size/1024;
//		alert(size)
		if(size<=2*1024){
				if (file.files && file.files[0]) {
					div.innerHTML += '<img id=imghead' + countImg + '>';
					var img = document.getElementById('imghead' + countImg);
					
					img.onload = function() {
						var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
						img.width = rect.width;
						img.height = rect.height;
						//img.style.marginTop = rect.top+'px';
					}
					$(div).before($(file).clone().attr({
						"id": "fileImg" + countImg,
						"class": "fileImg"
					}).hide());
					var reader = new FileReader();
					reader.onload = function(evt) {
						img.src = evt.target.result;
					}
					reader.readAsDataURL(file.files[0]);
					if ($("#fileImg" + countImg).val() != "") //360浏览器克隆后的file无法保留文件名
						$(".tempimg_file").remove();
					else
					$("#fileImg" + countImg).remove();
					$(".tempimg_file").hide();
					$(".defimg").hide();
					
					
				}
				if (countImg == 5) {
					$("#addimg").hide();
					return;
				}
				$("#addimg").append($('<input class="tempimg_file" type="file" onchange="previewImage(this)" style="opacity:0" />'));
				$(".tempimg_file").css({
					"width": $("#addimg").width() + "px",
					"height": $("#addimg").height() + "px"
				});
		}else{
//			main.alert("请上传小于1M的图片")
			$('.layer').show();
			$('.layer p').html("请上传小于2M的图片")
		}
		
	
	}

	function clacImgZoomParam(maxWidth, maxHeight, width, height) {
		var param = {
			top: 0,
			left: 0,
			width: width,
			height: height
		};
		if (width > maxWidth || height > maxHeight) {
			rateWidth = width / maxWidth;
			rateHeight = height / maxHeight;

			if (rateWidth > rateHeight) {
				param.width = maxWidth;
				param.height = Math.round(height / rateWidth);
			} else {
				param.width = Math.round(width / rateHeight);
				param.height = maxHeight;
			}
		}

		param.left = Math.round((maxWidth - param.width) / 2);
		param.top = Math.round((maxHeight - param.height) / 2);
		return param;
	}
	
	$('.layer').click(function(){
		$(this).hide();
		$('body').css('overflow-y','scroll');
	})
	var cW = document.documentElement.clientWidth;
	$('.thumb').css('height',cW*0.197);
	
	$(".queryBtn").click(function(){
		
		main.hrefTo("bug_history.html")
	})