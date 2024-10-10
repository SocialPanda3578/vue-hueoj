<template>
  <div>
    <div class="content">
      <table>
        <thead>
          <tr>
            <th class="col-try-pass">ID</th>
            <th>题目名称</th>
            <th class="col-try-pass">类型</th>
            <th class="col-try-pass">尝试</th>
            <th class="col-try-pass">通过</th>
          </tr>
        </thead>
        <tbody v-if="result.length > 0">
          <tr v-for="item in result" :key="item.id">
            <td class="col-try-pass">{{ item.id }}</td>
            <td><router-link :to="{ name: 'ProblemPage', params: { id: item.id } }">{{ item.title }}</router-link></td>
            <td class="col-try-pass">{{ item.typ }}</td>
            <td class="col-try-pass">{{ item.try_count }}</td>
            <td class="col-try-pass">{{ item.pass_count }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5" class="text-center">没有数据</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[14, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { ElPagination } from 'element-plus';
import { useToast } from "vue-toastification";
import axios from 'axios';

export default {
  components: {
    ElPagination
  },
  setup() {
    const toast = useToast();
    return { toast }
  },
  data() {
    return {
      apiURL: import.meta.env.VITE_API_URL,
      accessToken: '',
      code: null,
      redirect: '',
      msg: '',
      result: [],
      currentPage: 1,
      pageSize: 14,
      totalPages: 0,
      totalItems: 0,
    };
  },
  created() {
    this.accessToken = localStorage.getItem('access_token');
    this.fetchData();
  },
  methods: {
    async fetchData(page = this.currentPage, size = this.pageSize) {
      try {
        const response = await axios.get(`${this.apiURL}/api/act/list/problem/?page=${page}&size=${size}`, {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        const data = response.data;
        this.code = data.code;
        this.redirect = data.redirect;
        this.msg = data.msg;
        this.result = data.result;
        this.totalPages = data.total_pages;
        this.totalItems = data.total_items;
        this.currentPage = data.current_page;

        if (this.redirect) {
          this.handleRedirect();
        }
        if (this.msg) {
          this.toast(this.msg, { timeout: 4000 });
        }
      } catch (error) {
        console.error('There has been a problem with your request:', error);
      }
    },
    handleRedirect() {
      window.location.href = this.redirect;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData(this.currentPage, val); // 确保当前页不变
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData(val, this.pageSize); // 确保每页数量不变
    }
  }
};
</script>

<style scoped>
.col-try-pass {
  width: 5%;
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

.pagination-container {
  position: relative;
  display: flex;
  justify-content: center;
  margin: 80px;
}
</style>
