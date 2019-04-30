import navBar from './cmps/nav-bar.cmp.js'
import myRoutes from './routes.js'

Vue.use(VueRouter);
const myRouter = new VueRouter({ routes: myRoutes })

window.vueApp = new Vue({
    el: '#app',
    router: myRouter,
    components: {
        navBar,
    }
})