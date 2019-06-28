var app = new Vue({
    el:'#app',
    data:{
        list:[],
        showpop:0,//弹框
        text:'',  //弹框内容
        num:0,   //投票次数
        voteRequest:true,   //防止多次点击投票
        phone:false,  //是否绑定手机号
        phoneTimer:null /*手机号定时器 */
    },
    created:function(){
        var _this=this;
        /*判断登没登陆*/
        if(checkFromApp()){
            if(!dsBridge.call("snhUserInfo")){
                /*没登录的操作*/
                _this.popbox('请登录',2);
            }else{
                /*没手机号*/
                if(_this.getUserInfo()){
                    //循环获取手机号
                    _this.phoneInterval();
                }
            }
        }
    },
    mounted:function(){
        var _this=this;
        main.getMusic(function(data){
            if(data.status == 200){
                _this.num = data.content.num;
                data.content.voiceInfos.map(function(item,index){
                    item.play = false;  //控制开始暂停的
                    item.listen = false; //控制收听 停止的
                    item.loading = false; //控制收听 停止的
                    item.time = item.duration;
                })
                _this.list = data.content.voiceInfos;
            }else{
                _this.popbox(data.message,1);  
            }
        })
    },
    methods:{
         // 定时器
        phoneInterval:function(clear){
            var _this = this;
            var obj = JSON.parse(_this.getUserInfo());
            if(obj.userInfo.bindInfo == [] || obj.userInfo.bindInfo[0].bindType != 'MOBILE'){
                _this.phoneTimer = setInterval(function(){
                    _this.phoneInterval(true)
                },1000)
            }else{
                _this.phone = true;
                if(clear){clearInterval(_this.phoneTimer);}
            }
        },
        /*收听 */
        listen(what,index){
            var _this = this;
            var aud = _this.$refs.audio[index];
            if(what == 'listen'){
                if(_this.list[index].listen){
                    /*返回第一秒 */
                    aud.currentTime = 0;
                    aud.pause();
                    // aud.load();  
                    _this.list[index].listen = false;
                    _this.list[index].play = false;
                    _this.list[index].loading = false;
                }else{
                    _this.audioFor(aud,index,what);
                }
            }else{
                if(_this.list[index].play){
                    aud.pause();
                    _this.list[index].play = false;
                    _this.list[index].loading = false;
                }else{
                    _this.audioFor(aud,index,what);
                }
            }
        },
        /*投票 */
        vote:function(num){
            var _this = this;
            if(!_this.phone){
                _this.popbox('',3);
                return false;
            }
            if(_this.num <= 0){
                _this.popbox('你已经没有投票机会了',1); 
                return false;
            }
            if(_this.voteRequest){
                _this.voteRequest = false;
                main.vote(num,function(data){
                    _this.voteRequest = true;
                    if(data.status == 200){
                        _this.popbox('投票成功',1);  
                        _this.num --     
                    }else{
                        _this.popbox(data.message,1); 
                    }
                })
            }
        },
        /*循环停止所有 开启当前 */
        audioFor:function(aud,index,what){
            var _this = this;
            _this.list.forEach(function(item,ind){
                if(index == ind){
                    _this.$refs.audio[ind].pause(); 
                }else{
                    _this.$refs.audio[ind].currentTime = 0;
                    _this.$refs.audio[ind].pause();
                }
                _this.list[ind].play = false;
                _this.list[ind].listen = false;
                _this.list[ind].loading = false;
            })
            aud.play();
            if(aud.readyState != 3 && aud.readyState != 4){
                _this.list[index].loading = true;
            }
            _this.watchMusicTime(app.$refs.audio[index],index);
            what == 'listen'?_this.list[index].time = _this.list[index].duration:'';
            _this.list[index].play = true;
            _this.list[index].listen = true;
        },
        /*监听播放和播放结束 */
        watchMusicTime(audio,index){
            var _this = this;
            //监听播放时间
            var musicDom = audio;//获取Audio的DOM节点
            //使用事件监听方式捕捉事件
            musicDom.ontimeupdate = function(){//监听音频播放的实时时间事件
                // console.log(musicDom.readyState)
                if(musicDom.readyState == 4 || musicDom.readyState == 3){
                    if(_this.list[index].time != app.countDown(musicDom.duration,musicDom.currentTime)){
                        _this.list[index].loading = false;
                    } 
                }else{
                    _this.list[index].loading = true;
                }
                if(!isNaN(musicDom.duration)){
                    _this.list[index].time = app.countDown(musicDom.duration,musicDom.currentTime);
                    Vue.set(_this.list,index,_this.list[index]);
                }
            };
            //结束事件
            musicDom.onended = function(){
                audio.load();
                audio.oncanplay = function () {
                    _this.list[index].play = false;
                    _this.list[index].listen = false;
                    _this.list[index].loading = false;
                    _this.list[index].time = _this.list[index].duration; 
                    Vue.set(_this.list,index,_this.list[index]); 
                }
            }
        },
        /*倒计时 */
        countDown:function(end,presentTime){
            var date = end - presentTime; 
            var hours = Math.floor(date / 60 / 60);
            var minutes = Math.floor(date  / 60  - (60 * hours));
            var seconds = Math.floor(date  - (60 * 60 * hours) - (60 * minutes));
            if (seconds < 10) { seconds = "0"+seconds;}
            hours == 0 ? hours = '' : hours += ':';
            var time = hours+minutes +':'+ seconds;
            // console.log(time)
            return time;
        },
        /*绑定手机号 */
        bang:function(){
            if(isFromAndroid()){
                _openNativeModule('login/inputphone?PhoneType=1');
            }else if(isFromIphone()){
                _openNativeModule('login/bindphone');
            }
        },
        /*规则 */
        rule:function(){
            this.popbox('投票规则：<br/>每个用户有3次投票机会<br/>每次可以为一个声音投1票<br/>投票账号必须绑定手机',1); 
        },
        /*弹框 */
        popbox:function(text,num){
            this.text = text;
            this.showpop = num;
        }, 
        /*获取用户信息 */
        getUserInfo:function() {
            return dsBridge.call("snhUserInfo");
        }
    }
})