<script setup lang="jsx">
import { onMounted, onUnmounted, watch, watchEffect } from 'vue';
const props = defineProps({
    coefficient: {
        type: [String, Number],
        required: true,
        default: 1
    },
    disabled: {
        type: Boolean,
        default: false
    },
    data: { //这个放那个表格外的数据字段
        type: Object,
        required: false,
        default: {}
    },
    form: { //这个放表格数据
        type: Array,
        required: false,
        default: []
    },
    getFormData: {
        type: Function,
        required: true
    }
})
const form = reactive({
    S硅铁: "",
    D白云石: "",
    AD热量: "",
    AD电量: "",
    tCO2: ""
})

onMounted(() => {
    let keys = Object.keys(props.data)
    if (keys.length > 0) {
        keys.forEach(i => {
            form[i] = props.data[i]
        })
    }
})

const rule = [{
    validator: (rule, value, callback) => {
        if (value < 0) {
            callback(new Error("请输入大于0的数"))
        }
        else if (value == '') {
            callback(new Error("该项必填"))
        }
        callback()
    }
    , trigger: "blur"
}]
const rules = reactive({
    S硅铁: rule,
    D白云石: rule,
    AD热量: rule,
    AD电量: rule,
    tCO2: rule
})

const tableWrapperDom = ref(null)

const objectSpanMethod = ({
    row,
    column,
    rowIndex,
    columnIndex,
}) => {
    if (columnIndex === 0) {
        if (rowIndex % 8 === 0) {
            return {
                rowspan: 8,
                colspan: 1,
            }
        } else {
            return {
                rowspan: 0,
                colspan: 0,
            }
        }
    }
}


