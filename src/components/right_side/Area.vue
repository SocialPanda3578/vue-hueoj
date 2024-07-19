<template>
  <div class="left_side">
    <status />
    <tags />
  </div>
</template>

<script>
import status from './Status.vue'
import tags from './Tags.vue'
export default {
  components: {
    status,
    tags
  }
}
</script>

<style scoped>
.left_side {
  position: relative;
  top: 70px;
  float: right;
  margin-right: 1%;
  width: 25%;
}
</style>
