import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfo = ref({
    token: "",
    isLogin: false,
    identity: '',
    auditing: false,//是否已经有提交的报告在审核中  如果这个是true那么hasPass字段必为false
    hasPass: false,//是否已经审核通过  如果这个是true，那么auditing必为false
    detail: {},
    authority:{
      submit:true,//提交报告权限
      buy:true,//购买权限
      sell:true,//出售权限
      audit:true,//审核权限
    }
  })
  function updateUserInfo(data) {
    userInfo.value = {
      ...userInfo.value,
      ...data
    }
  }
  return { userInfo, updateUserInfo }
})
