<script setup>
import { useRouter, useRoute } from 'vue-router'
import InfoBox from '@/components/InfoBox.vue';
import COIN from '@/assets/币.svg';
import ItemBox from '@/components/ItemBox.vue';
import RMB from '@/assets/人民币.svg';
const infoDom = ref(null)
const router = useRouter()
const routerGo = (target) => {
    router.replace({ path: target })
}

const baseURL = inject("baseURL")

import { useUserInfoStore } from "@/stores/user"
import { storeToRefs } from "pinia";
import { ElMessage } from 'element-plus';
import { onMounted, watchEffect } from 'vue';
const { userInfo } = storeToRefs(useUserInfoStore())
const { updateUserInfo } = useUserInfoStore()
const info = computed(() => userInfo.value.detail)
const form = ref({
    ...JSON.parse(JSON.stringify(toRaw(userInfo.value.detail)))
})

watchEffect(() => {
    form.value = JSON.parse(JSON.stringify(toRaw(userInfo.value.detail)))
});

const isShowForm = ref(false)
function showForm() {
    isShowForm.value = !isShowForm.value
}

// 获取企业信息
async function getinfo() {
    try {
        let res = await fetch(`${baseURL}/firm/information?username=xy2&password=654321`, {          //暂时写死 待改传值
            headers: {
                'Content-Type': 'application/json',
            }
        })
        let data = await res.json()
        if(data.code>=400){
            ElMessage.error(data.message)
            return
        }
        let { name, profession, legal_representative, contact_info, corporate_nature, code, reporting_responsible_person, id } = data.data
        updateUserInfo({
            detail: {
                name, profession,
                legalRepresentative: legal_representative,
                contactInfo: contact_info,
                corporateNature: corporate_nature,
                reportingResponsiblePerson: reporting_responsible_person,
                code,
                id,
            }

        })
    } catch (error) {
        console.log(error.message)
    }
}

onMounted(() => {
    getinfo()
})


