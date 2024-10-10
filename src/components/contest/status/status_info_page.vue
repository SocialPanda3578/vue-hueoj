<template>
  <div class="app">
    <topbar />
    <div class="body">
      <status_info />
    </div>
    <foot />
  </div>
</template>

<script>
import topbar from '@/components/kit/topbar.vue'
import status_info from './status_info.vue';
export default {
  components: {
    topbar,
    status_info
  }
}
</script>

<style></style>