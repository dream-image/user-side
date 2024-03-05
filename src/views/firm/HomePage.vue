<script setup>
import COIN from '@/assets/币.svg';
import ItemBox from '@/components/ItemBox.vue';
import RMB from '@/assets/人民币.svg';
import { ref } from 'vue'
import { useTransition } from '@vueuse/core'
import { ChatLineRound, Male } from '@element-plus/icons-vue'

//加入了防抖的保留两位小数
function precisionRef(value, delay = 500, digit = 2) {
    let timeout
    return customRef((track, trigger) => {
        return {
            get() {
                track()
                return value
            },
            set(newValue) {
                console.log(newValue)
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    console.log(newValue, value)
                    if (value + '.' !== newValue + "") {
                        value = (newValue * 1).toFixed(digit) * 1
                    }
                    trigger()
                }, delay)

            }
        }
    })
}
const bottomPriceDom = ref(null)

const source = ref(0)
const outputValue = useTransition(source, {
    duration: 1500,
})
source.value = 332521970.01

const averagePriceOfCBC = ref(0)
const showAveragePrice = useTransition(averagePriceOfCBC, {
    duration: 1500,
})
averagePriceOfCBC.value = 923122.30
// 充值按钮事件
function topUp() {

}

// 展示账本
function showLedger() {

}

const priceChosen = ref()//选中的价格
const loading = ref(false) //加载状态
const options = ref([
    {
        value: "0", label: "100 ￥/ CBC"
    },
    {
        value: "1", label: "101 ￥/ CBC"
    },
    {
        value: "2", label: "113.430 ￥/ CBC"
    },
    {
        value: "3", label: "123.11 ￥/ CBC"
    },
])
//购买时候搜索框触发的查找价格
function searchPrice() {
    console.log('查询市场价格')
}


const buyNumber = precisionRef(null, 0)//购买数量

// 购买碳币
function buyCarbonCoin() {
    console.log('购买碳币')
}


const sellNumber = precisionRef(null, 0)//出售数量

const sellPrice = precisionRef(null, 0)
//出售价格
function sellCarbonCoin() {
    console.log('出售碳币')
}


// 要展示的价格曲线图是24小时，还是1周还是一个月还是一年
const priceTableDate = ref('24小时')

</script>

