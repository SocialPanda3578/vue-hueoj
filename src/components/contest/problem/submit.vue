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
        <div class="code-input">
            <codemirror :value="code" :options="cmOptions" @input="onInput"></codemirror>
        </div>
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
    props: ['problemData', 'contestData', 'contestStatus'],
    data() {
        return {
            apiURL: import.meta.env.VITE_API_URL,
            accessToken: '',
            code: '',
            selectedLanguage: 'Cpp_23',
            status: '',
            isBlinking: false,
            cmOptions: {
                mode: 'text/x-c++src',
                theme: 'material',
                lineNumbers: true,
                line: true,
                matchBrackets: true,
                autoCloseBrackets: true,
                gutters: ['CodeMirror-linenumbers'],
            },
        };
    },
    created() {
        this.accessToken = localStorage.getItem('access_token');
    },
    methods: {
        onInput(value) {
            this.code = value;
        },
        async submitCode() {
            this.status = 'Pending';
            this.statusBoxStyle = { backgroundColor: 'yellow' };
            const endpointUrl = `${this.apiURL}/api/act/contest_submit/`;
            const data = {
                code: this.code,
                lang: this.selectedLanguage,
                problem_index: this.$route.params.problem_index,
                pid: this.problemData.pid,
                cid: this.contestData.id,
                uid: localStorage.getItem('userID')
            };

            try {
                const response = await axios.post(endpointUrl, data, {
                    headers: {
                        'Authorization': `Bearer ${this.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                this.status = response.data.result.status;
                this.startBlinkAnimation(response.data.result.status === 'Accept' ? 'green' : 'red');
            } catch (error) {
                console.error('Error:', error);
                this.toast.warning(error.response.data.msg, { timeout: 2000 });
                this.status = '';
                this.statusBoxStyle = { backgroundColor: 'white' };
                this.isBlinking = false;
            }
        },
        startBlinkAnimation(color) {
            this.isBlinking = true;

            this.statusBoxStyle.animation = `blink .2s steps(2, end) ${5} times`;
            this.statusBoxStyle['--flash-color'] = color;
            setTimeout(() => {
                this.statusBoxStyle.animation = '';
                this.statusBoxStyle.backgroundColor = color;
                this.isBlinking = false;
            }, 1000);
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
        background-color: var(--flash-color);
    }
}

.blinking {
    animation-name: blink;
    animation-duration: 0.3s;
    animation-iteration-count: 5;
    animation-fill-mode: both;
}


.status-box {
    width: 95.5%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    --flash-color: yellow;
    border-radius: 2px;
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
    min-height: 700px;
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
    background-color: rgb(252, 252, 252);
}
</style>