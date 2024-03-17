<script setup>
import PowerGrid from '@/components/profile/PowerGrid.vue';
import Mg from '@/components/profile/Mg.vue';
import { shallowRef } from 'vue';
import preViewPDF from '@/components/preViewPDF.vue';

import PDF from "@/assets/PDF.svg"
import NoFile from '@/assets/网络不稳定.svg'
import { ElMessage } from 'element-plus';
const showWhatComponentOfDetail = shallowRef('')
const isShowDetail = ref(false)

// 每个导入的资料类型的组件都必须放到这个对象里面，解决被解析后组件变为小写标签
const componentsObj = {
    'PowerGrid': PowerGrid,
    'Mg': Mg
}
const COLOR = {
    GREEN: "#0bbd87",
    RED: "rgb(245,108,108)",
    YELLOW: "rgb(230,162,60)",
    GRAY: "rgb(144,147,153)"
}

async function getFile(url, name, type, index = 0) {

    try {
        tableData[index].detail.fileList.push({
            isLoading: true
        })
        let a = name.split('.')
        let contentType = type == 'image' ? ('image/' + a[a.length - 1]) : 'application/pdf'
        console.log(contentType)
        let res = await fetch('http://localhost:3000/file/' + url, {
            method: 'GET',
            headers: {
                'Content-Type': contentType,
                'Access-Control-Expose-Headers': '*'
            },
        })

        // console.log(res.headers)
        let blob = await res.blob()
        // if (type == 'image') {
        let reader = new FileReader()
        reader.onload = () => {
            tableData[index].detail.fileList.pop()
            tableData[index].detail.fileList.push({
                url: reader.result,
                name: name,
                type: type,
                isLoading: false
            })
        }
        reader.readAsDataURL(blob)
        // }
        // else if (type == 'pdf') {
        //     let file = new File([blob], name, { type: contentType })
        //     console.log(file)
        //     tableData[0].detail.fileList.push({
        //         file: file,
        //         url: PDF
        //     })
        // }


    } catch (error) {
        tableData[index].detail.fileList.pop()
        tableData[index].detail.fileList.push({
            url: NoFile,
            name: name,
            type: 'image',
            isLoading: false
        })
        ElMessage.error(name + '加载失败')
        console.log(error)
    }
}


onMounted(async () => {
    try {

        await getFile(1, "1.png", 'image', 1)
        await getFile(2, "2.png", 'image', 1)
        await getFile(3, "3.png", 'image', 1)
        await getFile('pdf', "test.pdf", 'pdf', 1)
    } catch (error) {
        console.log(error)
    }

})
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
            activities: {
                statusIndex: "1",//表示目前到了那个阶段，然后这个阶段之外的所有card我都会给他搞一个灰
                // 提交申请后是0  审核人处理后是1  审核机构介入后是2
                data: [
                    {
                        timestamp: '2018-04-12 20:46',
                        color: COLOR.GREEN,
                        title: "提交申请",
                        subTitle: "已通过"
                    },
                    {
                        timestamp: '2018-04-03 20:46',
                        color: COLOR.RED,
                        title: "未通过",
                        subTitle: "理由：材料不充分"
                    },
                    {
                        timestamp: '2018-04-03 20:46',
                        color: COLOR.GRAY,  //未轮到的都用灰色
                        title: "未介入",//不知道这里叫什么好,
                        subTitle: "监管机构未介入"
                    },
                ]
            },
            fileList: [
                // {  数据类型示例
                //     url:"",
                //     name:"",
                //     type:""
                // }

            ]
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
            mode: 'Mg',
            chooseWhatProvince: "0.222",
            data: { //这里放表格以外的数据
                S硅铁: "",
                D白云石: "",
                AD热量: "",
                AD电量: "",
                // tCO2: ""
            },
            form: [// 放表格数据
                1, 2, 3, 4, 5
                //Mg的这个表格特殊一点，只需要消费数据，其余都是写死且顺序固定的数据
            ],
            activities: {
                statusIndex: "1",//表示目前到了那个阶段，然后这个阶段之外的所有card我都会给他搞一个灰
                data: [
                    {
                        timestamp: '2018-04-12 20:46',
                        color: COLOR.GREEN,
                        title: "提交申请",
                        subTitle: "已通过"
                    },
                    {
                        timestamp: '2018-04-03 20:46',
                        color: COLOR.RED,
                        title: "未通过",
                        subTitle: "理由：材料不充分"
                    },
                    {
                        timestamp: '2018-04-03 20:46',
                        color: COLOR.GRAY,
                        title: "未介入",//不知道这里叫什么好,
                        subTitle: "监管机构未介入"
                    },
                ]
            },
            fileList: [
                // {  数据类型示例
                //     url:"",
                //     name:"",
                //     type:""
                // }

            ]
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
            activities: {
                statusIndex: "1",//表示目前到了那个阶段，然后这个阶段之外的所有card我都会给他搞一个灰
                data: [
                    {
                        timestamp: '2018-04-12 20:46',
                        color: COLOR.GREEN,
                        title: "提交申请",
                        subTitle: "已通过"
                    },
                    {
                        timestamp: '2018-04-03 20:46',
                        color: COLOR.RED,
                        title: "未通过",
                        subTitle: "理由：材料不充分"
                    },
                    {
                        timestamp: '2018-04-03 20:46',
                        color: COLOR.GRAY,
                        title: "未介入",//不知道这里叫什么好,
                        subTitle: "监管机构未介入"
                    },
                ]
            }
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
            activities: {
                statusIndex: "1",//表示目前到了那个阶段，然后这个阶段之外的所有card我都会给他搞一个灰
                data: [
                    {
                        timestamp: '2018-04-12 20:46',
                        color: COLOR.GREEN,
                        title: "提交申请",
                        subTitle: "已通过"
                    },
                    {
                        timestamp: '2018-04-03 20:46',
                        color: COLOR.RED,
                        title: "未通过",
                        subTitle: "理由：材料不充分"
                    },
                    {
                        timestamp: '2018-04-03 20:46',
                        color: COLOR.GRAY,
                        title: "未介入",//不知道这里叫什么好,
                        subTitle: "监管机构未介入"
                    },
                ]
            }
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
    // console.log(scope)
    isShowDetail.value = !isShowDetail.value
    showDataIndex.value = scope.$index
    showWhatComponentOfDetail.value = componentsObj[tableData[scope.$index].detail.mode]
    // console.log(showWhatComponentOfDetail.value)
}

