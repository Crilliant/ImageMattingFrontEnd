<template>
<!--  导航栏-->
  <div class="daohang">
    <div class="logo"></div>
    <p id="page_title">在线抠图</p>
    <p id="about_us" @click="this.$router.replace('/intro')">关于我们</p>
  </div>
  <!--上面部分-->
  <div class="up" v-show="model=='main'">
    <div class="in1">
      <form enctype="multipart/form-data" method="post">
        <p type="primary" class="main-submit" v-if="location_of_uploaded_img==''">提交图片</p>
        <input ref="relFile" name="file" class="main-upload" type="file" @change="load_local_pic" >
        <div class="imgBox">
          <img id="original_pic" :src="location_of_uploaded_img" value='custom'/>
        </div>
      </form>
      <button @click="load_pic_button" class="upload_btn">点击上传图片</button>
<!--      装饰模块-->
      </div><div class="d1">
      </div><div class="d3">
      </div><div class="d2">
    </div>
  </div>

<!--  人物抠取模块-->
  <div v-show="model=='person_photo'" class="person">
    <button class="backToHome" @click="return_to_main_page">返回首页</button>
    <div class="blockMain">
      <!--      图片位置-->
      <div class="block-three">
        <div class="waiting_info" v-if="url_normal_process_result==''">图片加载中...</div>
        <center><div class="load_person" v-if="url_normal_process_result==''"></div></center>
        <img id="identity_result_img" :src="url_normal_process_result" value='custom'/>
      </div>
      <button type="primary"  class="download_btn" @click="download_Result">一键下载</button>
<!--      装饰模块-->
      <div class="pe1"></div>
      <div class="pe2"></div>
      <div class="pe3"></div>
    </div>
  </div>
<!--  证件照模块-->
  <div v-show="model=='identity_photo'" class="identity_part">
    <button class="backToHome" @click="return_to_main_page">返回首页</button>
    <div class="blockMain">
      <div class="block-one">
        <div class="waiting_info" v-if="url_normal_process_result==''">图片加载中...</div>
        <center><div class="load_identity" v-if="url_normal_process_result==''"></div></center>
        <img :src='url_normal_process_result' class="photo_of_user_in_identity">
      </div>
      <div id="block-two" :style="{background:'rgb('+red+','+green+','+blue+')'}">
        <img
            id="identity_result_person"
            :src='url_normal_process_result'
            @mousedown="drag_person('identity_result_person')"
            :style="{transform:'scale('+params.zoomVal_6+')'}"
            @mousewheel="bagimg($event,'identity_result_person')" @mousewheel.prevent
        />
      </div>
      <div class="select-BGColor" v-cloak>
        <p>
          red:<input type="range" max="255" min="0" v-model="red" class="picker-select"><br>
          green:<input type="range" max="255" min="0" v-model="green" class="picker-select"><br>
          blue:<input type="range" max="255" min="0" v-model="blue" class="picker-select"><br>
        </p>
      </div>
      <!--      图片位置-->
      <button type="primary" class="download_btn" @click="download_Result_of_identity_process">一键下载</button>
    </div>
    <div class="zj1"></div>
    <div class="zj2"></div>
    <div class="zj3"></div>
  </div>
<!--  换背景模块-->
  <div v-show="model=='changed_background_photo'" class="changebg_part">
    <button class="backToHome" @click="return_to_main_page">返回首页</button>
    <div class="blockMain">
      <div class="block-four">
        <div class="waiting_info" v-if="url_normal_process_result==''">图片加载中...</div>
        <center><div class="load_background" v-if="url_normal_process_result==''"></div></center>
        <img id="normal_process_result_in_bg" value="custom" :src="url_normal_process_result">
      </div>
      <input type="file" id="load_bg_img_btn" style="display: none" multiple="multiple"/>
      <input type="file" id="changeImg" style="display: none"/>
      <div id="width_height_tools">
        <button @click="changeBlock('addWidth')" id="add_width">相框加宽</button>
        <button @click="changeBlock('reduceWidth')" id="reduce_width">相框缩窄</button>
        <button @click="changeBlock('addHeight')" id="add_height">相框加高</button>
        <button @click="changeBlock('reduceHeight')" id="reduce_height">相框减矮</button>
        <!--        <div><span>请输入你要添加的文字</span></div>-->
        <input type="text" placeholder="请输入你要添加的文字" class="water-text" v-model="message" @change="print()" style="margin-top: 10px">
        <p>文字调色</p>
        <p>
          红:<input type="range" max="255" min="0" v-model="word_red" class="m-select"><br>
          绿:<input type="range" max="255" min="0" v-model="word_green" class="m-select"><br>
          蓝:<input type="range" max="255" min="0" v-model="word_blue" class="m-select"><br>
          文字旋转:<input type="range" max="360" min="-360" v-model="word_rotate" >
        </p>

      </div>
      <div id="func_btn_in_bg">
        <button @click="onBtn('load_bg_img_btn')" type="primary"  id="change_background_btn">选择图片</button>
        <button @click="download_result_of_change_bg()" type="primary" id="download_btn_in_change_bg">下载图片</button>
      </div>
      <div id="block-five" :style="{left:+boxLeft+'px',top:+boxTop+'px'}">
        <img
            @mousedown="imgCheck('imgOne')"
            @click="imgOver('imgOne')"
            @dblclick="onBtn('changeImg')"
            :src="url_of_bg_img_from_back"
            id="imgOne"
            :style="{transform:'scale('+params.zoomVal_1+')'}"
            @mousewheel="bagimg($event,'imgOne')" @mousewheel.prevent
            @click.prevent
            class="imgOne"
        />
        <img
            @mousedown="imgCheck('imgTwo')"
            @click="imgOver('imgTwo')"
            @dblclick="onBtn('changeImg')"
            :src="src"
            id="imgTwo"
            :style="{transform:'scale('+params.zoomVal_2+')'}"
            @mousewheel="bagimg($event,'imgTwo')" @mousewheel.prevent
            @click.prevent
            class="imgTwo"
        />
        <img
            @mousedown="imgCheck('imgThree')"
            @click="imgOver('imgThree')"
            @dblclick="onBtn('changeImg')"
            :src="src"
            id="imgThree"
            :style="{transform:'scale('+params.zoomVal_3+')'}"
            @mousewheel="bagimg($event,'imgThree')" @mousewheel.prevent
            @click.prevent
            class="imgThree"
        />
        <img
            @mousedown="imgCheck('imgFour')"
            @click="imgOver('imgFour')"
            @dblclick="onBtn('changeImg')"
            :src="src"
            id="imgFour"
            :style="{transform:'scale('+params.zoomVal_4+')'}"
            @mousewheel="bagimg($event,'imgFour')" @mousewheel.prevent
            @click.prevent
            class="imgFour"
        />
        <img
            @mousedown="imgCheck('result_of_change_bg_person')"
            @dblclick="onBtn('changeImg')"
            :src="url_normal_process_result"
            id="result_of_change_bg_person"
            :style="{transform:'scale('+params.zoomVal_5+')'}"
            @mousewheel="bagimg($event,'result_of_change_bg_person')" @mousewheel.prevent
        />
        <span class="mes" id="m"
              :style="{color: 'rgb('+word_red+','+word_green+','+word_blue+')',fontSize:fontSizes+'px',transform:'rotate('+word_rotate+'deg'+') scale('+params.zoomVal_7+')',cursor:'move'}"
              @mousedown="imgCheck('m')"
              @mousewheel="bagimg($event,'m')"
              @mousewheel.prevent
        >{{message}}</span>
      </div>
      <div id="bgGroup">
        <img :src=bg_option[0] @click="change_bg(0)" class="g1">
        <img :src=bg_option[1] @click="change_bg(1)" class="g2">
        <img :src=bg_option[2] @click="change_bg(2)" class="g3">
        <img :src=bg_option[3] @click="change_bg(3)" class="g4">
        <img :src=bg_option[4] @click="change_bg(4)" class="g5">
      </div>
    </div>
    <div class="bg1"></div>
    <div class="bg2"></div>
    <div class="bg3"></div>
    <div class="bg4"></div>
  </div>
  <!--  换风格模块-->
  <div v-show="model=='changed_style_photo'" class="changebg_part">
    <button class="backToHome" @click="return_to_main_page">返回首页</button>
    <div class="blockMain">
      <div class="block-one">
        <img id="style_process_origin" value="custom" :src="location_of_uploaded_img">
      </div>
      <div id="block-six">
        <div class="waiting_info" v-if="url_normal_process_result==''">图片加载中...</div>
        <center><div class="load_style" v-if="url_normal_process_result==''"></div></center>
        <img id="special_process_result" value="custom" :src="url_normal_process_result">
      </div>
      <button type="primary"  class="download_btn" @click="download_Result">一键下载</button>
      <button type="primary"  class="change_style_btn">选择背景</button>
      <div id="style_tool_box">
        <img :src=style_option[0] @click="change_style(0)" class="g1" alt="水彩">
        <img :src=style_option[1] @click="change_style(1)" class="g2" alt="素描">
        <img :src=style_option[2] @click="change_style(2)" class="g3" alt="霓虹">
        <img :src=style_option[3] @click="change_style(3)" class="g4" alt="待定">
        <img :src=style_option[4] @click="change_style(4)" class="g5" alt="待定">
      </div>
    </div>
    <div class="st1"></div>
    <div class="st2"></div>
