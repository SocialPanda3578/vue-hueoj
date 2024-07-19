<template>
    <div class="panel">
        <div class="controls">
            <select id="language" class="control">
                <option value="cpp" selected>C++</option>
                <option value="c">C</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
            </select>
            <button id="submit-code" class="control">提交代码</button>
        </div>
        <br>
        <textarea class="code-input" placeholder="Enter your code here..."></textarea>
    </div>
</template>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit-code'); // 正确获取按钮
    const codeTextArea = document.querySelector('.code-input'); // 获取代码输入区域
    const languageSelect = document.getElementById('language'); // 获取语言选择下拉列表
    const endpointUrl = 'http://127.0.0.1:8050/services/judge';
    submitButton.addEventListener('click', async function(event) {
        event.preventDefault();
        const code = codeTextArea.value;
        const language = languageSelect.value; // 从下拉列表中获取所选语言的值
        const data = {
            code: code,
            language: language,
        };
        try {
            const response = await fetch(endpointUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            console.log(result);
            alert('Code submitted successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit code. Please try again.');
        }
    });
});
</script>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2%;
  width: 100%;
  height: 700px;
  border: groove #671daf;
  border-radius: 5px;
  background-color: white;
}

.code-input {
    width: 95%;
    height: 90%;
    margin-bottom: 20px;
    margin-top: 5px;
    align-self: center;
    background-color: rgb(239, 239, 239);
}

.controls {
    display: flex; /* 使用flex布局来并排显示 */
    justify-content: center; /* 水平居中 */
    width: 95%; /* 根据需要调整宽度 */
    margin-top: 20px; /* 顶部外边距 */
}




</style>