const tableData = reactive([
    {
        state: "固体燃料",
        className: "无烟煤",
        unit: "吨",
        eGeneratingCapacity: "20.304",
        carbonContent: "27.49",
        oxidationRate: "0.94",
        consumption: "12",
        editing: false
    },
    {
        state: "固体燃料",
        className: "烟煤",
        unit: "吨",
        eGeneratingCapacity: "19.570",
        carbonContent: "27.49",
        oxidationRate: "1",
        consumption: "",
        editing: false
    },
    {
        state: "固体燃料",
        className: "褐煤",
        unit: "吨",
        eGeneratingCapacity: "14.080",
        carbonContent: "28.00",
        oxidationRate: "0.96",
        consumption: "",
        editing: false

    },
    {
        state: "固体燃料",
        className: "洗精煤",
        unit: "吨",
        eGeneratingCapacity: "26.344",
        carbonContent: "25.40",
        oxidationRate: "0.90",
        consumption: "",
        editing: false
    },
    {
        state: "固体燃料",
        className: "其他洗煤",
        unit: "吨",
        eGeneratingCapacity: "8.363",
        carbonContent: "25.40",
        oxidationRate: "0.90",
        consumption: "",
        editing: false
    },
    {
        state: "固体燃料",
        className: "其他煤制品",
        unit: "吨",
        eGeneratingCapacity: "17.460",
        carbonContent: "33.60",
        oxidationRate: "0.90",
        consumption: "",
        editing: false
    },
    {
        state: "固体燃料",
        className: "蓝炭",
        unit: "吨",
        eGeneratingCapacity: "28.435",
        carbonContent: "29.42",
        oxidationRate: "0.93",
        consumption: "",
        editing: false
    },
    {
        state: "固体燃料",
        className: "焦炭",
        unit: "吨",
        eGeneratingCapacity: "28.447",
        carbonContent: "29.50",
        oxidationRate: "0.93",
        consumption: "",
        editing: false
    },

    {
        state: "液体燃料",
        className: "原油",
        unit: "吨",
        eGeneratingCapacity: "41.816",
        carbonContent: "20.10",
        oxidationRate: "0.98",
        consumption: "",
        editing: false
    },
    {
        state: "液体燃料",
        className: "燃料油",
        unit: "吨",
        eGeneratingCapacity: "41.816",
        carbonContent: "21.10",
        oxidationRate: "0.98",
        consumption: "",
        editing: false
    },
    {
        state: "液体燃料",
        className: "汽油",
        unit: "吨",
        eGeneratingCapacity: "43.070",
        carbonContent: "18.90",
        oxidationRate: "0.98",
        consumption: "",
        editing: false
    },
    {
        state: "液体燃料",
        className: "柴油",
        unit: "吨",
        eGeneratingCapacity: "42.652",
        carbonContent: "20.20",
        oxidationRate: "0.98",
        consumption: "",
        editing: false
    },
    {
        state: "液体燃料",
        className: "煤油",
        unit: "吨",
        eGeneratingCapacity: "44.750",
        carbonContent: "19.60",
        oxidationRate: "0.98",
        consumption: "",
        editing: false
    },
    {
        state: "液体燃料",
        className: "液化天然气",
        unit: "吨",
        eGeneratingCapacity: "41.868",
        carbonContent: "17.20",
        oxidationRate: "0.98",
        consumption: "",
        editing: false
    },
    {
        state: "液体燃料",
        className: "液化石油气",
        unit: "吨",
        eGeneratingCapacity: "50.179",
        carbonContent: "17.20",
        oxidationRate: "0.98",
        consumption: "",
        editing: false
    },
    {
        state: "液体燃料",
        className: "焦油",
        unit: "吨",
        eGeneratingCapacity: "33.453",
        carbonContent: "22.00",
        oxidationRate: "0.98",
        consumption: "",
        editing: false
    },
    {
        state: "气体燃料",
        className: "焦炉煤气",
        unit: "万立方米",
        eGeneratingCapacity: "173.540",
        carbonContent: "12.10",
        oxidationRate: "0.99",
        consumption: "",
        editing: false
    },
    {
        state: "气体燃料",
        className: "高炉煤气",
        unit: "万立方米",
        eGeneratingCapacity: "33.000",
        carbonContent: "70.80",
        oxidationRate: "0.99",
        consumption: "",
        editing: false
    },
    {
        state: "气体燃料",
        className: "转炉煤气",
        unit: "万立方米",
        eGeneratingCapacity: "84.000",
        carbonContent: "49.60",
        oxidationRate: "0.99",
        consumption: "",
        editing: false
    },
    {
        state: "气体燃料",
        className: "发生炉煤气",
        unit: "万立方米",
        eGeneratingCapacity: "52.270",
        carbonContent: "12.20",
        oxidationRate: "0.99",
        consumption: "",
        editing: false
    },
    {
        state: "气体燃料",
        className: "其他煤气",
        unit: "万立方米",
        eGeneratingCapacity: "52.270",
        carbonContent: "12.20",
        oxidationRate: "0.99",
        consumption: "",
        editing: false
    },
    {
        state: "气体燃料",
        className: "天然气",
        unit: "万立方米",
        eGeneratingCapacity: "389.31",
        carbonContent: "15.30",
        oxidationRate: "0.99",
        consumption: "",
        editing: false
    },
    {
        state: "气体燃料",
        className: "半焦气",
        unit: "万立方米",
        eGeneratingCapacity: "81.000",
        carbonContent: "11.96",
        oxidationRate: "0.99",
        consumption: "",
        editing: false
    },
    {
        state: "气体燃料",
        className: "炼厂干气",
        unit: "万立方米",
        eGeneratingCapacity: "45.998",
        carbonContent: "18.20",
        oxidationRate: "0.99",
        consumption: "",
        editing: false
    },
])


function rowClick(row, column, event) {
    console.log(row, column)
}


onMounted(() => {
    if (props.form.length > 0) {
        for (let i = 0; i < props.form.length; i++) {
            tableData[i].consumption = props.form[i]
        }
    }
    // console.log(data.value)
})



watchEffect(() => {
    let E燃烧 = tableData.reduce((pre, cur) => {
        return pre + 1 * cur.eGeneratingCapacity * cur.consumption * cur.oxidationRate * cur.carbonContent * (11 / 3)
    }, 0)
    let E原材料 = form.S硅铁 * 2.79
    let E过程 = 0.98 * 0.478 * form.D白云石
    let E电和热 = form.AD电量 * props.coefficient + form.AD热量 * 0.11
    form.tCO2 = (E燃烧 + E原材料 + E过程 + E电和热).toFixed(4) * 1
    props.getFormData(form,tableData)
})


let ob
const tableHeight = ref()
onMounted(() => {
    ob = new ResizeObserver(() => {
        tableHeight.value = 0 + tableWrapperDom.value?.getBoundingClientRect().height - tableWrapperDom.value?.children[0]?.getBoundingClientRect().height - tableWrapperDom.value?.children[0]?.children[0]?.getBoundingClientRect().height - 10
    })
    ob.observe(document.body)
})
onUnmounted(() => {
    ob.disconnect()
})

