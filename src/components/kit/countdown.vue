<template>
    <div>
        <div v-if="timeRemaining > 0">
            {{ formattedTime }}
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    startTime: {
        type: Date,
        required: true
    }
});

const timeRemaining = ref(0);

const formattedTime = computed(() => {
    const days = Math.floor(timeRemaining.value / (24 * 60 * 60));
    const hours = Math.floor((timeRemaining.value % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((timeRemaining.value % 3600) / 60);
    const seconds = timeRemaining.value % 60;
    return `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
});

const updateTime = () => {
    const now = new Date().getTime();
    const distance = props.startTime.getTime() - now;

    if (distance <= 0) {
        clearInterval(intervalId.value);
        timeRemaining.value = 0;
    } else {
        timeRemaining.value = Math.floor(distance / 1000);
    }
};

let intervalId = ref(null);

onMounted(() => {
    intervalId.value = setInterval(updateTime, 1000);
    updateTime();
});

onUnmounted(() => {
    clearInterval(intervalId.value);
});
</script>