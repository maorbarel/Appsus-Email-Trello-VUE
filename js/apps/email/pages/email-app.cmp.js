import emailList from '../cmps/email-list.cmp.js'
import emailMenu from '../cmps/email-menu.cmp.js'
import emailServices from '../services/email.service.js'

export default {
    template: `
                <section class="email-app">
                <br/> <br/>
                <input v-if="emails" class="search-input-email" v-model="input" @keyup="setFilterd" type="text" placeholder="Search A email...">
                <email-menu @filterUnReads="filterUnReads" 
                            @filterStarred="filterStarred"
                            @filterReset="filterReset"
                            @filterReads="filterReads"
                            @filterSent="filterSent"

                            v-if="unReads" 
                            class="email-menu" 
                            :unReads="unReads" 
                            :emails="filtered"></email-menu>

                <router-view @emailToDelete="deleteEmail"
                             @sortFrom="sortFrom"
                             @sortDate="sortDate"
                             @selectEmail="emailSelected" 
                             @emailToChangeStatusRead="emailChangeStatusRead" 
                             @emailSended="setEmails"
                             @chageStatus="getIdTochageStatus"
                             @chageStar="getIdTochageStar"
                             :emails="filtered"></router-view>

                    <!-- <email-list @emailToDelete="deleteEmail" @selectEmail="emailSelected" :emails="emails"></email-list> -->
                </section>`,
    data() {
        return {
            emails: null,
            unReads: null,
            filtered: null,
            input: "",
            isSent: null,
            isInbox: true,
            isUnReads: null,
            isReads: null,
            isStared: null,
        }
    },
    methods: {
        setEmails() {
            emailServices.getEmails().then(emails => {
                this.emails = emails
                this.unReads = this.getUnread(emails)
                if (this.isInbox) this.filtered = emails;
                if (this.isSent) this.filterSent()
                if (this.isUnReads) this.filterUnReads()
                if (this.isReads) this.filterReads()
                if (this.isStared) this.filterStarred()
            })
        },
        getUnread(emails) {
            var unReads = emails.filter(email => !email.isRead)
            return unReads
        },
        emailSelected(idx) {
            this.$router.push(`/emails/${idx}`)
        },
        deleteEmail(idx) {
            emailServices.deleteEmailByIdx(idx)
            this.setEmails()
        },
        emailChangeStatusRead(idx) {
            emailServices.changeStatusEmailReadByIdx(idx)
            this.setEmails()
        },
        getIdTochageStatus(id) {
            emailServices.changeStatus(id)
            this.setEmails()
        },
        getIdTochageStar(id) {
            emailServices.chageStar(id)
            this.setEmails()
        },
        setFilterd() {
            if (!this.input) {
                this.filtered = this.emails
                return;
            } else {
                this.filtered = []
                this.filtered = this.emails.filter(email => {
                    var txt = email.subject.toLowerCase()
                    var inp = this.input.toLowerCase()
                    return txt.includes(inp)
                })
            }
        },
        filterUnReads() {
            this.filtered = this.emails.filter(email => !email.isRead)
            this.isSent = false;
            this.isInbox = false;
            this.isUnReads = true;
            this.isReads = false;
            this.isStared = false;
        },
        filterReads() {
            this.filtered = this.emails.filter(email => email.isRead)
            this.isSent = false;
            this.isInbox = false;
            this.isUnReads = false;
            this.isReads = true;
            this.isStared = false;
        },
        filterReset() {
            this.filtered = this.emails
            this.isSent = false;
            this.isInbox = true;
            this.isUnReads = false;
            this.isReads = false;
            this.isStared = false;
        },
        filterStarred() {
            this.filtered = this.emails.filter(email => email.isStared)
            this.isSent = false;
            this.isInbox = false;
            this.isUnReads = false;
            this.isReads = false;
            this.isStared = true;
        },
        filterSent() {
            this.filtered = this.emails.filter(email => !email.isInbox)
            this.isSent = true;
            this.isInbox = false;
            this.isUnReads = false;
            this.isReads = false;
            this.isStared = false;
        },
        sortFrom() {
            emailServices.sortFrom()
            this.setEmails()
        },
        sortDate() {
            emailServices.sortDate()
            this.setEmails()
        }
    },
    components: {
        emailList,
        emailMenu,
    },
    created() {
        this.setEmails()
    },
}
