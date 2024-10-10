<template>
    <div class="app">
        <topbar></topbar>
        <problem_table></problem_table>
    </div>
</template>

<script>
import topbar from '@/components/kit/topbar.vue';
import problem_table from '@/components/table/problem_table.vue'
export default {
    components: {
      topbar,
      problem_table
    }
  }
</script>

<style>
</style>