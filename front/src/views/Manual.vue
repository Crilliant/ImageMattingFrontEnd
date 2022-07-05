<template>
<div>
  <p id="back_to_home" @click="this.$router.replace('/')"> 返回首页</p>
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
</style>