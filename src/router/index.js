import VueRouter from "vue-router"
import Login from "../components/Login"
import Register from "../components/Register"
import Ceritifity from "../components/user/Ceritifi"
import Userindex from "../components/user/Index"
import Favorites from "../components/user/Favorites"
import Orders from "../components/user/Orders"
import List from "../components/user/List"
import Admin from "../components/admin/Index"
import Workindex from "../components/work/Index"
import Index from "../components/Index"
import Examine from "../components/admin/List"
import Accusation from "../components/admin/Accusation"
import Backlist from "../components/admin/Backlist"
export default new VueRouter({
    routes: [
        {
            path: '/',
            component: Index
        },
        {
            path: '/workindex',
            component: Workindex
        },
        {
            path: '/admin',
            component: Admin
        },
        {
            path: '/list',
            component: List
        },
        {
            path:'/orders',
            component:Orders


        },
        {
            path: '/favorites',
            component: Favorites
        },
        {
            path: '/user',
            component: Userindex
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register

        },
        {
            path: '/Certifity',
            component: Ceritifity 

        },
                {
            path: '/Accusation',
            component: Accusation

        },          
             {
            path: '/Examine',
            component: Examine

        },
        {
            path: '/Backlist',
            component: Backlist
        }

    ]
})