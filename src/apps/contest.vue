<template>
  <div class="app">
    <topbar />
    <div class="body">
      <contest_content />
    </div>
    <foot />
  </div>
</template>

<script>
import topbar from '@/components/kit/topbar.vue'
import contest_content from '@/components/contest/contest_content.vue';
export default {
  components: {
    topbar,
    contest_content
  }
}
</script>

<style scoped>
.body {
  margin-top: 75px;
  position: relative;
}
</style>