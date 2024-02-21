import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfo=ref({
    token:"",
    isLogin:false
  })
  
  return { userInfo }
})
