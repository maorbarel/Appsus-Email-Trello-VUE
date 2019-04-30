import emailApp from '../js/apps/email/pages/email-app.cmp.js'
import emailDetails from './apps/email/pages/email-details.cmp.js'
import emailCompose from './apps/email/pages/email-compose.cmp.js'
import emailList from './apps/email/cmps/email-list.cmp.js'
import keepApp from './apps/keep/pages/keep-app.cmp.js'
import homePage from './pages/home-page.cmp.js'

const routes = [
    { path: '/', component: homePage },
    {
        path: '/emails', component: emailApp, children: [
            { path: '', component: emailList },
            { path: 'compose', component: emailCompose },
            { path: ':emailId', component: emailDetails }
        ]
    },
    { path: '/keep', component: keepApp },
]
export default routes;