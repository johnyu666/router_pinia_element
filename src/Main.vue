<template>
    <el-button type="danger" circle>ok</el-button>
    
    <el-checkbox v-model="male">{{male?"男":"女"}}</el-checkbox>: 
    <el-checkbox-group v-model="favs">
        <el-checkbox label="basketball">篮球</el-checkbox>
        <el-checkbox label="football">足球</el-checkbox>
    </el-checkbox-group>
     {{favs.join("--")}}
     <br>
    <el-checkbox @change="handleChange">全选</el-checkbox>
    <el-checkbox-group v-model="selectedCities">
        <el-checkbox :label="city" v-for="city of cities" :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>
    {{selectedCities.join(',')}}
    <br>
    <el-radio-group v-model="gender">
        <el-radio value="1">男</el-radio>
        <el-radio value="2">女</el-radio>
        <el-radio value="3">第三</el-radio>
    </el-radio-group>
    {{gender}}
    <br>
    <el-select placeholder="请选择专业" v-model="selectedMajor">
        <el-option v-for="major of majors" :label="major" :value="major"/>
    </el-select>
    {{selectedMajor}}
    <br>
    <el-slider :min="0" :max="100" v-model="progress"></el-slider>
    {{progress}}
    <br>
    <el-table :row-class-name="fn" border :data="albums">
        <el-table-column  prop="id" label="ID"></el-table-column>
        <el-table-column sortable :sort-method="sortByName"  prop="name" label="名字"></el-table-column>
        <el-table-column label="地区">
            <template #default="scope">
                <el-tag>{{scope.row.area}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template #default="alb">
                <el-button @click="del(alb.row.id)" type="danger">删除</el-button>
                <el-button type="warning" @click="updating(alb.row)">更新</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 更新表单 -->
    <el-dialog v-model="showUpdate">
        <template #header>更新</template>
        <el-input v-model="current.id" disabled></el-input>
        <el-input v-model="current.name"></el-input>
        <template #footer>
            <el-button @click="update" type="primary">更新</el-button>
            <el-button type="cancle" @click="()=>showUpdate=false">取消</el-button>
        </template>
    </el-dialog>
</template>
<script  lang="ts" setup>
import _ from 'lodash'
import {ref,defineExpose,onMounted,reactive} from "vue"
import './assets/me.css'

interface Album{
    id?:number,name?:string,area?:string
}
const gender=ref("3")
const male=ref(true)
const favs=ref(["basketball","football"])
const selectedCities=ref<Array<String>>([])
const cities=["上海","北京","天津","重庆"]
var current=reactive<Album>({})
function handleChange(rs:boolean){
    selectedCities.value=rs?cities:[]
}
const majors=["计算机","软工","物联网"]
const selectedMajor=ref("")

const progress=ref(0)
const albums=ref([])

fetch("http://johnyu.cn:3000/albums")
.then(resp=>resp.json())
.then(albs=>albums.value=albs)

const fn=({row,rowIndex}:{row:Album,rowIndex:number})=>{
    return rowIndex%2==0?"even":"odd";
}
const formatter=(row:Album)=>{
    if(row.name.length<=5) return row.name
    else return row.name.substring(0,5)+"..."
}
const sortByName=(a:Album,b:Album)=>{
    return a.name.length-b.name.length;
}


function del(id:number){
    fetch("http://johnyu.cn:3000/albums/"+id,{method:"DELETE"})
    .then(resp=>resp.json())
    .then(obj=>{
        let index= albums.value.findIndex(album=>album.id===id)
        albums.value.splice(index,1)
    })
    .catch(er=>{
        alert("删除失败")
    })
}
const showUpdate=ref(false)
function updating(album:Album){
    // current=JSON.parse(JSON.stringify(album))
    Object.assign(current,album)
    
    showUpdate.value=true;
}
function update(){
     fetch("http://johnyu.cn:3000/albums/"+current.id,{method:"PUT",headers:{'Content-Type':"application/json"},body:JSON.stringify(current)})
     .then(resp=>resp.json())
     .then((alb:Album)=>{
        let index=albums.value.findIndex((album:Album)=>album.id===alb.id)
        albums.value.splice(index,1,alb)
        showUpdate.value=false
     })
}
</script>
