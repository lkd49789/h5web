//获取用户信息   首页除外

(function(data) {
    var html = "<section id='bindPop'>"+
        "<div class='bind-content'>"+
            "<h5>重新绑定设备号</h5>"+
                "<div><input type='phone' id='phone' placeholder='请输入手机号' maxlength='11'/></div>"+
                "<div><input type='button' id='btn-sendcode' value='发送验证码'/></div>"+
                "<div class='phoneCode'>"+
                    "<input type='text' placeholder='验证码' id='code'/>"+
                    "<label for='code'>已发送(0s)</label>"+
                "</div>"+
                "<div><button class='btn-submit'>提交</button></div>"+
        "</div>"+
    "</section>"
    var reg=/^1[0-9]{10}/;
    var interval;
    var curSec = 60;

    //写入验证码浮层
    data.addPop = function(succ){

        if($("#bindPop").length < 1){
            console.log("1")
            $("body").append(html)
            bind.addListeners()
        }else{
            console.log("2")
        }
        $("#bindPop").show()
    }
    //添加事件
    data.addListeners = function()
    {
        //发送验证码
        $("#btn-sendcode").click(function(){
            if(!reg.test($("#phone").val())){
                console.log($("#phone").val())
                main.alert("请输入正确的手机号码");
                return false;
            }else{
                //bind.startCount();
                main.bindSMS($("#phone").val(),function(dt){
                    //alert("dt.errcode>"+dt.errcode)
                    if(dt.errcode == "0"){
                        bind.startCount();
                    }else if(dt.errcode == "1601"){
                        main.alert("电话号码与绑定信息不符");
                    }else if(dt.errcode == "119" || dt.errcode == "114" || dt.errcode == "101"){
                        main.logInApp(function(dt){
                            //alert("dt>"+dt)
                            userInfo.setUserInfo(dt)
                        })
                    }else{
                        main.alert(dt.errmsg)
                    }
                    
                })
            }

        })
        //提交验证码
        $(".btn-submit").click(function(){
            console.log("code>>>"+$("#code").val())
            if($("#code").val() == ""){
                main.alert("请输入您所收到的验证码")
            }else{
                main.bindDEV($("#code").val(),function(dt){
                    if(dt.errcode == "0"){
                        $("#bindPop").remove();
                        main.logInApp(function(dt){
                            userInfo.setUserInfo(dt)
                        })
                        //main.alert(dt.errmsg)
                    }else if(dt.errcode == "1701"){
                        main.alert("验证码错误")
                    }else if(dt.errcode == "1702"){
                        main.alert("设备号不一致")
                    }else{
                        main.alert(dt.errmsg)
                    }
                })
            }
        })
        
    }
    //倒计时
    data.startCount = function(){
        $("#btn-sendcode").attr("disabled",true); 
        if(interval != null){
            curSec = 60;
            clearInterval(interval)
        }
        interval = setInterval(function(){
            curSec -= 1;
            $(".phoneCode label").html("已发送("+curSec+"s)")
            if(curSec <= 0){
                clearInterval(interval)
                $("#btn-sendcode").attr("disabled",false); 
            }
        },1000)
    }
}(window.bind = {}));

//bind.addPop()
