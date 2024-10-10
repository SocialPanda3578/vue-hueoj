<template>
    <div>
        <div class="content">
            <table>
                <thead>
                    <tr>
                        <th>题目</th>
                        <th>作者</th>
                        <th>状态</th>
                        <th>语言</th>
                        <th>运行时间</th>
                        <th>占用内存</th>
                        <th>提交时间</th>
                    </tr>
                </thead>
                <tbody v-if="result.length > 0">
                    <tr v-for="item in result" :key="item.id">
                        <td><a :href="`/problem/${item.problem_id}`">{{ item.prob_title }}</a></td>
                        <td><a :href="`/user/${item.username}`">{{ item.username }}</a></td>
                        <td class="status">
                            <a :href="`/contest/status/${item.id}`" class="status"
                                :class="{ AC_status: item.result.status === 'Accept' }">
                                {{ item.result.status }}
                            </a>
                        </td>
                        <td>{{ item.lang }}</td>
                        <td>{{ (item.result.max_run_time).toFixed(6) }} ms</td>
                        <td>{{ item.result.max_memory_usage }} kB</td>
                        <td>
                            <div>{{ formatUTC8Date(item.time) }} {{ formatUTC8Time(item.time) }}</div>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="8" class="text-center">没有数据</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[14, 20, 50]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="totalItems">
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
        return { toast };
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
                const response = await axios.get(
                    `${this.apiURL}/api/act/list/submission/user/?contest_id=${this.$route.params.contest_id}&user_id=${this.$route.params.user_id}&page=${page}&size=${size}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${this.accessToken}`,
                            'Content-Type': 'application/json',
                        }
                    }
                );

                const data = response.data;
                this.code = data.code;
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
                console.error('There has been a problem with your fetch operation:', error);
            }
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.fetchData(this.currentPage, val);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.fetchData(val, this.pageSize);
        },
        handleRedirect() {
            window.location.href = this.redirect;
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
            return `${hours}:${minutes}:${seconds}  (UTC+8)`;
        }
    }
};
</script>

<style scoped>
.AC_status {
    color: green;
    font-weight: 600;
}

.status {
    text-decoration: none;
    font-weight: 600;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
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
    flex-direction: column;
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