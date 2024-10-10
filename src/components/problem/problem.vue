<template>
  <div class="content">
    <div class="problem_panel">
      <h1 class="problem_title">{{ this.problemData.title }}</h1>
      <div class="limit">
        <div>时间限制 {{ this.problemData.time_limit }} ms</div>
        <div>内存限制 {{ this.problemData.memory_limit }} KB</div>
        <div v-if="this.problemData.type == 'normal'">标准输入输出</div>
        <div v-else="this.problemData.type == 'interactive'">交互式输入输出</div>
      </div>
      <button class="button" @click="switchMethod" type="info" round>{{ button_value }}</button>
    </div>
    <div v-if="isSubmit == false">
      <problem_json :problemData="problemData" v-if="this.problemData.file_type == 'json'"></problem_json>
      <problem_pdf :problemData="problemData" v-else-if="this.problemData.file_type == 'pdf'"></problem_pdf>
      <problem_markdown :problemData="problemData" v-else-if="this.problemData.file_type == 'markdown'"></problem_markdown>
    </div>
    <submit :problemData="problemData" v-else></submit>
  </div>
</template>

<script>
import problem_json from './problem_json.vue'
import problem_pdf from './problem_pdf.vue'
import problem_markdown from './problem_markdown.vue';
import submit from './submit.vue'
import axios from 'axios';
export default {
  data() {
    return {
      apiURL: import.meta.env.VITE_API_URL,
      problemData: {},
      button_value: "提交代码",
      isSubmit: false
    };
  },
  mounted() {
    this.fetchProblemData();
  },
  methods: {
    async switchMethod() {
      this.isSubmit = !this.isSubmit;
      if (this.button_value == "提交代码") this.button_value = "返回题目";
      else this.button_value = "提交代码";
    },
    async fetchProblemData() {
      try {
        const response = await axios.get(`${this.apiURL}/api/act/load/problem/${this.$route.params.id}/`);
        this.problemData = response.data.result;
      } catch (error) {
        console.error('Error fetching problem data:', error);
      }
    },
  },
  components: {
    problem_markdown,
    problem_json,
    problem_pdf,
    submit
  }
}
</script>

<style scoped>
.content {
  position: relative;
  top: 55px;
  width: 95%;
  margin: 30px;
}

.problem_panel {
  margin-bottom: 2%;
  height: 150px;
  width: 100%;
  top: auto;
  border: double #1971c2;
  border-style: groove;
  border-radius: 5px;
  background-color: white;
}

.problem_title {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  margin: 10px;
}

.limit {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.limit div {
  margin: 0 10px;
}

.button {
  color: #1971c2;
  margin-top: 15px;
  margin-left: 35%;
  height: 30px;
  width: 80px;
}
</style>
