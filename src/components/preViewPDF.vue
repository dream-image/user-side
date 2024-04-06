<template>
    <div class="app-header">
        <template v-if="isLoading"> 加载中 </template>

        <template v-else>
            <span v-if="showAllPages"> 第 {{ pageCount }} 页 </span>

            <span v-else>
                <button :disabled="page <= 1" @click="page--">❮</button>

                {{ page }} / {{ pageCount }}

                <button :disabled="page >= pageCount" @click="page++">❯</button>
            </span>

            <label class="right">
                <input v-model="showAllPages" type="checkbox" />
                展示全部
            </label>
        </template>
    </div>

    <div class="app-content">
        <vue-pdf-embed ref="pdfRef" :source="pdfSource" :page="page" @password-requested="handlePasswordRequest"
            @rendered="handleDocumentRender" />
    </div>
</template>

<script setup>
// OR THE FOLLOWING IMPORT FOR VUE 2
// import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
import {ref,watchEffect} from 'vue'
import VuePdfEmbed from 'vue-pdf-embed'
const props = defineProps({
    url: {
        type: String,
        required: true
    }
})

const isLoading = ref(
    true )
const page = ref(null)
const pageCount = ref(1)
const pdfSource = ref(props.url)
const showAllPages = ref(false)
watchEffect(() => {
    page.value = showAllPages.value ? null : 1
})
const pdfRef = ref(null)
function handleDocumentRender(a) {
    console.log(a)
    isLoading.value = false
    pageCount.value = pdfRef.pageCount
}
function handlePasswordRequest(callback, retry) {
    callback(prompt(retry ? '请再次输入密码' : '请输入密码'))
}

</script>
<style lang="css" scoped>
body {
    margin: 0;
    padding: 0;
    background-color: #ccc;
}

.vue-pdf-embed>div {
    margin-bottom: 8px;
    box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
}

.app-header {
    padding: 16px;
    box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
    background-color: #555;
    color: #ddd;
}

.app-content {
    padding: 24px 16px;
}

.right {
    float: right;
}
</style>