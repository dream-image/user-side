<script>
import { ref, watch } from 'vue'
import {
    Menu as IconMenu,
} from '@element-plus/icons-vue'
import debounce from '@/utils/debounce.js'
import { useRouter, useRoute } from 'vue-router'
import { useUserInfoStore } from "@/stores/user"
import { storeToRefs } from "pinia";

let ob
export default {
    components: { IconMenu },
    setup() {
        const router = useRouter()
        const route = useRoute()
        const isCollapse = ref(false)
        const baseURL = inject("baseURL")
        const { userInfo } = storeToRefs(useUserInfoStore())
        const { updateUserInfo } = useUserInfoStore()
        // 获取企业信息
        async function getinfo() {
            try {
                let res = await fetch(`${baseURL}/firm/information?username=xy2&password=654321`, {          //暂时写死 待改传值
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                let { name, profession, legal_representative, contact_info, corporate_nature, code, reporting_responsible_person, id, auditing, hasPass } = await res.json()

                updateUserInfo({
                    detail: {
                        name, profession,
                        legalRepresentative: legal_representative,
                        contactInfo: contact_info,
                        corporateNature: corporate_nature,
                        reportingResponsiblePerson: reporting_responsible_person,
                        code,
                        id,

                    },
                    auditing,
                    hasPass

                })
            } catch (error) {
                console.log(error.message)
            }
        }

        const routerGo = (target) => {
            router.replace({ path: target })
        }
        const active = ref()
        watch(route, (value) => {
            active.value = value.path
        })
        return {
            isCollapse,
            routerGo,
            router,
            active,
            getinfo
        }
    },
    mounted() {
        this.getinfo()
        ob = new ResizeObserver(debounce(() => {
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
    },
}




</script>

<template>
    <el-menu :default-active="active" class="el-menu-vertical-demo" :collapse="isCollapse" router
        style="user-select: none;">
        <el-menu-item index="/bourse" class="animate">
            <el-icon>
                <coin />
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
                <el-menu-item index="submit-data" class="animate">提交资料</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="firm-history" class="animate">历史记录</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item index="information" class="animate">
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

.animate {

    animation: forwards 0.3s linear opacity;
}


@keyframes opacity {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }

}

;
</style>
