<template>
<div  style="overflow-y: scroll;height: 3799px;width: 100%;">
  <div class="bgphoto">
    <p id="back_to_home" @click="this.$router.replace('/')"> 返回首页</p>
  </div>
</div>
</template>

<script>
export default {
  name: "Manual"
}
</script>

<style scoped>
#back_to_home{
  padding-top: -5px;
  padding-right: 10px;
  float: right;
  color: gray;
}
#back_to_home:hover{
  color: #837F7F;
  cursor: pointer;
}
.bgphoto{
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  min-width: 1000px;
  z-index: -1;
  zoom: 1;
  background-image: url('../assets/41.jpg') ;
  background-repeat: no-repeat;

  background-position: center 0;

}
</style>