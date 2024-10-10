<template>
  <div class="content">
    <div class="link_panel">
      <a class="link" :href="`/contest/${contestData.id}`">首页</a>
      <a class="link" :href="`/scoreboard/${contestData.id}`" target="_blank">榜单</a>
      <a class="link">我的提交</a>
    </div>
    <div class="problem_panel">
      <h1 class="problem_title">
        <text class="index">{{ '#' + this.$route.params.problem_index + '.' }}</text>
        {{ this.problemData.title }}
      </h1>
      <div class="limit">
        <div>时间限制 {{ this.problemData.time_limit }} ms</div>
        <div>内存限制 {{ this.problemData.memory_limit }} KB</div>
        <div v-if="this.problemData.type == 'normal'">标准输入输出</div>
        <div v-else="this.problemData.type == 'interactive'">交互式输入输出</div>
      </div>
      <button class="button" @click="switchMethod" type="info" round>{{ button_value }}</button>
    </div>
    <div class="ttt" v-if="isSubmit == false">
      <problem_json :problemData="problemData" v-if="this.problemData.file_type == 'json'"></problem_json>
      <problem_pdf :problemData="problemData" v-else-if="this.problemData.file_type == 'pdf'"></problem_pdf>
      <problem_markdown :problemData="problemData" v-else-if="this.problemData.file_type == 'markdown'">
      </problem_markdown>
    </div>
    <submit v-else
      :contestStatus="contestStatus" 
      :contestData="contestData" 
      :problemData="problemData" 
      :code="code"
    ></submit>
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
      code: '',
      problem: {},
      problemData: {},
      contestData: {},
      contestStatus: 'Unknow',
      button_value: "提交代码",
      isSubmit: false
    };
  },
  mounted() {
    this.fetchContestData();
  },
  methods: {
    async switchMethod() {
      this.isSubmit = !this.isSubmit;
      if (this.button_value == "提交代码") this.button_value = "返回题目";
      else this.button_value = "提交代码";
    },
    async fetchContestData() {
      try {
        const response = await axios.get(`${this.apiURL}/api/act/load/contest/${this.$route.params.cid}/`);
        this.contestData = response.data.result;
        this.contestStatus = response.data.status;
        this.problem = this.contestData.problemset.find(problem => problem.index === this.$route.params.problem_index);
        if (!this.problem) {
          this.$router.push({ name: 'Page404' });
        } else {
          try {
            const response = await axios.get(`${this.apiURL}/api/act/load/problem/${this.problem.problem__id}/`);
            this.problemData = response.data.result;
          } catch (error) {
            console.error('Error fetching problem data:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching contest data:', error);
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
.link_panel {
  margin: 10px 10px 20px 10px;
  padding: 8px;
  position: relative;
  text-align: left;
  background-color: white;
  border-radius: 10px;
}

.link {
  font-size: medium;
  border: none;
  text-decoration: none;
  color: #1971c2;
  margin-left: 5%;
  height: 30px;
  width: 80px;
}

.index {
  padding: 1%;
  font-family: 'Courier New', Courier, monospace;
}


.content {
  position: relative;
  width: 95%;
  margin: 20px;
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
