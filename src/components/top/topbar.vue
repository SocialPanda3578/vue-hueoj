<template>
  <div class="topbar">
    <div class="logo_area">
      <a id="head" href="/src/apps/indexApp">HUEOJ</a>
    </div>
    <div class="area">
      <a href="https://codeforces.com/">Blog</a>
      <a href="/contests.html">Contests</a>
      <a href="/problems.html">Problems</a>
      <a href="/rank.html">Rank</a>
      <a href="/edu.html">Edu</a>
    </div>
    <div class="user_area">
      <a href="/user.html" id="username">{{ username }}</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: 'SocialPanda'
    }
  }
}
</script>

<style scoped>
.topbar {
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  border: double #671daf;
  border-style: groove;
  border-width: 0 0 2px 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo_area #head {
  color: #671daf;
  font-family: 'Times New Roman', Times, serif;
  font-size: 50px;
  text-decoration: none;
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
  color: #671daf;
  text-decoration: none;
}

.area a:after {
  content: '';
  display: block;
  background-color: #2a54ed;
}

.user_area #username {
  color: #ff0000;
  font-size: large;
  font-weight: 800;
  float: right;
  margin-right: 10%;
  text-decoration: none;
}
</style>
