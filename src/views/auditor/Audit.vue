
<script setup>

import { ref, onMounted, inject } from 'vue'
import PowerGrid from '@/components/profile/PowerGrid.vue';
import Mg from '@/components/profile/Mg.vue';
import Ceramic from '@/components/profile/Ceramic.vue'
import { shallowRef } from 'vue';
import preViewPDF from '@/components/preViewPDF.vue';
import path from 'path-browserify'
import PDF from "@/assets/PDF.svg"
// import NoFile from '@/assets/网络不稳定.svg'
import NoFile from '@/assets/网络不稳定2.png'
import { ElMessage } from 'element-plus';
const baseURL = inject("baseURL")
// const tableData = [
//     {
//         id: "f1ad2fb4-0325-4287-89f5-ff8bd6f5a704",
//         name: "无所谓之有限公司",
//         submitDate: "2012/01/14",
//         status: "待审核",
//         carbonCredits: "200",
//         expendCarbon: "18",
//         reallyGetCarbon: "182",
//     },
//     {
//         id: "345c9c13-00c8-4a3d-a7a8-af36b88c09f8",
//         name: "xxxxaaaaasdasdasasda有限公司",
//         submitDate: "2011/01/14",
//         status: "待审核",
//         carbonCredits: "200",
//         expendCarbon: "18",
//         reallyGetCarbon: "182",
//     },
//     {
//         id: "d1880346-3cb7-4bed-82b5-f55692fd4ad6",
//         name: "阿啦啦啦之有限公司",
//         submitDate: "2012/01/14",
//         status: "待审核",
//         carbonCredits: "200",
//         expendCarbon: "18",
//         reallyGetCarbon: "182",
//     },
//     {
//         id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
//         name: "滴滴滴滴之有限公司",
//         submitDate: "2012/01/14",
//         status: "待审核",
//         carbonCredits: "200",
//         expendCarbon: "18",
//         reallyGetCarbon: "182",
//     },
//     {
//         id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
//         name: "滴滴滴滴之有限公司",
//         submitDate: "2012/01/14",
//         status: "待审核",
//         carbonCredits: "200",
//         expendCarbon: "18",
//         reallyGetCarbon: "182",
//     },
//     {
//         id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
//         name: "滴滴滴滴之有限公司",
//         submitDate: "2012/01/14",
//         status: "待审核",
//         carbonCredits: "200",
//         expendCarbon: "18",
//         reallyGetCarbon: "182",
//     },
//     {
//         id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
//         name: "滴滴滴滴之有限公司",
//         submitDate: "2012/01/14",
//         status: "待审核",
//         carbonCredits: "200",
//         expendCarbon: "18",
//         reallyGetCarbon: "182",
//     },
//     {
//         id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
//         name: "滴滴滴滴之有限公司",
//         submitDate: "2012/01/14",
//         status: "待审核",
//         carbonCredits: "200",
//         expendCarbon: "18",
//         reallyGetCarbon: "182",
//     },
//     {
//         id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
//         name: "滴滴滴滴之有限公司",
//         submitDate: "2012/01/14",
//         status: "待审核",
//         carbonCredits: "200",
//         expendCarbon: "18",
//         reallyGetCarbon: "182",
//     },
//     {
//         id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
//         name: "滴滴滴滴之有限公司",
//         submitDate: "2012/01/14",
//         status: "待审核",
//         carbonCredits: "200",
//         expendCarbon: "18",
//         reallyGetCarbon: "182",
//     },
//     {
//         id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
//         name: "滴滴滴滴之有限公司",
//         submitDate: "2012/01/14",
//         status: "待审核",
//         carbonCredits: "200",
//         expendCarbon: "18",
//         reallyGetCarbon: "182",
//     },
//     {
//         id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
//         name: "滴滴滴滴之有限公司",
//         submitDate: "2012/01/14",
//         status: "待审核",
//         carbonCredits: "200",
//         expendCarbon: "18",
//         reallyGetCarbon: "182",
//     },
//     {
//         id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
//         name: "滴滴滴滴之有限公司",
//         submitDate: "2012/01/14",
//         status: "待审核",
//         carbonCredits: "200",
//         expendCarbon: "18",
//         reallyGetCarbon: "182",
//     },
//     {
//         id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
//         name: "滴滴滴滴之有限公司",
//         submitDate: "2012/01/14",
//         status: "待审核",
//         carbonCredits: "200",
//         expendCarbon: "18",
//         reallyGetCarbon: "182",
//     },
//     {
//         id: "97c35d19-9893-4292-8dbc-ac27fcc1fb41",
//         name: "滴滴滴滴之有限公司",
//         submitDate: "2012/01/14",
//         status: "待审核",
//         carbonCredits: "200",
//         expendCarbon: "18",
//         reallyGetCarbon: "182",
//     },
// ]

