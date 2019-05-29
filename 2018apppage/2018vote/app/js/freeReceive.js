
var flag = true;


main.ifGetfree(token,function(dt){
	console.log(dt)
	if(dt.status==200){
		if(dt.content.canReceive==true){
			$('.receivebtn').addClass('recActive');
		}else{
			$('.receivebtn').removeClass('recActive');
		}
	}else{
		main.alert(dt.message);
	}
})


$('.receivebtn').click(function(){
	if(!flag){
		return false;
	}
	if($(this).hasClass('recActive')){
		flag = false;
		main.getTicket(token,function(dt){
			flag = true;
			if(dt.status==200){
				$('.receivebtn').removeClass('recActive');
				$('.mask').show();
				$('.maskinfo p em').html(dt.content.addTp);
			}else{
				main.alert(dt.message);
			}
		})
	}
})

$('.rightbtn').click(function(){
	$('.mask').hide();
})