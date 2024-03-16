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
    EL上网: "",
    EL输入: "",
    EL输出: "",
    EL售电: "",
    EL电网: "",
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
    EL上网: rule,
    EL输入: rule,
    EL输出: rule,
    EL售电: rule,
    EL电网: rule,
    tCO2: rule
})

// InputCell cellRenderer columns generateData data 均为表格数据服务，具体作用参考elementUI的虚拟表格文档
const InputCell = ({
    value,
    onChange,
    forwardRef,
}) => {
    return (
        <el-input ref={forwardRef} onInput={onChange} modelValue={value} type="number" step="0.0001" min={0} clearable disabled={props.disabled} />
    )
}
const cellRenderer = ({ rowData, column }) => {
    const onChange = (value) => {
        rowData[column.dataKey] = value
    }
    const onEnterEditMode = (e) => {
        rowData.editing[column.dataKey] = true
    }

    const onExitEditMode = () => (rowData.editing[column.dataKey] = false)
    const input = ref()
    const setRef = (el) => {
        input.value = el
        if (el) {
            el.focus?.()
        }
    }

    return !props.disabled && rowData?.editing[column?.dataKey] ? (
        <div>
            <InputCell
                forwardRef={setRef}
                value={rowData[column.dataKey]}
                onChange={onChange}
                onBlur={onExitEditMode}
                onKeydownEnter={onExitEditMode}
            />
        </div>

    ) : (
        <div class="table-v2-inline-editing-trigger" style="height:100%;width:100%;align-items: center;justify-content: left;display:flex;" onClick={onEnterEditMode}>
            {rowData[column.dataKey]}
        </div>
    )
}
const columns = [
    {
        key: "修理设备",
        dataKey: "修理设备",
        title: "修理设备",
        width: 150,
    },
    {
        key: "设备容量1",
        dataKey: "设备容量1",
        title: "设备容量（千克）",
        width: 200,
        cellRenderer

    },
    {
        key: "实际回收量1",
        dataKey: "实际回收量1",
        title: "实际回收量（千克）",
        width: 200,
        cellRenderer
    },
    {
        key: "退役设备",
        dataKey: "退役设备",
        title: "退役设备",
        width: 150,
    },
    {
        key: "设备容量2",
        dataKey: "设备容量2",
        title: "设备容量（千克）",
        width: 200,
        cellRenderer
    },
    {
        key: "实际回收量2",
        dataKey: "实际回收量2",
        title: "实际回收量（千克）",
        width: 200,
        cellRenderer
    },
]

const generateData = (
    columns,
    length = 200,
    prefix = 'row-'
) => {
    let a = Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
            (rowData, column, columnIndex) => {
                if (column.dataKey === '修理设备' || column.dataKey === '退役设备')
                    rowData[column.dataKey] = rowIndex + 1
                else
                    rowData[column.dataKey] = ""
                rowData.editing = {}
                rowData.editing[column.dataKey] = false
                return rowData
            },
            {
            }
        )
    })
    // console.log(a)
    return a
}




const tableWrapperDom = ref(null)
const data = ref(generateData(columns, 6))
onMounted(() => {
    if (props.form.length > 0) {
        data.value = props.form
    }
    // console.log(data.value)
})
function addData() {
    data.value.push({
        "修理设备": data.value.length + 1,
        "editing": {

        },
        "设备容量1": "",
        "实际回收量1": "",
        "退役设备": data.value.length + 1,
        "设备容量2": "",
        "实际回收量2": ""
    })
}


watchEffect(() => {
    let E网损 = (form.EL上网 * 1 + form.EL输入 * 1 - form.EL输出 * 1 - form.EL售电 * 1) * props.coefficient
    let ESF6 = data.value.reduce((total, cur, index) => {
        return total + (cur.设备容量1 - cur.实际回收量1) * 1 + (cur.设备容量2 - cur.实际回收量2) * 1
    }, 0)
    form.tCO2 = ((E网损 + ESF6) * 1).toFixed(4) * 1
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
    <div style="width: 100%;height: 100%;padding: 10px;overflow: auto;display: flex;flex-direction: column;gap: 20px; min-width: 820px;"
        ref="tableWrapperDom">
        <el-form :model="form" :inline="true" label-width="200px" style="width: auto;height:auto"
            class="demo-form-inline" label-position="right" status-icon :rules="rules">
            <el-form-item label="电厂上网电量(兆瓦时):" required prop="EL上网">
                <el-input v-model="form.EL上网" style="" type="number" step="0.0001" :min="0" clearable
                    :disabled="props.disabled"></el-input>
            </el-form-item>
            <el-form-item label="自外省输入电量(兆瓦时):" required prop="EL输入">
                <el-input v-model="form.EL输入" style="" required type="number" step="0.0001" :min="0" clearable
                    :disabled="props.disabled"></el-input>
            </el-form-item>
            <el-form-item label="向外省输出电量(兆瓦时):" required prop="EL输出">
                <el-input v-model="form.EL输出" style="" type="number" step="0.0001" :min="0" clearable
                    :disabled="props.disabled"></el-input>
            </el-form-item>
            <el-form-item label="用户用电量(兆瓦时):" required prop="EL售电">
                <el-input v-model="form.EL售电" style="" type="number" step="0.0001" :min="0" clearable
                    :disabled="props.disabled"></el-input>
            </el-form-item>
            <el-form-item label="区域电力消费排放因子(吨二氧化碳/兆瓦时):" required>
                <el-input :value="props.coefficient" style="" disabled type="number" step="0.0001"></el-input>
            </el-form-item>
            <el-form-item label="碳排放总和" prop="tCO2">
                <el-input v-model="form.tCO2" style="" disabled type="number" step="0.0001"></el-input>
                <el-link href="/2、《中国电网企业温室气体排放核算方法与报告指南（试行）》.pdf" type="info"
                    style="font-size: 8px;position: absolute;transform: translateY(100%);"
                    download="《中国电网企业温室气体排放核算方法与报告指南（试行）》.pdf">碳排放总和计算参考资料</el-link>
            </el-form-item>
        </el-form>
        <div style="width: 100%;height: max-content;overflow: visible;position:relative;"
            class=" border-solid border-slate-300 border" ref="">
            <el-button style="position: absolute;right: 0;z-index: 1;transform: translateY(-35px);" @click="addData"
                v-if="!props.disabled" type="primary" circle>
                <el-icon size="35px">
                    <CirclePlus />
                </el-icon>
            </el-button>
            <div :style="{ height: `${tableHeight}px` }">
                <el-auto-resizer>
                    <template #default="{ height, width }">
                        <el-table-v2 :columns="columns" :data="data" :width="width" :height="height" fixed
                            :row-height="40" :footer-height="30">
                            <template #footer>
                                <div class="gray" style="display:flex;align-items: center;
                                    justify-content: center; height: 100%;width: 100%;">
                                    六氟化硫回收*
                                </div>
                            </template>
                        </el-table-v2>
                    </template>

                </el-auto-resizer>
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