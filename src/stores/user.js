import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfo=ref({
    token:"",
    isLogin:false,
    identity:''
  })
  
  return { userInfo }
})