<!--    <div class="bg3"></div>-->
<!--    <div class="bg4"></div>-->
  </div>

  <!--中间4个控件-->
  <div class="middle">
    <div ><button class="identity_button" @click="process_identification"></button></div>
    <div><button class="person_process_button" @click="process_person"></button></div>
    <div><button class="change_bg_button" @click="process_change_background"></button></div>
    <div><button class="change_style_button" @click="process_change_style"></button></div>
  </div>

  <!--下面部分-->
  <div class="down">
    <div style="width:800px;height:1px;margin:70px auto;
    padding:0px;background-color:#D5D5D5;overflow:hidden;z-index:-1;">
    </div>
  </div>

  <!--底部文字介绍-->
  <div class="bottom">
    <p class="p2">不同场景，无所不能</p>
    <p class="p3">释放无限创意</p>
    <p class="p4">联系我们</p>
    <p class="p5">E-mail:3054229818@qq.com</p>
    <p class="p6">QQ:3054229818</p>
    <p class="p7">Tel:18672782521</p>
    <div style="width:1000px;height:1px;margin:350px auto;
    padding:0px;background-color:#D5D5D5;overflow:hidden;">
    </div>
    <div class="p8">
    </div>
  </div>
<!--  背景图-->
  <div class="background"></div>

<!--回到顶部按钮-->
  <a id="top_back" href="#top" target="_self">
    <div>
      <img src="../assets/34.png">
    </div>
  </a>

</template>

<script>
import request from "@/utils/request";
import request_of_jason from "@/utils/request_of_jason";
import html2canvas from "html2canvas";

