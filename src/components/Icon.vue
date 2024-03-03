<script setup>
const props = defineProps({
    src:{
        type:String,
        required:true
    },
    alt:{
        type:String,
        required:false,
        default:""
    }
})
</script>
<template>
    <img style="width: 100%;height: 100%;" :src="props.src" :alt="props.alt">
</template>
<style lang='css'>

</style>