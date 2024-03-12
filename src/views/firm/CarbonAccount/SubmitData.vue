<script setup>
import PowerGrid from '@/components/profile/PowerGrid.vue';
import { ElMessageBox, ElMessage } from 'element-plus'
import auditingPicture from '@/assets/审核中.svg'
import hasPassPicture from '@/assets/没有找到相关结果.svg'
import { useUserInfoStore } from "@/stores/user"
import { storeToRefs } from "pinia";
import { Delete, Download, Plus, ZoomIn, Close } from '@element-plus/icons-vue'
const { userInfo } = storeToRefs(useUserInfoStore())



const itemList = [
    {
        value: "电网",
        label: "电网"
    }
]
const chooseWhatItem = ref("")
const chooseWhatProvince = ref("")

const coefficient = [
    {
        label: "辽宁",
        value: "0.578"
    },
    {
        label: "吉林",
        value: "0.564"
    },
    {
        label: "黑龙江",
        value: "0.654"
    },
    {
        label: "北京",
        value: "0.595"
    },
    {
        label: "天津",
        value: "0.688"
    },
    {
        label: "河北",
        value: "0.736"
    },
    {
        label: "山西",
        value: "0.707"
    },
    {
        label: "内蒙古",
        value: "0.800"
    },
    {
        label: "山东",
        value: "0.546"
    },
    {
        label: "上海",
        value: "0.333"
    },
    {
        label: "江苏",
        value: "0.601"
    },
    {
        label: "浙江",
        value: "0.418"
    },
    {
        label: "安微",
        value: "0.755"
    },
    {
        label: "福建",
        value: "0.363"
    },
    {
        label: "江西",
        value: "0.474"
    },
    {
        label: "河南",
        value: "0.599"
    },
    {
        label: "湖北",
        value: "0.310"
    },
    {
        label: "湖南",
        value: "0.453"
    },
    {
        label: "重庆",
        value: "0.363"
    },
    {
        label: "四川",
        value: "0.104"
    },
    {
        label: "广东",
        value: "0.369"
    },
    {
        label: "广西",
        value: "0.336"
    },
    {
        label: "海南",
        value: "0.326"
    },
    {
        label: "贵州",
        value: "0.398"
    },
    {
        label: "云南",
        value: "0.100"
    },
    {
        label: "陕西",
        value: "0.607"
    },
    {
        label: "甘肃",
        value: "0.443"
    },
    {
        label: "清海",
        value: "0.067"
    },
    {
        label: "宁夏",
        value: "0.724"
    },
    {
        label: "新疆",
        value: "0.720"
    },
]
coefficient.sort((a, b) => {
    return a.label.localeCompare(b.label)
})

// 上传前检查
function beforeAvatarUpload(rawFile) {
    console.log(rawFile)
    console.log(rawFile.type)
    if (!['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].includes(rawFile.type)) {
        ElMessage.error('必须是pdf或jpeg/jpg/png格式的图片')
        return false
    } else if (/image/.test(rawFile.type) && rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('图片必须小于 2MB!')
        return false
    }
    return true
}

//是否显示抽屉
const isShowDrawer = ref(false)

// 上传的文件列表
const fileList = ref([

])

// 上传文件组件的dom
const uploadRef = ref(null)

// 是否已经上传材料
const hasUploadMaterial = ref(false)

// 点击图片预览效果  通过插槽已经实现
function handlePreview(e) {
    console.log(e)
}
// 点击删除图片（这个原生已经实现，这个函数是我们自己是否还需要做其他处理）
function handleRemove(e) {
    console.log(e)
}
// 增加材料
function addMaterial(e) {
    isShowDrawer.value = !isShowDrawer.value
}
function cancel() {
    isShowDrawer.value = !isShowDrawer.value
    fileList.value = []
    hasUploadMaterial.value = false
}
function saveFile() {
    isShowDrawer.value = !isShowDrawer.value
    hasUploadMaterial.value = true
}

// 点击提交后出现确认框
function submit() {
    ElMessageBox.confirm(
        '你确定要提交吗？',
        '消息确认',
        {
            confirmButtonText: '确认',
            cancelButtonText: '再想想',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '已提交',
            })

            // 提交资料的逻辑
            uploadRef.value?.submit()

        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消',
            })
        })
}


