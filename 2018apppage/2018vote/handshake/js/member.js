
(function(data) {

var memberArr= [   
'鞠婧祎',
'李艺彤',
'黄婷婷',
'冯薪朵',
'莫寒',
'赵粤',
'曾艳芬',
'戴萌',
'刘炅然',
'陆婷',
'林思意',
'万丽娜'
];

var selectDom = '<section class="select_layer">'+
'                     <div class="layer"></div>'+
'                          <div class="mask">'+
'                     <h1>请选择成员</h1>'+
'                               <ol class="mask_city">'+
'                                    {{list}}'+
'                               </ol>'+
'                          </div>'+
'                 </section>';

var li='<li sid="{{sid}}">{{member}}</li>';
var callback;
//var memberData;

	//显示国家选择浮层
	data.show = function(m_data,_callback){
		
		callback = _callback
		MEMBER.init(m_data)
	}
	//初始化
	data.init = function(_m_data){
		var dom
		var html = '';
		
		for(var i=0; i<_m_data.length;i++){
			var _li = li;
			_li = _li.replace('{{sid}}',_m_data[i].sid);
			_li = _li.replace('{{member}}',_m_data[i].realname);
			html += _li
		}
		
		var selectDom_tep = selectDom;
		selectDom_tep = selectDom_tep.replace("{{list}}",html);
		
		$('body').append(selectDom_tep)

		MEMBER.addListeners()
	};
	//添加事件
	data.addListeners = function(){

		$(".mask li").click(function(){
			MEMBER.close($(this).attr("sid"),$(this).html());

		}).mouseover(function(){
			//$(this).addClass("active color")
		}).mouseout(function(){
			//$(this).removeClass("active color")
		})

		//
		$(".layer").click(function(){
			
			//$(".mask_city").remove()
			$(".select_layer").detach()

		})
	}
	data.close = function(sid,name){
		callback(sid,name);
		//$(".mask_city").detach()
		$(".select_layer").detach()
	}

}(window.MEMBER = {}));