export default {
  name: 'HomeView',
  components: {

  },data(){
    return{
      model:"main",
      location_of_uploaded_img:"",//本地上传图片的地址
      url_normal_process_result:"",//后端处理后图片地址
      filename_of_pic_in_back:"",//后台存储文件名
      result_of_process:false,
      timer:null,
      process_page:0,
      //用于更换背景模块
      url_of_bg_img_from_back:'',//选中的后台提供背景图片url
      bg_option:[],
      src:'',
      multiples: 1,
      isClick:false,
      isClickOnly:true,
      isDblclick:true,
      params:{
        zoomVal_1:1,
        zoomVal_2:1,
        zoomVal_3:1,
        zoomVal_4:1,
        zoomVal_5:1,
        zoomVal_6:1,
        zoomVal_7:1,
        left: 0,
        top: 0,
        currentX: 0,
        currentY: 0,
        flag: false
      },
      //画板长款调整变量
      boxLeft:0,
      boxTop:0,
      boxHeight:320,
      boxWidth:420,
      wheelChange:0,//滚轮变化值
      //证件照背景色
      red:255,
      green:255,
      blue:255,
      //字体颜色角度
      word_red:0,
      word_green:0,
      word_blue:0,
      word_rotate:0,
      //图片删除
      imgChecked:"",
      deleteImgOne:false,
      deleteImgTwo:0,
      message:"",
      fontSizes:20,
      rotates:0,
      style_option:[]
    }
  },
  mounted() {
    this.imgShow()
    //this.getImg(this.imageUrl);
    document.addEventListener("scroll", this.addScroll)
  },
  watch:{
  },
  methods:{
    // 加载图片并预览
    load_local_pic(e){
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        const _base64 = reader.result
        this.location_of_uploaded_img = _base64 //将文件转读为url并通过_base64赋值给图片的src，实现图片预览
      }
    },
    // 将url中的二进制流转读为文件用于传给后端
    translateBase64ImgToFile(base64,filename,contentType){
      let arr = base64.split(',')  //去掉base64格式图片的头部
      let bstr = atob(arr[1])   //atob()方法将数据解码
      let length = bstr.length
      let u8arr = new Uint8Array(length);
      while(length--){
        u8arr[length] =  bstr.charCodeAt(length) //返回指定位置的字符的 Unicode 编码
      }
      return new File([u8arr],filename,{type:contentType})
    },
    // 设置计时器获取处理结果文件的url
    set_Timer(){
      this.timer = setInterval(() => {
        setTimeout(()=>{
          // 这里ajax 请求的代码片段和判断是否停止定时器
          this.load_result_pic(this.filename_of_pic_in_back);
          if(this.result_of_process){
            this.destroyTimer()
          }
          // 如需要停止定时器，只需加入以下：
        }, 0)
      }, 5000)
    },
    // 获取后端处理后生成的url
    load_result_pic(filename){
      request_of_jason.post('/api/image/download',{filename:filename}).then(res=> { //请求成功
        if(res.status ==='wait'){
          this.result_of_process = false
        }else {
          // const reader = new FileReader()
          // reader.readAsDataURL(e.target.files[0])
          // reader.onload = () => {
          //   const _base64 = reader.result
          //   this.location_of_uploaded_img = _base64 //将文件转读为url并通过_base64赋值给图片的src，实现图片预览
          // }
          this.url_normal_process_result = res.url
          this.result_of_process = true
        }
      })
    },
    // 根据后端传回的url下载文件到本地
    download_Result() {
      fetch(this.url_normal_process_result).then(res=>res.blob()).then(res=>{
        const bqa = document.createElement("a");
        bqa.setAttribute("download", this.filename_of_pic_in_back);
        bqa.setAttribute("href", URL.createObjectURL(res));
        bqa.click();
      })
    },
    // 删除计时器
    destroyTimer(){
      clearInterval(this.timer);
      this.timer=null;
    },
    process_change_background(){
      request_of_jason.post('api/image/delete',{filename:this.filename_of_pic_in_back})
      this.url_normal_process_result = ''
      this.destroyTimer();
      let file = this.translateBase64ImgToFile(this.location_of_uploaded_img, 'test.png', 'image/png')
      let param = new FormData();
      param.append('file',file,file.name)
      // 上传图片到后端
      request.post('/api/image/segmentation',param).then(res=>{
        if(res.status=='success'){
          this.filename_of_pic_in_back = res.message
          this.show_upload_result("上传成功，正在处理中")
          this.model='changed_background_photo';
          request_of_jason.post('api/background/load').then(res=>{
            this.bg_option = res.urls
            console.log(res)
          })
          this.set_Timer()
        }else {
          this.show_upload_result("上传有误，请重试")
          return
        };
      })
    },
    change_bg(order_of_bg_img){
      this.url_of_bg_img_from_back = this.bg_option[order_of_bg_img]
    },
    imgOver(String){
      if(this.isClick){
        this.isDblclick=true
        setTimeout(() => {
          if(this.isClickOnly){
            this.zIndex("imgOne",String)
            this.zIndex("imgTwo",String)
            this.zIndex("imgThree",String)
            this.zIndex("imgFour",String)
            const imgChecks = document.getElementById(String);
            imgChecks.style.zIndex=5
          }
        }, 200)
        setTimeout(() => {
          this.isDblclick = false
        }, 300)
      }
    },
    onBtn(String){
      if(String!="changeImg"){
        document.getElementById(String).click()
      }else if(this.isDblclick==true){
        document.getElementById(String).click()
        this.isClickOnly=false
      }
    },
    imgShow(){
      const filename=document.getElementById("load_bg_img_btn")
      const imgTwo = document.getElementById("imgTwo");
      const imgOne = document.getElementById("imgOne");
      const imgThree = document.getElementById("imgThree");
      const imgFour = document.getElementById("imgFour");
      filename.onchange=function () {
        if(filename.files[0]!=null){
          imgOne.src = URL.createObjectURL(this.files[0]);
        }
        if(filename.files[1]!=null){
          imgTwo.src = URL.createObjectURL(this.files[1]);
        }
        if(filename.files[2]!=null){
          imgThree.src = URL.createObjectURL(this.files[2]);
        }
        if(filename.files[3]!=null){
          imgFour.src = URL.createObjectURL(this.files[3]);
        }
      }
    },
    zIndex(String,next){
      const imgChecks = document.getElementById(String);
      const imgCheckNext=document.getElementById(next);
      if(imgChecks.style.zIndex>imgCheckNext.style.zIndex){
        imgChecks.style.zIndex-=1
      }
    },
    imgCheck(String){
      this.startDrag(document.getElementById(String), document.getElementById(String))
      const filename2=document.getElementById("changeImg")
      const imgChecks = document.getElementById(String);
      document.removeEventListener("keydown",this.deleteImg)
      this.deleteImgOne=true
      this.deleteImgTwo+=1
      this.imgChecked=String
      document.addEventListener("keydown",this.deleteImg)
      this.isClick=true
      setTimeout(() => {
        this.isClick = false
      }, 300)
      filename2.onchange=function () {
        imgChecks.src = URL.createObjectURL(this.files[0]);
      }
      setTimeout(() => {
        if(this.deleteImgTwo!=0){
          this.deleteImgTwo-=1
        }
      }, 5000)
    },
    download_result_of_change_bg(){
      html2canvas(document.getElementById("block-five"),{useCORS:true}).then(function (canvas) {
        console.log(canvas)
        const image=canvas.toDataURL("image/png")
        console.log(image)
        let $a=document.createElement("a")
        $a.setAttribute("href",image)
        $a.setAttribute("download","下载")
        $a.click()
      })
    },
    // 滚轮事件
    addScroll(){
      this.wheelChange=document.documentElement.scrollTop
      this.deleteImgTwo=0
    },
    bagimg(e,String) {
      const h = document.getElementById(String)
      if(String=="imgOne"){
        this.params.zoomVal_1 += event.wheelDelta / 1200;
        if (this.params.zoomVal_1 <= 0.2) {
          this.params.zoomVal_1 = 0.2;
        }
        this.wheel=false
      }
      if(String=="imgTwo"){
        this.params.zoomVal_2 += event.wheelDelta / 1200;
        if (this.params.zoomVal_2 <= 0.2) {
          this.params.zoomVal_2 = 0.2;
        }
        this.wheel=false
      }
      if(String=="imgThree"){
        this.params.zoomVal_3 += event.wheelDelta / 1200;
        if (this.params.zoomVal_3 <= 0.2) {
          this.params.zoomVal_3 = 0.2;
        }
        this.wheel=false
      }
      if(String=="imgFour"){
        this.params.zoomVal_4 += event.wheelDelta / 1200;
        if (this.params.zoomVal_4 <= 0.2) {
          this.params.zoomVal_4 = 0.2;
        }
        this.wheel=false
      }
      if(String=="result_of_change_bg_person"){
        this.params.zoomVal_5 += event.wheelDelta / 1200;
        if (this.params.zoomVal_5 <= 0.2) {
          this.params.zoomVal_5 = 0.2;
        }
        this.wheel=false
      }
      if(String=="identity_result_person"){
        this.params.zoomVal_6 += event.wheelDelta / 1200;
        if (this.params.zoomVal_6 <= 0.2) {
          this.params.zoomVal_6 = 0.2;
        }
        this.wheel=false
      }
      if(String=="m"){
        this.params.zoomVal_7 += event.wheelDelta / 1200;
        if (this.params.zoomVal_7 <= 0.2) {
          this.params.zoomVal_7 = 0.2;
        }
        this.wheel=false
      }
      setTimeout(() => {
        this.wheel=true
      }, 300)
    },
    getImgCss(e, key) {
      return e.currentStyle ? e.currentStyle[key] : document.defaultView.getComputedStyle(e, false)[key];
    },
    startDrag(bar, target, callback) {
      let that = this
      if (that.getImgCss(target, "left") !== "auto") {
        that.params.left = that.getImgCss(target, "left");
      }
      if (that.getImgCss(target, "top") !== "auto") {
        that.params.top = that.getImgCss(target, "top");
      }
      bar.onmousedown = function(event) {
        that.params.flag = true;
        if (!event) {
          event = window.event;
          bar.onselectstart = function() {
            return false;
          }
        }
        let e = event;
        that.params.currentX = e.clientX;
        that.params.currentY = e.clientY;
      };
      document.onmouseup = function() {
        that.params.flag = false;
        if (that.getImgCss(target, "left") !== "auto") {
          that.params.left = that.getImgCss(target, "left");

        }
        if (that.getImgCss(target, "top") !== "auto") {
          that.params.top = that.getImgCss(target, "top");
        }
      };
      document.onmousemove = function(event) {
        let e = event ? event : window.event;
        if (that.params.flag) {
          let nowX = e.clientX,
              nowY = e.clientY;
          if(that.imgChecked=="identity_result_person"){
            if(nowX>924||nowX<660||nowY<170-that.wheelChange||nowY>460-that.wheelChange-5){
              that.params.flag=false
            }
          }else {
            if(nowX>that.boxLeft-5+that.boxWidth+580||nowX<that.boxLeft+5+580||nowY<that.boxTop-that.wheelChange+5+145||nowY>that.boxTop-that.wheelChange+that.boxHeight-5+145){
              that.params.flag=false
            }
          }
          let disX = nowX - that.params.currentX,
              disY = nowY - that.params.currentY;
          target.style.left = parseInt(that.params.left) + disX + "px";
          target.style.top = parseInt(that.params.top) + disY + "px";
          if (event.preventDefault) {
            event.preventDefault();
          }
          return false;
        }
      }
    },
    changeBlock(String){
      if(String=="addWidth"&&this.boxWidth<460){
        this.boxWidth+=30
      }
      if(String=="reduceWidth"&&this.boxWidth>=100){
        this.boxWidth-=30
      }
      if(String=="addHeight"&&this.boxHeight<360){
        this.boxHeight+=20
      }
      if(String=="reduceHeight"&&this.boxHeight>=100){
        this.boxHeight-=20
      }
      const bigImg=document.getElementById("block-five")
      bigImg.style.height=this.boxHeight+"px"
      bigImg.style.width=this.boxWidth+"px"
    },
    deleteImg(e){
      if(e.keyCode==8&&this.deleteImgOne==true&&this.deleteImgTwo!=0){
        const img=document.getElementById(this.imgChecked)
        img.src=""
        img.style.left=0+"px"
        img.style.top=0+"px"
        if(this.imgChecked=="imgOne"){
          this.params.zoomVal_1=1
        }
        if(this.imgChecked=="imgTwo"){
          this.params.zoomVal_2=1
        }
        if(this.imgChecked=="imgThree"){
          this.params.zoomVal_3=1
        }
        if(this.imgChecked=="imgFour"){
          this.params.zoomVal_4=1
        }
        this.deleteImgOne=false
      }
    },








    process_change_style(){
      request_of_jason.post('api/image/delete',{filename:this.filename_of_pic_in_back})
      this.url_normal_process_result = ''
      this.destroyTimer();
      this.model='changed_style_photo';
    },
    change_style(style_number){
      request_of_jason.post('api/image/delete',{filename:this.filename_of_pic_in_back})
      this.destroyTimer();
      if(style_number==0){
        let file = this.translateBase64ImgToFile(this.location_of_uploaded_img, 'test.png', 'image/png')
        let param = new FormData();
        param.append('file',file,file.name)
        request.post('/api/style/watercolor',param).then(res=>{
          if(res.status=='success'){
            this.show_upload_result("上传成功，正在处理中")
            this.filename_of_pic_in_back = res.message
          }else {
            this.show_upload_result("上传有误，请重试")
            return
          };
        })
        this.set_Timer()
      }
      if(style_number==1){
        let file = this.translateBase64ImgToFile(this.location_of_uploaded_img, 'test.png', 'image/png')
        let param = new FormData();
        param.append('file',file,file.name)
        request.post('/api/style/sketch',param).then(res=>{
          if(res.status=='success'){
            this.show_upload_result("上传成功，正在处理中")
            this.filename_of_pic_in_back = res.message
          }else {
            this.show_upload_result("上传有误，请重试")
            return
          };
        })
        this.set_Timer()
      }
      if(style_number==2){
        let file = this.translateBase64ImgToFile(this.location_of_uploaded_img, 'test.png', 'image/png')
        let param = new FormData();
        param.append('file',file,file.name)
        request.post('/api/style/neno',param).then(res=>{
          if(res.status=='success'){
            this.show_upload_result("上传成功，正在处理中")
            this.filename_of_pic_in_back = res.message
          }else {
            this.show_upload_result("上传有误，请重试")
            return
          };
        })
        this.set_Timer()
      }
      // if(style_number==3){
      //   this.getImg(this.url_normal_process_result)
      // }
    },
    // getImg(src,index) {
    //   let that = this;
    //   let img = new Image();
    //   img.src = src;
    //   img.onload = function () {
    //     // 处理图像
    //     that.drawImages(src, img.width, img.height, index);
    //   };
    // },
    // drawImages(imgSrc, width, height, index) {
    //   let that = this;
    //   var img = new Image();
    //   img.src = imgSrc;
    //   img.onload = function () {
    //     var canvas = document.querySelector("#myCanvas");
    //     var cxt = canvas.getContext("2d");
    //     if (width < 750 || height < 1334) {
    //       canvas.width = width;
    //       canvas.height = height;
    //     } else {
    //       // 一般手机的图像素都比较大，这里缩小一下精度，避免循环太久
    //       let times = Math.floor(width / 750);
    //       canvas.width = width / times;
    //       canvas.height = height / times;
    //     }
    //     // 在画布上绘制图片，主要是为了读取读取图片的每一个像素的rgb值
    //     cxt.drawImage(img, 0, 0, canvas.width, canvas.height);
    //     // 得到每一个像素的rgb值，得到的数组以4个为单位，%4=1的是r值, %4=2是g值, %4=3是b值，%4=像素模糊值(0-255）
    //     let imageData = cxt.getImageData(0, 0, canvas.width, canvas.height);
    //     let imageData_length = imageData.data.length / 4;
    //     let d = imageData.data;
    //     let originData = [];
    //     // 输出老照片
    //     if (index == 3) {
    //       that.drawOldImg(d);
    //       cxt.putImageData(imageData, 0, 0);
    //       let imgurl = canvas.toDataURL(); //获取图片的DataURL
    //       that.url_normal_process_result = imgurl;
    //     } else if (index == 4) {
    //       // 黑白
    //       that.discolor(d);
    //       cxt.putImageData(imageData, 0, 0);
    //       let imgurl = canvas.toDataURL(); //获取图片的DataURL
    //       that.url_normal_process_result = imgurl;
    //     } else if (index == 5) {
    //       //浮雕的效果
    //       that.relief(d);
    //       cxt.putImageData(imageData, 0, 0);
    //       let imgurl = canvas.toDataURL(); //获取图片的DataURL
    //       that.url_normal_process_result = imgurl;
    //     } else if (index == 6) {
    //       // 素描
    //       that.sketch(imageData, 20, canvas, cxt);
    //       cxt.putImageData(imageData, 0, 0);
    //       let imgurl = canvas.toDataURL(); //获取图片的DataURL
    //       that.url_normal_process_result = imgurl;
    //     }
    //   };
    // },
    // // 老照片
    // drawOldImg(d) {
    //   for (var i = 0; i < d.length; i += 4) {
    //     var r = d[i];
    //     var g = d[i + 1];
    //     var b = d[i + 2];
    //     d[i] = r * 0.393 + g * 0.769 + b * 0.189; // red
    //     d[i + 1] = r * 0.349 + g * 0.686 + b * 0.168; // green
    //     d[i + 2] = r * 0.272 + g * 0.534 + b * 0.131; // blue
    //     d[i + 3] = 255; // 像素模糊值
    //   }
    //   return d;
    // },
    // // 素描
    // sketch(imgData, radius, canvas, ctx) {
    //   let pixes = imgData.data;
    //   let width = imgData.width;
    //   let height = imgData.height;
    //   let copyPixes = "";
    //   this.discolor(pixes); //去色
    //   //复制一份
    //   ctx.clearRect(0, 0, width, height);
    //   ctx.putImageData(imgData, 0, 0);
    //   copyPixes = ctx.getImageData(0, 0, width, height).data;
    //   // 拷贝数组太慢
    //   this.invert(copyPixes); //反相
    //   this.gaussBlurs(copyPixes, width, height, radius); //高斯模糊
    //   this.dodgeColor(pixes, copyPixes); //颜色减淡
    //   return pixes;
    // },
    // // 把图像变成黑白色
    // discolor(d) {
    //   for (var i = 0; i < d.length; i += 4) {
    //     let average = d[i] * 0.1 + d[i + 1] * 0.5 + d[i + 2] * 0.9;
    //     d[i + 0] = average; //红
    //     d[i + 1] = average; //绿
    //     d[i + 2] = average; //蓝
    //   }
    //   return d;
    // },
    // //浮雕
    // relief(d) {
    //   for (var i = 0, j = 4; i < d.length; i += 4, j += 4) {
    //     if (j > d.length) {
    //       j = d.length - 4;
    //     }
    //     // 3.把相邻像素的同个通道进行差值运算,再加上中性灰的色值
    //     let r = Math.abs(d[i] - d[j] + 128),
    //         g = Math.abs(d[i + 1] - d[j + 1] + 128),
    //         b = Math.abs(d[i + 2] - d[j + 2] + 128);
    //
    //     // 4.把结果通道的值进行求和并按权平均作为最终通道的值
    //     let val = parseInt(r * 0.3 + g * 0.6 + b * 0.1);
    //     d[i] = val;
    //     d[i + 1] = val;
    //     d[i + 2] = val;
    //   }
    //   return d;
    // },
    // // 把图片反相, 即将某个颜色换成它的补色
    // invert(pixes) {
    //   for (var i = 0, len = pixes.length; i < len; i += 4) {
    //     pixes[i] = 255 - pixes[i]; //r
    //     pixes[i + 1] = 255 - pixes[i + 1]; //g
    //     pixes[i + 2] = 255 - pixes[i + 2]; //b
    //   }
    //   return pixes;
    // },
    // // 颜色减淡
    // dodgeColor(basePixes, mixPixes) {
    //   for (var i = 0, len = basePixes.length; i < len; i += 4) {
    //     basePixes[i] =
    //         basePixes[i] + (basePixes[i] * mixPixes[i]) / (255 - mixPixes[i]);
    //     basePixes[i + 1] =
    //         basePixes[i + 1] +
    //         (basePixes[i + 1] * mixPixes[i + 1]) / (255 - mixPixes[i + 1]);
    //     basePixes[i + 2] =
    //         basePixes[i + 2] +
    //         (basePixes[i + 2] * mixPixes[i + 2]) / (255 - mixPixes[i + 2]);
    //   }
    //   return basePixes;
    // },

    process_person(){
      request_of_jason.post('api/image/delete',{filename:this.filename_of_pic_in_back})
      this.url_normal_process_result = ''
      this.destroyTimer();
      let file = this.translateBase64ImgToFile(this.location_of_uploaded_img, 'test.png', 'image/png')
      let param = new FormData();
      param.append('file',file,file.name)
      request.post('/api/image/segmentation',param).then(res=>{
        if(res.status=='success'){
          this.filename_of_pic_in_back = res.message
          this.model='person_photo';
          this.show_upload_result("上传成功，正在处理中")
          this.set_Timer()
        }else {
          this.show_upload_result("上传有误，请重试")
          return
        };
      })
    },
    process_identification(){
      request_of_jason.post('api/image/delete',{filename:this.filename_of_pic_in_back})
      this.url_normal_process_result = ''
      this.destroyTimer();
      let file = this.translateBase64ImgToFile(this.location_of_uploaded_img, 'test.png', 'image/png')
      let param = new FormData();
      param.append('file',file,file.name)
      request.post('/api/image/segmentation',param).then(res=>{
        if(res.status=='success'){
          this.filename_of_pic_in_back = res.message
          this.model='identity_photo';
          this.show_upload_result("上传成功，正在处理中")
          this.set_Timer()
        }else {
          this.show_upload_result("上传有误，请重试")
          return
        };
      })
    },
    drag_person(String){
      this.imgChecked=String
      this.startDrag(document.getElementById(String),document.getElementById(String))
    },
    download_Result_of_identity_process(){
      html2canvas(document.getElementById("block-two"),{useCORS:true}).then(function (canvas) {
        const image=canvas.toDataURL("image/png")
        let $a=document.createElement("a")
        $a.setAttribute("href",image)
        $a.setAttribute("download","下载")
        $a.click()
      })
    },
    load_pic_button() {
      this.$refs.relFile.dispatchEvent(new MouseEvent('click'))
    },
    fileChange() {
      // 上传文件
    },
    return_to_main_page(){
      this.model='main';
      this.destroyTimer();
      request_of_jason.post('api/image/delete',{filename:this.filename_of_pic_in_back})
      this.filename_of_pic_in_back='';
      this.result_of_process=false;
      this.url_normal_process_result='';
      this.process_page = 0
    },
    //上传结果提示
    showTips(objInfo){
      let mTitle = objInfo && objInfo.title || "信息提示";
      let w = objInfo && objInfo.width || 250;

      let h = objInfo && objInfo.height || 100;
      let duration = objInfo && objInfo.duration || 2200;

      let infoTips = objInfo && objInfo.infoTips || "图片处理中";

      const alert = document.createElement("div");
      alert.style.cssText = `position:absolute;left:45%;top:0%;z-index:99999;color:white;font-size:18px;border-radius:10px;box-shadow:inset 0px 0px 8px #fff;background-color: rgba(0,0,0,0.5);overflow:hidden;`;
      alert.style.width = w+"px";
      alert.style.minHeight = h+"px";

      const title = document.createElement("p");
      title.innerHTML = mTitle+":";
      title.style.cssText = `margin:10px 0 10px 10px;`;

      const con = document.createElement("p");
      con.style.cssText = `display:flex;justify-content:center;align-items:center;padding:0px 10px 0px;margin-bottom:10px;font-size:16px;word-break:break-all;`;
      con.innerHTML = infoTips;

      alert.appendChild(title);
      alert.appendChild(con);
      document.body.appendChild(alert);
      setTimeout(function(){
        document.body.removeChild(alert);
      },duration);
    },
    show_upload_result(String){
      const obj={
        infoTips:String
      }
      this.showTips(obj)
    }
  }
}