// 每个导入的资料类型的组件都必须放到这个对象里面，解决被解析后组件变为小写标签
const componentsObj = {
    'PowerGrid': PowerGrid,
    'Mg': Mg,
    'Ceramic': Ceramic
}
const showWhatComponentOfDetail = shallowRef('')
const isShowDetail = ref(false)
const tableWrapperDom = ref(null)
const tableData = reactive([])
const rejectDialogVisible = ref(false)
const rejectReason = ref('')
const COLOR = {
    GREEN: "#0bbd87",
    RED: "rgb(245,108,108)",
    YELLOW: "rgb(230,162,60)",
    GRAY: "rgb(144,147,153)"
}

//请求中断控制器
const controller = ref()

async function getFile(url, name, type, index = 0, controller) {
    // console.log(url, name, type, index);
    try {

        tableData[index].detail.fileList.push({
            isLoading: true
        })
        let a = name.split('.')
        let contentType = type == 'image' ? ('image/' + a[a.length - 1]) : 'application/pdf'
        // console.log(contentType)

        let res = await fetch(`${baseURL}/file` + url, {
            method: 'GET',
            headers: {
                'Content-Type': contentType,
                'Access-Control-Expose-Headers': '*'
            },
            signal: controller.value.signal
        })
        // console.log(res);
        // console.log(res.headers)
        let blob = await res.blob()
        // console.log(blob);
        // if (type == 'image') {
        let reader = new FileReader()
        await new Promise((resolve, reject) => {
            reader.onload = () => {
                tableData[index].detail.fileList.pop()
                tableData[index].detail.fileList.push({
                    url: reader.result,
                    name: name,
                    type: type,
                    isLoading: false
                })
                resolve()
            }
            reader.readAsDataURL(blob)
        })

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
        console.log(error)
        tableData[index].detail.fileList.pop()
        tableData[index].detail.fileList.push({
            url: NoFile,
            name: name,
            type: 'image',
            isLoading: false
        })
        if (error.name === "AbortError") {
            // We know it's been canceled!
            tableData[index].detail.fileList = []
            console.log('已取消')
            return
        }
        ElMessage.error(name + '加载失败')
        console.log(error.message)
    }
}


const getInitData = async () => {
    let res = await fetch(`${baseURL}/auditor/audit`)
    let data = await res.json()
    if (data.code != 200) {
        return
    }
    tableData.push(...data.data)
}
onMounted(() => {
    getInitData()
})

//点击查看详细的是下标为哪个的数据
const showDataIndex = ref(0)
//点击查看详细处理
async function showDetail(scope) {
    // console.log(scope)
    wait.value = {
        ...Promise.withResolvers()
    }
    isShowDetail.value = !isShowDetail.value
    showDataIndex.value = scope.$index
    showWhatComponentOfDetail.value = componentsObj[tableData[scope.$index].detail.mode]
    // console.log(showWhatComponentOfDetail.value)
    controller.value = new AbortController()
    tableData[scope.$index].detail.fileList = []
    for await (let item of tableData[scope.$index].files) {
        // console.log(item);
        await getFile('/files?fileName=' + item.filename, item.filename, path.extname(item.filename) == '.pdf' ? 'pdf' : 'image', scope.$index, controller)
        // console.log('结束');
    }


}