<template>
    <div style="height: 100%;width: 100%;display: flex;flex-direction: column;justify-content: space-evenly;"
        id="wrapper">
        <div style="height: 45%;width: 100%;display: grid;" id="top">
            <!-- 顶部资产展示 -->
            <div style="grid-area: top;display: flex;justify-content:space-around;position: relative;"
                class=" border-solid border-slate-300 border">
                <div
                    style="width: 30%;min-width: max-content; position: absolute;left: 0;height: 100%;font-size: 20px;padding: 5px;display: flex;flex-direction: column;">
                    <span>全部资产</span>
                    <el-col :span="6" style="width: max-content;">
                        <el-statistic :value="outputValue" style="font-size: 22px;width: max-content;" :precision="2">
                            <template #prefix>￥</template>
                        </el-statistic>
                    </el-col>
                    <!-- 这里有数据需要填写 -->
                </div>
                <div
                    style="display: flex;width: 60%;min-width: 500px; position: absolute;right: 0;height: 100%;justify-content: space-evenly;">
                    <div
                        style="width: 250px;display: flex;flex-direction: column;justify-content: space-between;align-items: center">
                        <div
                            style="display: flex;width: 100%;height: 52%;align-items: center;justify-content: center;gap: 5px;">
                            <ItemBox :src="COIN" alt="币" style="height: 45px;width: 45px;"></ItemBox>
                            <div
                                style="width: 50%;height: 100%; min-width: 120px;display: flex;flex-direction: column;">
                                <div style="height: 60%;display: flex;align-items: center;">
                                    <span>123,412.00 CBC</span>
                                    <!-- 此处需要填写数据 -->
                                </div>
                                <div
                                    style="height: 40%;font-size: 10px;display: flex;align-items: center;justify-content: center;">
                                    <span style="transform: translateY(-3px);">12,012.00 CNY / CBC</span>
                                    <!-- 此处需要填写数据   碳币此刻的平均价格 -->
                                </div>
                            </div>
                        </div>

                        <div
                            style="display: flex;width: 100%;height: 44%;align-content: center;justify-content: center;">
                            <el-button type="primary" size="large" style="width: 60%;" @click="showLedger">

                                <template #icon>
                                    <el-icon>
                                        <List />
                                    </el-icon>
                                </template>
                                账本
                            </el-button>
                        </div>
                    </div>
                    <div
                        style="width: 250px;display: flex;flex-direction: column;justify-content: space-between;align-items: center">
                        <div
                            style="display: flex;width: 100%;height: 52%;align-items: center;justify-content: center;gap: 5px;">
                            <ItemBox :src="RMB" alt="人民币" style="height: 45px;width: 45px;"></ItemBox>
                            <div
                                style="width: 50%;height: 100%; min-width: max-content;display: flex;align-items: center;">
                                <div style="height: 60%;display: flex;align-items: center;min-width: max-content;">
                                    <span>￥ 123,412.00</span>
                                    <!-- 此处需要填写数据 -->
                                </div>
                            </div>
                        </div>

                        <div
                            style="display: flex;width: 100%;height: 44%;align-content: center;justify-content: center;">
                            <el-button type="primary" size="large" style="width: 60%;" @click="topUp">

                                <template #icon>
                                    <el-icon>
                                        <List />
                                    </el-icon>
                                </template>
                                充值
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 上部个人资产变化图 -->
            <div style="grid-area: bottom;padding: 5px;" class=" border-solid border-slate-300 border">
                <span style="position: absolute;font-size: 18px;">持有碳币和RMB变化图</span>
                <div>
                    <!-- 这里放echarts的图 -->
                </div>
            </div>
            <!-- 交易框 -->
            <div style="grid-area: right;" class=" border-solid border-slate-300 border">
                <el-tabs type="border-card" class="demo-tabs" style="width: 100%;height: 100%;" :stretch="true">
                    <el-tab-pane label="购买">
                        <!-- 这里是购买框 -->
                        <div style="width: 100%;height: 100%;display: flex;flex-direction: column;gap: 2px;">
                            <div style="height: 50px;position: relative;display: flex;align-items: center;justify-content: center;"
                                class="border-solid border-slate-300 border">
                                <span style="position: absolute;top: 2px;left: 5px;font-size: 13px;">种类</span>
                                <div style="transform: translateY(3px);"><img :src="COIN"
                                        style="height: 20px;display: inline-block;margin-right: 5px;" alt="币">碳币 CBC
                                </div>
                            </div>
                            <div style="height: 50px;position: relative;display: flex;align-items: center;justify-content: center;"
                                class="border-solid border-slate-300 border">
                                <span style="position: absolute;top: 2px;left: 5px;font-size: 13px;">价格</span>
                                <div style="transform: translateY(5px);width: 80%;">
                                    <el-select v-model="priceChosen" multiple filterable remote reserve-keyword
                                        placeholder="查询市场价" remote-show-suffix :remote-method="searchPrice"
                                        :loading="loading" style="width: 100%;" size="small" class="removeBorder">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select>
                                </div>
                            </div>
                            <div style="height: 50px;position: relative;display: flex;align-items: center;justify-content: center;"
                                class="border-solid border-slate-300 border">
                                <span style="position: absolute;top: 2px;left: 5px;font-size: 13px;">购买数量</span>
                                <el-input size="small" style="width: 80%;transform: translateY(8px);" minlength="1"
                                    placeholder="请输入购买数量" type="number" v-model="buyNumber" clearable
                                    class="removeBorder"></el-input>
                            </div>
                            <div style="height: 50px;position: relative;display: flex;align-items: center;justify-content: center;"
                                class="border-solid border-slate-300 border">
                                <el-button type="primary" size="large" style="width: 80%;"
                                    @click="buyCarbonCoin">购买</el-button>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="出售">
                        <!-- 这里是出售框 -->
                        <div style="width: 100%;height: 100%;display: flex;flex-direction: column;gap: 2px;">
                            <div style="height: 50px;position: relative;display: flex;align-items: center;justify-content: center;"
                                class="border-solid border-slate-300 border">
                                <span style="position: absolute;top: 2px;left: 5px;font-size: 13px;">种类</span>
                                <div style="transform: translateY(3px);"><img :src="COIN"
                                        style="height: 20px;display: inline-block;margin-right: 5px;" alt="币">碳币 CBC
                                </div>
                            </div>
                            <div style="height: 50px;position: relative;display: flex;align-items: center;justify-content: center;"
                                class="border-solid border-slate-300 border">
                                <span style="position: absolute;top: 2px;left: 5px;font-size: 13px;">价格</span>
                                <div style="transform: translateY(5px);width: 80%;">
                                    <el-input size="small" style="width: 100%;" minlength="1" placeholder="请输入出售价格"
                                        class="removeBorder" v-model="sellPrice" type="number" clearable></el-input>
                                </div>
                            </div>
                            <div style="height: 50px;position: relative;display: flex;align-items: center;justify-content: center;"
                                class="border-solid border-slate-300 border">
                                <span style="position: absolute;top: 2px;left: 5px;font-size: 13px;">出售数量</span>
                                <el-input size="small" style="width: 80%;transform: translateY(8px);" minlength="0"
                                    class="removeBorder" placeholder="请输入出售数量" type="number" v-model="sellNumber"
                                    clearable></el-input>
                            </div>
                            <div style="height: 50px;position: relative;display: flex;align-items: center;justify-content: center;"
                                class="border-solid border-slate-300 border">
                                <el-button type="primary" size="large" style="width: 80%;"
                                    @click="buyCarbonCoin">出售</el-button>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div style="height: 50%;width: 100%;position: relative;" class=" border-solid border-slate-300 border"
            ref="bottomPriceDom">
            <span style="position: absolute;left: 5px;top: 5px;font-size: 20px;">价格</span>
            <span style="position: absolute;top: 40px;left: 5px;font-size: 18px;"><img :src="COIN" alt="币"
                    style="height: 27px;width: 27px;display: inline-block;margin-right: 5px;">碳币 Carboncoin</span>
            <div style="position: absolute;top: 70px;left:5px;font-size: 20px;display: flex;">
                <el-statistic :value="showAveragePrice" :precision="2">

                    <template #prefix>
                        ￥
                    </template>
                </el-statistic>
                <div class="statistic-footer">
                    <div class="footer-item">
                        <span>相比昨日</span>
                        <span class="green">
                            <!-- 这里green是升，red是降 -->
                            24%
                            <el-icon>
                                <CaretTop />
                            </el-icon>
                        </span>
                    </div>
                </div>
            </div>
            <div class=" border-solid border-slate-300 border"
                style="position: absolute;left: 5px;width: 95%;right: 0;top: 105px;margin: auto;"
                :style="{ height: `${bottomPriceDom?.getBoundingClientRect().height - 110 + 0}px`, }">
                {{ console.log() }}
                <!-- 这里放图 -->
            </div>
            <div style="position: absolute;right: 20px;top: 60px;">
                <el-radio-group v-model="priceTableDate" style="margin-bottom: 30px">
                    <el-radio-button label="24小时"></el-radio-button>
                    <el-radio-button label="一周"></el-radio-button>
                    <el-radio-button label="一月"></el-radio-button>
                    <el-radio-button label="一年"></el-radio-button>
                </el-radio-group>
            </div>
        </div>
    </div>
</template>

<style scoped>
#wrapper div {
    /* border: 1px solid black; */
}


#top {
    grid-template:
        "top top top top right" 40%
        "bottom bottom bottom bottom right" auto / 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
}

.el-col {
    text-align: center;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
    vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
    vertical-align: middle;
    margin-left: 4px;
}

.removeBorder {
    :deep(.el-input__wrapper) {
        box-shadow: none;
    }
}

:global(h2#card-usage ~ .example .example-showcase) {
    background-color: var(--el-fill-color) !important;
}

.el-statistic {
    --el-statistic-content-font-size: 24px;
}


.statistic-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    font-size: 12px;
    color: var(--el-text-color-regular);
    margin-left: 4px;
}

.statistic-footer .footer-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.statistic-footer .footer-item span:last-child {
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
}

.green {
    color: var(--el-color-success);
}

.red {
    color: var(--el-color-error);
}
</style>
