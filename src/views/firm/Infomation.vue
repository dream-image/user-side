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


import { useUserInfoStore } from "@/stores/user"
import { storeToRefs } from "pinia";
const userInfo=storeToRefs(useUserInfoStore())
const form = toRef(userInfo.value, 'detail')

// id: "",
//     name: "",
//     profession: "",
//     legalRepresentative: "",
//     contactInfo: "",
//     corporateNature: "",
//     reportingResponsiblePerson: "",
//     code: "",
const isShowForm = ref(false)
function showForm() {
    isShowForm.value = !isShowForm.value
}

// 修改企业信息
function onSubmit() {

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
                    <InfoBox title="企业名称" :content="form.name"></InfoBox>
                    <InfoBox title="所属行业" :content="form.profession"></InfoBox>
                    <InfoBox title="法定代表人" :content="form.legalRepresentative"></InfoBox>
                    <InfoBox title="联系人信息" :content="form.contactInfo"></InfoBox>
                </div>
                <div style="display: flex;justify-content: space-evenly;">
                    <InfoBox title="单位性质" :content="form.corporateNature"></InfoBox>
                    <InfoBox title="组织机构代码" :content="form.code"></InfoBox>
                    <InfoBox title="填报负责人" :content="form.reportingResponsiblePerson"></InfoBox>
                    <InfoBox title="企业ID" :content="form.id"
                        :contentStyle='{ fontSize: "15px" }'></InfoBox>
                </div>
            </div>
        </div>
        <div style="display: flex;position: absolute;width: 98%;left: 0;right: 0;margin: auto;height: 100px;justify-content: space-evenly;"
            :style='{ top: `${infoDom?.getBoundingClientRect().height + 160 + 10}px` }'
            class=" border-solid border-slate-300 border">
            <span style="position: absolute;left: 10px;top: 5px;font-size: 18px;">钱包</span>
            <div style="width: 200px;height: 100%;align-items: center;display: flex;">
                <ItemBox :src="COIN" alt="币" style="height: 45px;width: 45px;margin-right: 5px;"></ItemBox>
                <span>123,412.00 CBC</span>
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
                                <el-option label="发电" value="0" />
                                <el-option label="电网" value="1" />
                                <el-option label="钢铁生产" value="2" />
                                <el-option label="化工生产" value="3" />
                                <el-option label="电解铝" value="4" />
                                <el-option label="镁冶炼" value="5" />
                                <el-option label="平板玻璃生产" value="6" />
                                <el-option label="水泥生产" value="7" />
                                <el-option label="陶瓷生产" value="8" />
                                <el-option label="民航" value="9" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="法定代表人">
                            <el-input v-model="form.legalRepresentative" />
                        </el-form-item>
                        <el-form-item label="联系人信息">
                            <el-input v-model="form.contactInfo" />
                        </el-form-item>
                        <el-form-item label="单位性质">
                            <el-input v-model="form.corporateNature" disabled/>
                            <!-- 管理员新建账户后不可修改，除非管理员修改 -->
                        </el-form-item>
                        <el-form-item label="填报负责人">
                            <el-input v-model="form.reportingResponsiblePerson" />
                        </el-form-item>
                        <el-form-item label="组织机构代码">
                            <el-input v-model="form.code" disabled/>
                            <!-- 管理员新建账户后不可修改，除非管理员修改 -->
                        </el-form-item>
                        <el-form-item label="企业ID">
                            <el-input v-model="form.id" disabled/>
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
                    @click="showForm"></div>
            </div>
        </teleport>
    </div>
</template>

<style lang=''>

</style>