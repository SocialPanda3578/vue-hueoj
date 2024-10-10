<template>
    <div class="user_area">
        <a v-if="isLoggedIn" :href="`/user/${username}`" id="username">
            {{ username }}
            <a @click.prevent="logout" id="logout">登出</a>
        </a>
        <a v-else href="/signin" id="username">
            登录
        </a>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
    data(){
        return{
            apiURL: import.meta.env.VITE_API_URL,
        }
    },
    computed: {
        ...mapGetters(['getToken', 'getUsername', 'isTokenExpired']),
        isLoggedIn() {
            return !this.isTokenExpired;
        },
        username() {
            return this.getUsername;
        }
    },
    created() {
        this.checkLoginStatus();
    },
    methods: {
        ...mapActions(['saveStateToLocalStorage', 'loadStateFromLocalStorage']),
        async checkLoginStatus() {
            try {
                if (!this.isTokenExpired) {
                    this.isLoggedIn = true;
                    this.username = this.getUsername;
                } else {
                    const response = await axios.get(`${this.apiURL}/api/check-login-status`);
                    if (response.data.isLoggedIn) {
                        this.isLoggedIn = true;
                        this.username = response.data.username;
                        localStorage.setItem('access_token', response.accessToken);
                        this.loadStateFromLocalStorage();
                    }
                }
            } catch (error) {
                console.error('Error checking login status:', error);
            }
        },
        async logout() {
            try {
                this.$store.commit('setToken', null);
                this.$store.commit('setUserType', null);
                this.$store.commit('setUsername', null);
                this.$store.commit('setOtherInfo', null);
                this.$store.commit('setLastLoginTime', null);
                localStorage.removeItem('vuexState');
                await axios.post(`${this.apiURL}/api/act/signout`, {}, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
                    }
                });
                localStorage.removeItem('access_token');
            } catch (error) {
                console.error('Logout request failed:', error);
            }
            this.$router.push('/signin');
        }
    }
};
</script>

<style scoped>
#username {
    color: #1971c2;
    font-size: large;
    font-weight: 800;
    float: right;
    margin-right: 40px;
    text-decoration: none;
}

#logout {
    color: #1971c2;
    margin-left: 30px;
    right: 0px;
}
</style>