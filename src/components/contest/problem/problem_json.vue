<template>
  <div class="panel">
    <h2>题目描述</h2>
    <div class="container">
      <article>
        {{ problemData?.content?.description || '暂无描述' }}
      </article>
    </div>

    <h2>输入格式</h2>
    <div class="container">
      <article>
        {{ problemData?.content?.input || '暂无输入格式' }}
      </article>
    </div>

    <h2>输出格式</h2>
    <div class="container">
      <article>
        {{ problemData?.content?.output || '暂无输出格式' }}
      </article>
    </div>

    <h2>样例</h2>
    <div class="container">
      <div v-if="problemData?.content?.examples && problemData.content.examples.length > 0">
        <table class="table" align="center">
          <tr class="heading">
            <td>input</td>
            <td>output</td>
          </tr>
          <tr class="value" v-for="example in problemData.content.examples" :key="example.input">
            <td>{{ example.input }}</td>
            <td>{{ example.output }}</td>
          </tr>
        </table>
      </div>
      <div v-else>
        <p>暂无样例数据</p>
      </div>
    </div>

    <h2>注解</h2>
    <div class="container">
      <article>
        {{ problemData?.content?.note || '暂无注解' }}
      </article>
    </div>

  </div>
</template>

<script>
export default {
  props: ['problemData'],
  components: {}
};
</script>

<style scoped>
.container {
  margin-left: 5%;
  margin-bottom: 3%;
  margin-top: 3%;
}

.panel {
  padding-top: 50px;
  margin-bottom: 2%;
  width: 100%;
  border: double #1971c2;
  border-style: groove;
  border-radius: 5px;
  background-color: white;
}

h2 {
  margin-left: 5%;
}

.table {
  width: 90%;
  background-color: #1971c2;
}

.heading {
  background-color: lightsteelblue;
  text-align: center;
}

.heading td {
  width: 50%;
  letter-spacing: 2px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;
}

.value {
  vertical-align: top;
  background-color: rgb(239, 239, 239);
  white-space: pre;
}

.value td {
  padding: 2%;
  line-height: 1.5;
  letter-spacing: 0.5px;
  font-family: 'Courier New', Courier, monospace;
  font-weight: 600;
}
</style>
