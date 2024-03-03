<script>
import { ref } from 'vue'
import {
    Menu as IconMenu,
} from '@element-plus/icons-vue'
import debounce from '@/utils/debounce.js'
import Icon from '@/components/Icon.vue'
import AUDIT from '@/assets/审核.svg'

export default {
    components: { IconMenu,Icon },
    setup() {
        const isCollapse = ref(false)

        return {
            isCollapse,
            AUDIT,
            
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
    <el-menu default-active="audit" class="el-menu-vertical-demo" :collapse="isCollapse" router style="user-select: none;">
        <el-menu-item index="audit" >
            <el-icon>
                <Icon :src="AUDIT" ></Icon>
            </el-icon>
            <template #title>审核</template>
        </el-menu-item>
        <el-menu-item index="auditor-history">
            <el-icon>
                <document />
            </el-icon>
            <template #title>审核记录</template>
        </el-menu-item>
    </el-menu>
</template>



<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
