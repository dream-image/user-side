<script setup>

</script>

<template>
    <div style="padding: 5px 10px;display: flex;position:relative;height: 100%;width: 100%;" id="wrapper">
        <div style="width: 200px;flex-grow:1;display: flex;align-items: center;">
            <img src="@/assets/CO2.svg" style="height: 100%;" alt="碳币">
            <span style="font-size: 20px;">碳核算和碳交易系统</span>
        </div>
        <div
            style="width: 100px;flex-grow:1;display: flex;flex-direction: column;justify-content: right;position:relative;">
            <div style="flex-grow:1;width: 100px;display: flex;align-items: center;height: 100%;position: absolute;right: 0;">
                <img src="@/assets/提醒.svg" style="height: 20px;margin-right: 5px;" alt="提醒">
                <div>
                    <img src="@/assets/企业.svg" style="height:100%;border-radius:50%;border:1px solid black;" alt="企业">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='css' scoped>
#wrapper div {
    /* border: 1px solid black; */
}
</style>