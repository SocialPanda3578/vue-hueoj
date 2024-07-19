<template>
  <div class="panel">
    <h2>题目描述</h2>
    <problem-introduction/>
    <h2>输入格式</h2>
    <pro_input/>
    <h2>输出格式</h2>
    <pro_output/>
    <io/>
  </div>
</template>

<script>
  import io from "./Example.vue"
  import problemIntroduction from "./Introduce.vue"
  import pro_input from "./Input.vue"
  import pro_output from "./Output.vue"
  export default{
    components:{
      io,
      problemIntroduction,
      pro_input,
      pro_output
    }
  }
</script>

<style scoped>
.panel {
  margin-bottom: 2%;
  width: 100%;
  border: double #671daf;
  border-style: groove;
  border-radius: 5px;
  background-color: white;
}
h2{
  margin-left: 5%;
}
</style>