</script>
<style>
.load_person, .load_identity,.load_background,.load_style{
  background-image: url("../assets/40.gif");
  width: 75px;
  height: 30px;
  background-size: 100%,100%;
  z-index: 999;
}

#change_bg_result_img_original{
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  height: 300px;
}
/*导航栏*/
.daohang{
  margin-top: -8px;
  width: 80%;
  height: 50px;
  z-index:999;
  background-color: rgb(250,250,250);
  margin-left: 10%;
  box-shadow: 0px 5px  rgba(0, 0, 0, .2);
}
.logo{
  width: 50px;
  height: 50px;
  background-image: url('../assets/22.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  margin-left: 3%;
  z-index:999;
  float: left;
}
#page_title{
  float: left;
  padding-left: 28px;
  margin-top: 12px;
  font-size: 28px;
  font-weight: bold;
  color: black;
  font-family: 'Microsoft YaHei'
}
#about_us{
  float: right;
  padding-right: 5px;
  padding-top: 6px;
  font-size: 18px;
}
#about_us:hover{
  color: #837F7F;
  cursor: pointer;
}
/*上面整个组件*/
.up{
  width: 80%;
  height: 490px;
  background-image: url('../assets/1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  left: 10%;
  top: 2px;
}
.in1{
  width: 350px;
  height: 200px;
  background-image: url('../assets/2.png');
  background-size: 100% 100%;
  margin-left:55% ;
  position: absolute;
  margin-top: 70px;
}

.main-submit{
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  font-weight: 500;
  color: #cccccc;/*改了颜色*/
  position: absolute;
  margin-top: 100px;
  margin-left: 115px;
}

.main-submit:hover{
  transition: background 180ms;
}
.main-upload{
  cursor: pointer;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 30px;
  font-weight: 500;
  color: #0099FF;/*改了颜色*/
  position: absolute;
  width: 100%;
  height: 100%;
  outline: none;
  filter:alpha(opacity=0);
  -moz-opacity:0;
  -khtml-opacity: 0;
  opacity: 0;
}
.imgBox{
  display: table-cell;
  height: 200px;
  width: 400px;
  text-align: center;
}
#original_pic{
  max-height: 100%;
  max-width: 100%;
  height: 200px;
  object-fit: contain;
}
/*选择图片按钮*/
.upload_btn{
  width: 150px;
  height: 50px;
  color: white;
  background-color: #0099FF;/*改了颜色*/
  position: absolute;
  margin-top: 40px;
  margin-left: 100px;
  border-radius: 5px;
  border:none;
  font-size: 20px;
}
.upload_btn:hover{
  cursor:pointer;
  color: whitesmoke;
}
.upload_btn:hover{
  background-color: rgb(0, 119, 255);/*改了颜色*/
}
/*扣人模块*/
.person{
  width: 80%;
  height: 490px;
  position: relative;
  background-image: url('../assets/14.png');
  background-size: 100% 100%;
  margin-left: 10%;
  z-index: 999;
}

