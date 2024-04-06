<script setup>
import { useUserInfoStore } from "@/stores/user"
import { storeToRefs } from "pinia";
import Badge from "./Badge.vue";
import { useRouter, useRoute } from 'vue-router'
const { userInfo } = storeToRefs(useUserInfoStore())
const { updateUserInfo } = useUserInfoStore()
const router = useRouter()
function logout() {
    updateUserInfo({
        token: "",
        isLogin: false,
        identity: '',
        detail: {}
    })
    localStorage.removeItem("userInfo")
    router.replace({path:'/'})

}
</script>

<template>
    <div style="padding: 5px 10px;display: flex;position:relative;height: 100%;width: 100%;" id="wrapper">
        <div style="width: 200px;flex-grow:1;display: flex;align-items: center;">
            <img src="@/assets/logo.png" style="height: 100%;" alt="碳币">
            <span style="font-size: 20px;margin-left:10%;font-family:Apple LiGothic Medium;font-weight:900;">碳核算和碳交易系统</span>
        </div>
        <div
            style="width: 100px;flex-grow:1;display: flex;flex-direction: column;justify-content: right;position:relative;">
            <div
                style="flex-grow:1;width: 100px;display: flex;align-items: center;height: 100%;position: absolute;right: 0;">
                <div style="position: relative;margin-right: 5px;">
                    <img src="@/assets/提醒.svg" style="height: 20px;" alt="提醒">
                    <Badge style="position: absolute;width: 10px;height: 10px;top: 0;right:-2px;"></Badge>
                </div>
                <div style="position: relative;" id="right-top">
                    <img src="@/assets/企业.svg" style="height:100%;border-radius:50%;border:1px solid black;" alt="企业"
                        v-if="userInfo.identity === 'firm'">
                    <img src="@/assets/审核员.svg" style="height:100%;border-radius:50%;border:1px solid black;" alt="审核员"
                        v-if="userInfo.identity === 'auditor'">
                    <div style="position: absolute;width: 200%;height: 100%;transform: translateX(-25%);" id="logout">
                        <el-button type="primary" size="small" style="width:100%;height: 80%;"
                            @click="logout">退出登陆</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='css' scoped>
#wrapper div {
    /* border: 1px solid black; */
}

#logout {
    display: none;
}

#right-top:hover {
    #logout {
        display: block;
        animation: fadeIn 0.5s;
    }

}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}
</style>