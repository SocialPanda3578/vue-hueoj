<template>
    <div class="app">
        <topbar />
        <div class="content">
            <div class="left">
                <div class="name" :class="{ blueText: userData.role === 'Developer' }">{{ username }}</div>
                <div>{{ userData.role }}</div>
                <img :src="avatarUrl" alt="User Avatar" class="avatar">
            </div>
            <div class="right">
                <div v-if="userData">
                    <div>Rank: {{ userData.rank }}</div>
                    <div>Email: {{ userData.email }}</div>
                    <div>上次登录: {{ userData.last_login }}</div>
                    <div>过题数: {{ userData.pass_count }}</div>
                </div>
                <div v-else>
                    <div>正在加载用户信息...</div>
                </div>
            </div>
            <div class="motto">
                ——————
                <div v-if="userData.motto"> {{ userData.motto }}</div>
                <div v-else> TA还没有写motto</div>
            </div>
        </div>
        <div class="map">
            <calendar-heatmap :values="values" :end-date="endDate" :range="range" :color-range="colorRange"
                class="heatmap" />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import topbar from '@/components/kit/topbar.vue'
import { CalendarHeatmap } from 'vue3-calendar-heatmap'

export default {
    components: {
        topbar,
        CalendarHeatmap
    },
    name: 'UserProfile',
    props: ['username'],
    data() {
        return {
            apiURL: import.meta.env.VITE_API_URL,
            avatarUrl: "",
            userData: {},
            values: [
                { date: '2023-09-01', count: 1 },
                { date: '2023-09-02', count: 2 },
            ],
            endDate: '2023-09-30',
            range: 30,
            colorRange: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
        };
    },
    mounted() {
        this.fetchUserData();
        this.fetchAvatarUrl();
    },
    methods: {
        async fetchUserData() {
            try {
                const response = await axios.get(`${this.apiURL}/api/act/load/userinfo/${this.username}/`);
                this.userData = response.data.result;
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        },
        async fetchAvatarUrl() {
            try {
                const response = await axios.get(`${this.apiURL}/api/act/load/avatar/${this.username}/`);
                this.avatarUrl = response.data.url;
                console.log(this.avatarUrl);
            } catch (error) {
                console.error('Error fetching avatar URL:', error);
            }
        }
    }
};
</script>

<style scoped>
.name {
    font-size: xx-large;
    font-weight: 500;
}

.blueText {
    color: #ed0505;
}

.content {
    top: 60px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 95%;
    background-color: white;
    margin-top: 30px;
    padding: 2%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    border-radius: 7px;
}


.right {
    margin-top: 6%;
    font-size: large;
    width: 65%;
}

.left {
    width: 40%;
}

.avatar {
    max-width: 80%;
    max-height: 80%;
    width: auto;
    height: auto;
}

.motto {
    width: 35%;
    font-family: 'Times New Roman', Times, serif;
    font-style: oblique;
}

.map {
    position: relative;
    background-color: white;
    left: 50%;
    transform: translateX(-50%);
    top: 90px;
    padding: 2%;
    width: 95%;
    border-radius: 7px;
    box-sizing: border-box;
}

.heatmap {
    font-size: xx-small;
}
</style>