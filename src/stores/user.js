import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfo=ref({
    token:"",
    isLogin:false,
    identity:'',
    detail:{}
  })
  function updateUserInfo(data){
    userInfo.value=data
  }
  return { userInfo,updateUserInfo }
})
