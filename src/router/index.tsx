import { json } from 'stream/consumers'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookView from '../views/BookView.vue'
import BookDetail from '../views/BookDetail.vue'
import AlbumView from '../views/AlbumView.vue'

// const Book={
//   render:(props)=>{
//     return <h1>Book:{props.$route.params.id}</h1>
//   }
// }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/book/:id',
      name: 'book',
      components:{
        default:BookView,
        detail:BookDetail
      }
    },
    {
      path: '/albums/:id',
      name: 'albums',
      component: AlbumView,
      props:true
    }
  ]
})

export default router
