<template>
  <div class="app">
    <topbar />
    <div class="body">
      <problem_content></problem_content>
    </div>
    <foot />
  </div>
</template>

<script>
import topbar from '@/components/kit/topbar.vue'
import problem_content from '@/components/problem/problem.vue'
export default {
  components: {
    topbar,
    problem_content,
  }
}
</script>

<style scoped>
.body {
  margin-top: 40px;
  position: relative;
}
</style>
