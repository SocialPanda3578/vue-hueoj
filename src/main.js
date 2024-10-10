import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import store from './store';
import "vue-toastification/dist/index.css";
import 'highlight.js/styles/stackoverflow-light.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';
import hljs from 'highlight.js';

import codemirror from 'vue-codemirror'

const options = {
    position: "bottom-right",
    timeout: 2000,
    closeOnClick: true,
    pauseOnHover: true,
};

const katexPlugin = createKatexPlugin();
VMdPreview.use(katexPlugin);
VMdPreview.use(githubTheme, {
    Hljs: hljs,
});

const app = createApp(App);
store.dispatch('loadStateFromLocalStorage');
app.use(codemirror);
app.use(store);
app.use(ElementPlus);
app.use(Toast, options);
app.use(router);
app.use(VMdPreview);
app.mount('#app');