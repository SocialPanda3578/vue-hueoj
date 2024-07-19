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
            article:"一个正整数，表示最大的整数"
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