<template>
    <el-card className="card">
        <img :src="store.selectedAlbum.img" alt="" />
        <div className="content">
            <div>
                <el-badge :value="$route.params.id"><span className="title">{{ store.selectedAlbum.name }}</span>
                </el-badge>
            </div>
            <!-- <el-space :style="{'text-align':'left'}" direction="vertical" :size="50"> -->
            <div>
                风格： <el-space :size="20">
                    <el-tag :type="randomType()" v-for="style of store.selectedAlbum.style">{{ style }}</el-tag>
                </el-space>
            </div>
            <div>
                歌手： <el-tag effect="dark" :type="randomType()" v-for="sg of store.selectedAlbum.singers">{{ sg }}
                </el-tag>
            </div>
            <div>发布日期：{{ store.selectedAlbum.releaseDate }}</div>

        </div>
    </el-card>
    <br>


</template>
<script lang="ts" setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router'
import { useAlbumsStore } from '../stores/albums.ts'
const route = useRoute()
const store = useAlbumsStore()
const randomType = () => {
    let types = ['primary', 'warning', 'danger', 'success']
    let index = Math.floor(Math.random() * 4)
    return types[index]
}
watch(route, () => {
    store.load(route.params.id)
}, { immediate: true })
</script>
<style scoped>
.title {
    font-size: 26px;
    font-weight: 500;
    color: chocolate;
}

img {
    width: 90%;
    border-radius: 20px;
}
.content>div{
    line-height: 2em;
    color: burlywood;
}
</style>
