<template>
    <div class="content">

        <div class="link_panel">
            <a class="link">首页</a>
            <a class="link" :href="`/scoreboard/${contestData.id}`" target="_blank">榜单</a>
            <a class="link" :href="`/contest/${contestData.id}/status/user/${user_id}`">我的提交</a>
        </div>

        <div class="contest_panel">
            <h1>{{ this.contestData.title }}</h1>
            <div>类型：{{ this.contestData.type }}</div>
            <div>已参与{{ this.contestData.participant_count }}人</div>
            <div v-if="this.contestStatus == 'Unstarted'">
                <div class="countdown">
                    距离比赛开始还有
                    <countdown :start-time="new Date(contestData.start_time)" />
                </div>
            </div>
            <div v-else-if="this.contestStatus == 'Running'">
                <div>距离比赛结束还有</div>
                <countdown :start-time="new Date(contestData.end_time)" />
            </div>
            <div v-else-if="this.contestStatus == 'Ended'">
                <div>比赛已结束</div>
            </div>
        </div>

        <div class="contest_panel">
            <div v-if="this.contestStatus == 'Unstarted'">
                比赛未开始
            </div>
            <div v-else-if="this.contestStatus == 'Running'">
                <div class="table">

                    <table>
                        <thead>
                            <tr>
                                <th class="col-try-pass">#</th>
                                <th>标题</th>
                            </tr>
                        </thead>
                        <tbody v-if="contestData.problemset.length > 0">
                            <tr v-for="item in contestData.problemset" :key="item.id">
                                <td class="col-try-pass">{{ item.index }}</td>
                                <td>
                                    <router-link
                                        :to="{ name: 'ContestProblemPage', params: { problem_index: item.index, cid: this.contestData.id } }">
                                        {{ item.problem__title }}
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="2" class="text-center">没有数据</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <div class="note">
                {{ contestData.note }}
            </div>
        </div>

    </div>
</template>

<script>
import countdown from '@/components/kit/countdown.vue';
import axios from 'axios';
export default {
    components: {
        countdown
    },
    data() {
        return {
            apiURL: import.meta.env.VITE_API_URL,
            user_id: localStorage.getItem('userID'),
            contestData: {},
            contestStatus: 'Unknow'
        };
    },
    mounted() {
        this.fetchContestData();
    },
    methods: {
        async fetchContestData() {
            try {
                const response = await axios.get(`${this.apiURL}/api/act/load/contest/${this.$route.params.id}/`);
                this.contestStatus = response.data.status;
                this.contestData = response.data.result;
            } catch (error) {
                console.error('Error fetching contest data:', error);
            }
        },
    }
}
</script>

<style scoped>
.countdown {
    margin-top: 20px;
}

.contest_panel {
    margin: 10px;
    padding: 2%;
    position: relative;
    text-align: center;
    background-color: white;
    border-radius: 10px;
}

.note {
    margin: 20px;
    padding: 20px;
    background-color: #eaeaea;
    text-align: left;
    border-radius: 5px;
}

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

.content {
    position: relative;
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

.table {
    margin: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th {
    background-color: #eaeaea;
    padding: 5px;
    text-align: center;
}

td {
    border: 1px solid #eaeaea;
    padding: 10px;
}
</style>