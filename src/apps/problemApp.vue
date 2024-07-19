<template>
  <div class="app">
    <topbar />
    <div class="body">
      <right_area></right_area>
      <left_area></left_area>
    </div>
    <foot/>
  </div>
</template>

<script>
import topbar from './../components/top/topbar.vue'
import left_area from './../components/right_side/Area.vue'
import right_area from './../components/left_side/Area.vue'
export default {
  components: {
    topbar,
    left_area,
    right_area,
  }
}
</script>

<style>
</style>
