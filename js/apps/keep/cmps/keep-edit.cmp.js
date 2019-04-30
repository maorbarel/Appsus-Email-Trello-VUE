export default {
    props: ["keep"],
    template: `
        <section v-if="keep" class="keep-edit">
            <!-- <div class="keep-edit"> -->
            <div class="bts-keep-edit">
                <button v-if="!keep.isToDO" @click="isPinedNote"><i class="fa fa-map-pin"></i></button>
                <button @click="colorNote"><i class="fa fa-paint-brush"></i></button>
                <div v-if="isColor" class="choose-color"> 
                    <div @click="updateNote('#ffa6a6')" class="bg-red" value="red"></div>
                    <div @click="updateNote('#a6beff')" class="bg-blue" value="blue"></div>
                    <div @click="updateNote('#fff9a6')" class="bg-yellow" value="yellow"></div>
                    <div @click="updateNote('#ffa6f3')" class="bg-pink" value="pink"></div>
                    <div @click="updateNote('#adffa6')" class="bg-green" value="green"></div>
                </div>
                <button @click="deleteNote"><i class="fa fa-trash"></i></button>
            </div>
        </section>`,
    data() {
        return {
            isColor: false,
            noteModifaid: {
                url: this.keep.url,
                isPined: this.keep.isPined,
                isImg: this.keep.isImg,
                isTxt: this.keep.isTxt,
                isToDO: this.keep.isToDO,
                bgColor: this.keep.bgColor,
                txt: this.keep.txt,
                txts: this.keep.txts
            }
        }
    },
    methods: {
        deleteNote() {
            this.$emit('deleteNoteId', this.keep.id)
        },
        colorNote() {
            this.isColor = !this.isColor;
        },
        updateNote(color) {
            this.isColor = false;
            if (color) this.noteModifaid.bgColor = color; {
                this.$emit('updatedNote', this.noteModifaid, this.keep.id)
            }
        },
        isPinedNote() {
            this.noteModifaid.isPined = !this.noteModifaid.isPined
            this.$emit('updatedNote', this.noteModifaid, this.keep.id)
        }
    }
}