<template>

    <topbar />

    <div class="content">
        <h1 class="title">{{ contestData.title }}</h1>
        <div v-if="contestStatus == 'Unstarted'">比赛未开始</div>
        <div v-else-if="contestStatus == 'Running'">比赛进行中</div>
        <div v-else>比赛已结束</div>
        <div class="table">
            <table>
                <thead>
                    <tr>
                        <th class="fixed_thead">Place</th>
                        <th class="participant_thead">Participant</th>
                        <th class="fixed_thead">Solved</th>
                        <th class="fixed_thead">Penalty</th>
                        <th class="problem_thead" v-for="item in contestData.problemset">
                            {{ item.index }}
                        </th>
                        <th class="fixed_thead">Dirt</th>
                        <th class="fixed_thead">SE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in scoreboardData" :key="item[0]">
                        <th>{{ index + 1 }}</th>
                        <th>{{ item[1].user_name }}</th>
                        <th>{{ item[1].solved_count }}</th>
                        <th>{{ (item[1].penalty / 60).toFixed(0) }}</th>
                        <th v-for="prob in item[1].problems">
                            <div class="green-box" v-if="prob.isAC == 1">
                                +<br />
                                {{ prob.attempt_count }} / {{ (prob.last_attempt_time / 60).toFixed(0) }}
                            </div>
                            <div class="red-box" v-else-if="prob.attempt_count != 0">
                                -<br />
                                {{ prob.attempt_count }} / {{ (prob.last_attempt_time / 60).toFixed(0) }}
                            </div>
                        </th>
                        <th>N/A</th>
                        <th>N/A</th>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Attempted</th>
                        <th v-for="item in statistics.problems">
                            <div class="blue-box">
                                {{ item.attempt_count }}
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Solved</th>
                        <th v-for="item in statistics.problems">
                            <div class="blue-box">
                                {{ item.solved_count }}
                                <br />
                                ({{ (item.solved_count / item.attempt_count).toFixed(2) * 100 }}%)
                            </div>
                        </th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>

</template>

<script>
import topbar from '@/components/kit/topbar.vue';
import countdown from '@/components/kit/countdown.vue';
import axios from 'axios';
export default {
    components: {
        countdown,
        topbar
    },
    data() {
        return {
            contestData: {},
            scoreboardData: {},
            statistics: {},
            contestStatus: 'Unknow',
            API_URL: import.meta.env.VITE_API_URL
        };
    },
    mounted() {
        this.fetchContestData();
        this.fetchScoreboardData();
    },
    methods: {
        async fetchContestData() {
            try {
                const response = await axios.get(`${this.API_URL}/api/act/load/contest/${this.$route.params.id}/`);
                this.contestData = response.data.result;
                this.contestStatus = response.data.status;
            } catch (error) {
                console.error('Error fetching problem data:', error);
            }
        },
        async fetchScoreboardData() {
            try {
                const response = await axios.get(`${this.API_URL}/api/act/load/scoreboard/${this.$route.params.id}/`);
                this.scoreboardData = response.data.result;
                this.statistics = response.data.statistics;
            } catch (error) {
                console.error('Error fetching Scoreboard data:', error);
            }
        }
    }
}
</script>

<style scoped>
.green-box {
    font-size: small;
    font-weight: 700;
    background-color: #ABF5B1;
    padding: 5px;
}

.red-box {
    font-size: small;
    font-weight: 700;
    background-color: #FDB3C1;
    padding: 5px;
}

.blue-box {
    font-size: small;
    font-weight: 700;
    background-color: #7bc2e8;
    padding: 5px;
}

.content {
    position: relative;
    top: 55px;
    width: 95%;
    margin: 30px;
    text-align: center;
}

.fixed_thead {
    width: 3%;
    background-color: darkgray;
    border: none;
}

.participant_thead {
    width: 12%;
    background-color: darkgray;
    border: none;
}

.problem_thead {
    width: 10%;
    background-color: white;
    border: none;
}

.table {
    font-family: 'Courier New', Courier, monospace;
    position: relative;
}

th {
    background-color: #eaeaea;
    text-align: center;
}

td {
    border: 1px solid #eaeaea;
    padding: 10px;
    border: 1px solid white;
}
</style>