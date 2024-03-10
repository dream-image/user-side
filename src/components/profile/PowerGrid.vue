<script setup lang="jsx">
import { onMounted, onUnmounted } from 'vue';
const form = reactive({
    EL上网: "",
    EL输入: "",
    EL输出: "",
    EL售电: "",
    EL电网: "",
})




const InputCell = ({
    value,
    onChange,
    forwardRef,
}) => {
    return (
        <el-input ref={forwardRef} onInput={onChange} modelValue={value} />
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

    return rowData.editing[column.dataKey] ? (
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
        width: 150,
        cellRenderer

    },
    {
        key: "实际回收量1",
        dataKey: "实际回收量1",
        title: "实际回收量（千克）",
        width: 150,
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
        width: 150,
        cellRenderer
    },
    {
        key: "实际回收量2",
        dataKey: "实际回收量2",
        title: "实际回收量（千克）",
        width: 150,
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
                id: `${prefix}${rowIndex}`,
                parentId: null,
            }
        )
    })
    // console.log(a)
    return a
}




const tableWrapperDom = ref(null)
const data = ref(generateData(columns, 3))
function addData() {
    data.value.push({
        "id": data.value.length,
        "parentId": null,
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
            class="demo-form-inline" label-position="left" status-icon>
            <el-form-item label="电厂上网电量(兆瓦时):" required>
                <el-input v-model="form.EL上网" style=""></el-input>
            </el-form-item>
            <el-form-item label="自外省输入电量(兆瓦时):" required>
                <el-input v-model="form.EL输入" style="" required></el-input>
            </el-form-item>
            <el-form-item label="向外省输出电量(兆瓦时):" required>
                <el-input v-model="form.EL输出" style=""></el-input>
            </el-form-item>
            <el-form-item label="用户用电量(兆瓦时):" required>
                <el-input v-model="form.EL售电" style=""></el-input>
            </el-form-item>
            <el-form-item label="区域电网年平均供电排放因子(吨二氧化碳/兆瓦时):" required>
                <el-input v-model="form.EL电网" style=""></el-input>
            </el-form-item>
        </el-form>
        <div style="width: 100%;height: max-content;overflow: visible;position:relative;"
            class=" border-solid border-slate-300 border" ref="">
            <el-button style="position: absolute;right: 0;z-index: 1;transform: translateY(-35px);" @click="addData"
                type="primary" circle>
                <el-icon size="35px">
                    <CirclePlus />
                </el-icon>
            </el-button>
            <div :style="{ height: `${tableHeight}px` }">
                <el-auto-resizer>
                    <template #default="{ height, width }">
                        <el-table-v2 :columns="columns" :data="data" :width="width" :height="height" fixed />
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