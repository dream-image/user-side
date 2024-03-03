<script setup>
const tableData = [
    {
        id: "f1ad2fb4-0325-4287-89f5-ff8bd6f5a704",
        name: "无所谓之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "通过",
        auditor:"谢毅",
        state: "通过",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
    },
    {
        id: "345c9c13-00c8-4a3d-a7a8-af36b88c09f8",
        name: "xxxxaaaaasdasdasasda有限公司",
        submitDate: "2011/01/14",
        auditDate: "2012/03/04",
        auditResult: "不通过",
        auditor:"谢毅",
        state: "不通过",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
    },
    {
        id: "d1880346-3cb7-4bed-82b5-f55692fd4ad6",
        name: "阿啦啦啦之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "已取消",
        auditor:"谢毅",
        state: "已取消",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
    },
    {
        id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
        name: "滴滴滴滴之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "通过",
        auditor:"谢毅",
        state: "通过",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
    },
    {
        id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
        name: "滴滴滴滴之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "通过",
        auditor:"谢毅",
        state: "通过",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
    },
    {
        id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
        name: "滴滴滴滴之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "通过",
        auditor:"谢毅",
        state: "通过",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
    },
    {
        id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
        name: "滴滴滴滴之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "通过",
        auditor:"谢毅",
        state: "通过",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
    },
    {
        id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
        name: "滴滴滴滴之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "通过",
        auditor:"谢毅",
        state: "通过",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
    },
    {
        id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
        name: "滴滴滴滴之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "通过",
        auditor:"谢毅",
        state: "通过",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
    },
    {
        id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
        name: "滴滴滴滴之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "通过",
        auditor:"谢毅",
        state: "通过",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
    },
    {
        id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
        name: "滴滴滴滴之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "通过",
        auditor:"谢毅",
        state: "通过",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
    },
    {
        id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
        name: "滴滴滴滴之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "通过",
        auditor:"谢毅",
        state: "通过",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
    },
    {
        id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
        name: "滴滴滴滴之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "通过",
        auditor:"谢毅",
        state: "通过",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
    },
    {
        id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
        name: "滴滴滴滴之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "通过",
        auditor:"谢毅",
        state: "通过",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
    },
    {
        id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
        name: "滴滴滴滴之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "通过",
        auditor:"谢毅",
        state: "通过",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
    },
]
const tableWrapperDom = ref(null)
const tableRowClassNameByState = ({
    row,
    rowIndex
}) => {
    if (row.state === "通过") {
        return 'green'
    } else if (row.state === '不通过') {
        return 'red'
    } else if (row.state === '待审核') {
        return 'yellow'
    } else if (row.state === '已取消') {
        return 'gray'
    }
}
function showDetail() {
    console.log("showDetail")
}
</script>

<template>
    <div style="width: 100%;height: 100%;position: relative;">
        <span style="position: absolute;font-size: 20px;">历史记录</span>
        <div style="position: absolute;top: 70px;width: 98%;height: 90%;" class=" border-solid border-slate-300 border"
            ref="tableWrapperDom">
            <el-table :data="tableData" stripe style="width: 100%;height: 100%;" lazy empty-text="没有记录"
                highlight-current-row :row-class-name="tableRowClassNameByState" max-height="100%">
                <el-table-column prop="id" label="企业id" width="180" style="text-wrap: nowrap;" show-overflow-tooltip />
                <el-table-column prop="name" label="企业名称" width="250" show-overflow-tooltip />
                <el-table-column prop="submitDate" label="提交日期" width="110" sortable />
                <el-table-column prop="auditDate" label="审核日期" width="110" sortable />
                <el-table-column prop="auditResult" label="审核结果" width="105" sortable />
                <el-table-column prop="auditor" label="审核人" width="110" />
                <el-table-column prop="state" label="状态" sortable />
                <el-table-column prop="carbonCredits" label="碳额度" width="90" sortable />
                <el-table-column prop="expendCarbon" label="消耗碳币" width="105"  sortable />
                <el-table-column prop="reallyGetCarbon" label="实得碳币" width="105" sortable />
                <el-table-column fixed="right" label="操作" width="100">
                    <template #default>
                        <el-button link type="primary" size="default" @click="showDetail">查看详细</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<style lang='css' scoped>
.green {
    color: var(--el-color-success);
}

.red {
    color: var(--el-color-error);
}

.yellow {
    color: var(--el-color-warning);
}

.gray {
    color: var(--el-color-info);
}
</style>