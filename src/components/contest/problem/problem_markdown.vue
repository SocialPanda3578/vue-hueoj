<template>
  <div class="panel">
    <div v-html="this.md.render(markdown)" class="markdown"></div>
  </div>
</template>

<script>
import axios from 'axios';
import MarkdownIt from 'markdown-it';
import markdownItKatex from 'markdown-it-katex';
import markdownItFootnote from 'markdown-it-footnote';
import markdownItAbbr from 'markdown-it-abbr';
import markdownItContainer from 'markdown-it-container';

export default {
  props: ['problemData'],
  data() {
    return {
      apiURL: import.meta.env.VITE_API_URL,
      markdown: '',
      md: new MarkdownIt()
        .set({ html: true, breaks: true, typographer: true, linkify: true })
        .use(markdownItKatex)
        .use(markdownItFootnote)
        .use(markdownItAbbr)
        .use(markdownItContainer, 'warning')
    }
  },
  methods: {
    async fetchMarkdownUrl() {
      try {
        const response = await axios.get(`${this.apiURL}/api/act/load/problem/resource/${this.problemData.pid}/`);
        this.markdownUrl = response.data.url;
        await this.fetchMarkdownContent();
      } catch (error) {
        console.error('Error fetching markdown URL:', error);
      }
    },
    async fetchMarkdownContent() {
      try {
        const response = await axios.get(this.markdownUrl);
        this.markdown = response.data;
        this.renderedMarkdown = this.md.render(this.markdown);
      } catch (error) {
        console.error('Error fetching markdown content:', error);
      }
    }
  },
  mounted() {
    this.fetchMarkdownUrl();
  }
}
</script>

<style>
.panel {
  margin-bottom: 2%;
  width: 100%;
  border: double #1971c2;
  border-style: groove;
  border-radius: 5px;
  background-color: white;
}

.markdown {
  padding: 50px;
}
</style>