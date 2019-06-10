var app=new Vue({
    el:"#app",
    data:{
        who:"my", /*当前页面 */
        left:'25%', /*tab下划线位置 */
        showpop:0
    },
    methods:{
      /*tab切换 */
      tabClick:function(index){
          this.left = index*50-25+"%"
          if(index == 1){
              this.who = 'my'
          }else{
              this.who = 'know'
          }
      }

  },
    components:{
        /*我的信息页面 */
        my:{
            data:function(){
              return {
                content:'',
                time:'',
                timeClick:true,  /*防止周选择器多次点击 */
                rankUserList:[]
              }
            },
            template:'#myPage',
            directives:{
              color:{
                bind:function(el,bind){
                  if(bind.value > 3){
                    el.style.color='#b0afaf'
                  }
                }
              }
            },
            created:function(){
              var that = this;
              if(checkFromApp()){
                if(!dsBridge.call("snhUserInfo")){
                  that.$parent.showpop = 1;
                }
              }
              main.homePage(function(data){
                if(data.status == 200){
                  that.content = data.content;
                  that.rankUserList = data.content.meleeRank.rankUserList;
                  that.time = data.content.weekRankList[0].weekRankName;
                }else{
                  alert(data.message);
                }
              })
            },
            methods:{
              banner:function(){
                snhOpenNewWebview('http://www.cqpw.cn/m/#/projectDetail/723758909407502336.html')
              },
              aid:function(id){
                _openNativeModule('person/detail?id='+id)
              },
              showProPanel:function(){
                this.timeClick = false;
                var city_picker = new mui.PopPicker({layer:1});
                var timeList = [];
                var that = this;
                this.content.weekRankList.forEach(function(item,index){
                  timeList.push({
                    value : item.weekRankId,
                    text : item.weekRankName
                  })
                });
                /*添加取消的时候的事件 */
                mui("body").on("tap",".mui-poppicker-header > .mui-poppicker-btn-cancel",function(){
                  that.timeClick = true;
                });
                city_picker.setData(timeList);
                city_picker.show(function(items){
                  that.timeClick = true;
                  main.getMeleeWeekRank(items[0].value,function(data){
                    if(data.status == 200){
                      that.time = items[0].text;
                      that.rankUserList = data.content.rankUserList;
                      that.$forceUpdate()
                    }else{
                      alert(data.message);
                    }
                  })
                });

              }
            }
        },
        /*重新认识下页面 */
        know:{
            template:"#knowPage",
            data:function(){
              return {
                list:[],
                columns:2,/*列数 */
                arr:[], /*高度数组 */
                i:0, /*循环 */
                available:false, /*防止多次触底请求 */
                dataList:[],
                oldLen:0  /*上一次的长度 */

              }
            },
            created:function(){
              if(checkFromApp()){
                if(!dsBridge.call("snhUserInfo")){
                  that.$parent.showpop = 1
                }
              }
            },
            mounted:function(){
              this.reunderstanding()
              /*触底加载 */
              this.$refs.flex.addEventListener('scroll',this.handleScroll,false)
              var height3 = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
              this.$refs.flex.style.height = height3 +'px'
            },
            destroyed:function(){
              /*解除触底加载 */
              // window.removeEventListener('scroll',this.handleScroll,true)   
            },
            methods:{
            /*跳转 */
              openNativeModule:function(id){
                _openNativeModule('post/detail?id='+id);
              },
              /*判断图片是否加载完 */
              imgLoad:function(items,len){  
                var newImg=new Image();
                var that=this;
                if(that.list[that.i].previewImg.length > 0){
                  newImg.src='https://source.48.cn'+that.list[that.i].previewImg[0].imgUrl;
                }else{
                  newImg.src='';
                }
                // newImg.src='./img/fans/img.jpg';
                newImg.onload = function(){
                  that.img(items,len)
                }
                newImg.onerror = function(){
                    that.img(items,len)
                }
              },
              /*递归*/
              img:function(items,len){
                var i = this.i;
                let itemWidth= this.$refs.know.offsetWidth /this.columns; //总的宽度除以几列
                items[i].style.width = 100 / this.columns + "%"; /*设置宽度 */
                if(i<this.columns){
                  // 2- 确定第一行
                  items[i].style.top = 0;
                  items[i].style.left = itemWidth  * i + 'px';
                  this.arr.push(items[i].offsetHeight);
                }else if(i>=this.columns){// 其他行
                  // 3- 找到数组中最小高度  和 它的索引
                  var minHeight = this.arr[0];
                  // var minHeight = Math.min.apply(Math,this.arr);
                  var index = 0;
                  // var index = this.arr.indexOf(minHeight);
                  for (var j = 1; j < this.arr.length; j++) {
                    if (minHeight > this.arr[j]) {
                        minHeight = this.arr[j];
                        index = j;
                    }
                  }
                  // 4- 设置下一行的第一个盒子位置
                  // top值就是最小列的高度 + gap
                  items[i].style.top = this.arr[index] + 'px';
                  // left值就是最小列距离左边的距离
                  items[i].style.left = items[index].offsetLeft + 'px';
          
                  // 5- 修改最小列的高度
                  // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
                  this.arr[index] = this.arr[index] + items[i].offsetHeight ;

                }
                items[i].style.opacity = '1';

                /*判断是否该触底加载 */
                if(i == this.list.length - 1 && this.list.length - this.oldLen >= 8 && this.list.length >= 8){
                  this.available = true;
                }

                this.i+=1;
                if(this.i<len){
                  this.imgLoad(items,len)
                }
              },
              handleScroll:function(){
                var that = this;
               // 文档高度
              //  var height2 = document.body.scrollHeight || document.documentElement.scrollHeight;
              //数组中最高的那一个
               var height2 = Math.max.apply(Math,this.arr);
                //动态设置高度 撑开flex
                that.$refs.know.style.height = height2 +'px';
               // 可视区域
               var height3 = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
               // 获取滚轮位置
              //  var height1 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
               var height1 = that.$refs.flex.scrollTop;
               if(height3 + height1 >= height2 && this.available){
                 this.available = false;
                  main.getReunderstanding(that.list[that.i-1].createAt,function(data){
                    if(JSON.stringify(data.content).length == 2){
                      return false;
                    }
                    if(data.status == 200){
                      that.oldLen = that.list.length;
                      /*处理对象 转化为数组 */
                      for(index in data.content){
                        that.list.push(data.content[index]);           
                      }
                      that.$nextTick(function(){
                        var box = this.$refs.know.children;
                            this.imgLoad(box,box.length);
                      })
                      
                    }else{
                      alert(data.message);
                    }
                  })
               }
             },
             /* */
              reunderstanding:function(){
                var that = this;
                main.getReunderstanding(0,function(data){
                  if(data.status == 200){
                    for(index in data.content){
                      that.list.push(data.content[index])
                    }
                    that.$nextTick(function(){
                      var box = this.$refs.know.children;
                          this.imgLoad(box,box.length) 
                  })
                  }else{
                    alert(data.message);
                  }
                })
              }
            }
        }
    }

})