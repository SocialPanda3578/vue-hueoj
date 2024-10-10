<template>
  <div class="app">
    <topbar />
    <div class="body">
      <status_content />
    </div>
    <foot />
  </div>
</template>

<script>
import topbar from '@/components/kit/topbar.vue'
import status_content from '@/components/status/status.vue';
export default {
  components: {
    topbar,
    status_content
  }
}
</script>

<style></style>