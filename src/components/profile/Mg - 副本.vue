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
    if (Object.keys(props.data).length > 0) {
        let a = Object.assign(form, props.data)
        Object.keys(form).forEach(i => {
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
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
        editing:false
    },
    {
        state: "固体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "固体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "固体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "固体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "固体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "固体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "固体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },

    {
        state: "液体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "液体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "液体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "液体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "液体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "液体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "液体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "液体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "气体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "气体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "气体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "气体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "气体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "气体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "气体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
    {
        state: "气体燃料",
        className: "1",
        unit: "3",
        eGeneratingCapacity: "4",
        carbonContent: "1",
        oxidationRate: "1",
        consumption: "",
    },
])


function rowClick(row,column,event){
    console.log(row,column)
}


onMounted(() => {
    if (props.form.length > 0) {
        data.value = props.form
    }
    // console.log(data.value)
})



watchEffect(() => {
    // let E网损 = (form.S硅铁 * 1 + form.D白云石 * 1 - form.AD热量 * 1 - form.AD电量 * 1) * props.coefficient
    // let ESF6 = data.value.reduce((total, cur, index) => {
    //     return total + (cur.设备容量1 - cur.实际回收量1) * 1 + (cur.设备容量2 - cur.实际回收量2) * 1
    // }, 0)
    // form.tCO2 = ((E网损 + ESF6) * 1).toFixed(4) * 1
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
</script>
<template>
    <div style="width: 100%;height: 100%;padding: 10px;overflow: auto;display: flex;flex-direction: column;gap: 20px; "
        ref="tableWrapperDom">
        <el-form :model="form" :inline="true" label-width="200px" style="width: auto;height:auto"
            class="demo-form-inline" label-position="right" status-icon :rules="rules">
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
                <el-table :data="tableData" style="width: 100%" :span-method="objectSpanMethod" lazy
                    highlight-current-row :row-click="rowClick">
                    <el-table-column label="燃料品种">
                        <el-table-column prop="state" label="状态" min-width="100" />
                        <el-table-column prop="className" label="种类"  />
                    </el-table-column>
                    <el-table-column prop="unit" label="计量单位" min-width="100" />
                    <el-table-column prop="eGeneratingCapacity" label="低位发电量(GJ/t,GJ/万Nm³)" min-width="150" />
                    <el-table-column prop="carbonContent" label="单位热值含碳量(tC/TJ)" min-width="150" />
                    <el-table-column prop="oxidationRate" label="燃料碳氧化率" min-width="120" />
                    <el-table-column prop="consumption" label="净消耗量(GJ/t,GJ/万Nm³)" min-width="150">
                        <template #default="scope">
                            <el-input v-model="scope.row.consumption" placeholder="净消耗量" step="0.0001" type="number"
                                :min="0" clearable :disabled="props.disabled" required />
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