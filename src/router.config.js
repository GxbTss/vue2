import Goods from './components/tab/Goods.vue'
import Ratings from './components/tab/Ratings.vue'
import Sellers from './components/tab/Sellers.vue'

export default [{
        path: '/goods',
        component: Goods
    },
    {
        path: '/ratings',
        component: Ratings
    },
    {
        path: '/sellers',
        component: Sellers
    },
    {
        path: '/',
        redirect: '/goods'
    }
]