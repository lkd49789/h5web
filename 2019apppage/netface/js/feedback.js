var vm = new Vue({
	el:'.wrapper',
	data:{
    mInfo:[],//成员信息
    qtype: 0, //申诉问题类型d   0默认被踢   1队列问题  2 握手权兑换问题  3 偶像问题
    issubmit:0,   //是否已提交申诉  0 未提交  1已提交
    copys:[{//问题json
        reason:"因管理员认为你有恶意违规行为，所以你被请出了直播间，服务器端将有录像存证，运营方将按照存证判别",
        option1:"我没有违规，但是被踢出",
        option2:"管理员误操作把我踢出",
        option3:"APP崩溃导致掉线",
      },
      {
        reason:"每个粉丝可以同时预约全部偶像的握手队列。当在A队列排到时，该粉丝正在和B成员握手，则在A队列中自动将该粉丝延后到第5的位置，并且不出现15秒倒计时的步骤。</br></br><b>1个握手权=20秒，每个粉丝在一次预约中最多使用12个握手权。</b>",
        option1:"无法识别握手券二维码、序列号",
        option2:"偶像误操作把我踢出",
        option3:"APP崩溃导致掉线",
      },{
        reason:"请粉丝保管好自己的握手券，官方售出的握手券都是确保未使用的新券。如果粉丝保管不当导致二维码或序列号被他人盗用，运营方将无法做出补偿。</br></br><b>如在握手过程中有违规行为导致被请出握手直播间，则该场握手使用的握手权不会退还。</b>",
        option1:"我没有违规，但是被踢出",
        option2:"握手券无法兑换握手权",
        option3:"握手权退还问题",
      }
    ],
		showpop:0, //0 关闭  1.显示弹框
    reason:0,     //申诉内容id 1/2/3
		words:'',      //其他申诉问题
    totalwords:0,   //总字数
    feedid:0,     //申诉id   4为其他问题
    tips:'你还未选择或填写任何的申诉问题。',//弹框提示语
    backhome:0    //点击弹框“确定”后是否要返回
	},
  mounted: function () {
    console.log("mounted")
    this.qtype = GetQueryString("type");
    if(this.qtype == 0){//被踢情况显示成员信息
        this.mInfo = JSON.parse(localStorage.getItem("FEEDBACK_INFO"))
        if(this.mInfo.appeal == true){
          this.issubmit = 1;
        }else{
          this.issubmit = 0;
        }
    }
  },
  filters:{
    avatar:function(img){
      return 'https://source.48.cn'+img;
    },
    time:function(time,str){
      return formatTime(str,time)
    }
  },
	watch:{
		// words:function(neww){
  //     console.log(neww)
		// 	this.totalwords = neww.length;
		// }
	},
	methods: {
    //检查输入字符
    descArea(){
      //this.reason = 4;
      this.totalwords = this.words.length;
      //this.totalwords = 300-textVal;
    },
    //选择原因
    chooseReason:function(id){
        this.reason = id;
        console.log(id)
    },
    //提交申诉
		submit:function(){
      var _this = this;
      var paras;

        if(_this.qtype != 3){
          if(_this.reason == 0){
            _this.showPop("你还未选择或填写任何的申诉问题。")
            return false;
          }
        }

        if(_this.qtype == 0){//默认被踢申诉
            paras = {
                "reservationId":_this.mInfo.reservationId,
                "starId":_this.mInfo.starId,
                "appealType":parseInt(_this.qtype)+1,
                "content":_this.copys[_this.qtype]["option"+_this.reason],
                "contentMore":_this.words
            }
        }else if(_this.qtype == 3){//偶像相关
          if(_this.words == ""){
            _this.showPop("你还未选择或填写任何的申诉问题。")
            return false;
          }
            paras = {
                "reservationId":"",
                "starId":"",
                "appealType":parseInt(_this.qtype)+1,
                "content":"",
                "contentMore":_this.words
            }
        }else{//其他申诉
            paras = {
                "reservationId":"",
                "starId":"",
                "appealType":parseInt(_this.qtype)+1,
                "content":_this.copys[_this.qtype]["option"+_this.reason],
                "contentMore":_this.words
            }
        }
        
        main.submit(JSON.stringify(paras),function(dt){
          if(dt.status == 200){
            _this.backhome = 1;
            // _this.issubmit = 1;
            // _this.mInfo.content = _this.copys[_this.qtype]["option"+_this.reason];
            // _this.mInfo.contentMore = _this.words

            vm.showPop("你的申诉已提交，我们将尽快处理，并通过口袋48消息盒子与你联系。")
          }else{
            vm.showPop(dt.message)
          }
        })
		},
    //显示弹框
	  showPop:function(_str){
        this.showpop = 1;
	    	this.tips = _str;
	  },
    //关闭弹框
	  closePop:function(){
        if(this.backhome == 1){
            snhGoBack()
        }
	    	vm.showpop = 0;
	  }
	}

})


