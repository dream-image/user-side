<script setup>
const props = defineProps({
  src:{
    required:true,
    type:String,
    default:''
  },
  alt:{
    type:String,
    default:''
  }  
})
</script>
<template>
    <div style="height: 40px;width: 40px;display: flex;align-items: center;justify-content: center;border: 1px solid #d4d3cf">
        <img :src="props.src" :alt="props.alt" style="height: 30px;width:30px;">
    </div>
</template>
<style lang='css' scoped>

</style>