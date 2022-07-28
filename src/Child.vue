<template>
    <h2>子组件:{{counter.counter}}</h2>
</template>
<script setup>
    import {useCounterStore} from './stores/counter'
    let counter=useCounterStore()

</script>