// 修改企业信息
async function onSubmit() {
    console.log({ ...form.value })
    try {
        let res = await fetch(`${baseURL}/firm/updateInformation`, {
            method: "POST",
            body: JSON.stringify({ form: { ...form.value } }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        let data = await res.json()
        if (data.code !== 200) {
            ElMessage.error(data.message)
            return
        }
        console.log('success')
        ElMessage.success("修改成功")
    } catch (error) {
        ElMessage.error("请求失败,请检查网络")
    }
    // 发送请求
    // 修改成功
    //同步更新给userInfo
    // userInfo.value.detail = form.value

    // 关闭表单
    isShowForm.value = false
}
</script>

<template>
    <div style="height: 100%;width: 100%;position: relative;">
        <!-- <span style="position: absolute;font-size: 20px;">企业信息</span> -->

        <!-- 头像 -->
        <div style="position: absolute;left: 0;right: 0;top: 50px; margin: auto;width: 100px;height: 100px;">
            <el-avatar :size="100" src="https://picsum.photos/200/200"></el-avatar>
        </div>
        <div style="position: absolute;top: 160px;height: 300px;width: 98%;left: 0;right: 0;margin: auto;padding: 8px 5px;"
            class=" border-solid border-slate-300 border" ref="infoDom">
            <span style="position: absolute;font-size: 18px;">企业信息</span>
            <el-button type="" size="default" style="float: right;" @click="showForm" circle>
                <el-icon>
                    <Edit />
                </el-icon>
            </el-button>
            <div
                style="display: flex;position: absolute;top: 2cqb;left: 0;right: 0;margin: auto; height: 70%;width: 90%;flex-direction: column;justify-content: space-evenly;min-height: 300px;">
                <div style="display: flex;justify-content: space-evenly;">
                    <InfoBox title="企业名称" :content="info.name" :contentStyle='{ fontSize: "20px", textAlign: "center" }'>
                    </InfoBox>
                    <InfoBox title="所属行业" :content="info.profession"
                        :contentStyle='{ fontSize: "20px", textAlign: "center" }'></InfoBox>
                    <InfoBox title="法定代表人" :content="info.legalRepresentative"
                        :contentStyle='{ fontSize: "20px", textAlign: "center" }'></InfoBox>
                    <InfoBox title="联系人信息" :content="info.contactInfo"
                        :contentStyle='{ fontSize: "20px", textAlign: "center" }'></InfoBox>
                </div>
                <div style="display: flex;justify-content: space-evenly;">
                    <InfoBox title="单位性质" :content="info.corporateNature"
                        :contentStyle='{ fontSize: "20px", textAlign: "center" }'></InfoBox>
                    <InfoBox title="组织机构代码" :content="info.code" :contentStyle='{ fontSize: "20px", textAlign: "center" }'>
                    </InfoBox>
                    <InfoBox title="填报负责人" :content="info.reportingResponsiblePerson"
                        :contentStyle='{ fontSize: "20px", textAlign: "center" }'></InfoBox>
                    <InfoBox title="企业ID" :content="info.id" :contentStyle='{ fontSize: "20px", textAlign: "center" }'>
                    </InfoBox>
                </div>
            </div>
        </div>
        <div style="display: flex;position: absolute;width: 98%;left: 0;right: 0;margin: auto;height: 100px;justify-content: space-evenly;"
            :style='{ top: `${infoDom?.getBoundingClientRect().height + 160 + 10}px` }'
            class=" border-solid border-slate-300 border">
            <span style="position: absolute;left: 10px;top: 5px;font-size: 18px;">钱包</span>
            <div style="width: 200px;height: 100%;align-items: center;display: flex;">
                <ItemBox :src="COIN" alt="币" style="height: 45px;width: 45px;margin-right: 5px;"></ItemBox>
                <span>100 CBC</span>
                <!-- 这里需要填写已有碳币数量 -->
            </div>
            <div style="width: 200px;height: 100%;align-items: center;display: flex;">
                <ItemBox :src="RMB" alt="人民币" style="height: 45px;width: 45px;margin-right: 5px;"></ItemBox>
                <span>￥ 123,412.00 </span>
                <!-- 这里需要填已有现金 -->
            </div>
            <el-button type="primary" style="top: 0;bottom: 0;margin-top: auto;margin-bottom: auto;" size="large"
                @click="routerGo('/bourse')">交易所</el-button>
        </div>

        <teleport to='body' v-if="isShowForm">
            <div style="position: absolute;width: 100%;height: 100%;">
                <div style="position: absolute;left: 0;right: 0;top: 0;bottom:0;margin: auto;z-index: 999;width: max-content;height:max-content;
                background-color: white;padding: 10px 10px;border-radius: 8px;">
                    <el-form :model="form" label-width="auto" style="max-width: 600px">
                        <el-form-item label="企业名称">
                            <el-input v-model="form.name" disabled />
                            <!-- 管理员新建账户后不可修改，除非管理员修改 -->
                        </el-form-item>
                        <el-form-item label="所属行业">
                            <el-select v-model="form.profession" placeholder="所属行业">
                                <el-option label="发电" value="发电" />
                                <el-option label="电网" value="电网" />
                                <el-option label="钢铁生产" value="钢铁生产" />
                                <el-option label="化工生产" value="化工生产" />
                                <el-option label="电解铝" value="电解铝" />
                                <el-option label="镁冶炼" value="镁冶炼" />
                                <el-option label="平板玻璃生产" value="平板玻璃生产" />
                                <el-option label="水泥生产" value="水泥生产" />
                                <el-option label="陶瓷生产" value="陶瓷生产" />
                                <el-option label="民航" value="民航" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="法定代表人">
                            <el-input v-model="form.legalRepresentative" />
                        </el-form-item>
                        <el-form-item label="联系人信息">
                            <el-input v-model="form.contactInfo" />
                        </el-form-item>
                        <el-form-item label="单位性质">
                            <el-input v-model="form.corporateNature" disabled />
                            <!-- 管理员新建账户后不可修改，除非管理员修改 -->
                        </el-form-item>
                        <el-form-item label="填报负责人">
                            <el-input v-model="form.reportingResponsiblePerson" />
                        </el-form-item>
                        <el-form-item label="组织机构代码">
                            <el-input v-model="form.code" disabled />
                            <!-- 管理员新建账户后不可修改，除非管理员修改 -->
                        </el-form-item>
                        <el-form-item label="企业ID">
                            <el-input v-model="form.id" disabled />
                            <!-- 管理员新建账户后不可修改，除非管理员修改 -->
                        </el-form-item>
                        <el-form-item>
                            <div style="display: flex;width: 100%;justify-content: space-evenly;">
                                <el-button type="primary" @click="onSubmit">确定</el-button>
                                <el-button @click="showForm">取消</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>

                <!-- 蒙层 -->
                <div style="position: absolute;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.45);"
                    @click="showForm">
                </div>
            </div>
        </teleport>
    </div>
</template>

<style lang=''>

</style>