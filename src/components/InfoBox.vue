<script setup>
const props = defineProps({
    title:{
        type:String,
        required:true
    },
    content:{
        type:[String],
        required:true
    },
    contentStyle:{
        type:Object,
        required:false
    }
})
</script>
<template>
    <div style="position: relative;height: 100px;width: 170px;display: flex;flex-direction: column;">
        <span style="font-size: x-large;">{{ props.title }}:</span>
        <span style="font-size: larger;" :style="props.contentStyle">{{ props.content }}</span>
    </div>
</template>
<style lang=''>

</style>