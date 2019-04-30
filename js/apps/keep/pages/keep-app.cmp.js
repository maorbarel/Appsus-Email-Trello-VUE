import keepList from '../cmps/keep-list.cmp.js'
import keepAdd from '../cmps/keep-add.cmp.js'
import keepServices from '../services/keep.service.js'

export default {
    template: `
        <section class="keep-app">
        <br/><br/>
        <input class="search-input" v-if="keeps" v-model="input" @keyup=setFilterd type="text" placeholder="Search A note...">
            <div class="header">
                <keep-add @newNote="addNewNote"></keep-add>
            </div>
            <div class="body">
                <keep-list v-if="keeps" 
                    :keeps="filtered"
                    @addTodo="addNewToDo"
                    @deleteTodoId="deleteTodo"
                    @updatedNote="updatedNote1"
                    @updateNote="updateNote"
                    @deleteNoteId="deleteNote">
                </keep-list>
            </div>
        </section>`,
    data() {
        return {
            keeps: null,
            filtered: null,
            input: "",
        }
    },
    methods: {
        updateNote(txt, id) {
            keepServices.updateNote(txt, id)
            this.setKeeps()
        },
        updatedNote1(note, id) {
            keepServices.updatedNote(note, id)
            this.setKeeps()
        },
        deleteNote(id) {
            keepServices.deleteNote(id)
            this.setKeeps()
        },
        setKeeps() {
            keepServices.getKeep().then(keeps => {
                this.keeps = keeps
                this.filtered = keeps
            })
        },
        addNewNote(note) {
            keepServices.addNote(note)
            this.setKeeps()
        },
        addNewToDo(todo, id) {
            keepServices.addTodo(todo, id)
            this.setKeeps()
        },
        deleteTodo(keepId, id) {
            keepServices.removeTodo(keepId, id)
            this.setKeeps()
        },
        setFilterd() {
            this.filtered = []
            this.filtered = this.keeps.filter(keep => {
                var txt = keep.txt.toLowerCase()
                var inp = this.input.toLowerCase()
                return txt.includes(inp)
            })
        }
    },
    components: {
        keepList,
        keepAdd,
    },
    created() {
        this.setKeeps()
    }
}
