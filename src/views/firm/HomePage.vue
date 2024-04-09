<script setup>
import COIN from '@/assets/币.svg';
import ItemBox from '@/components/ItemBox.vue';
import RMB from '@/assets/人民币.svg';
import { ref } from 'vue'
import { useTransition } from '@vueuse/core'
import { ChatLineRound, Male } from '@element-plus/icons-vue'
import Ledger from '@/components/Ledger.vue'
const baseURL = inject("baseURL")
import { useUserInfoStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
const { userInfo } = storeToRefs(useUserInfoStore())

//千分位展示
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

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


const averagePriceOfCBC = ref(0)
const showAveragePrice = useTransition(averagePriceOfCBC, {
    duration: 1500,
})
// 充值按钮事件
function topUp() {

}

const isShowLedger = ref(false)
// 展示账本
function showLedger() {
    isShowLedger.value = !isShowLedger.value
}

const priceChosen = ref()//选中的价格
const loading = ref(false) //加载状态
const options = ref([
    // {
    //     value: "100 ", label: "100 ￥/ CBC"
    // },
    // {
    //     value: "101", label: "101 ￥/ CBC"
    // },
    // {
    //     value: "113.430", label: "113.430 ￥/ CBC"
    // },
    // {
    //     value: "123.11", label: "123.11 ￥/ CBC"
    // },
])
//购买时候搜索框触发的查找价格
function searchPrice() {

    getCarbonPriceList()
}


const buyNumber = precisionRef(null, 0)//购买数量


const buying = ref(false)//是否正在购买
// 购买碳币
async function buyCarbonCoin() {
    try {
        if (!userInfo.value.authority.buy) {
            ElMessage.error('您的购买行为已被禁止，请联系管理员')
            return
        }
        buying.value = true
        let res = await fetch(`${baseURL}/firm/buy`, {
            method: "POST",
            body: JSON.stringify({
                number: buyNumber.value,
                price: priceChosen.value,
                firmId: userInfo.value.detail.id
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        let data = await res.json()
        if (data.code === 200) {
            ElMessage.success('购买成功')
            // 下面是购买成功的逻辑

        }
    } catch (error) {
        console.error(error)
        ElMessage.error('请求失败，请检查网络')
    }
    buying.value = false
    console.log('购买碳币')
}


const sellNumber = precisionRef(null, 0)//出售数量

const sellPrice = precisionRef(null, 0)

const selling = ref(false)//是否正在出售
//出售碳币
async function sellCarbonCoin() {
    try {
        let res = await fetch(`${baseURL}/firm/sell`, {
            method: "POST",
            body: JSON.stringify({
                number: buyNumber.value,
                price: priceChosen.value,
                firmId: userInfo.value.detail.id
            }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        let data = await res.json()
        if (data.code === 200) {
            ElMessage.success('托管成功')
            // 下面是购买成功的逻辑

        }
    } catch (error) {
        console.error(error)
        ElMessage.error('请求失败，请检查网络')
    }

    console.log('出售碳币')
}

//购买碳币的时候获取的市场价
async function getCarbonPriceList() {
    try {
        loading.value = true
        let res = await fetch(`${baseURL}/firm/carbonPrice`, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        let data = await res.json()
        options.value = data
    } catch (error) {
        console.log(error)
        ElMessage.error('请求失败，请检查网络')
    }
    loading.value = false
}

const CBCNumber = ref(0) //CBC数量
const RMBNumber = ref(0)//人民币数量
async function getAllMoney() {
    try {
        let res = await fetch(`${baseURL}/firm/money?firmId=` + userInfo.value.detail.id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        let data = await res.json()
        if (data.code != 200) {
            ElMessage.error('请求失败，请检查网络')
            return
        }
        let { RMB, CBC, averageCBCPrice } = data.data
        source.value = RMB + CBC * averageCBCPrice//总资产
        CBCNumber.value = CBC
        RMBNumber.value = RMB
        averagePriceOfCBC.value = averageCBCPrice
    } catch (error) {
        console.error(error)
        ElMessage.error('请求失败，请检查网络')
    }
}


// 加载完毕获取数据处理
onMounted(() => {
    getAllMoney()
})






// 要展示的价格曲线图是24小时，还是1周还是一个月还是一年
const priceTableDate = ref('24小时')
const getCycle = () => {
    switch (priceTableDate.value) {
        case '24小时':
            return 'day'
        case '一周':
            return 'week'
        case '一月':
            return 'month'
        case '一年':
            return 'year'
        default:
            return 'day'
    }
}
watch(priceTableDate, () => {
    getCarbonInfo(getCycle())
})





// 接下里这里放echarts内容

import * as echarts from 'echarts';
import debounce from '@/utils/debounce';
import { ElMessage } from 'element-plus';
const CarboncoinImgDom = ref(null)
const infoImgDom = ref(null)
let ob
const infoImg = shallowRef()
const getFirmCarbonImg = async () => {
    try {
        let res = await fetch(`${baseURL}/firm/carbonImg?firmId=` + userInfo.value.detail.id, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        let data = await res.json()
        if (data.code >= 400) {
            throw new Error('请求失败，请检查网络')
        }
        infoImg.value = echarts.init(infoImgDom.value)
        infoImg.value.clear()
        let option = {
            animationDuration: function (idx) {
                // 越往后的数据时长越大
                return 2000;
            },
            animationEasing: function (k) {
                return k;
            },
            grid: { // 让图表占满容器
                top: "20px",
                left: "40px",
                right: "20px",
                bottom: "30px"
            },
            tooltip: {
                trigger: 'axis',
                position: [10, 10]
            },
            title: {
                left: 'center',
                text: '我的碳币'
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.data.date
            },
            yAxis: {
                type: 'value',
                // boundaryGap: [0, '100%']
            },
            // dataZoom: [
            //     {
            //         // type: 'slider',
            //         start: 0,
            //         end: 100,
            //         disabled: true,
            //         // show: false
            //     }
            // ],
            series: [
                {
                    name: 'Fake Data',
                    type: 'line',
                    symbol: 'none',
                    sampling: 'lttb',
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }
                        ])
                    },
                    data: data.data.data
                },

            ]
        };
        option && infoImg.value.setOption(option, { lazyUpdate: true });

    } catch (error) {
        console.error(error)
        ElMessage.error(error.message)
    }

}
const carboncoinImg = shallowRef()
const getCarbonInfo = async (cycle) => {
    try {
        let res = await fetch(`${baseURL}/firm/carbonInfo?cycle=` + cycle, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        let data = await res.json()
        if (data.code >= 400) {
            throw new Error('请求失败，请检查网络')
        }
        carboncoinImg.value = echarts.init(CarboncoinImgDom.value, null, {
            renderer: 'svg'
        });
        carboncoinImg.value.clear()

        let option = {
            animationDuration: 2000,
            animationEasing: function (k) {
                return k;
            },
            grid: { // 让图表占满容器
                top: "20px",
                left: "40px",
                right: "20px",
                bottom: "40px"
            },
            tooltip: {
                trigger: 'axis',
                position: [10, 10]
                // function (pt) {
                //     return [pt[0], '100%'];
                // }
            },
            title: {
                left: 'center',
                text: ''
            },
            toolbox: {
                feature: {
                    dataZoom: {
                        yAxisIndex: 'none'
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: data.data.date
            },
            yAxis: {
                type: 'value',
                // boundaryGap: [0, '100%']
            },
            // dataZoom: [
            //     {
            //         type: 'slider',
            //         start: 0,
            //         end: 100,
            //         disabled: true,
            //         // show: false
            //     }
            // ],
            series: [
                {
                    name: 'Fake Data',
                    type: 'line',
                    symbol: 'none',
                    sampling: 'lttb',
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgb(255, 158, 68)'
                            },
                            {
                                offset: 1,
                                color: 'rgb(255, 70, 131)'
                            }
                        ])
                    },
                    data: data.data.data
                },
            ]
        };
        option && carboncoinImg.value.setOption(option, { lazyUpdate: true });

    } catch (error) {
        console.log(error)
        ElMessage.error(error.message)
    }
}
const priceCompare = ref()
const getPriceCompareToYesterday = async () => {
    try {
        let res = await fetch(`${baseURL}/firm/priceCompare`, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        let data = await res.json()
        if (data.code >= 400) {
            throw new Error('请求失败，请检查网络')
        }
        priceCompare.value = data.data
    } catch (error) {
        console.log(error)
        ElMessage.error(error.message)
    }
}
onMounted(() => {
    getPriceCompareToYesterday()
    getFirmCarbonImg()

    getCarbonInfo('day')

    setTimeout(() => {
        ob = new ResizeObserver(debounce(() => {
            infoImg.value.resize({
                animation: {
                    duration: 2000,
                    animationEasing: function (k) {
                        return k;
                    },
                }
            })
            carboncoinImg.value.resize({
                animation: {
                    duration: 2000,
                    animationEasing: function (k) {
                        return k;
                    },
                }
            })

        }, 30), {

        })
        ob.observe(document.body)
    }, 1000);

})

onUnmounted(() => {
    ob.disconnect()
})

</script>

<template>
    <div style="height: 100%;width: 100%;display: flex;flex-direction: column;justify-content: space-evenly;min-width: 860px;"
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
                            <div style="width: 50%;height: 100%; min-width: 120px;display: flex;flex-direction: column;">
                                <div style="height: 60%;display: flex;align-items: center;justify-content: center;">
                                    <span style="">{{ formatNumber(CBCNumber) }} CBC</span>
                                    <!-- 此处需要填写数据 -->
                                </div>
                                <div
                                    style="height: 40%;font-size: 10px;display: flex;align-items: center;justify-content: center;">
                                    <span style="transform: translateY(-3px);">{{ formatNumber(averagePriceOfCBC) }} CNY /
                                        CBC</span>
                                    <!-- 此处需要填写数据   碳币此刻的平均价格 -->
                                </div>
                            </div>
                        </div>

                        <div style="display: flex;width: 100%;height: 44%;align-content: center;justify-content: center;">
                            <el-button type="primary" size="large" style="width: 60%;" @click="showLedger">

                                <template #icon>
                                    <el-icon>
                                        <List />
                                    </el-icon>
                                </template>
                                账本
                            </el-button>
                            <Ledger v-model:isShowLedger="isShowLedger" v-if="isShowLedger"></Ledger>
                        </div>
                    </div>
                    <div
                        style="width: 250px;display: flex;flex-direction: column;justify-content: space-between;align-items: center">
                        <div
                            style="display: flex;width: 100%;height: 52%;align-items: center;justify-content: center;gap: 5px;">
                            <ItemBox :src="RMB" alt="人民币" style="height: 45px;width: 45px;"></ItemBox>
                            <div style="width: 50%;height: 100%; min-width: max-content;display: flex;align-items: center;">
                                <div style="height: 60%;display: flex;align-items: center;min-width: max-content;">
                                    <span>￥ {{ formatNumber(RMBNumber) }}</span>
                                    <!-- 此处需要填写数据 -->
                                </div>
                            </div>
                        </div>

                        <div style="display: flex;width: 100%;height: 44%;align-content: center;justify-content: center;">
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
                <!-- <span style="position: absolute;font-size: 18px;">我的碳币</span> -->
                <div style="width: 100%;height: 100%;overflow: hidden;" ref="infoImgDom">
                    <!-- 这里放echarts的图 -->

                </div>
            </div>
            <!-- 交易框 -->
            <div style="grid-area: right;" class=" border-solid border-slate-300 border">
                <el-tabs type="border-card" class="demo-tabs"
                    style="width: 100%;height: 100%; display: flex; flex-direction: column;" :stretch="true">
                    <el-tab-pane label="购买" style="height: 100%;">
                        <!-- 这里是购买框 -->
                        <div
                            style="width: 100%;height: 100%;display: flex;flex-direction: column;justify-content: space-evenly;height: 100%;">
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
                                    <el-select v-model="priceChosen" filterable remote placeholder="查询市场价"
                                        remote-show-suffix :remote-method="searchPrice" :loading="loading" clearable
                                        loading-text="加载中" style="width: 100%;" size="small" class="removeBorder">
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
                                <el-button type="primary" size="large" style="width: 80%;" @click="buyCarbonCoin"
                                    :disabled="buying || (!priceChosen || !buyNumber)">购买</el-button>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="出售" style="height: 100%;">
                        <!-- 这里是出售框 -->
                        <div
                            style="width: 100%;height: 100%;display: flex;flex-direction: column;gap: 2px;justify-content: space-evenly;height: 100%;">
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
                                <el-button type="primary" size="large" style="width: 80%;" @click="sellCarbonCoin"
                                    :disabled="selling || (!sellPrice || !sellNumber)">托管出售</el-button>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <div style="height: 50%;width: 100%;position: relative;" class=" border-solid border-slate-300 border"
            ref="bottomPriceDom">
            <span style="position: absolute;left: 5px;top: 5px;font-size: 20px;">市场</span>
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
                        <span :class="/-/.test(priceCompare) ? 'green' : 'red'">
                            <!-- 这里green是升，red是降 -->
                            {{ priceCompare }}%
                            <el-icon>
                                <CaretTop />
                            </el-icon>
                        </span>
                    </div>
                </div>
            </div>
            <div class=" border-solid border-slate-300 border"
                style="position: absolute;left: 5px;width: 95%;right: 0;top: 105px;margin: auto;"
                :style="{ height: `${bottomPriceDom?.getBoundingClientRect().height - 110 + 0}px` }">
                <div style="width: 100%;height: 100%;" ref="CarboncoinImgDom"></div>
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

.demo-tabs {
    :deep(.el-tabs__content) {
        flex-grow: 1;
    }

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
</style>
