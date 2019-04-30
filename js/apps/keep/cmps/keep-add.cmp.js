export default {
    template: `
        <section>
            <div class="keep-add">
                <div class="input-add">
                    <input class="placeholder-add" type="text" 
                        :placeholder="placeholder" 
                        v-model="newNote.txt">
                </div>
                <div class="btns">
                    <div :class="{addActive: newNote.isTxt}" class="buttons-add button-add-note" @click="note"><i class="fa fa-font"></i></div>
                    <div :class="{addActive: newNote.isImg}" class="buttons-add" @click="imgNote"><i class="fa fa-image"></i></div>
                    <div :class="{addActive: newNote.isTodo}" class="buttons-add" @click="todoNote"><i class="fa fa-list-ol"></i></div>
                </div>
                <div class="btn-add-trash" @click.stop="cleanInput"><i class="fa fa-trash"></i></div>
                <div class="btn-add" @click.stop="addNote"><i class="fa fa-plus"></i></div>
            </div>
        </section>
    `,
    data() {
        return {
            placeholder: 'Add New Note...',
            newNote: {
                isTxt: true,
                isToDO: false,
                isImg: false,
                txt: '',
                url: '',
                txts: []
            }
        }
    },
    methods: {
        note() {
            this.placeholder = 'Add New Note...'
            this.newNote.isImg = false;
            this.newNote.isTxt = true;
            this.newNote.isToDO = false;
            this.addNote()
        },
        imgNote() {
            this.placeholder = 'Add Image Url...'
            this.newNote.isImg = true;
            this.newNote.isTxt = false;
            this.newNote.isToDO = false;
            this.addNote()
        },
        todoNote() {
            this.placeholder = 'Add ToDo List...'
            this.newNote.isImg = false;
            this.newNote.isTxt = false;
            this.newNote.isToDO = true;
            this.newNote.title = this.newNote.txt
            this.addNote()
        },
        addNote() {
            if (!this.newNote.txt) return;
            this.newNote.url = this.newNote.txt;
            this.$emit('newNote', this.newNote)
        },
        cleanInput() {
            this.newNote.txt = '';
        }
    }
}