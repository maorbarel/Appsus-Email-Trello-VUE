import emailServices from '../services/email.service.js'
import emailMenu from '../cmps/email-menu.cmp.js';

export default {
    template: `
        <section class="email-conteiner">
        <router-link to="/emails/"><button class="btn-x-Contact"><i class="fa fa-times-circle"></i></button></router-link>
                <section class="email-new-masagge">
                    <h4 class="new-email-txt-title">New massage</h4> 
                    <form action="../index.html" method="post" class="message">
                        <div class="new-email-filed">
                            <h6 class="new-email-txt">To:</h6>
                            <input  v-model="newEmail.from" class="mailName" type="text" placeholder="name@example.com" required />
                        </div>
                        <div class="new-email-filed">
                            <h6 class="new-email-txt">Subject:</h6>
                            <input v-model="newEmail.subject" class="mailSubject" type="text" placeholder="type subject here" required />
                        </div>
                        <div class="new-email-filed">
                            <h6 class="new-email-txt">Text: </h6>
                            <textarea v-model="newEmail.body" class="mailTxt" placeholder="type massage text here"></textarea>
                        </div>
                        
                        <button @click="emailSend" tag="a"> <input class="btn-Contact" type="button" value="Send" /></button>
                        <!-- <router-link to="/emails/"> <input class="btn-Contact" type="button" value="Send" @click="emailSend" /></router-link> -->
                    </form>
                </section>
        </section>
        `,
    data() {
        return {
            emails: null,
            newEmail: {
                from: '',
                subject: '',
                body: '',
            }
        }
    },
    methods: {
        setEmails() {
            emailServices.getEmails().then(emails => {
                this.emails = emails
            })
        },
        emailSend() {
            emailServices.newEmail(this.newEmail)
            this.setEmails()
            this.$emit('emailSended')
            this.$router.push('/emails/')
        },
    },
    components: {
        emailMenu
    },
}
