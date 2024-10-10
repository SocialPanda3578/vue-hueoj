<template>
  <div>
    <div class="content">
      <table>
        <thead>
          <tr>
            <th class="col-id">ID</th>
            <th>标题</th>
            <th class="col-try-pass">类型</th>
            <th class="col-try-pass">开始时间</th>
            <th class="col-try-pass">结束时间</th>
          </tr>
        </thead>
        <tbody v-if="result.length > 0">
          <tr v-for="item in result" :key="item.id">
            <td class="col-id">{{ item.id }}</td>
            <td><a :href="`/contest/${item.id}`">{{ item.title }}</a></td>
            <td class="col-try-pass">{{ item.typ }}</td>
            <td class="col-try-pass">
              <div>{{ formatUTC8Date(item.start_time) }}</div>
              <div>{{ formatUTC8Time(item.start_time) }}</div>
            </td>
            <td class="col-try-pass">
              <div>{{ formatUTC8Date(item.end_time) }}</div>
              <div>{{ formatUTC8Time(item.end_time) }}</div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5" class="text-center">没有数据</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // 导入axios

export default {
  name: 'ProblemList',
  data() {
    return {
      apiURL: import.meta.env.VITE_API_URL,
      code: 200,
      redirect: '',
      msg: '',
      result: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`${this.apiURL}/api/act/list/contest/`);
        this.code = response.data.code;
        this.redirect = response.data.redirect;
        this.msg = response.data.msg;
        this.result = response.data.result;
      } catch (error) {
        console.error('There has been a problem with your axios operation:', error);
      }
    },
    formatUTC8Date(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}/${month}/${day}`;
    },
    formatUTC8Time(timestamp) {
      const date = new Date(timestamp);
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      const amPm = hours >= 12 ? 'PM' : 'AM';
      return `${hours}:${minutes}:${seconds}  (UTC+8)`;
    }
  }
};
</script>


<style scoped>
.col-id {
  width: 5%;
  text-align: center;
}

.col-try-pass {
  width: 15%;
  text-align: center;
}

.content {
  top: 60px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 95%;
  background-color: white;
  margin-top: 30px;
  padding: 1%;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  border-radius: 7px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.text-center {
  text-align: center;
}
</style>