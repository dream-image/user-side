<script setup>
import { useUserInfoStore } from "@/stores/user"
import { storeToRefs } from "pinia";
import { RouterLink, RouterView } from 'vue-router'
import Login from './components/Login.vue'
import LeftMenu from './components/LeftMenu.vue'
import { Fragment } from "vue";
const { userInfo } = storeToRefs(useUserInfoStore())
const baseURL = inject("baseURL")
</script>

<template>
  <!-- 登陆页 -->
  <Login :url="baseURL + '/login'" v-if="!userInfo.isLogin" :isDeveloperMode="true"></Login>
  <div v-else>
    <div class="common-layout  w-full h-full absolute">
      <el-container class=" w-full h-full">
        <el-header class=" border-y-2">
          头部
        </el-header>
        <el-container class=" h-full">
          <el-aside width="max-content" class="h-full">
            <LeftMenu class="h-full"></LeftMenu>
          </el-aside>
          <el-main>
            <RouterView />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<style scoped></style>
