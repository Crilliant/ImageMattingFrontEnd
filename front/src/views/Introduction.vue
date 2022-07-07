<template>

  <div class="background">
    <p id="back_to_home" @click="this.$router.replace('/')"> 返回首页</p>
    <div class="zxkt">
      <center>
        在线抠图<br>
        <b style="font-size: 70px">你的线上图片编辑大师</b><br>
        <span style="font-size: 40px">MAKE DESIGN SIMPLER</span>
      </center>
    </div>
    <div class="down">
      <div class="ewm"></div>
      <center>
        <p class="zx">
          在线抠图<br>
          更换背景，个性操作<br>
          线上照相馆<br>一键生成证件照<br>
          多样风格<br>每人都是色彩大师
        </p>
      </center>
    </div>

  </div>
</template>

<script>
export default {
  name: "Introduction"
}
</script>

<style scoped>
#back_to_home{
  padding-top: -5px;
  padding-right: 10px;
  float: right;
  color: white;
}
#back_to_home:hover{
  color: #837F7F;
  cursor: pointer;
}
.ewm{
  z-index: 999;
  background-image: url("../assets/13.jpg");
  width: 70px;
  height: 70px;
  background-size: 100%,100%;
  margin-left: 90%;
  margin-top: 11%;
  position: absolute;
}
.zxkt{
  color: #F7F9FB;
  font-size: 60px;
  margin-top: 50px;
}
.background{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -1;
  zoom: 1;
  background-image: url('../assets/39.jpg') ;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 0;
}
.zx{
  color: #D5D5D5;
  margin-top: 11%;
  font-size: 25px;
  line-height: 40px;
}
.down{
  margin-top: 80px;
  background:none;
}
</style>