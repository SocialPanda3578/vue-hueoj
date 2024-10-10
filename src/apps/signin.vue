<template>
  <div class="app">
    <topbar />
    <signin_area />
  </div>
</template>

<script>
import topbar from '@/components/kit/topbar.vue'
import signin_area from '@/components/kit/signin_body.vue'
export default {
  components: {
    topbar,
    signin_area,
  }
}
</script>

<style></style>