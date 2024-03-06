<script setup>

const isShowLedger = defineModel("isShowLedger", { type: Boolean, default: false })
function showLedger() {
    // 显示账本
    console.log("显示账本");
    isShowLedger.value = !isShowLedger.value
}
</script>

<template>
    <teleport to="body" >
        <div style="width: 100%;height: 100%;position: absolute;z-index: 9;">
            <div></div>
            <!-- 蒙层 -->
            <div style="position: absolute;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.45);"
                @click="showLedger"></div>
        </div>
    </teleport>

</template>

<style lang=''>

</style>