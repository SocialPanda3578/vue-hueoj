<template>
    <div class="panel">
        <div class="controls">
            <select class="lang-select" v-model="selectedLanguage">
                <option value="Cpp_23" selected>C++</option>
                <option value="C">C</option>
                <option value="Java_21">Java</option>
                <option value="Python_38">Python</option>
            </select>
            <button class="submit-button" @click.prevent="submitCode">提交代码</button>
        </div>
        <div class="status-box" :class="{ blinking: isBlinking }" :style="statusBoxStyle">
            {{ status }}
        </div>
        <textarea class="code-input" placeholder="Enter your code here..." v-model="code"></textarea>
    </div>
</template>

<script>
import axios from 'axios';
import { useToast } from "vue-toastification";

export default {
    setup() {
        const toast = useToast();
        return { toast };
    },
    props: ['problemData'],
    data() {
        return {
            apiURL: import.meta.env.VITE_API_URL,
            accessToken: '',
            code: '',
            selectedLanguage: 'Cpp_23',
            status: '',
            isBlinking: false
        };
    },
    created() {
        this.accessToken = localStorage.getItem('access_token');
    },
    methods: {
        async submitCode() {
            this.status = 'Pending';
            this.isBlinking = true;
            const endpointUrl = `${this.apiURL}/api/act/submit/`;
            const data = {
                code: this.code,
                lang: this.selectedLanguage,
                type: this.problemData.type,
                time_limit: this.problemData.time_limit,
                mem_limit: this.problemData.memory_limit,
                pid: this.problemData.pid,
                cid: this.problemData.cid,
                uid: localStorage.getItem('userID')
            };

            try {
                const response = await axios.post(endpointUrl, data, {
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.data.code !== 200) {
                    this.toast.warning(response.data.result.status, { timeout: 2000 });
                    this.status = '';
                    this.isBlinking = false;
                } else {
                    if (response.data.result.status === 'Accept') {
                        this.statusBoxStyle = { backgroundColor: 'green' };
                    } else {
                        this.statusBoxStyle = { backgroundColor: 'red' };
                    }
                }
                this.isBlinking = false;
                this.status = response.data.result.status
            } catch (error) {
                console.error('Error:', error);
                this.toast.warning('意外错误', { timeout: 2000 });
                this.status = '';
                this.isBlinking = false;
            }
        }
    }
}
</script>

<style scoped>
@keyframes blink {
    0%,
    100% {
        background-color: white;
    }

    50% {
        background-color: yellow;
    }
}

.blinking {
    animation-name: blink;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
}

.status-box {
    width: 95%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.submit-button {
    width: 100px;
    margin: 20px;
    border-color: #1979c2;
    border-radius: 5px;
}

.lang-select {
    height: 22px;
    width: 200px;
    margin: 20px;
    border-color: #1979c2;
    border-radius: 5px;
}

.panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2%;
    width: 100%;
    height: 700px;
    border: groove #1979c2;
    border-radius: 5px;
    background-color: white;
}

.code-input {
    width: 95%;
    height: 90%;
    margin-bottom: 20px;
    margin-top: 5px;
    align-self: center;
    background-color: rgb(239, 239, 239);
}
</style>