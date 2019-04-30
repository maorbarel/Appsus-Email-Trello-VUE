import emailServices from '../services/email.service.js'

export default {
    template: `
        <section v-if="email" class="email-details-container">  
        <router-link to="/emails/"><button class="btn-x-Contact"><i class="fa fa-times-circle"></i></button></router-link> 
                <h1 class="email-details-title">email-details</h1>
                <div class="email-details-info-container">
                    <div class="email-details-info">from: {{email.from}}</div>
                    <div class="email-details-info">title: {{email.subject}}</div>
                    <div class="email-details-info">sent at: {{time}}</div>
                    <div class="email-details-info">body: {{email.body}}</div>
                </div>
        </section>
        `,
    data() {
        return {
            email: null,
            emails: null,
            timeSend: null,
            time: null,
        }
    },
    methods: {
        getEmail(id) {
            emailServices.getEmailById(id).then(email => {
                this.email = email;
                this.getTime()
            })
        },
        getTime() {
            var timeStemp = this.email.sentAt;
            var hours = new Date(timeStemp).getHours()
            var mins = new Date(timeStemp).getMinutes()
            this.time = `${hours}:${mins}`
        },
    },
    created() {
        const emailId = this.$route.params.emailId
        this.getEmail(emailId)
    },
}
