<script setup>

const isShowLedger = defineModel("isShowLedger", { type: Boolean, default: false })
function showLedger() {
    // 显示账本
    console.log("显示账本");
    isShowLedger.value = !isShowLedger.value
}
const tableData = [
    {
        date: "2022/02/03",
        mode: "自动回退",
        price: "1000 CNY / CBC",
        number: "100 个",
        total: "100000 CNY",
        remark: "碳币出售失败"
    },
    {
        date: "2022/02/03",
        mode: "购买",
        price: "1000 CNY / CBC",
        number: "100 个",
        total: "100000 CNY",
        remark: "购买碳币"
    },
    {
        date: "2022/02/03",
        mode: "出售中",
        price: "1000 CNY / CBC",
        number: "100 个",
        total: "100000 CNY",
        remark: "期望碳币出售"
    },
    {
        date: "2022/02/03",
        mode: "已出售",
        price: "1000 CNY / CBC",
        number: "100 个",
        total: "100000 CNY",
        remark: "出售碳币"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
    {
        date: "2022/02/03",
        mode: "充值",
        price: "2000 CNY",
        number: "2000 元",
        total: "2000 CNY",
        remark: "充值"
    },
]
const tableRowClassNameBystatus = ({
    row,
    rowIndex
}) => {
    if (row.mode === "充值") {
        return 'green'
    } else if (row.mode === '已出售') {
        return 'red'
    } else if (row.mode === '购买') {
        return 'yellow'
    } else if (row.mode === '已取消') {
        return 'gray'
    } else if(row.mode === '自动回退'){
        return 'white'
    } else if(row.mode === '出售中'){
        return 'blue'
    }
}
</script>

<template>
    <teleport to="body">
        <div style="width: 100%;height: 100%;position: absolute;z-index: 9;">
            <div style="width: max-content;height: 80%;z-index: 10;position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin: auto;display: flex;
            align-items: center;justify-content: start;border-radius: 8px;flex-direction: column;background-color: #ffffff;"
                class=" border-solid border-slate-300 border" ref="tableWrapperDom">
                <el-table :data="tableData" stripe lazy empty-text="没有记录" :row-class-name="tableRowClassNameBystatus"
                    style="border-radius: 8px;">
                    <el-table-column prop="date" label="日期" width="120" sortable />
                    <el-table-column prop="mode" label="方式" width="100" sortable />
                    <el-table-column prop="price" label="价格" width="200" show-overflow-tooltip />
                    <el-table-column prop="number" label="数量" width="100" show-overflow-tooltip />
                    <el-table-column prop="total" label="获得/消耗" width="150" />
                    <el-table-column prop="remark" label="描述" width="110" show-overflow-tooltip />
                </el-table>
                <el-button size="large" type="primary" @click="showLedger">关闭</el-button>
            </div>

            <!-- 蒙层 -->
            <div style="position: absolute;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.45);"
                @click="showLedger"></div>
        </div>
    </teleport>

</template>

<style lang=''>

</style>