function showForm() {
    isShowDetail.value = !isShowDetail.value
}


// 下面的都和详细中的文件组件有关
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const pdfVisible = ref(false)
const pdfUrl = ref('')
const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true
}

const handleDownload = (file) => {
    console.log(file)
}
function showPDF(url) {
    pdfVisible.value = !pdfVisible.value
    pdfUrl.value = url
}
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
                background-color: white;padding: 10px 10px;border-radius: 8px;z-index: 99;">
                    <component :is="showWhatComponentOfDetail" :disabled="true" style="height: 600px;width: 1000px;"
                        :coefficient="tableData[showDataIndex].detail.chooseWhatProvince"
                        :data="tableData[showDataIndex].detail.data" :form="tableData[showDataIndex].detail.form">
                    </component>
                    <div style="display: flex;width: 100%;justify-content: space-between;padding: 10px;">
                        <el-timeline style="min-width: 500px;transform: translateX(80px);">
                            <el-timeline-item
                                v-for="(activity, index) in tableData[showDataIndex].detail.activities.data"
                                :key="index" :icon="activity.icon" :type="activity.type" :color="activity.color"
                                :size="activity.size" :hollow="activity.hollow" :timestamp="activity.timestamp"
                                placement="top">
                                <el-card
                                    :body-style="{ display: 'flex', flexDirection: 'column', opacity: tableData[showDataIndex].detail.activities.statusIndex == index ? 1 : 0.6, }">
                                    <span style="font-size: 1.3em;">{{ activity.title }}</span>
                                    <span style="font-size: 0.8em;" :style="{ color: activity.color }">{{
                activity.subTitle
            }}</span>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                        <div style="width: max-content;height: max-content;transform: translateX(-30px);">
                            <div>
                                <el-upload action="#" list-type="picture-card" :auto-upload="false"
                                    :file-list="tableData[showDataIndex].detail.fileList" disabled
                                    style="max-width: 320px;">
                                    <template #file="{ file }">
                                        <template v-if="file.isLoading">
                                            <el-icon class="is-loading" color="#409EFC" :size="30"
                                                style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;margin: auto;">
                                                <Loading />
                                            </el-icon>
                                        </template>
                                        <template v-else-if="file.type == 'image'">
                                            <div style="width: 100%;height: 100%;">
                                                <img class="el-upload-list__item-thumbnail" :src="file.url"
                                                    :alt="file.name" />
                                                <span class="el-upload-list__item-actions" v-if="file.url != NoFile">
                                                    <span class="el-upload-list__item-preview"
                                                        @click="handlePictureCardPreview(file)">
                                                        <el-icon><zoom-in /></el-icon>
                                                    </span>
                                                    <span v-if="!disabled" class="el-upload-list__item-delete"
                                                        @click="handleDownload(file)">
                                                        <el-icon>
                                                            <Download />
                                                        </el-icon>
                                                    </span>
                                                </span>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <span
                                                style="position: absolute;width: 100%;height: max-content;text-align: center;font-size: 1.3em;font-weight: bold;">{{
                file.name }}</span>
                                            <img class="el-upload-list__item-thumbnail" style="transform: scale(0.3);"
                                                :src="PDF" alt="" />
                                            <span class="el-upload-list__item-actions">
                                                <span class="el-upload-list__item-preview" @click="showPDF(file)">
                                                    <el-icon><zoom-in /></el-icon>
                                                </span>
                                                <span v-if="!disabled" class="el-upload-list__item-delete"
                                                    @click="handleDownload(file)">
                                                    <el-icon>
                                                        <Download />
                                                    </el-icon>
                                                </span>
                                            </span>
                                        </template>
                                    </template>

                                </el-upload>
                            </div>
                            <el-button type="primary" @click=""
                                v-if="tableData[showDataIndex].detail.activities.statusIndex == 0">撤回提交</el-button>
                            <el-button type="primary" @click="showForm">关闭</el-button>
                        </div>
                    </div>

                </div>
                <!-- 蒙层 -->
                <div style="position: absolute;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.45);"
                    @click="showForm">
                </div>
                <el-dialog v-model="dialogVisible" style="z-index:100 ;">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
                <el-dialog v-model="pdfVisible" v-if="pdfVisible" style="z-index:100 ;">
                    <preViewPDF :url="pdfUrl"></preViewPDF>
                </el-dialog>
            </div>
        </teleport>
    </div>
</template>

<style lang='css'>
.el-upload--picture-card {
    /* 隐藏 */
    display: none;
}
</style>