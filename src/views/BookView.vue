<template>

    <h1>图书：{{$route.params.id}}</h1>
    <h2>书名：{{book.value?.name}}</h2>
    <img className="img" :src="book.value?.img" alt="">
</template>
<script setup>
    import { ref,reactive,watch } from "vue";
    import {useRoute} from "vue-router"
   
    const book=reactive({})
    let route=useRoute()
    watch(route,()=>{   
         fetchData(Number.parseInt(route.params.id))
    },{immediate:true})

    function fetchData(id){
            fetch("http://johnyu.cn:3000/albums/"+id)
            .then(resp=>resp.json())
            .then(alb=>{
                book.value=alb
            })
        }
</script>
<!-- <script>
import { ref,defineExpose,reactive } from "vue";
export default{
    // setup(){
    //     const book=reactive({})
    //     return {book}
    // },
    data(){
        return {book:{}}
    },
    created() {
        this.$watch(()=>this.$route.params,(to,prev)=>{
            this.fetchData(to.id)
        },{immediate:true})
    },
    methods: {
        fetchData(id){
            fetch("http://johnyu.cn:3000/albums/"+id)
            .then(resp=>resp.json())
            .then(alb=>{
                console.log(alb)
                this.book=alb
            })
        }
    },
}

</script> -->
<style scoped>
    img{   
        width: 220px;
        border-radius: 110px;
    }
</style>