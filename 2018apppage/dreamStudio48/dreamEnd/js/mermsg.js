
var endInfo;

init();

function init(){
	var id = GetQueryString('id');
	endInfo = JSON.parse(localStorage.getItem("dreamEnd"+id));

	$('.tophead').css('height',$('.topbox').width());

	$('.icon_backbtn').click(function(){
		main.backTo();
	})
	
	merinfo();
}




function addListeners(){
	
}


function merinfo(){
	$('.tophead').css('background-image','url('+endInfo.avatar+')');
	$('.namebox').html(endInfo.nicker+'<img src="'+endInfo.teamUrl+'" class="team"');
	$('.allrank').html('总名次:'+endInfo.totalRank);
	$('.allnum').html('总票数:'+endInfo.totle);
	$('.event').html(endInfo.event);
	$('.rank').html(endInfo.rank);
	$('.memberVote').html(endInfo.memberVote);
	$('.totalPraises').html(endInfo.totalPraises);
	$('.praises').html(endInfo.praises);
}
