<template>
  <div class="topbar">
    <div class="logo_area">
      <a id="head" href="/">HUEOJ</a>
    </div>
    <div class="area">
      <a href="/contest">Contest</a>
      <a href="/problem">Problem</a>
      <a href="/status">Status</a>
      <a href="/rank">Rank</a>
      <a href="/edu">Edu</a>
    </div>
    <user_area></user_area>
  </div>
</template>

<script>
import user_area from '../kit/user_area.vue';
export default {
    components: {
      user_area
    }
  }
</script>

<style scoped>
.topbar {
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  border: double #1971c2;
  border-style: groove;
  border-width: 0 0 2px 0;
  position:fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo_area #head {
  color: #1971c2;
  font-family:Arial, Helvetica, sans-serif;
  font-size: 50px;
  font-weight: 500;
  text-decoration: none;
  margin-left: 20px;
}

.logo_area #tail {
  color: #671daf;
  position: relative;
  top: 13px;
  font-size: 30px;
  float: right;
}

.area {
  flex-grow: 1; /* Allow the area to grow and fill the space between logo_area and user_area */
  display: flex;
  justify-content: left;
}

.area a {
  position: relative;
  top: 50%;
  left: 50px;
  display: flex;
  font-family:'Courier New', Courier, monospace;
  font-size: 20px;
  font-weight: 700;
  margin-right: 20px;
  text-align: center;
  color: #000000;
  text-decoration: none;
}

.area a:hover {
  color: #1971c2;
  text-decoration: none;
}

.area a:after {
  content: '';
  display: block;
  background-color: #2a54ed;
}
</style>
