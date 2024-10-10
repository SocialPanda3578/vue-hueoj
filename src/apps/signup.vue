<template>
  <div class="app">
    <topbar />
    <signup_area />
  </div>
</template>

<script>
import topbar from '@/components/kit/topbar.vue'
import signup_area from '@/components/kit/signup_body.vue'
export default {
  components: {
    topbar,
    signup_area,
  }
}
</script>

<style></style>