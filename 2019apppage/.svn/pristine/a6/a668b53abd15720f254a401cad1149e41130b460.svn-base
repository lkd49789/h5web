var app=new Vue({
    el:"#app",
    data:{
        who:"my", /*当前页面 */
        left:'25%', /*tab下划线位置 */
    },
    components:{
        /*我的信息页面 */
        my:{
            data:function(){
              return {
                
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
            }
        },
        /*重新认识下页面 */
        know:{
            template:"#knowPage",
            data:function(){
              return {
                list:[
                  {
                    img:'./img/fans/img.jpg',
                    text:'哈哈哈哈哈哈啊哈哈哈',
                    name:'哈哈',
                    num:888
                  },
                  {
                    img:'./img/fans/img.jpg',
                    text:'',
                    name:'哈哈4',
                    num:888
                  },
                  {
                    img:'./img/fans/img.jpg',
                    text:'哈哈哈哈哈哈啊哈哈哈',
                    name:'哈哈3',
                    num:888
                  },
                  {
                    img:'./img/fans/img.jpg',
                    text:'哈哈哈哈哈哈啊哈哈哈',
                    name:'哈哈2',
                    num:888
                  },
                  {
                    img:'./img/fans/img.jpg',
                    text:'',
                    name:'哈',
                    num:888
                  },
                  {
                    img:'./img/fans/img.jpg',
                    text:'哈哈哈哈哈哈啊哈哈哈',
                    name:'哈哈',
                    num:888
                  },
                  {
                    img:'./img/fans/img.jpg',
                    text:'',
                    name:'哈哈4',
                    num:888
                  },
                  {
                    img:'./img/fans/img.jpg',
                    text:'哈哈哈哈哈哈啊哈哈哈',
                    name:'哈哈3',
                    num:888
                  },
                  {
                    img:'./img/fans/img.jpg',
                    text:'哈哈哈哈哈哈啊哈哈哈',
                    name:'哈哈2',
                    num:888
                  },
                  {
                    img:'./img/fans/img.jpg',
                    text:'',
                    name:'哈',
                    num:888
                  }
                ],
                columns:2,/*列数 */
                arr:[], /*高度数组 */
                i:0, /*循环 */
                height1:0,
                height2:0,
                height3:0,
                available:true /*防止多次触底请求 */

              }
            },
            mounted:function(){
              /*触底加载 */
              window.addEventListener('scroll',this.handleScroll,true)
              this.$nextTick(function(){
                  var box = this.$refs.know.children;
                      this.imgLoad(box,box.length) 
              })
            },
            methods:{
              /*判断图片是否加载完 */
              imgLoad(items,len){  
                 
                var newImg=new Image();
                newImg.src='./img/fans/img.jpg';
                // newImg.src='./img/fans/img.jpg';
                newImg.onload = function(){
                    this.img(items,len)
                }.bind(this) 
                newImg.error = function(){
                  this.img(items,len)
                }.bind(this) 
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
                this.i+=1;
                if(this.i<len){
                  this.imgLoad(items,len)
                }
              },
              handleScroll:function(){
                // 获取滚轮位置
               this.height1 = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
               // 文档高度
               this.height2 = document.body.scrollHeight || document.documentElement.scrollHeight;
               // 可视区域
               this.height3 = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
               if(this.height3 + this.height1 >= this.height2 && this.available){
                  console.log(1)
                  this.list.push({
                    img:'./img/fans/img.jpg',
                    text:'哈哈哈哈哈哈啊哈哈哈',
                    name:'呵呵',
                    num:888
                  },
                  {
                    img:'./img/fans/img.jpg',
                    text:'',
                    name:'呵呵',
                    num:888
                  })

                  this.$nextTick(function(){
                      var box = this.$refs.know.children;
                          this.imgLoad(box,box.length) 
                  })
               }
             }
            }
        }
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

    }

})