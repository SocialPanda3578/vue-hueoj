<template>
    <div class="container">
        <article>
            {{ article }}
        </article>
    </div>
</template>

<script>
export default{
    data(){
        return{
            article:"设有 \n𝑛\nn 个正整数 \n𝑎\n1\n…\n𝑎\n𝑛\na \n1\n​\n …a \nn\n​\n ，将它们联接成一排，相邻数字首尾相接，组成一个最大的整数。\n\n输入格式"
        }
    }
}
</script>

<style scoped>
.container{
    margin-left: 5%;
    margin-right: 5%;
}
</style>