.changebg_part{
  width: 80%;
  height: 490px;
  position: relative;
  background-image: url('../assets/14.png');
  background-size: 100% 100%;
  margin-left: 10%;
}
#normal_process_result_in_bg{
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  height: 180px;
}
#result_of_change_bg_person{
  max-height: 100%;
  max-width: 100%;
  position: absolute;
  object-fit: contain;
  z-index: 60;
}
.block-four{
  width: 15%;
  height: 180px;
  background-color: white;
  position: absolute;
  margin-top: 40px;
  margin-left: 10%;
  text-align: center;
}
#block-five{
  position:absolute;
  overflow: hidden;
  width: 350px;
  height: 320px;
  background-color: white;
  margin-top: 20px;
  margin-left: 33%;
}
#imgOne{
  position: absolute;
  margin-left: 0;
  width: auto;
  height: 150px;
  z-index: 1;
  object-fit: contain;
  max-height: 100%;
  max-width: 100%;

}
#imgTwo{
  position: absolute;
  margin-left: 200px;
  width: auto;
  height: 150px;
  z-index: 2;
  object-fit: contain;
  max-height: 100%;
  max-width: 100%;
}
#imgThree{
  position: absolute;
  margin-left: 0;
  margin-top: 200px;
  width: auto;
  height: 150px;
  z-index: 3;
  object-fit: contain;
  max-height: 100%;
  max-width: 100%;
}
#imgFour{
  position: absolute;
  margin-left: 200px;
  margin-top: 200px;
  width: auto;
  height: 150px;
  z-index: 4;
  object-fit: contain;
  max-height: 100%;
  max-width: 100%;
}
#m{
  position: absolute;
  width: auto;
  z-index: 100;
}
#bgGroup{
  top: -160px;
  position: relative;
}

