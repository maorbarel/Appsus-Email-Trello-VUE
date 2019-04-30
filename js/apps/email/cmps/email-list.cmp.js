import emailPreview from './email-preview.cmp.js'

export default {
    props: ['emails'],
    template: `
    <!-- @click.native="selectEmail(email, email.id)" -->
        <ul class="email-list-container">
            <li class="title-email-list"> 
                <div class="title-email-list-1" @click="sortFrom">from</div>
                <div class="title-email-list-1">subject</div>
                <div class="title-email-list-1" @click="sortDate">time</div>
            </li>
            <email-preview  
                            @chageStar="getIdTochageStar"
                            @chageStatus="getIdTochageStatus"
                            @emailIdToChageStatusRead="getIdToChangeStatusRead"
                            @emailIdToDetails="getIdToDetails"
                            @emailIdxToDelete="getIdxToDelete"
                            v-for="(email,index) in emailsToShow" 
                            :email="email" 
                            :index="index"
                            :key="index">
            </email-preview>
        </ul>
    `,
    data() {
        return {
            emailsToShow: null,
        }
    },
    methods: {
        getIdTochageStatus(id) {
            this.$emit('chageStatus', id)
        },
        getIdTochageStar(id) {
            this.$emit('chageStar', id)
        },
        getIdToChangeStatusRead(idx) {
            this.$emit('emailToChangeStatusRead', idx)
        },
        getIdxToDelete(idx) {
            this.$emit('emailToDelete', idx)
        },
        getIdToDetails(id) {
            this.$emit('selectEmail', id)
        },
        sortFrom() {
            this.$emit('sortFrom')
        },
        sortDate() {
            this.$emit('sortDate')
        }
    },
    components: {
        emailPreview,
    },
    created() {
        this.emailsToShow = this.emails
    },
    watch: {
        'emails': function () {
            this.emailsToShow = this.emails
        }
    }
}









