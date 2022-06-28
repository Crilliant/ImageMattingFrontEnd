<template>
<!--  导航栏-->
  <div class="daohang">
    <div class="logo"></div>
    <p>欢迎使用猫之使徒在线抠图！</p>
  </div>
  <!--上面部分-->
  <div class="up" v-if="model=='main'">
    <div class="in1">
      <form enctype="multipart/form-data" method="post">
        <p type="primary" class="main-submit" v-if="location_of_uploaded_img==''">提交图片</p>
        <input ref="relFile" name="file" class="main-upload" type="file" @change="loadpic" >
        <div class="imgBox">
          <img id="original_pic" :src="location_of_uploaded_img" value='custom'/>
        </div>
      </form>
      <button @click="loadpic_button" class="upload_btn">点击上传图片</button>
<!--      装饰模块-->
      </div><div class="d1">
      </div><div class="d3">
      </div><div class="d2">
    </div>
  </div>
  <!--中间三个控件-->
  <div class="middle">
    <div ><button class="b2" @click="process_identification"></button></div>
    <div><button class="b3" @click="process_person"></button></div>
    <div><button class="b4" @click="process_change_background"></button></div>
    <div><button class="b5" @click="process_change_style"></button></div>
  </div>
<!--  人物抠取模块-->
  <div v-if="model=='person_photo'" class="person">
    <button class="backToHome" @click="return_to_main_page">返回首页</button>
    <div class="blockMain">
      <!--      图片位置-->
      <div class="block-one">
      </div>
      <div class="block-two"></div>
      <div class="select-BGColor" v-cloak></div>
      <button type="primary"  class="download_btn" @click="download_Result">一键下载</button>
<!--      装饰模块-->
      <div class="pe1"></div>
      <div class="pe2"></div>
      <div class="pe3"></div>
    </div>
  </div>
<!--  证件照模块-->
  <div v-if="model=='identity_photo'" class="identity_part">
    <button class="backToHome" @click="return_to_main_page">返回首页</button>
    <div class="blockMain">
      <!--      图片位置-->
      <div class="block-three">
        <div class="waiting_info" v-if="url_of_identity_process_result==''">图片加载中...</div>
        <img id="identity_result_img" :src="url_of_identity_process_result" value='custom'/>
      </div>
      <button type="primary" class="download_btn" @click="download_Result">一键下载</button>
    </div>
  </div>
<!--  换背景模块-->
  <div v-if="model=='changed_background_photo'" class="changebg_part">
    <button class="backToHome" @click="return_to_main_page">返回首页</button>
    <div class="blockMain">
      <div class="block-one">
        <div class="waiting_info" v-if="url_of_bg_process_result==''">图片加载中...</div>
        <img id="change_bg_result_img_original" value="custom" :src="url_of_bg_process_result">
      </div>
      <div class="block-two">
        <img :src="url_of_bg_img_from_back" id="result_of_change_bg_back_img">
        <img :src='url_of_bg_process_result' id="result_of_change_bg_person">
      </div>
      <button type="primary"  class="download_btn" @click="download_Result">一键下载</button>
      <button type="primary"  class="change_style_btn">添加背景</button>
    </div>
    <div id="bgGroup">
      <img :src=bg_option[0] @click="change_bg(0)">
      <img :src=bg_option[1] @click="change_bg(1)">
      <img :src=bg_option[2] @click="change_bg(2)">
      <img :src=bg_option[3] @click="change_bg(3)">
    </div>
    <div class="bg1"></div>
    <div class="bg2"></div>
    <div class="bg3"></div>
    <div class="bg4"></div>
  </div>
  <!--  换风格模块-->
  <div v-if="model=='changed_style_photo'" class="changebg_part">
    <button class="backToHome" @click="return_to_main_page">返回首页</button>
    <div class="blockMain">
      <div class="block-one"></div>
      <div class="block-two"></div>
      <button type="primary"  class="download_btn" @click="download_Result">一键下载</button>
      <button type="primary"  class="change_style_btn">添加背景</button>
    </div>
    <div class="bg1"></div>
    <div class="bg2"></div>
    <div class="bg3"></div>
    <div class="bg4"></div>
  </div>
  <!--下面部分-->
  <div class="down">
    <div style="width:800px;height:1px;margin:70px auto;
    padding:0px;background-color:#D5D5D5;overflow:hidden;">
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
</template>

<script>
// @ is an alias to /src
//先把图片上传显示出来
//加一个a标签，获取图片的流，点download下载就好了
import request from "@/utils/request";
import axios from "axios";
import request_of_jason from "@/utils/request";

