export default {
    props: ["emails", "unReads"],
    template: `
        <section>
        <router-link to="/emails/compose"><button class="email-menu-btn"><i class="fa fa-plus"></i> <span class="new-email-btn"> <span class="email-menu-li-word">NEW</span></span></button></router-link>
        <div class="menu-list">
            <ul>
            <router-link to="/emails/" class="router">
                <li class="email-menu-li" @click="filterReset" ><i class="fa fa-inbox"></i> <span class="email-menu-li-word">Inbox</span> <span class="unread-sum" >{{unReads.length}}</span></li>
            </router-link>
                <li class="email-menu-li" @click="filterSent"><i class="fa fa-share-square"></i> <span class="email-menu-li-word">Sent</span></li>
                <li class="email-menu-li" @click="filterStarred" ><i class="fa fa-star"></i> <span class="email-menu-li-word">Starred</span></li>
                <li class="email-menu-li" @click="filterUnReads"><i class="fa fa-envelope"></i> <span class="email-menu-li-word">UnReads</span></li>
                <li class="email-menu-li" @click="filterReads"><i class="fa fa-envelope-open"></i> <span class="email-menu-li-word">Read</span></li>
            </ul>
        </div>
        </section>
    `,
    data() {
        return {
            emailsM: null,
        }
    },
    methods: {
        emailSelected(email, idx) {
            this.$router.push(`/${idx}`)
        },
        filterUnReads() {
            this.$emit('filterUnReads')
        },
        filterReads() {
            this.$emit('filterReads')
        },
        filterReset() {
            this.$emit('filterReset')
        },
        filterStarred() {
            this.$emit('filterStarred')
        },
        filterSent() {
            this.$emit('filterSent')
        },
    },
    created() {
        this.emailsM = this.emails
    },
}









