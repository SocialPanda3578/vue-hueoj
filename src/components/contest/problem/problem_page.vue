<template>
  <div class="app">
    <topbar />
    <div class="body">
      <problem_body></problem_body>
    </div>
    <foot />
  </div>
</template>

<script>
import topbar from '@/components/kit/topbar.vue'
import problem_body from './problem_body.vue'
export default {
  components: {
    topbar,
    problem_body,
  }
}
</script>

<style scoped>
.body {
  margin-top: 70px;
  position: relative;
}

.button {
  font-size: medium;
  height: 10px;
  background-color: white;
  border: none;
  text-decoration: none;
}
</style>
