<script setup>
import InfoBox from '@/components/InfoBox.vue';
import COIN from '@/assets/币.svg';
import ItemBox from '@/components/ItemBox.vue';
import RMB from '@/assets/人民币.svg';
const infoDom = ref(null)
const router = useRouter()
const routerGo = (target) => {
    router.replace({ path: target })
}
</script>

<template>
    <div style="height: 100%;width: 100%;position: relative;">
        <!-- <span style="position: absolute;font-size: 20px;">企业信息</span> -->

        <!-- 头像 -->
        <div style="position: absolute;left: 0;right: 0;top: 50px; margin: auto;width: 100px;height: 100px;">
            <el-avatar :size="100" src="https://picsum.photos/200/200"></el-avatar>
        </div>
        <div style="position: absolute;top: 160px;height: 300px;width: 98%;left: 0;right: 0;margin: auto;padding: 8px 5px;"
            class=" border-solid border-slate-300 border" ref="infoDom">
            <span style="position: absolute;font-size: 18px;">企业信息</span>
            <el-button type="" size="normal" style="float: right;" circle >
                <el-icon>
                    <Edit />
                </el-icon>
            </el-button>
            <div
                style="display: flex;position: absolute;top: 2cqb;left: 0;right: 0;margin: auto; height: 70%;width: 90%;flex-direction: column;justify-content: space-evenly;min-height: 300px;">
                <div style="display: flex;justify-content: space-evenly;">
                    <InfoBox title="企业名称" content="xxxxx有限公司"></InfoBox>
                    <InfoBox title="所属行业" content="电气"></InfoBox>
                    <InfoBox title="法定代表人" content="谢毅"></InfoBox>
                    <InfoBox title="联系人信息" content="12345678903"></InfoBox>
                </div>
                <div style="display: flex;justify-content: space-evenly;">
                    <InfoBox title="单位性质" content="xxxx"></InfoBox>
                    <InfoBox title="组织机构代码" content="xxxx"></InfoBox>
                    <InfoBox title="填报负责人" content="石日天"></InfoBox>
                    <InfoBox title="企业ID" content="97c35d19-9893-4292-8dbc-ac27fcc1fb41"
                        :contentStyle='{ fontSize: "15px" }'></InfoBox>
                </div>
            </div>
        </div>
        <div style="display: flex;position: absolute;width: 98%;left: 0;right: 0;margin: auto;height: 100px;justify-content: space-evenly;"
            :style='{ top: `${infoDom?.getBoundingClientRect().height + 160 + 10}px` }'
            class=" border-solid border-slate-300 border">
            <span style="position: absolute;left: 10px;top: 5px;font-size: 18px;">钱包</span>
            <div style="width: 200px;height: 100%;align-items: center;display: flex;">
                <ItemBox :src="COIN" alt="币" style="height: 45px;width: 45px;margin-right: 5px;"></ItemBox>
                <span>123,412.00 CBC</span>
                <!-- 这里需要填写已有碳币数量 -->
            </div>
            <div style="width: 200px;height: 100%;align-items: center;display: flex;">
                <ItemBox :src="RMB" alt="人民币" style="height: 45px;width: 45px;margin-right: 5px;"></ItemBox>
                <span>￥ 123,412.00 </span>
                <!-- 这里需要填已有现金 -->
            </div>
            <el-button type="primary" style="top: 0;bottom: 0;margin-top: auto;margin-bottom: auto;" size="large"
                @click="routerGo('/bourse')">交易所</el-button>
        </div>

        <teleport to='body' />
    </div>
</template>

<style lang=''>

</style>