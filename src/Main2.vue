<template>
    <h2>main2</h2>
    <router-link v-for="alb of albums" :to="'/book/' + alb.id">
        <el-tag>{{ alb.name }} </el-tag>
    </router-link>
    <hr>
    <el-button type="success" v-for="alb of albums" @click="navHandle(alb.id)">{{alb.name}}</el-button>
    <hr>
    <router-view name="default"/>
    <hr>
    <router-view name="detail"></router-view>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue'

import {useRouter} from 'vue-router'
let albums = ref([])
let router=useRouter()

onMounted(() => {
    fetch("http://johnyu.cn:3000/albums")
        .then(resp => resp.json())
        .then(albs => albums.value = albs)
})
function navHandle(id){
    router.push({name:"book",params:{id}})
}
</script>