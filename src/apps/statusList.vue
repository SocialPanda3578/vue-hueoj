<template>
    <div class="app">
        <topbar></topbar>
        <status_table></status_table>
    </div>
</template>

<script>
import topbar from '@/components/kit/topbar.vue';
import status_table from '@/components/table/status_table.vue'
export default {
    components: {
      topbar,
      status_table
    }
  }
</script>

<style>
</style>