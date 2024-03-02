<script>
import { ref } from 'vue'
import {
    Menu as IconMenu,
} from '@element-plus/icons-vue'
import debounce from '@/utils/debounce.js'
import { useRouter, useRoute } from 'vue-router'
export default {
    components: { IconMenu },
    setup() {
        const router = useRouter()
        const route = useRoute()
        const isCollapse = ref(false)
        const routerGo=(target)=>{
            router.replace({ path: target })
        }
        return {
            isCollapse,
            routerGo,
            router
        }
    },
    mounted() {
        const ob = new ResizeObserver(debounce(() => {
            if (document.body.getBoundingClientRect().width < 902) {
                this.isCollapse = true
            } else {
                this.isCollapse = false
            }
        }, 200))
        ob.observe(document.body)
    },
    unmounted() {
        ob.disconnect()
    }
}




</script>

<template>
    <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" >
        <el-menu-item index="1" @click="routerGo('bourse')">
            <el-icon>
                <location />
            </el-icon>
            <template #title>
                交易所
            </template>
        </el-menu-item>
        <el-sub-menu index="2">

            <template #title>
                <el-icon><icon-menu /></el-icon>
                <span>碳核算</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="2-1"  @click="routerGo('submit-data')" >提交资料</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="2-2"  @click="routerGo('history')">历史记录</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="3"  @click="routerGo('infomation')"> 
            <el-icon>
                <document />
            </el-icon>

            <template #title>企业信息</template>
        </el-menu-item>
    </el-menu>
</template>



<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
