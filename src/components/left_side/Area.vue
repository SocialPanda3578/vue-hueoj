<template>
  <div class="right_side">
    <div class="problem_panel">
        <h1>{{ h1_value }}</h1>
        <div class="buttons">
            <button @click="switchMethod">{{ button_value }}</button>
        </div>
    </div>
    <problem v-if="isSubmit==false"></problem>
    <submit v-if="isSubmit==true"></submit>
  </div>
</template>

<script>
import problem from './Problem.vue'
import Submit from './Submit.vue'
export default {
  data() {
        return {
            h1_value: "P1098 码距",
            button_value: "提交答案",
            isSubmit: false
        };
    },
    methods: {
        switchMethod() {
            this.isSubmit=!this.isSubmit;
            if(this.button_value=="提交答案") this.button_value="返回题目";
            else this.button_value="提交答案";
        }
    },
  components: {
    problem,
    Submit
  }
}
</script>

<style scoped>
.right_side {
  position: relative;
  float: left;
  top: 70px;
  width: 70%;
  margin-left: 20px;
}
.problem_panel {
    margin-bottom: 2%;
    height: 150px;
    width: 100%;
    top: auto;
    border: double #671daf;
    border-style: groove;
    border-radius: 5px;
    background-color: white;
}
h1 {
    margin-left: 5%;
}
.buttons {
    margin-left: 5%;
}
</style>