// 将blob读取为base64 不过已弃用
// async function getImageUrl(file) {
//     if (file && file.url) {
//         if (file.url.startsWith('blob:')) {
//             return await new Promise((resolve, reject) => {
//                 const xhr = new XMLHttpRequest();
//                 xhr.onload = function () {
//                     const reader = new FileReader();
//                     reader.onloadend = function () {
//                         resolve(reader.result);
//                     }
//                     reader.onerror = function () {
//                         reject(reader.error);
//                     }
//                     console.log(xhr.response)
//                     reader.readAsDataURL(xhr.response);
//                 }
//                 xhr.onerror = function () {
//                     reject(new Error('Failed to fetch blob content'));
//                 }
//                 xhr.open('GET', file.url);
//                 xhr.responseType = 'blob';
//                 xhr.send();
//             });
//         } else {
//             return file.url;
//         }
//     } else {
//         return "";
//     }
// }
function deleteFile(file) {
    fileList.value = fileList.value.filter(item => item.uid !== file.uid);
}
</script>
<template>
    <el-empty v-if="userInfo.auditing" :image="auditingPicture" description="您已经有报告在审核中，请等待审核结果" />
    <el-empty v-else-if="userInfo.hasPass" :image="hasPassPicture" description="您今年的报告已通过，不用再重复提交" />

    <div style="height: 100%;width: 100%;position: relative;" v-else>
        <div style="position: absolute;display: flex;flex-direction: column;gap: 8px;width: 98%;">
            <span style="font-size: 20px;">提交资料</span>
            <span style="font-size: 10px;">一年核算一次
                <el-link type="info" style="font-size: 8px;" href="/碳排放因子参考文献.pdf"
                    download="参考文献.pdf">区域电网年平均供电排放因子参考文献</el-link>
            </span>
            <el-select v-model="chooseWhatItem" placeholder="选择报告类型"
                style="width: 240px;position: absolute;left: 100px;" clearable>
                <el-option v-for="item in itemList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="chooseWhatProvince" placeholder="选择所在省份" filterable no-match-text="没有匹配的省份"
                style="width: 150px;position: absolute;left: 370px;" clearable>
                <el-option v-for="item in coefficient" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>

            <el-button style="position: absolute;right: 0;bottom: 0;" type="primary" @click="submit"
                :disabled="chooseWhatItem == '' || !hasUploadMaterial">提交</el-button>
            <el-button style="position: absolute;right: 70px;bottom: 0;" type="primary"
                @click="addMaterial">附加证明材料</el-button>
        </div>

        <!-- 下面展示每种类型的表格 -->
        <div style="position: absolute;top: 70px;width: 98%;height: 90%;" class=" border-solid border-slate-300 border">
            <PowerGrid :coefficient="chooseWhatProvince == '' ? 1 : chooseWhatProvince" :disable="false"
                v-if="chooseWhatItem === '电网'">
            </PowerGrid>
        </div>

        <!-- 上传图片/pdf的抽屉 -->
        <el-drawer v-model="isShowDrawer" direction="btt" size="70%">
            <template #header>
                <h4>添加证明材料</h4>
            </template>
            <template #default>
                <div style="width: 100%;height: 100%;">
                    <el-upload v-model:file-list="fileList" class="upload-demo" drag :auto-upload="false"
                        ref="uploadRef" :before-upload="(e) => beforeAvatarUpload(e)" :on-preview="handlePreview"
                        :on-remove="handleRemove" list-type="picture">
                        <template #file="{ file }">
                            <template v-if="file.raw.type.indexOf('image') != -1">
                                <el-image style="width: 100px; height: 100px;" :zoom-rate="1.2" :max-scale="7"
                                    :src="file.url" :min-scale="0.2" :initial-index="4" fit="cover"
                                    :preview-src-list="fileList.map(i => i.url)" />
                                <span style="margin-left: 25px;">{{ file.name }}</span>
                                <el-icon
                                    style="position: absolute;right: 2px;top: 2px;width: 20px;height: 20px;opacity: 0.8;cursor: pointer;"
                                    id="deleteIcon" @click="deleteFile(file)">
                                    <Close />
                                </el-icon>
                            </template>

                        </template>
                        <el-button type="primary">点击或拖入上传</el-button>
                        <template #tip>
                            <div class="el-upload__tip">
                                pdf 或 小于 2MB 的jpg/png/jpeg格式的图片
                            </div>
                        </template>
                    </el-upload>
                </div>
            </template>
            <template #footer>
                <div style="flex: auto">
                    <el-button @click="cancel">取消</el-button>
                    <el-button type="primary" @click="saveFile">确认</el-button>
                </div>
            </template>
        </el-drawer>
    </div>


</template>
<style scoped>
.demo-image__error .image-slot {
    font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
    font-size: 30px;
}

.demo-image__error .el-image {
    width: 100%;
    height: 200px;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.el-link {
    margin-right: 8px;
}

.el-link .el-icon--right.el-icon {
    vertical-align: text-bottom;
}

#deleteIcon {
    visibility: hidden;
}
</style>
<style>
.el-upload-list__item:hover {
    #deleteIcon {
        visibility: visible;
    }
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

.el-upload-list--picture .el-upload-list__item {
    z-index: unset;
}
</style>