<template>
  <div class="app">
    <topbar />
    <div class="body">
      <problem_table></problem_table>
      <contest_table></contest_table>
    </div>
    <foot />
  </div>
</template>

<script>
import topbar from '@/components/kit/topbar.vue'
import problem_table from '@/components/table/problem_table.vue'
import contest_table from '@/components/table/contest_table.vue'

export default {
  components: {
    topbar,
    problem_table,
    contest_table,
  }
}
</script>

<style></style>