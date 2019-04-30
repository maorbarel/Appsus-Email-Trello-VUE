import keepEdit from './keep-edit.cmp.js'

export default {
    props: ['keep'],
    template: `
       <section>
       <div class="keep-note" 
            v-bind:style="{ backgroundColor: keep.bgColor}">
                <div class="note-header"> {{time}} </div>
                <h1 class="title-to-do">{{keep.title}}</h1>
                <!-- the input for txt-> -->
                <input @keydown.enter="addTodo" class="input-to-do" placeholder="New todo" v-model="newTodoText" type="text">
                    <div class="note-body-todo">
                        <ul v-if="keep">
                            <li v-for="txt in keep.txts" class="txt-to-do">
                            <div class="note-body-li" >
                                <div>{{txt.txt}}</div>
                                    <div><button @click="removeTodo(keep.id,txt.id)" class="x-to-do"><i class="fa fa-times"></i></button></div>
                                </div>
</li>
                        </ul>
                    </div>
            <keep-edit :keep="keep"
            @updatedNote="updatedNote"
            @deleteNoteId="deleteNote"
            >
            </keep-edit>
        </div>
        </section>
    `,
    data() {
        return {
            newTodoText: '',
            time: null,
        }
    },
    methods: {
        addTodo() {
            const trimmedText = this.newTodoText.trim()
            if (trimmedText) {
                this.$emit('addTodo', trimmedText, this.keep.id)
                this.newTodoText = ''
            }
        },
        removeTodo(keepid, id) {
            this.$emit('deleteTodoId', keepid, id)
        },
        deleteNote(id) {
            this.$emit('deleteNoteId', id)
        },
        getTime() {
            var timeStemp = this.keep.date;
            var hours = new Date(timeStemp).getHours()
            var mins = new Date(timeStemp).getMinutes()
            if (mins < 10) this.time = `${hours}:0${mins}`;
            else this.time = `${hours}:${mins}`;
        },
        updatedNote(note, id) {
            this.$emit('updatedNote', note, id)
        }
    },
    components: {
        keepEdit,
    },
    created() {
        this.getTime()
    },
}