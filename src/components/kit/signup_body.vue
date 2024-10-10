<template>
    <div class="content">
        <div class="container">
            <div class="login-wrapper">
                <div class="header">Sign UP</div>
                <form @submit.prevent="handleSubmit">
                    <div class="form-wrapper">
                        <input type="text" name="username" placeholder="Username" class="input-item"
                            v-model.trim="form.username">
                        <input type="password" name="password" placeholder="Password" class="input-item"
                            v-model.trim="form.password">
                        <div class="btn" @click="handleSubmit">Sign Up</div>
                    </div>
                    <div class="msg">
                        Already have an account?
                        <a href="#" @click.prevent="$router.push('/signin')">Sign in</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';
export default {
    setup() {
        const toast = useToast();
        return { toast };
    },

    data() {
        return {
            apiURL: import.meta.env.VITE_API_URL,
            form: {
                username: '',
                password: ''
            }
        };
    },
    methods: {
        async handleSubmit() {
            try {
                console.log(this.form.username)
                const response = await axios.post(
                    `${this.apiURL}/api/act/signup/`,
                    this.form,
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                );

                if (response.data.code === 200) {
                    this.toast.success('注册成功');
                    this.$router.push('/signin');
                } else {
                    this.toast.error(response.data.msg);
                }
            } catch (error) {
                console.error('Error during SignUp:', error);
                this.toast.warning('注册错误！请稍后再试');
            }
        }
    }
};
</script>

<style scoped>
.container {
    background-image: linear-gradient(to top, #1971c2, white);
    height: 100%;
    width: 100%;
    left: 0px;
    right: 0px;
    top: 0px;
    position: fixed;
}

.login-wrapper {
    background-color: #fff;
    width: 358px;
    height: 588px;
    border-radius: 15px;
    padding: 0 50px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.header {
    font-family: "Droid Sans Fallback";
    color: #1971c2;
    font-weight: normal;
    font-size: 38px;
    text-align: center;
    line-height: 60px;
    margin-bottom: 40px;
}

.input-item {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    border: 0;
    padding: 10px;
    border-bottom: 1px solid rgb(128, 125, 125);
    font-size: 15px;
    outline: none;
}

.input-item::placeholder {
    text-transform: uppercase;
}

.btn {
    text-align: center;
    padding: 10px;
    width: 100%;
    margin-top: 40px;
    background-image: linear-gradient(to top, #1971c2, #1971c2);
    color: #fff;
    cursor: pointer;
}

.msg {
    text-align: center;
    line-height: 88px;
    font-size: 14px;
}

.msg a {
    text-decoration-line: overline;
    color: #abc1ee;
    cursor: pointer;
}
</style>