.identity_part{
  width: 80%;
  height: 490px;
  position: relative;
  background-image: url('../assets/14.png');
  background-size: 100% 100%;
  margin-left: 10%;
}

.backToHome{
  margin-top:20px;
  margin-left:-170px;
  font-size: 27px;
  border-radius: 2px;
  color: #0099FF;
  background-color: aliceblue;/*改了颜色*/
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  border: none;
  font-weight: bold;
  outline: none;
  position: static;
}
.backToHome:hover{
  color: #bedeff;
  cursor: pointer;
}

.blockMain{
  /*改了大小*/
  width: 90%;
  height: 400px;
  background-color: rgb(250,250,250);
  position: absolute;
  margin-top: 20px;
  margin-left: 5%;
  border-radius: 12px;
}

.block-one{
  width: 25%;
  height: 300px;
  background-color: white;
  position: absolute;
  margin-top: 40px;
  margin-left: 10%;
  text-align: center;
}

#block-two{
  width: 25%;
  height: 300px;
  background-color: white;
  position: absolute;
  margin-top: 40px;
  margin-left: 40%;
  overflow: hidden;
}

.select-BGColor{
  margin-left: 77%;
  margin-top: 130px;
}

/*证件照模块*/
.block-three{
  width: 30%;
  height: 300px;
  background-color: white;
  position: absolute;
  margin-top: 40px;
  margin-left: 30%;
  text-align: center;
}
#identity_result_img{
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  height: 300px;
}
.waiting_info{
  padding-top:70px;
  font-weight: bold;
  font-size: 20px;
  color: #837F7F;
}
.download_btn{
  margin-left: 77%;
  margin-top: 90px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 30px;
  color: white;
  border-radius: 5px;
  background-color: #0099FF;/*改了颜色*/
  border: none;
  outline: none;
  padding: 8px;
  position: static;
}
.download_btn:hover{
  color: gainsboro;
  cursor: pointer;
}
/*证件照模块*/
.change_style_btn{
  margin-left: 77%;
  margin-top: 20px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 30px;
  color: white;
  border-radius: 5px;
  background-color: #0099FF;
  padding: 8px;
  border: none;
  outline: none;
}
.change_style_btn:hover{
  color: whitesmoke;
  cursor: pointer;
}
.photo_of_user_in_identity{
  max-height: 100%;
  max-width: 100%;
  height: 300px;
  object-fit: contain;
}
#block-six{
  width: 25%;
  height: 300px;
  background-color: white;
  position: absolute;
  margin-top: 40px;
  margin-left: 40%;
  text-align: center;
}
/* 中间4个控件*//*改了边框，样式，阴影，hover和act*/
.middle{
  position: absolute;
  width: 79%;
  height: 200px;
  margin-left: 10%;
  background-color: #F7F9FB;
}

