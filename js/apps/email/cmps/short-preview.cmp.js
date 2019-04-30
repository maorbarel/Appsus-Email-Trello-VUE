export default {
    props: ["email", "index"],
    template: `
    <section class="email-prev-short">
        <div class="prev-txt">
             <div class="from"><span class="bold-txt">From:</span> {{email.from}}</div>
            <div class="subject"><span class="bold-txt">Subject:</span> {{email.subject}}</div>
            <div class="subject"><span class="bold-txt">Body:</span> {{email.body}}</div>
        </div>
            
        <div class="btns-prev">
            <button @click="emailToDelete" class="btn-prev"><i class="fa fa-trash"></i></button>
            <button @click="emitToDetails" class="btn-prev"><i class="fa fa-expand"></i></button>
        </div>

            </section>`
    ,
    methods: {
        emitToDetails() {
            this.$emit('emailIdToDetails', this.email.id)
            this.$router.push(`/emails/${this.email.id}`)
        },
        emailToDelete() {
            this.$emit('emailIdxToDelete', this.index)
        },
    }
}