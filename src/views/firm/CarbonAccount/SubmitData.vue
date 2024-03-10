<script setup>
import PowerGrid from '@/components/profile/PowerGrid.vue';

const itemList=[
    {
        value:"电网",
        label:"电网"
    }
]
const chooseWhatItem=ref("")
</script>
<template>
    <div style="height: 100%;width: 100%;position: relative;">
        <div style="position: absolute;display: flex;flex-direction: column;gap: 8px;">
            <span style="font-size: 20px;">提交资料</span>
            <span style="font-size: 10px;">一年核算一次</span>
            <el-select v-model="chooseWhatItem" placeholder="选择报告类型" style="width: 240px;position: absolute;left: 120%;" clearable>
                <el-option v-for="item in itemList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>

        <!-- 下面展示每种类型的表格 -->
        <div style="position: absolute;top: 70px;width: 98%;height: 90%;" class=" border-solid border-slate-300 border">
            <PowerGrid></PowerGrid>
        </div>

    </div>
</template>
<style lang=''>

</style>