<script setup>
import PowerGrid from '@/components/profile/PowerGrid.vue';
import { TableV2FixedDir } from 'element-plus';
import { MoreFilled } from '@element-plus/icons-vue'
import { shallowRef } from 'vue';
const showWhatComponentOfDetail = shallowRef('')
const isShowDetail = ref(false)

// 每个导入的资料类型的组件都必须放到这个对象里面，解决被解析后组件变为小写标签
const componentsObj = {
    'PowerGrid': PowerGrid
}


// 这个里面的数据应该从后端获取，现在只是写死并附上格式
const tableData = reactive([
    {
        id: "f1ad2fb4-0325-4287-89f5-ff8bd6f5a704",
        name: "无所谓之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "不通过",
        status: "不通过",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
        detail: { //这detail里面应该附上 mode(就是是哪个类型的,这里的PowerGrid是电网，然后依据类型附上相应字段以及值,注意：这里的类型名字一定要和对应组件名一样)
            mode: 'PowerGrid',
            chooseWhatProvince: "0.123",//填表的时候选的那个省份对应的系数
            data: { //这里放表格以外的数据
                EL上网: "1.1234",
                EL输入: "4.1111",
                EL输出: "512.3331",
                EL售电: "42.1345",
                EL电网: "",
                tCO2: "",
            },
            form: [// 放表格数据
                {
                    修理设备: 1,
                    设备容量1: "17",
                    实际回收量1: "14",
                    退役设备: 1,
                    editing: { //这个字段 就一直为空对象

                    },
                    设备容量2: "11",
                    实际回收量2: "6",
                },
                {
                    修理设备: 2,
                    设备容量1: "33",
                    实际回收量1: "32",
                    退役设备: 2,
                    editing: {

                    },
                    设备容量2: "44",
                    实际回收量2: "43",
                }
            ],
        }
    },
    {
        id: "345c9c13-00c8-4a3d-a7a8-af36b88c09f8",
        name: "xxxxaaaaasdasdasasda有限公司",
        submitDate: "2011/01/14",
        auditDate: "2011/01/16",
        auditResult: "通过",
        status: "通过",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
        detail: {
            mode: 'PowerGrid',
            chooseWhatProvince: "0.222",
            data: { //这里放表格以外的数据
                EL上网: "1.1234",
                EL输入: "4.1111",
                EL输出: "512.3331",
                EL售电: "42.1345",
                EL电网: "",
                tCO2: "",
            },
            form: [// 放表格数据
                {
                    修理设备: 1,
                    设备容量1: "17",
                    实际回收量1: "14",
                    退役设备: 1,
                    editing: {

                    },
                    设备容量2: "11",
                    实际回收量2: "6",
                },
                {
                    修理设备: 2,
                    设备容量1: "33",
                    实际回收量1: "32",
                    退役设备: 2,
                    editing: {

                    },
                    设备容量2: "44",
                    实际回收量2: "43",
                }
            ],
        }
    },
    {
        id: "d1880346-3cb7-4bed-82b5-f55692fd4ad6",
        name: "阿啦啦啦之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "待审核",
        status: "待审核",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
        detail: {
            mode: 'PowerGrid',
            chooseWhatProvince: "0.222",
            data: { //这里放表格以外的数据
                EL上网: "1.1234",
                EL输入: "4.1111",
                EL输出: "512.3331",
                EL售电: "42.1345",
                EL电网: "",
                tCO2: "",
            },
            form: [// 放表格数据
                {
                    修理设备: 1,
                    设备容量1: "17",
                    实际回收量1: "14",
                    退役设备: 1,
                    editing: {

                    },
                    设备容量2: "11",
                    实际回收量2: "6",
                },
                {
                    修理设备: 2,
                    设备容量1: "33",
                    实际回收量1: "32",
                    退役设备: 2,
                    editing: {

                    },
                    设备容量2: "44",
                    实际回收量2: "43",
                }
            ],
        }
    },
    {
        id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
        name: "滴滴滴滴之有限公司",
        submitDate: "2012/01/14",
        auditDate: "2012/03/04",
        auditResult: "已取消",
        status: "已取消",
        carbonCredits: "200",
        expendCarbon: "18",
        reallyGetCarbon: "182",
        detail: {
            mode: 'PowerGrid',
            chooseWhatProvince: "0.222",
            data: { //这里放表格以外的数据
                EL上网: "1.1234",
                EL输入: "4.1111",
                EL输出: "512.3331",
                EL售电: "42.1345",
                EL电网: "",
                tCO2: "",
            },
            form: [// 放表格数据
                {
                    修理设备: 1,
                    设备容量1: "17",
                    实际回收量1: "14",
                    退役设备: 1,
                    editing: {

                    },
                    设备容量2: "11",
                    实际回收量2: "6",
                },
                {
                    修理设备: 2,
                    设备容量1: "33",
                    实际回收量1: "32",
                    退役设备: 2,
                    editing: {

                    },
                    设备容量2: "44",
                    实际回收量2: "43",
                }
            ],
        }
    },
])
const tableRowClassNameBystatus = ({
    row,
    rowIndex
}) => {
    if (row.status === "通过") {
        return 'green'
    } else if (row.status === '不通过') {
        return 'red'
    } else if (row.status === '待审核') {
        return 'yellow'
    } else if (row.status === '已取消') {
        return 'gray'
    }
}