function showForm() {

    isShowDetail.value = !isShowDetail.value
    controller.value.abort()
    tableData[showDataIndex.value].detail.fileList = []

}
const wait = ref({
    ...Promise.withResolvers()
})
const submitNoPass = async (firmId) => {
    wait.value.resolve()
}
const audit = async (firmId, isPass) => {

    try {
        if (!isPass) {
            rejectDialogVisible.value = true
        }
        await wait.value.promise
        let res = await fetch(`${baseURL}/auditor/audit`, {
            method: 'POST',
            body: JSON.stringify({
                firmId: firmId,
                isPass: isPass,
                rejectReason: rejectReason.value,
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        let data = await res.json()
        if (data.code != 200) {
            throw new Error(data.message)
        }
        window.location.reload()
    } catch (error) {
        console.log(error);
        // ElMessage.error(error.message)
    }


}


const tableRowClassNameByState = ({
    row,
    rowIndex
}) => {
    if (row.status === "通过") {
        return 'green'
    } else if (row.status === '未通过') {
        return 'red'
    } else if (row.status === '待审核') {
        return 'yellow'
    } else if (row.status === '已取消') {
        return 'gray'
    } else if (row.status === '被驳回') {
        return 'deepRed'
    }
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

const allData = ref({})

function getFormData(form, tableData) {
    allData.value.form = form
    allData.value.tableData = tableData
}
</script>

<template>
    <div style="width: 100%;height: 100%;position: relative;">
        <span style="position: absolute;font-size: 20px;">审核</span>
        <div style="position: absolute;top: 70px;width: 98%;height: 90%;" class=" border-solid border-slate-300 border"
            ref="tableWrapperDom">
            <el-table :data="tableData" stripe style="width: 100%;height: 100%;" lazy empty-text="没有记录"
                highlight-current-row :row-class-name="tableRowClassNameByState" max-height="100%">
                <el-table-column prop="firmId" label="企业id" width="180" style="text-wrap: nowrap;" show-overflow-tooltip />
                <el-table-column prop="name" label="企业名称" width="250" show-overflow-tooltip />
                <el-table-column prop="submitDate" label="提交日期" width="110" />
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
                        :data="tableData[showDataIndex].detail.data" :form="tableData[showDataIndex].detail.form"
                        :getFormData="getFormData">
                    </component>
                    <div style="display: flex;width: 100%;justify-content: space-between;padding: 10px;">
                        <el-timeline style="min-width: 500px;transform: translateX(80px);">
                            <el-timeline-item v-for="(activity, index) in tableData[showDataIndex].detail.activities.data"
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
                                                    file.name.split('.')[file.name.split('.').length - 2] }}</span>
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
                            <el-button type="primary" @click="() => {
                                wait.resolve()
                                audit(tableData[showDataIndex].firmId, true)
                            }" v-if="tableData[showDataIndex].detail.activities.statusIndex == 0">通过</el-button>
                            <el-button type="primary" @click="() => {
                                audit(tableData[showDataIndex].firmId, false)
                            }" v-if="tableData[showDataIndex].detail.activities.statusIndex == 0">未通过</el-button>
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
        <el-dialog v-model="rejectDialogVisible" title="您确定要拒绝该报告吗？" width="500">
            <el-input v-model="rejectReason" type="textarea" :rows="3" placeholder="请输入理由" maxlength="20" />
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="() => {
                        rejectDialogVisible = false
                        rejectReason = ''
                        wait.reject()
                    }">取消</el-button>
                    <el-button type="primary" @click="submitNoPass">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style lang='css'></style>