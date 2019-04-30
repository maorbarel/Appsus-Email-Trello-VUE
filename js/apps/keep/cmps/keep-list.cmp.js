import keepNote from './keep-note.cmp.js'

export default {
    props: ['keeps'],
    template: `
        <section class="notes-list">
            <!-- pinned -->
        <div class="pinned">
                <keep-note          
                    v-for="(keep,index) in keeps" 
                    v-if="keep.isPined" 
                    :keep="keep"
                    @updatedNote="updatedNote1"
                    @updateNote="updateNote"
                    @deleteNoteId="deleteNote">
                </keep-note>
            </div>
            <hr>
            <!-- nonPinned -->
            <div class="unpinned">
                <keep-note  
                    v-for="(keep,index) in keeps" 
                    v-if="!keep.isPined" 
                    :keep="keep"
                    @addTodo="newTodo"
                    @deleteTodoId="deleteTodo"
                    @updatedNote="updatedNote1"
                    @updateNote="updateNote"
                    @deleteNoteId="deleteNote">
                </keep-note>
            </div>
        </section>
    `,
    data() {
        return {
            isPinned: false,
        }
    },
    methods: {
        updateNote(txt, id) {
            this.$emit('updateNote', txt, id)
        },
        deleteNote(id) {
            this.$emit('deleteNoteId', id)
        },
        updatedNote1(note, id) {
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
        keepNote,
    }
}