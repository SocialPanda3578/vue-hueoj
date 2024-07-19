<template>
    <div class="container">
        <table class="table" align="center">
            <tr class="title">
                <td>input</td><td>output</td>
            </tr>
            <tr class="value">
                <td>{{ input }}</td><td>{{ output }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                input:"1\n3 10 1 3\n1 1 1 3 3 1 30\n2 5 7 4 5 2 1\n8 6 8 8 11 6 3",
                output:"5\n4"
            }
        }
    }
</script>

<style>
.container{
    margin-bottom: 5%;
    margin-top: 5%;
}

.table{
    width: 90%;
    background-color:blueviolet;
}
.title{
    background-color:lightsteelblue;
    text-align: center;
}
.title td{
    width: 50%;
    letter-spacing: 2px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 600;
}
.value{
    vertical-align:top;
    background-color:rgb(239, 239, 239);
    white-space: pre;
}
.value td{
    padding: 2%;
    line-height: 1.5;
    letter-spacing: 0.5px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 600;
}
</style>