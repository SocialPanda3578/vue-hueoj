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
            article:"第一行有一个整数，表示数字个数 \n𝑛\nn。\n\n第二行有 \n𝑛\nn 个整数，表示给出的 \n𝑛\nn 个整数 \n𝑎\n𝑖\na \ni\n​\n 。"
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