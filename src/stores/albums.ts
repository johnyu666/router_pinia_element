import AlbumViewVue from '@/views/AlbumView.vue'
import { defineStore } from 'pinia'

interface Album {
    id?: number, name?: string, area?: number, price?: number
}
const url="http://johnyu.cn:3000/albums/"
export const useAlbumsStore = defineStore({
    id: 'albums',
    state: () => ({
        albums: new Array<Album>(),
        selectedAlbum: {}
    }),
    //   getters: {
    //     doubleCount: (state) => state.counter * 2
    //   },
    actions: {
        async load(id:number){
          this.selectedAlbum= await fetch(url+id).then(resp=>resp.json())
            
        },
        async findAll() {
            this.albums = await fetch('http://johnyu.cn:3000/albums').then(resp => resp.json())
        },
        async deleteAlbum(id: number) {
            await fetch('http://johnyu.cn:3000/albums/' + id,{method:"DELETE"}).
            then(resp => resp.json())
            let index = this.albums.findIndex(album => album.id === id)
            this.albums.splice(index, 1)
        },
        async update(current) {
            let alb = await fetch("http://johnyu.cn:3000/albums/" + current.id, {
                method: "PUT", headers: { "Content-type": "application/json" },
                body: JSON.stringify(current)
            }).then(resp => resp.json())
            let index=this.albums.findIndex(album=>album.id===current.id)
            
            this.albums.splice(index,1,alb)
        },
        async add(album){
            let alb=await fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify(album.value)}).then(res=>res.json());
            this.albums.push(alb)

        }
    }
})