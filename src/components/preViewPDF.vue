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

<script>
import VuePdfEmbed from 'vue-pdf-embed'

// OR THE FOLLOWING IMPORT FOR VUE 2
// import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'

export default {
    components: {
        VuePdfEmbed
    },
    props: ['url'],
    data() {
        return {
            isLoading: true,
            page: null,
            pageCount: 1,
            pdfSource: this.props.url,
            showAllPages: true
        }
    },
    watch: {
        showAllPages() {
            this.page = this.showAllPages ? null : 1
        }
    },
    methods: {
        handleDocumentRender(args) {
            // console.log(args)
            this.isLoading = false
            this.pageCount = this.$refs.pdfRef.pageCount
        },
        handlePasswordRequest(callback, retry) {
            callback(prompt(retry ? '请再次输入密码' : '请输入密码'))
        }
    }
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