.identity_button{
  width: 150px;
  height: 150px;
  background-image: url('../assets/5.png');
  background-size: 100% 100%;
  position: absolute;
  margin-left: 33%;
  margin-top: 40px;
  border-width: 3px;
  border: none;
  box-shadow: 0px 0px 10px #888888;
}
.identity_button:hover{
  cursor: pointer;
  box-shadow: 0px 0px 10px #5E5D5D;
}
.identity_button:active{
  box-shadow: 0px 0px 10px #888888;
}
#identity_result_person{
  position: absolute;
  margin-left: -11%;
  width: auto;
  height: 300px;
  z-index: 10;
  object-fit: contain;
  max-height: 100%;
  max-width: 100%;
}
.person_process_button{
  width: 150px;
  height: 150px;
  background-image: url('../assets/3.png');
  background-size: 100% 100%;
  position: absolute;
  margin-left: 50%;
  margin-top: 40px;
  border-width: 3px;
  border: none;
  box-shadow: 0px 0px 10px #888888;
}
.person_process_button:hover{
  cursor: pointer;
  box-shadow: 0px 0px 10px #5E5D5D;
}
.person_process_button:active{
  box-shadow: 0px 0px 10px #888888;
}
#func_btn_in_bg{
  margin-left: 860px;
  margin-top: 325px;
  width: 200px;
  height: 50px;
}
#download_btn_in_change_bg{
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 20px;
  color: white;
  border-radius: 5px;
  background-color: #0099FF;
  padding: 8px;
  border: none;
  outline: none;
  float: right;
}
#change_background_btn{
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 20px;
  color: white;
  border-radius: 5px;
  background-color: #0099FF;
  padding: 8px;
  border: none;
  outline: none;
  float: left;
}
#change_background_btn:hover{
  color: whitesmoke;
  cursor: pointer;
}
.change_bg_button{
  width: 150px;
  height: 150px;
  background-image: url('../assets/4.png');
  background-size: 100% 100%;
  position: absolute;
  margin-left: 15%;
  margin-top: 40px;
  border-width: 3px;
  border: none;
  box-shadow: 0px 0px 10px #888888;
}
.change_bg_button:hover{
  box-shadow: 0px 0px 10px #5E5D5D;
  cursor: pointer;
}
.change_bg_button:active {
  box-shadow: 0px 0px 10px #888888;
}
#width_height_tools{
  left: 860px;
  padding-top: 80px;
  position: absolute;
}
#add_width{
  border: none;
  border-radius: 3px;
  width: 100px;
  font-size: 20px;
  color: white;
  background-color: #99ccff
}
#reduce_width{
  border: none;
  border-radius: 3px;
  width: 100px;
  margin-left: 5px;
  color: white;
  font-size: 20px;
  background-color: #99ccff
}
#add_height{
  border: none;
  border-radius: 3px;
  width: 100px;
  color: white;
  font-size: 20px;
  background-color: #99ccff;
  margin-top: 8px;
}
#reduce_height{
  border: none;
  border-radius: 3px;
  width: 100px;
  color: white;
  margin-left: 5px;
  font-size: 20px;
  background-color: #99ccff;
  margin-top: 8px;
}
.change_style_button{
  width: 150px;
  height: 150px;
  background-image: url('../assets/9.png');
  background-size: 100% 100%;
  position: absolute;
  margin-left: 68%;
  margin-top: 40px;
  border-width: 3px;
  border: none;
  box-shadow: 0px 0px 10px #888888;
}
.change_style_button:hover{
  box-shadow: 0px 0px 10px #5E5D5D;
  cursor: pointer;
}
.change_style_button:active{
  box-shadow: 0px 0px 10px #888888;
}
#special_process_result{
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  height: 300px;
}
#style_process_origin{
  padding-left: 0px;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  height: 300px;
}
#style_tool_box{
  padding-left: 725px;
}
/*下面部分*/
.down{
  width: 79%;
  height: 400px;
  margin-left: 10%;
  margin-top: 200px;
  position: absolute;
  background-size: 100% 100%;
  background-color: #F7F9FB;
}

