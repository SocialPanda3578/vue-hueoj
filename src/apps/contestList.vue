<template>
    <div class="app">
        <topbar></topbar>
        <contest_table></contest_table>
    </div>
</template>

<script>
import topbar from '@/components/kit/topbar.vue';
import contest_table from '@/components/table/contest_table.vue'
export default {
    components: {
      topbar,
      contest_table
    }
  }
</script>

<style>
</style>