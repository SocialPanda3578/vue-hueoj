<template>
  <div class="panel">
    <div class="text">难度</div>
    <div class="value">{{ difficulty }}</div>
    <br />
    <div class="text">通过</div>
    <div class="value">{{ passCount }}</div>
    <br />
    <div class="text">提交</div>
    <div class="value">{{ totalCount }}</div>
    <br />
    <div class="text">通过率</div>
    <div class="value">{{ passRatio }}</div>
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      passCount: 100,
      totalCount: 201,
      difficulty: 'hard'
    }
  },
  computed: {
    passRatio() {
      if (this.totalCount === 0) return 0
      const ratio = (this.passCount / this.totalCount) * 100
      return `${ratio.toFixed(2)}%`
    }
  }
}
</script>

<style scoped>
.panel {
  height: 300px;
  width: 100%;
  top: auto;
  border: double #671daf;
  border-style: groove;
  border-radius: 5px;
  background-color: white;
}
.text {
  line-height: 10px;
  position: relative;
  top: 12%;
  left: 10px;
  float: left;
  font-size: larger;
  font-weight: 500;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.value {
  line-height: 10px;
  position: relative;
  top: 12%;
  right: 10px;
  float: right;
  font-size: larger;
  font-weight: 500;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>
