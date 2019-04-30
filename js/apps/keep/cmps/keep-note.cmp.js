import keepEdit from './keep-edit.cmp.js'
import keepTodo from './keep-todo.cmp.js'

export default {
    props: ["keep"],
    template: `
        <section v-if="keep" >
            <!-- if its txt -->
            <div v-if="keep.isTxt">
                <div class="keep-note" v-bind:style="{ backgroundColor: keep.bgColor}">
                    <div class="note-header">{{time}}</div>
                    <div class="note-body">
                        <div v-if="!isEdit" @click="editTxt">{{keep.txt}}</div>
                        <div v-else>
                        <textarea class="edit-input" type="text" v-model="newTxt" cols="30" ></textarea>
                        <button @click="updateNote">DONE</button>
                        </div>
                    </div>
                        <keep-edit :keep="keep"
                                @updatedNote="updatedNote"
                                @deleteNoteId="deleteNote">
                        </keep-edit>
                </div>
            </div>
            <!-- if its img -->
        <div v-else-if="keep.isImg">
        <div class="keep-note" v-bind:style="{ backgroundColor: keep.bgColor}">
                    <div class="note-header">{{time}}</div>
                    <div class="note-body">
                    <img class="keep-img" v-bind:src="keep.url" >
                    </div>
                        <keep-edit :keep="keep"
                                @updatedNote="updatedNote"
                                @deleteNoteId="deleteNote">
                        </keep-edit>
                </div>
            </div>
        </div>
        <div v-if="keep.isToDO">
            <keep-todo @deleteNoteId="deleteNote"
                       @updatedNote="updatedNote"
                       @deleteTodoId="deleteTodo" 
                       @addTodo="newTodo" 
                       :keep="keep">
            </keep-todo>
        </div>
        </section>`,
    data() {
        return {
            isEdit: false,
            time: '',
            newTxt: this.keep.txt,
        }
    },
    methods: {
        getTime() {
            var timeStemp = this.keep.date;
            var hours = new Date(timeStemp).getHours()
            var mins = new Date(timeStemp).getMinutes()
            if (mins < 10) this.time = `${hours}:0${mins}`;
            else this.time = `${hours}:${mins}`;
        },
        editTxt() {
            this.isEdit = !this.isEdit
        },
        updateNote() {
            this.isEdit = false
            this.$emit('updateNote', this.newTxt, this.keep.id)
        },
        deleteNote(id) {
            this.$emit('deleteNoteId', id)
        },
        updatedNote(note, id) {
            note.txt = this.newTxt
            this.$emit('updatedNote', note, id)
        },
        newTodo(todo, id) {
            this.$emit('addTodo', todo, id)
        },
        deleteTodo(keepId, id) {
            this.$emit('deleteTodoId', keepId, id)
        }
    },
    components: {
        keepEdit,
        keepTodo
    },
    computed: {
        setTxt() {
            this.newTxt = this.keep.txt
        }
    },
    created() {
        if (this.keep) this.getTime()
    },
    watch: {
        'keep': function () {
            this.newTxt = this.keep.txt
        }
    }
}