<template>
  <div class="panel">
    <div id="vue-pdf-view" v-if="pdfSource.url">
      <div id="page-view">
        <vue-pdf-embed :source="pdfSource" :page="1" textLayer />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import VuePdfEmbed from "vue-pdf-embed";
import axios from "axios";

export default {
  props: ['problemData'],
  data(){
    return{
      apiURL: import.meta.env.VITE_API_URL,
    }
  },
  components: {
    VuePdfEmbed
  },
  setup(props) {
    const pdfSource = ref({
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/cmaps/',
      cMapPacked: true,
    });
    const fetchUrl = async () => {
      try {
        const response = await axios.get(`${this.apiURL}/api/act/load/problem/resource/${props.problemData.pid}/`);
        pdfSource.value.url = response.data.url;
      } catch (error) {
        console.error('Error fetching problem data:', error);
      }
    };
    fetchUrl();
    return {
      pdfSource,
    };
  },
};
</script>



<style scoped>
.panel {
  margin-bottom: 2%;
  width: 100%;
  border: double #1971c2;
  border-style: groove;
  border-radius: 5px;
  background-color: white;
}

#vue-pdf-view {
  position: relative;
  left: 50%;
  transform: translateX(-50%) scale(1.0);
  width: 70%;
  height: 100%;
  overflow: scroll;
  overflow-y: hidden;
  overflow-x: hidden;
}

#vue-pdf-view::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

#vue-pdf-view::-webkit-scrollbar-thumb {
  border-radius: 15px;
  background-color: #eee;
}

#vue-pdf-view::-webkit-scrollbar-thumb:hover {
  background-color: #CBCBFF;
}
</style>