import utilsServices from './utils.service.js';
import storageServices from './storage.service.js'

export default {
  getKeep,
  updateNote,
  deleteNote,
  addNote,
  updatedNote,
  addTodo,
  removeTodo,
}

const KEEPS = 'keeps'
var gKeeps = [
  { title: 'My Todo App!', id: utilsServices.makeId(), txts: [], txt: 'im1', bgColor: 'rgb(250, 253, 209)', isPined: false, isImg: false, isToDO: false, isTxt: true, date: Date.now() },
  { title: 'My Todo App!', id: utilsServices.makeId(), txts: [], txt: 'im2', bgColor: 'rgb(250, 253, 209)', isPined: false, isImg: false, isTxt: true, date: Date.now(), isToDO: false },
  { title: 'My Todo App!', id: utilsServices.makeId(), txts: [], txt: 'im3', bgColor: 'rgb(250, 253, 209)', isPined: false, isImg: false, isTxt: true, date: Date.now(), isToDO: false },
  { title: 'My Todo App!', id: utilsServices.makeId(), txts: [], txt: 'im4', bgColor: 'rgb(250, 253, 209)', isPined: false, isImg: true, isTxt: false, date: Date.now(), isToDO: false, url: "https://files.brightside.me/files/news/part_4/46555/209005-3439210-1000-1446450434antarctic-1000-20e3fa6395-1484729696.jpg" },
  { title: 'My Todo App!', id: utilsServices.makeId(), txts: [], txt: 'im5', bgColor: 'rgb(250, 253, 209)', isPined: false, isImg: false, isTxt: true, date: Date.now(), isToDO: false },
  {
    title: 'My Todo App!',
    id: utilsServices.makeId(),
    txt: 'My Todo App!',
    txts: [{ id: utilsServices.makeId(), txt: '1' }],
    bgColor: 'rgb(250, 253, 209)',
    isToDO: true,
    isPined: false,
    isImg: false,
    isTxt: false,
    date: Date.now()
  }
]

function removeTodo(keepId, id) {
  var keeps = storageServices.load(KEEPS)
  var todosIdx;
  var todoIdx;
  keeps.filter((keep, index) => {
    if (keep.id === keepId) todosIdx = index
  })
  var todosObj = keeps[todosIdx]
  todosObj.txts.filter((todo, index) => {
    if (todo.id === id) todoIdx = index
  })
  keeps[todosIdx].txts.splice(todoIdx, 1)
  storageServices.store(KEEPS, keeps)
}

function addTodo(todo, id) {
  var newToDo = {
    id: utilsServices.makeId(),
    txt: todo,
  }
  var keeps = storageServices.load(KEEPS)
  var idx;
  keeps.filter((keep, index) => {
    if (keep.id === id) idx = index
  })
  keeps[idx].txts.push(newToDo)
  storageServices.store(KEEPS, keeps)
}

function updatedNote(note, id) {
  var keeps = storageServices.load(KEEPS)
  keeps.map(keep => {
    if (keep.id === id) {
      keep.txts = note.txts
      keep.txt = note.txt;
      keep.bgColor = note.bgColor
      keep.isPined = note.isPined
      keep.isImg = note.isImg
      keep.isTxt = note.isTxt
      keep.isToDO = note.isToDO
    }
  })
  storageServices.store(KEEPS, keeps)
}

function addNote(note) {
  if (!note.txt) return;

  var newNote = {
    id: utilsServices.makeId(),
    txt: note.txt,
    bgColor: 'rgb(250, 253, 209)',
    isToDO: note.isToDO,
    isPined: false,
    isImg: note.isImg,
    isTxt: note.isTxt,
    isToDO: note.isToDO,
    date: Date.now(),
    url: note.url,
    txts: [],
    title: note.txt
  }
  var keeps = storageServices.load(KEEPS)
  keeps.unshift(newNote)
  storageServices.store(KEEPS, keeps)
}

function getKeep() {
  var keeps = storageServices.load(KEEPS)
  if (!keeps) {
    storeToStorage();
    keeps = storageServices.load(KEEPS);
    return Promise.resolve(keeps);
  } else return Promise.resolve(keeps)
}

function storeToStorage() {
  storageServices.store(KEEPS, gKeeps)
}

function updateNote(txt, id) {
  var keeps = storageServices.load(KEEPS)
  keeps.map(keep => {
    if (keep.id === id) keep.txt = txt
  })
  storageServices.store(KEEPS, keeps)
}

function deleteNote(id) {
  var keeps = storageServices.load(KEEPS)
  var idx;
  keeps.map((keep, index) => {
    if (keep.id === id) idx = index;
  })
  keeps.splice(idx, 1)
  storageServices.store(KEEPS, keeps)
}