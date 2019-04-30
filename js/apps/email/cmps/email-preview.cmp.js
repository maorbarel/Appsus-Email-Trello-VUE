import shortPreview from './short-preview.cmp.js'

export default {
    props: ["email", "index"],
    template: `
        <section class="cont-preview">
            <li @click="shortPreview">
                <div class="li-email-list" :class="checkIsRead">
                    <div class="email-list-name">{{email.from}}</div>
                    <div class="email-list-subject-body">
                    <div class="email-list-subject">{{email.subject}} </div>
                    <div class="body-limit">{{body}}</div></div>
                    <div class="email-list-time">{{time}}

                        <button 
                        @click.stop="chageStatus" 
                        class="btn-un-read">
                        <i v-if="!isRead" class="fa fa-envelope"></i>
                        <i v-else="isRead" class="fa fa-envelope-open env-unread"></i>
                        </button>

                        <button @click.stop="chageStar" class="btn-un-star">

                        <i v-bind:class="{stared: isStared}" class="fa fa-star un-stared"></i>
                        </button>
                    </div>
                </div>
            </li>

            <short-preview 
                @emailIdToDetails="getIdToDetails"
                @emailIdxToDelete="getIdxToDelete" 
                v-if="isShowPrev" class="short-preview" 
                :email="email" 
                :index="index">
            </short-preview>
        </section>

    `,
    data() {
        return {
            time: null,
            body: null,
            isShowPrev: false,
            isRead: this.email.isRead,
            isStared: this.email.isStared
        }
    },
    methods: {
        getSortTxt() {
            this.body = this.email.body.slice(0, 20) + '...';
        },
        setTime() {
            var timeStemp = this.email.sentAt;
            var hours = new Date(timeStemp).getHours()
            var mins = new Date(timeStemp).getMinutes()
            if (mins < 10) this.time = `${hours}:0${mins}`;
            else this.time = `${hours}:${mins}`;
        },
        shortPreview() {
            this.isShowPrev = !this.isShowPrev
            this.$emit('emailIdToChageStatusRead', this.email.id)
        },
        getIdxToDelete(idx) {
            this.$emit('emailIdxToDelete', idx)
            this.isShowPrev = false;
        },
        getIdToDetails(id) {
            this.$emit('emailIdToDetails', id)
        },
        chageStatus() {
            this.$emit('chageStatus', this.email.id)
        },
        chageStar() {
            this.$emit('chageStar', this.email.id)
        }
    },
    components: {
        shortPreview,

    },
    computed: {
        checkIsRead() {
            if (this.email.isRead) return "isRead"
            else return "isNotRead"
        }
    },
    created() {
        this.setTime()
        this.getSortTxt()
    },
    watch: {
        'email': function () {
            this.isRead = this.email.isRead
            this.isStared = this.email.isStared
        }
    }
}