//点击查看详细的是下标为哪个的数据
const showDataIndex = ref(0)
//点击查看详细处理
function showDetail(scope) {
    console.log(scope)
    isShowDetail.value = !isShowDetail.value
    showDataIndex.value = scope.$index
    showWhatComponentOfDetail.value = componentsObj[tableData[scope.$index].detail.mode]
    console.log(showWhatComponentOfDetail.value)
}

function showForm() {
    isShowDetail.value = !isShowDetail.value
}

const activities = [
    {
        content: 'Custom icon',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: MoreFilled,
    },
    {
        content: 'Custom color',
        timestamp: '2018-04-03 20:46',
        color: '#0bbd87',
    },
    {
        content: 'Custom hollow',
        timestamp: '2018-04-03 20:46',
        type: 'primary',
        hollow: true,
    },
]
</script>

<template>
    <div style="height: 100%;width: 100%;position: relative;">
        <div style="position: absolute;display: flex;flex-direction: column;gap: 8px;">
            <span style="font-size: 20px;">历史记录</span>
            <span style="font-size: 10px;">该历史记录包含了每次提交审核的所有信息</span>
        </div>

        <!-- 下面展示表格 -->
        <div style="position: absolute;top: 70px;width: 98%;height: 90%;" class=" border-solid border-slate-300 border">
            <el-table :data="tableData" stripe style="width: 100%;" lazy empty-text="没有记录"
                :row-class-name="tableRowClassNameBystatus" max-height="100%">

                <el-table-column prop="id" label="企业id" width="180" show-overflow-tooltip />
                <el-table-column prop="name" label="企业名称" width="250" show-overflow-tooltip />
                <el-table-column prop="submitDate" label="提交日期" width="110" />
                <el-table-column prop="auditDate" label="审核日期" width="110" />
                <el-table-column prop="auditResult" label="审核结果" />
                <el-table-column prop="status" label="状态" />
                <el-table-column prop="carbonCredits" label="碳额度" />
                <el-table-column prop="expendCarbon" label="消耗碳币" />
                <el-table-column prop="reallyGetCarbon" label="实得碳币" />
                <el-table-column fixed="right" label="操作" width="100">
                    <template #default="scope">
                        <el-button link type="primary" size="default" @click="showDetail(scope)">查看详细</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <teleport to='body'>
            <div style="position: absolute;width: 100%;height: 100%;z-index: 9;" v-if="isShowDetail">
                <div style="position: absolute;left: 0;right: 0;top: 0;bottom:0;margin: auto;width: max-content;height:600px;overflow: auto;
                background-color: white;padding: 10px 10px;border-radius: 8px;z-index: 9999;">
                    <component :is="showWhatComponentOfDetail" :disabled="true" style="height: 600px;width: 1000px;"
                        :coefficient="tableData[showDataIndex].detail.chooseWhatProvince"
                        :data="tableData[showDataIndex].detail.data" :form="tableData[showDataIndex].detail.form">
                    </component>
                    <el-timeline style="max-width: 600px">
                        <el-timeline-item v-for="(activity, index) in activities" :key="index" :icon="activity.icon"
                            :type="activity.type" :color="activity.color" :size="activity.size"
                            :hollow="activity.hollow" :timestamp="activity.timestamp">
                            {{ activity.content }}
                        </el-timeline-item>
                    </el-timeline>
                </div>
                <!-- 蒙层 -->
                <div style="position: absolute;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.45);"
                    @click="showForm">
                </div>
            </div>
        </teleport>
    </div>
</template>

<style lang='css'></style>