export default {
  name: 'HomeView',
  components: {

  },data(){
    return{
      model:"main",
      location_of_uploaded_img:"",//本地上传图片的地址
      url_of_identity_process_result:"",//后端处理后图片地址
      url_of_bg_process_result:"",//后端处理后的分割图
      filename_of_pic_in_back:"",//后台存储文件名
      result_of_process:false,
      timer:null,
      url_of_bg_img_from_back:'',//选中的后台提供背景图片url
      bg_option:[]
    }
  },watch:{
  },methods:{
    // 加载图片并预览
    loadpic(e){
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
    //将图片文件传递给后端
    // 根据后端传回的url下载文件到本地
    download_Result() {
      fetch(this.url_of_identity_process_result).then(res=>res.blob()).then(res=>{
        const bqa = document.createElement("a");
        bqa.setAttribute("download", this.filename_of_pic_in_back);
        bqa.setAttribute("href", URL.createObjectURL(res));
        bqa.click();
      })
    },
    destroyTimer(){
      clearInterval(this.timer);
      this.timer=null;
    },
    //设置定时器，每隔一段时间发送请求
    // 根据url显示处理后的图片文件
    set_identification_Timer(){
        this.timer = setInterval(() => {
            setTimeout(()=>{
              // 这里ajax 请求的代码片段和判断是否停止定时器
              this.load_identification_result_pic(this.filename_of_pic_in_back);
              if(this.result_of_process){
                this.destroyTimer()
              }
              // 如需要停止定时器，只需加入以下：
            }, 0)
        }, 5000)
    },
    set_segmentation_Timer(){
      this.timer = setInterval(() => {
        setTimeout(()=>{
          // 这里ajax 请求的代码片段和判断是否停止定时器
          this.load_segmentation_result_pic(this.filename_of_pic_in_back);
          if(this.result_of_process){
            this.destroyTimer()
          }
          // 如需要停止定时器，只需加入以下：
        }, 0)
      }, 5000)
    },
    load_segmentation_result_pic(filename){
      axios.post(' http://10.133.154.165:5000/api/image/download',
          {  //body参数
            filename:filename}, {headers: {  //头部参数
              'Content-Type': 'application/json',
            }
          }
      ).then(res=> { //请求成功
        if(res.data.status ==='wait'){
          this.result_of_process = false
        }else {
          console.log(res)
          this.url_of_identity_process_result = res.data
          console.log(this.url_of_identity_process_result)
          this.result_of_process = true
        }
      })
    },
    load_identification_result_pic(filename){
      axios.post('http://10.133.154.165:5000/api/image/download',
          {  //body参数
            filename:filename}, {headers: {  //头部参数
              'Content-Type': 'application/json',
            }
          }
      ).then(res=> { //请求成功
        if(res.data.status ==='wait'){
          this.result_of_process = false
        }else {
          console.log(res)
          this.url_of_identity_process_result = res.data
          console.log(this.url_of_identity_process_result)
          this.result_of_process = true
        }
          })
      },
    //改变背景功能模块
    process_change_background(){
      this.model='changed_background_photo';
      request_of_jason.post('/api/background/load').then(res=>{
        console.log(res);
        this.bg_option = res.urls;
      });

    },
    change_bg(order_of_bg_img){
      this.url_of_bg_img_from_back = this.bg_option[order_of_bg_img]
    },











    process_change_style(){
      this.model='changed_style_photo'
    },
    process_person(){
      // this.model='person_photo';
      this.model='identity_photo';
      let file = this.translateBase64ImgToFile(this.location_of_uploaded_img, 'test.png', 'image/png')
      let param = new FormData();
      param.append('file',file,file.name)
      request.post('/api/image/segmentation',param).then(res=>{
        if(res.status=='success'){
          var r=confirm("照片处理中，请稍后");
          this.filename_of_pic_in_back = res.message
        }else {
          console.log(res)
          var r=confirm("上传有误");
          return
        };
      })
      this.set_segmentation_Timer()
    },
    process_identification(){
      this.model='identity_photo';
      let file = this.translateBase64ImgToFile(this.location_of_uploaded_img, 'test.png', 'image/png')
      let param = new FormData();
      param.append('file',file,file.name)
      request.post('/api/image/identification',param).then(res=>{
        if(res.status=='success'){
          var r=confirm("照片处理中，请稍后");
          this.filename_of_pic_in_back = res.message
        }else {
          console.log(res)
          var r=confirm("上传有误");
          return
        };
      })
      this.set_identification_Timer()
    },
    loadpic_button() {
      this.$refs.relFile.dispatchEvent(new MouseEvent('click'))
    },
    fileChange() {
      // 上传文件
    },
    return_to_main_page(){
      this.model='main';
      this.destroyTimer();
      this.filename_of_pic_in_back='';
      this.result_of_process=false;
      this.url_of_identity_process_result='';
    }
  }
}

</script>
<style>
#bgGroup{
  border: #5E5D5D solid 5px;
}
#result_of_change_bg_back_img{
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  height: 300px;
  z-index: 10;
}
#result_of_change_bg_person{
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  height: 300px;
  z-index: 60;
}
#bgGroup img{
  float: left;
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  height: 300px;
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
  width: 100%;
  height: 50px;
  z-index:999;
  background-color: aliceblue;
  margin-left: -10px;
  border-left: 30px solid;
  border-image-source: linear-gradient(to right, cornflowerblue, #bedeff);
  border-image-slice: 1;
  border-image-width: 30px;
  box-shadow: 20px 0 10px #837F7F;
}
.logo{
  width: 50px;
  height: 50px;
  background-image: url('../assets/22.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  margin-left: 10%;
  z-index:999;
  float: left;
}
.daohang p{
  float: left;
  padding-left: 28px;
  margin-top: 12px;
  font-size: 28px;
  font-weight: bold;
  color: white;
}

/*上面整个组件*/
.up{
  width: 80%;
  height: 490px;
  background-image: url('../assets/1.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  margin-left: 10%;
  margin-top: 2px;
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
  margin-top: 10px;
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
}

.changebg_part{
  width: 80%;
  height: 490px;
  position: relative;
  background-image: url('../assets/14.png');
  background-size: 100% 100%;
  margin-left: 10%;
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
  margin-left:-420px;
  font-size: 27px;
  border-radius: 2px;
  color: #0099FF;
  background-color: aliceblue;/*改了颜色*/
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  border: none;
  font-weight: bold;
  outline: none;
}
.backToHome:hover{
  color: #bedeff;
  cursor: pointer;
}

.blockMain{
  /*改了大小*/
  width: 90%;
  height: 400px;
  background-color: rgb(255, 250, 230);
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

.block-two{
  width: 25%;
  height: 300px;
  background-color: white;
  position: absolute;
  margin-top: 40px;
  margin-left: 40%;
}

.select-BGColor{
  margin-left: 77%;
  margin-top: 130px;
}

.download1{
  margin-left: 77%;
  margin-top: 70px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 25px;
  color: white;
  border-radius: 5px;
  background-color: #0099FF;/*改了颜色*/
  border: none;
  outline: none;
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
  padding-top:110px;
  font-weight: bold;
  font-size: 30px;
  color: #b5eeff;
}
.download_btn{
  margin-left: 77%;
  margin-top: 180px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 30px;
  color: white;
  border-radius: 5px;
  background-color: #0099FF;/*改了颜色*/
  border: none;
  outline: none;
  padding: 8px;
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
  background-color: #8aff84;
  padding: 8px;
  border: none;
  outline: none;
}
.change_style_btn:hover{
  color: whitesmoke;
  cursor: pointer;
}
/* 中间4个控件*//*改了边框，样式，阴影，hover和act*/
.middle{
  position: absolute;
  width: 80%;
  height: 200px;
  margin-left: 10%;
  background-color: #F7F9FB;
}

.b2{
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
.b2:hover{
  cursor: pointer;
  box-shadow: 0px 0px 10px #5E5D5D;
}
.b2:active{
  box-shadow: 0px 0px 10px #888888;
}

.b3{
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
.b3:hover{
  cursor: pointer;
  box-shadow: 0px 0px 10px #5E5D5D;
}
.b3:active{
  box-shadow: 0px 0px 10px #888888;
}

.b4{
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
.b4:hover{
  box-shadow: 0px 0px 10px #5E5D5D;
  cursor: pointer;
}
.b4:active{
  box-shadow: 0px 0px 10px #888888;
}

.b5{
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
.b5:hover{
  box-shadow: 0px 0px 10px #5E5D5D;
  cursor: pointer;
}
.b5:active{
  box-shadow: 0px 0px 10px #888888;
}

/*下面部分*/
.down{
  width: 80%;
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
  width: 80%;
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
  margin-left: 6%;
  margin-top: 450px;
  z-index:999;
  background-image: url('../assets/15.png');
}
.pe2{
  width: 150px;
  height: 220px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 45%;
  margin-top: 450px;
  z-index:999;
  background-image: url('../assets/17.png');
}
.pe3{
  width: 150px;
  height: 220px;
  background-size: 100% 100%;
  position: absolute;
  margin-left: 65%;
  margin-top: 450px;
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
</style>
