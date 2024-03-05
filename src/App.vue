<script setup>
import { useUserInfoStore } from "@/stores/user"
import { storeToRefs } from "pinia";
import { RouterLink, RouterView } from 'vue-router'
import Login from './components/Login.vue'
import LeftMenuForFirm from './components/LeftMenuForFirm.vue'
import TopBar from './components/TopBar.vue'
import LeftMenuForAuditor from "./components/LeftMenuForAuditor.vue";

const { userInfo } = storeToRefs(useUserInfoStore())

const baseURL = inject("baseURL")
</script>

<template>
  <!-- 登陆页 -->
  <Login :url="baseURL + '/login'" v-if="!userInfo.isLogin"
    :developerMode="{ 'isDeveloper': true, 'identity': 'auditor' }">
  </Login>
  <!-- {'isDeveloper':true,'identity':'firm'} 传入这个后直接点击登录即可，identity如果是firm就进入企业页面 如果是 auditor就进入审核员页面 -->
  <transition mode="out-in" name="fade">
    <div v-if="userInfo.isLogin">
      <div class="common-layout  w-full h-full absolute">
        <el-container class=" w-full h-full">
          <el-header class=" border-y-2">
            <TopBar></TopBar>
          </el-header>
          <el-container class=" h-full">
            <el-aside width="max-content" class="h-full">
              <LeftMenuForFirm class="h-full" v-if="userInfo.identity === 'firm'"></LeftMenuForFirm>
              <LeftMenuForAuditor class="h-full" v-if="userInfo.identity === 'auditor'"></LeftMenuForAuditor>
            </el-aside>
            <el-main>
              <RouterView />
            </el-main>
          </el-container>
        </el-container>
      </div>
    </div>
  </transition>


</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
