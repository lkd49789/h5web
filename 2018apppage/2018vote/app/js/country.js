
(function(data) {

var countryArr= [   
'aerbaniya-阿尔巴尼亚-355',
'afuhan-阿富汗-93',
'agenting-阿根廷-54',
'aierlan-爱尔兰-353',
'aiji-埃及-20',
'aishaniya-爱沙尼亚-372',
'alabolianheqiuzhangguo-阿拉伯联合酋长国-971',
'alianqiu-阿联酋-971',
'alubadao-阿鲁巴岛-297',
'aman-阿曼-968',
'angela-安哥拉-244',
'anguiladao-安圭拉岛-1264',
'antiguahebabuda-安提瓜和巴布达-1268',
'aodaliya-澳大利亚-61',
'aodili-奥地利-43',
'asaibaijiang-阿塞拜疆-994',
'babaduosi-巴巴多斯-1246',
'babuyaxinjineiya-巴布亚新几内亚-675',
'bahama-巴哈马-1242',
'baieluosi-白俄罗斯-375',
'baimudaqundao-百慕大群岛-1441',
'bajisitan-巴基斯坦-92',
'balesitan-巴勒斯坦-970',
'balin-巴林-973',
'banama-巴拿马-507',
'baojialiya-保加利亚-359',
'baxi-巴西-55',
'beining-贝宁-229',
'bilishi-比利时-32',
'boduolige-波多黎各-1809',
'bojinafasuo-布基纳法索-226',
'boliweiya-玻利维亚-591',
'bolizi-伯利兹-501',
'budan-不丹-975',
'chidaojineiya-赤道几内亚-240',
'danmai-丹麦-45',
'deguo-德国-49',
'dongdiwen-东帝汶-670',
'duoge-多哥-228',
'duominijiagongheguo-多米尼加共和国-1809',
'duominijialianbang-多米尼加联邦-1767',
'eluosi-俄罗斯-7',
'faguo-法国-33',
'feiji-斐济-679',
'feilvbin-菲律宾-63',
'fenlan-芬兰-358',
'fuodejiao-佛得角-238',
'gangbiya-冈比亚-220',
'gangguogongheguo-刚果共和国（布）-242',
'gangguominzhugongheguo-刚果民主共和国（金）-243',
'gelinlandao-格陵兰岛-299',
'gelinnada-格林纳达-1473',
'gelujiya-格鲁吉亚-995',
'gelujiyagongheguo-格鲁吉亚共和国-995',
'gelunbiya-哥伦比亚-57',
'gesidalijia-哥斯达黎加-506',
'guandao-关岛-1671',
'guba-古巴-53',
'guiyana-圭亚那-592',
'haidi-海地-509',
'hanguo-韩国-82',
'hasakesitangongheguo-哈萨克斯坦共和国-7',
'heishangongheguo-黑山共和国-382',
'helan-荷兰-31',
'heshuandeliesiqundao-荷属安的列斯群岛-599',
'hongdulasi-洪都拉斯-504',
'jianada-加拿大-1',
'jianpuzhai-柬埔寨-855',
'jiapeng-加蓬-241',
'jiapenggongheguo-加蓬共和国-241',
'jibuti-吉布提-253',
'jierjisisitan-吉尔吉斯斯坦-996',
'jierjisitangongheguo-吉尔吉斯坦共和国-996',
'jinbabuwei-津巴布韦-263',
'jineiya-几内亚-224',
'jineiyabishao-几内亚比绍-245',
'kaimanqundao-开曼群岛-1345',
'kataer-卡塔尔-974',
'keluodiya-克罗地亚-385',
'kemailong-喀麦隆-237',
'kemoluo-科摩罗-269',
'kenniya-肯尼亚-254',
'keweite-科威特-965',
'kukequndao-库克群岛-682',
'laisuotuo-莱索托-266',
'laowo-老挝-856',
'latuoweiya-拉脱维亚-371',
'litaowan-立陶宛-370',
'lucenbao-卢森堡-352',
'luomaniya-罗马尼亚-40',
'luwangda-卢旺达-250',
'madajiasijia-马达加斯加-261',
'maerdaifu-马尔代夫-960',
'malaixiya-马来西亚-60',
'malawei-马拉维-265',
'mali-马里-223',
'maoliqiusi-毛里求斯-230',
'maolitaniya-毛里塔尼亚-222',
'mayuetedao-马约特岛-269',
'meiguo-美国-1',
'menggu-蒙古-976',
'mengjialaguo-孟加拉国-880',
'milu-秘鲁-51',
'moluoge-摩洛哥-212',
'mosangbike-莫桑比克-258',
'moxige-墨西哥-52',
'muerduowa-摩尔多瓦-373',
'namibiya-纳米比亚-264',
'nanfei-南非-27',
'niboer-尼泊尔-977',
'nijialagua-尼加拉瓜-505',
'niniliya-尼日利亚-234',
'nirier-尼日尔-227',
'nuofukedao-诺福克岛-672',
'nuowei-挪威-47',
'putaoya-葡萄牙-351',
'riben-日本-81',
'ruidian-瑞典-46',
'ruishi-瑞士-41',
'saerwaduo-萨尔瓦多-503',
'saierweiya-塞尔维亚-381',
'sailaliang-塞拉利昂-232',
'saineijiaer-塞内加尔-221',
'saipulusi-塞浦路斯-357',
'saisheer-塞舌尔-248',
'samoya-萨摩亚-685',
'shatealabo-沙特阿拉伯-966',
'shengjiciheniweisi-圣基茨和尼维斯-1869',
'shengluxiya-圣卢西亚-1758,',
'shengwensentehegelinnadingsi-圣文森特和格林纳丁斯-1758',
'sililanka-斯里兰卡-94',
'siluofake-斯洛伐克-421',
'siluowenniya-斯洛文尼亚-386',
'siweishilan-斯威士兰-268',
'sulinan-苏里南-579',
'taiguo-泰国-66',
'tajikesitan-塔吉克斯坦-992',
'tajikesitangongheguo-塔吉克斯坦共和国-992',
'tangjia-汤加-676',
'tansangniya-坦桑尼亚-255',
'tekesihekaikesiqundao-特克斯和凯科斯群岛-1649',
'telinidaheduobage-特立尼达和多巴哥-1868',
'tuerqi-土耳其-90',
'tukumansitan-土库曼斯坦-993',
'tukumansitangongheguo-土库曼斯坦共和国-993',
'tunisi-突尼斯-216',
'waimenggu-外蒙古-976',
'wanuatu-瓦努阿图-678',
'weidimala-危地马拉-502',
'weierjingqundao-维尔京群岛-1340',
'weineiruila-委内瑞拉-58',
'wenlai-文莱-673',
'wenlaidalusalanguo-文莱达鲁萨兰国-673',
'wuganda-乌干达-256',
'wukelan-乌克兰-380',
'wulakui-乌拉圭-598',
'wuzibiekesitangongheguo-乌兹别克斯坦共和国-998',
'xibanya-西班牙-34',
'xila-希腊-30',
'xingeliduoniyaqundao-新咯里多尼亚群岛-687',
'xinjiapo-新加坡-65',
'xinxilan-新西兰-64',
'xiongyali-匈牙利-36',
'xuliya-叙利亚-963',
'yamaijia-牙买加-1876',
'yameiniyagongheguo-亚美尼亚共和国-374',
'yemen-也门-967',
'yidali-意大利-39',
'yilang-伊朗-98',
'yindu-印度-91',
'yindunixiya-印度尼西亚-62',
'yingguo-英国-44',
'yingshuweijingqundao-英属维京群岛-1284',
'yiselie-以色列-972',
'yuedan-约旦-9626',
'yuenan-越南-84',
'zanbiya-赞比亚-260',
'zhade-乍得-235',
'zhadegongheguo-乍得共和国-235',
'zhili-智利-56',
'zhongfeigongheguo-中非共和国-236',
'zhongguo-中国大陆-86',
'zhongguoxianggang-中国香港-852',
'zhongguoaomen-中国澳门-853',
'zhongguotaiwan-中国台湾-886'
];

var selectDom = '<section class="select_layer">'+
'                     <div class="layer"></div>'+
'                          <a class="btn-close" href="###"><img src="images/btn-close.png"></a>'+
'                          <div class="mask">'+
'                               <div>'+
'                               <p class="choose_title">选择您所在的国家</p>'+
'                               </div>'+
'                               <div class="country-wrapper">'+
'                               <ul class="mask_title">'+
'                                   <span class="all">常用</span>'+
'                                   <li code="86" cname="中国大陆"><p>中国大陆(86)</p></li>'+
'                                   <li code="852" cname="中国香港"><p>中国香港(852)</p></li>'+
'                                   <li code="886" cname="中国台湾"><p>中国台湾(886)</p></li>'+
'                                   <li code="1" cname="美国"><p>美国(1)</p></li>'+
'                                   <li code="81" cname="日本"><p>日本(81)</p></li>'+
'                               </ul>'+
'                               <ol class="mask_city">'+
'                                    {{list}}'+
'                               </ol>'+
'                               </div>'+
'                          </div>'+
'                 </section>';

var li='<li code={{code}} cname={{cname}}><span class="{{opacity}}">{{letter}}</span><p>{{country}}</p></li>';
var callback;
	
	//显示国家选择浮层
	data.show = function(_callback){
		if($(".select_layer").length > 0){//已存在 则显示
			$(".select_layer").fadeIn();
			return false;
		}
		callback = _callback
		COUNTRY.init()
	}
	//初始化
	data.init = function(){
		var dom
		var html = '';
		var prev_letter = '';
		for(var i=0; i<countryArr.length;i++){
			var counstr = countryArr[i].split("-")
			var _li = li;
			var letter = counstr[0].substring(0,1)

			_li = _li.replace('{{letter}}',letter.toUpperCase());
			if(letter == prev_letter){
				_li = _li.replace('{{opacity}}',"hidden");
				
			}
			prev_letter = letter

			_li = _li.replace('{{code}}',counstr[2]);
			_li = _li.replace('{{cname}}',counstr[1]);
			
			_li = _li.replace('{{country}}',counstr[1]+"("+counstr[2]+")");

			html += _li
		}
		selectDom = selectDom.replace("{{list}}",html);
		$('body').append(selectDom)

		COUNTRY.addListeners()
	};
	data.addListeners = function(){

		$(".mask li").click(function(){
			//$(".mask li").attr("class","")
			//$(this).addClass("active color")
			
			COUNTRY.close($(this).attr("code"),$(this).attr("cname"));

		}).mouseover(function(){
			//$(this).addClass("active color")
		}).mouseout(function(){
			//$(this).removeClass("active color")
		})
		//关闭
		$(".btn-close").click(function(){
			$(".select_layer").hide()
		})
	}
	//关闭浮层
	data.close = function(code,name){
		callback(code,name);
		$(".select_layer").hide()
	}
	

}(window.COUNTRY = {}));

