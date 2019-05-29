console.log("teamlist")
var infoId = GetQueryString("infoId")


localStorage.setItem("sendwish","1")
var tep = localStorage.getItem("sendwish")
console.log("sendwish>>"+tep)

//MATE48 分享
$(".btn-default").click(function(){
	console.log("teamlist1")
	main.openWX(infoId)
})
//去切月饼
$(".btn-warning").click(function(){
	console.log("teamlist2")
	main.hrefTo("moonCutting.html")
})