function changeTableEdit(scope, e = undefined) {
    // console.log(scope)
    if (props.disabled) {
        retrun
    }
    scope.row.editing = !scope.row.editing
    if (e) {
        let parent = e.target.parentNode
        nextTick(() => {
            console.log(parent.children[0].children[0].children[0].focus())
        })


    }
}
</script>
<template>
    <div style="width: 100%;height: 100%;padding: 10px;overflow: auto;display: flex;flex-direction: column;gap: 20px; "
        ref="tableWrapperDom">
        <el-form :model="form" :inline="true" label-width="200px" style="width: auto;height:auto" class="demo-form-inline"
            label-position="right" status-icon :rules="rules">
            <el-form-item label="年度内自产的硅铁产量(吨):" required prop="S硅铁">
                <el-input v-model="form.S硅铁" style="" type="number" step="0.0001" :min="0" clearable
                    :disabled="props.disabled"></el-input>
            </el-form-item>
            <el-form-item label="白云石原料消耗量(吨):" required prop="D白云石">
                <el-input v-model="form.D白云石" style="" required type="number" step="0.0001" :min="0" clearable
                    :disabled="props.disabled"></el-input>
            </el-form-item>
            <el-form-item label="净购入热量(百万千焦):" required prop="AD热量">
                <el-input v-model="form.AD热量" style="" type="number" step="0.0001" :min="0" clearable
                    :disabled="props.disabled"></el-input>
            </el-form-item>
            <el-form-item label="净购入电量(兆瓦时):" required prop="AD电量">
                <el-input v-model="form.AD电量" style="" type="number" step="0.0001" :min="0" clearable
                    :disabled="props.disabled"></el-input>
            </el-form-item>
            <el-form-item label="区域电力消费排放因子(吨二氧化碳/兆瓦时):" required>
                <el-input :value="props.coefficient" style="" disabled type="number" step="0.0001"></el-input>
            </el-form-item>
            <el-form-item label="碳排放总和" prop="tCO2">
                <el-input v-model="form.tCO2" style="" disabled type="number" step="0.0001"></el-input>
                <el-link href="/6、《中国镁冶炼企业温室气体排放核算方法与报告指南（试行）》.pdf" type="info"
                    style="font-size: 8px;position: absolute;transform: translateY(100%);"
                    download="《中国镁冶炼企业温室气体排放核算方法与报告指南（试行）》.pdf">碳排放总和计算参考资料</el-link>
            </el-form-item>
        </el-form>
        <div style="width: 100%;height: max-content;overflow: visible;position:relative;"
            class=" border-solid border-slate-300 border" ref="">
            <div :style="{ height: `${tableHeight}px` }">
                <el-table :data="tableData" style="width: 100%;" height="363" :span-method="objectSpanMethod" lazy
                    highlight-current-row :row-click="rowClick">
                    <el-table-column label="燃料品种" align="center" fixed>
                        <el-table-column prop="state" label="状态" min-width="100" align="center" />
                        <el-table-column prop="className" label="种类" min-width="100" align="center" />
                    </el-table-column>
                    <el-table-column prop="unit" label="计量单位" min-width="100" align="center" fixed />
                    <el-table-column prop="eGeneratingCapacity" label="低位发电量(GJ/t,GJ/万Nm³)" min-width="150" align="center"
                        fixed />
                    <el-table-column prop="carbonContent" label="单位热值含碳量(tC/TJ)" min-width="150" align="center" fixed />
                    <el-table-column prop="oxidationRate" label="燃料碳氧化率" min-width="120" align="center" fixed />
                    <el-table-column prop="consumption" label="净消耗量(t,万Nm³)" min-width="150" align="center" fixed>
                        <template #default="scope">
                            <h1 v-if="!scope.row.editing && scope.row.consumption != ''" style="width: 100%;height: 100%;"
                                @click="changeTableEdit(scope, $event)">{{
                                    scope.row.consumption }}</h1>
                            <h1 v-else-if="!scope.row.editing && scope.row.consumption == ''"
                                style="opacity: 0.4;width: 100%;height: 100%;display:block;"
                                @click="changeTableEdit(scope, $event)">待填</h1>
                            <el-input v-else v-model="scope.row.consumption" style="height: 23px;display: flex;margin: 0;"
                                placeholder="净消耗量" step="0.0001" type="number" @blur="changeTableEdit(scope)" size="small"
                                @key.enter="changeTableEdit(scope)" :min="0" clearable :disabled="props.disabled"
                                required />
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<style lang='css'>
.demo-form-inline .el-input {
    --el-input-width: 160px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}

.table-v2-inline-editing-trigger {
    border: 1px transparent dotted;
    padding: 4px;
}

.table-v2-inline-editing-trigger:hover {
    border-color: var(--el-color-primary);
}
</style>