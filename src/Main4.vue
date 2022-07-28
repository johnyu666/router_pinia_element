<template>
    <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#545c64"
        text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
        <el-menu-item index="0">&nbsp;<el-icon>
                <Menu />
            </el-icon>
        </el-menu-item>
        <el-menu-item index="1">回到首页</el-menu-item>
        <el-sub-menu index="2">
            <template #title>歌曲风格</template>
            <el-menu-item index="2-1">摇滚音乐</el-menu-item>
            <el-menu-item index="2-2">乡村音乐</el-menu-item>
            <el-menu-item index="2-3">流行音乐</el-menu-item>
            <el-sub-menu index="2-4">
                <template #title>其它</template>
                <el-menu-item index="2-4-1">非主流</el-menu-item>
                <el-menu-item index="2-4-2">民乐</el-menu-item>
                <el-menu-item index="2-4-3">交响</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="3" disabled>会员服务</el-menu-item>
        <el-menu-item index="4">我的音乐</el-menu-item>
    </el-menu>

    <el-row justify="end">
        <el-button :icon="Headset" @click="() => showDrawer = true" type="primary">添加新的唱片</el-button>
    </el-row>
    <el-row align="middle">
        <el-col :style="{ display: 'flex', 'text-algin': 'center', 'justify-content': 'center' }" :md="6" :sm="24">
            <router-view />
        </el-col>
        <el-col :md="18" :sm="24">
            <el-table :data="store.albums">
                <el-table-column fixed="left" label="唱片名称">
                    <template #default="scope">
                        <el-tag>
                            <router-link :to="'/albums/' + scope.row.id">{{ scope.row.name }}</router-link>
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="价格" :formatter="priceFormatter"></el-table-column>
                <el-table-column label="地区">
                    <template #default="scope">
                        <el-tag type="warning">{{ scope.row.area }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="删除" #default="scope">
                    <el-popconfirm title="你是否确认删除此唱片？" @confirm="() => delAlbum(scope.row.id)">
                        <template #reference>
                            <el-button type="danger" round>删除</el-button>
                        </template>
                    </el-popconfirm>
                </el-table-column>
                <el-table-column label="删除" #default="scope">
                    <el-button plain @click="updating(scope.row)" type="warning" round>更新</el-button>
                </el-table-column>
            </el-table>
        </el-col>


    </el-row>
    <el-dialog v-model="showUpdate">
        <template #header>
            <h3>更新</h3>
        </template>
        <el-input v-model="current.id" disabled></el-input>
        <span>名字</span>
        <el-input v-model="current.name"></el-input>
        <span>区域</span>
        <el-input v-model="current.area"></el-input>
        <span>价格</span>
        <el-input-number min="0" v-model="current.price"></el-input-number>
        <template #footer>
            <el-button @click="() => showUpdate = false" type="info">取消</el-button>
            <el-button @click="update" type="primary">更新</el-button>
        </template>
    </el-dialog>

    <el-drawer title="添加" v-model="showDrawer" size="50%">
    
        <el-input v-model="newAlbum.name" placeholder="请输入唱片名称"></el-input>
        <el-input v-model="newAlbum.price" placeholder="请输入价格"></el-input>
        <el-input v-model="newAlbum.area" placeholder="请输入地区"></el-input>
        <el-button @click="add" type="primary">添加</el-button>
    </el-drawer>
    <el-drawer size="50%" direction="ltr" v-model="showMore" title="设置">
        
        <el-skeleton style="width: 240px">
            <template #template>
                <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
                <el-empty description="敬请期待" />
                <div style="padding: 14px">
                    <el-skeleton-item variant="p" style="width: 50%" />

                    <div style="
                    display: flex;
                    align-items: center;
                    justify-items: space-between;
                    ">
                        <el-skeleton-item variant="text" style="margin-right: 16px" />
                        <el-skeleton-item variant="text" style="width: 30%" />
                    </div>
                </div>
            </template>
        </el-skeleton>

    </el-drawer>


</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAlbumsStore } from './stores/albums.js'
import { Menu, Headset, InfoFilled } from '@element-plus/icons-vue'
import { ElNotification, ElMessageBox } from 'element-plus'

// const albums=ref([{id:1,name:"john"},{id:2,name:"tom"}])
let showUpdate = ref(false)
let showDrawer = ref(false)
let showMore = ref(false)
let current = ref({})
let newAlbum = ref({ name: 'john', price: 23, area: "内地" })


let store = useAlbumsStore()
let router = useRouter()
store.findAll()


function priceFormatter(row: object, column: object, price: number, index: number) {
    return "￥ " + price
}
function updating(album) {
    showUpdate.value = true
    Object.assign(current.value, album)
}
const update = () => {
    store.update(Object.assign({}, current.value))
    showUpdate.value = false

    ElNotification({
        title: 'Success',
        message: '数据更新成功！',
        type: 'success',
        position: 'top-left',
    })
}

function add() {
    store.add(newAlbum);
    showDrawer.value = false;

    ElNotification({
        title: 'Success',
        message: '您有新的唱片加入！',
        type: 'success',
        position: 'top-left',
    })
}

function delAlbum(id) {
    if (id < 14) {
        ElMessageBox.alert("系统原有数据，做冻结处理，您可删除追加的唱片", "数据冻结")
    }
    else {
        store.deleteAlbum(id)
    }

}

function handleSelect(key: string, keyPath: string[]) {
    switch (key) {
        case "1":
            router.push('/')
            break;
        case "0":
            showMore.value = true;
            break;

    }

}

</script>
<style scoped>
</style>