#swiper-roll .roll-wrapper{
  width:100%;
  overflow: hidden;
  height: 130px;
  margin: 0 auto;
  position: relative;
}
.roll-wrapper li{
  float: left;
  list-style: none;
  width: 150px;
  height: 130px;
}
.roll-wrapper ul{
  position: absolute;
  top: 0;
  left: 0;
}

.d1{
  width: 300px;
  height: 150px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 6%;
  margin-top: 830px;
  z-index:999;
  background-image: url('../assets/10.png');
}

.d3{
  width: 300px;
  height: 150px;
  background-size: 100% 100%;
  position: absolute;
  margin-top: 830px;
  margin-left: calc(46% - 110px);
  background-image: url('../assets/11.png');
  background-size: 100% 100%;
  z-index:999;
}

.d2{
  width: 300px;
  height: 150px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 65%;
  margin-top: 810px;
  background-image: url('../assets/12.png');
  z-index:999;
}


/*最下面*/
.bottom{
  width: 79%;
  height: 800px;
  position: absolute;
  margin-left: 10%;
  margin-top: 600px;
  background-color:white;
}

.p2{
  font-size: 80px;
  position: absolute;
  margin-top: 90px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  margin-left: calc(50% - 360px);
}

.p3{
  font-size: 40px;
  position: absolute;
  margin-top: 250px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  margin-left: calc(50% - 120px);
}
/*以下都为新增*/
.p4{
  font-size: 30px;
  position: absolute;
  margin-top: 460px;
  margin-left: 60%;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: #837F7F;
}
.p5{
  font-size: 30px;
  position: absolute;
  margin-top: 520px;
  margin-left: 60%;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: #837F7F;
}
.p6{
  font-size: 30px;
  position: absolute;
  margin-top: 580px;
  margin-left: 60%;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: #837F7F;
}
.p7{
  font-size: 30px;
  position: absolute;
  margin-top: 640px;
  margin-left: 60%;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: #837F7F;
}
.p8{
  width: 80px;
  height: 80px;
  background-image: url('../assets/13.png');
  background-size: 100% 100%;
  position: absolute;
  margin-left: 60%;
  margin-top: 0px;
  border: none;
  box-shadow: 0px 0px 10px #888888;
}
.pe1{
  width: 300px;
  height: 150px;
  background-size: 100% 100%;
  position: absolute;
  left: 6%;
  top: 750px;
  z-index:999;
  background-image: url('../assets/15.png');
}
.pe2{
  width: 150px;
  height: 220px;
  background-size: 100% 100%;
  position: absolute;
  left: 45%;
  top: 730px;
  z-index:999;
  background-image: url('../assets/17.png');
}
.pe3{
  width: 150px;
  height: 220px;
  background-size: 100% 100%;
  position: absolute;
  left: 65%;
  top: 730px;
  z-index:999;
  background-image: url('../assets/16.png');
}
.bg1{
  width: 150px;
  height: 220px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 15%;
  margin-top: 730px;
  z-index:999;
  background-image: url('../assets/18.png');
}
.bg2{
  width: 150px;
  height: 220px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 35%;
  margin-top: 730px;
  z-index:999;
  background-image: url('../assets/19.png');
}
.bg3{
  width: 150px;
  height: 220px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 50%;
  margin-top: 730px;
  z-index:999;
  background-image: url('../assets/20.png');
}
.bg4{
  width: 150px;
  height: 220px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 70%;
  margin-top: 730px;
  z-index:999;
  background-image: url('../assets/21.png');
}
.st1{
  width: 300px;
  height: 240px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 21%;
  margin-top: 750px;
  z-index:999;
  background-image: url('../assets/23.jpg');
}
.st2{
  width: 300px;
  height: 240px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 53%;
  margin-top: 750px;
  z-index:999;
  background-image: url('../assets/24.jpg');
}
.zj1{
  width: 150px;
  height: 220px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 20%;
  margin-top: 750px;
  z-index:999;
  background-image: url('../assets/25.png');
}
.zj2{
  width: 150px;
  height: 220px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 42%;
  margin-top: 750px;
  z-index:999;
  background-image: url('../assets/26.jpg');
}
.zj3{
  width: 150px;
  height: 220px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 65%;
  margin-top: 750px;
  z-index:999;
  background-image: url('../assets/27.png');
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-color: #fff;
  background-image: url(../assets/28.png) ;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
.g1{
  width: 40px;
  height: 40px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 12%;
  margin-top: 40px;
  border-width: 3px;
  border: none;
  box-shadow: 0px 0px 10px #888888;
}
.g1:hover{
  box-shadow: 0px 0px 10px #5E5D5D;
  cursor: pointer;
}
.g1:active{
  box-shadow: 0px 0px 10px #888888;
}
.g2{
  width: 40px;
  height: 40px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 18%;
  margin-top: 40px;
  border-width: 3px;
  border: none;
  box-shadow: 0px 0px 10px #888888;
}
.g2:hover{
   box-shadow: 0px 0px 10px #5E5D5D;
   cursor: pointer;
 }
.g2:active{
  box-shadow: 0px 0px 10px #888888;
}
.g3{
  width: 40px;
  height: 40px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 8%;
  margin-top: 95px;
  border-width: 3px;
  border: none;
  box-shadow: 0px 0px 10px #888888;
}
.g3:hover{
  box-shadow: 0px 0px 10px #5E5D5D;
  cursor: pointer;
}
.g3:active{
  box-shadow: 0px 0px 10px #888888;
}
.g4{
  width: 40px;
  height: 40px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 15%;
  margin-top: 95px;
  border-width: 3px;
  border: none;
  box-shadow: 0px 0px 10px #888888;
}
.g4:hover{
  box-shadow: 0px 0px 10px #5E5D5D;
  cursor: pointer;
}
.g4:active{
  box-shadow: 0px 0px 10px #888888;
}
.g5{
  width: 40px;
  height: 40px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 22%;
  margin-top: 95px;
  border-width: 3px;
  border: none;
  box-shadow: 0px 0px 10px #888888;
}
.g5:hover{
  box-shadow: 0px 0px 10px #5E5D5D;
  cursor: pointer;
}
.g5:active{
  box-shadow: 0px 0px 10px #888888;
}
.block-four{
  width: 15%;
  height: 180px;
  background-color: white;
  position: absolute;
  margin-top: 40px;
  margin-left: 10%;
  text-align: center;
}

.block-five{
  width: 30%;
  height: 360px;
  background-color: white;
  position: absolute;
  margin-top: 20px;
  margin-left: 35%;
}

#top_back{
  width:80px;
  position:fixed;
  right:20px;
  bottom:20px;
}
#top_back img{
  width:100%;
}
#top_back:hover{
  box-shadow: 0px 0px 10px #5E5D5D;
  cursor: pointer;
}
#top_back:active{
  box-shadow: 0px 0px 10px #888888;
}

</style>
