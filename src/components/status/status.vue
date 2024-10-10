<template>
	<div>
		<div class="content">
			<table>
				<thead>
					<tr>
						<th>提交时间</th>
						<th>题目</th>
						<th>提交者</th>
						<th>状态</th>
						<th>语言</th>
						<th>运行时间</th>
						<th>占用内存</th>
						<th>代码长度</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{{ result.submit_time }}</td>
						<td>{{ result.prob_title }}</td>
						<td>{{ result.username }}</td>
						<td class="status" :class="{ AC_status: judge_result.status === 'Accept' }">{{
							judge_result.status }}</td>
						<td>{{ result.lang }}</td>
						<td>{{ judge_result.max_run_time }}ms</td>
						<td>{{ judge_result.max_memory_usage }}KB</td>
						<td>{{ result.code_size }}KB</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="content">
			<div class="code" v-if="highlightedCodeWithLineNumbers" v-html="highlightedCodeWithLineNumbers"></div>
			<button class="copy-button" @click="copyCode">Copy</button>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toastification';
import hljs from 'highlight.js';
import 'highlight.js/lib/common';
import ClipboardJS from 'clipboard';

export default {
	setup() {
		const toast = useToast();
		return { toast };
	},
	data() {
		return {
			apiURL: import.meta.env.VITE_API_URL,
			accessToken: '',
			result: {},
			judge_result: {},
			code: '',
			highlightedCode: '',
			highlightedCodeWithLineNumbers: '',
			clipboard: null
		};
	},
	created() {
		this.accessToken = localStorage.getItem('access_token');
		this.fetchData();
	},
	methods: {
		async fetchData() {
			try {
				const response = await axios.get(`${this.apiURL}/api/act/load/submission/${this.$route.params.id}/`, {
					headers: {
						Authorization: `Bearer ${this.accessToken}`, // 使用 this.accessToken
						'Content-Type': 'application/json'
					}
				});
				if (!response.data) {
					throw new Error('No data returned from server');
				}
				this.result = response.data.result;
				this.judge_result = response.data.result.result;
				this.code = this.result.code;
				this.highlightCode();
			} catch (error) {
				console.error('There has been a problem with your request:', error);
			}
		},
		highlightCode() {
			if (this.code) {
				let highlighted = hljs.highlightAuto(this.code).value;
				this.highlightedCode = highlighted.replace(/\n/g, '<br>');
				this.highlightedCodeWithLineNumbers = `<pre><code>${highlighted}</code></pre>`;
			}
		},
		copyCode() {
			if (this.clipboard) {
				this.clipboard.destroy(); // 销毁之前的 Clipboard 实例
			}
			this.clipboard = new ClipboardJS('.copy-button', {
				target: () => document.querySelector('.code pre code')
			});
			this.clipboard.on('success', e => {
				this.toast.success('已成功复制到剪切板!');
				e.clearSelection();
			});
			this.clipboard.select();
		}
	},
	mounted() {
		hljs.initHighlightingOnLoad();
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
	border: none;
	padding: 8px;
	text-align: left;
}

.text-center {
	text-align: center;
}

.code {
	margin: 20px;
	width: 100%;
	position: relative;
	padding: 15px;
	padding-top: 0px;
}

.copy-button {
	position: absolute;
	top: 10px;
	right: 10px;
	height: 20px;
}

pre {
	position: relative;
}

pre code {
	position: relative;
	z-index: 1;
}
</style>