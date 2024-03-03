<template>
  <div id="a">
    <div id="login_box" ref="boxDom">
      <div id="box_left" class="box_content" ref="leftDom"></div>
      <div id="box_right" class="box_content" ref="RightDom">
        <div id="wrapper">
          <div class="title-wrapper">
            <div id="left"></div>
            <div style="font-size: 30px;text-wrap: nowrap;width: max-content;">
              <h1 style="text-align: left;margin: 0;margin-left: 10px;line-height: 60px;">欢迎登陆</h1>
            </div>
          </div>
          <div style="
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: 180px;
                margin-top: 20px;
              ">
            <div>
              <el-input v-model="username" placeholder="用户名" clearable style="width: 200px; transform: translateY(-4px)"
                round ref="usernameInput" @keydown.enter.native="passwordInput.focus()">
                <template #prefix>
                  <el-icon class="el-input__icon" color="#108b96">
                    <User />
                  </el-icon>
                </template>
              </el-input>
            </div>
            <div>
              <el-input v-model="password" placeholder="密码" clearable style="width: 200px; transform: translateY(5px)"
                round @keydown.enter.native="login" ref="passwordInput">
                <template #prefix>
                  <el-icon class="el-input__icon" color="#108b96">
                    <Lock />
                  </el-icon>
                </template>
              </el-input>
            </div>

            <div style="height: 32px;">
              <el-alert title="用户名或密码错误" type="error" :closable="true" center show-icon class="error-alert"
                v-if="showError" />
              <el-button type="primary" style="width: 200px; transform: translateY(-7px)" @click="login"
                v-else>登陆</el-button>

            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

const showError = ref(false);
const props = defineProps({
  url: {
    type: String,
    required: true,
    default: "http://localhost:3000/login",
    validate: (value) => {
      return /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(value);
    }
  },
  developerMode: {
    type: Object,
    default: {
      isDeveloper: false,
      identity:"firm"
    },
  }
})
const leftDom = ref(null)
const rightDom = ref(null)
const boxDom = ref(null)
import router from "@/router";
import { User } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { inject, nextTick, onMounted } from "vue";
import { useUserInfoStore } from "@/stores/user"
import { storeToRefs } from "pinia";

const username = ref("");
const password = ref("");
const usernameInput = ref(null)
const passwordInput = ref(null)
const { userInfo } = storeToRefs(useUserInfoStore())
onMounted(() => {
  let localStoreInfo = localStorage.getItem("userInfo")
  if (localStoreInfo) {
    userInfo.value = { ...JSON.parse(localStoreInfo) }
    return
  }
})
async function login() {

  if (props.developerMode.isDeveloper) {
    userInfo.value.isLogin = true
    userInfo.value.token = "token"
    userInfo.value.identity=props.developerMode.identity   //通过这个字段来判断是哪个身份 要么是 firm 企业  要么是 auditor 审核员
    localStorage.setItem("userInfo", JSON.stringify(userInfo.value))
    // console.log(userInfo.value)
    return
  }
  try {
    const data = await fetch(`${props.url}`, {
      method: "POST",
      body: { username: username.value, password: password.value },
    });
    const res = await data.json();
    if (res.data.code == 200) {
      userInfo.value.isLogin = true
      userInfo.value.token = res.data.token
      userInfo.value.identity=res.data.identity
      localStorage.setItem("userInfo", JSON.stringify(userInfo.value))
      return

    }
    ElMessage.error(res.data.msg);
    showError.value = true
    setTimeout(() => {
      showError.value = false
    }, 2000);
  } catch (error) {
    console.log(error)
    ElMessage({
      message: "网络错误，请检查后再尝试",
      type: "error"
    })
  }

}


onMounted(() => {
  nextTick(() => {
    usernameInput.value?.focus()
  })
})
</script>
<style scoped>
#login_box {
  height: 470px;
  width: 820px;
  background-color: rgba(255, 255, 255, 0.442);
  position: relative;
  border-radius: 30px;

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 10px 0 rgba(237, 238, 240, 0.5);
  display: flex;
}

#box_left {
  border-right: 0px;
  border-style: solid;
  border-color: white;
  opacity: 0.75;
  background-image: url("@/assets/背景图.jpg");
  border-radius: 30px 0px 0px 30px;
}

#box_right {
  border-left: 0px;
  border-style: solid;
  border-color: white;
  /* opacity: 0.75; */
  border-radius: 0px 30px 30px 0px;
}

.box_content {
  width: 410px;
  height: 470px;
  display: flex;
}

#wrapper {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 250px;
  width: 200px;

  .title-wrapper {
    display: flex;
    justify-content: flex-start;
    height: 60px;
    text-align: center;
    padding: 0;

    #left {
      border: 1px solid gray;
      box-shadow: 4px 4px 6px #868e96;
      width: 2px;
      height: 60px;
      position: relative;
      top: 0;
      bottom: 0;
      background-color: gray;
    }
  }
}

#a {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(219, 215, 215, 0.718);
  overflow: visible;
}

.el-alert {
  margin: 20px 0 0;
}

.el-alert:first-child {
  margin: 0;
}
</style>
  