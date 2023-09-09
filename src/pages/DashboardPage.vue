<template>
  <div>
    <notes-container
        :categories="categories"
        :notes="notes"
        :openNote="openNote"
        :viewNote="viewNote"
        :deleteNote="deleteItem"
    />

    <q-page-sticky
      position="top-right"
      :offset="[40, 18]"
      @click="toggleAddnote = !toggleAddnote"
    >
      <q-btn fab icon="add" color="primary" />
    </q-page-sticky>
    <note-view
        v-if="toggleViewnote"
        :closeViewModal="closeViewModal"
        :note="noteForView"
    />
    <note-form
      :addNote="addItem"
      v-if="toggleAddnote"
      :closeModal="closeModal"
      :note="noteForUpdate"
      :isEdit="isEdit"
      :updateNote="updateItem"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  addNote,
  getNotes,
  updateNote,
  deleteNote, getNote,
} from "../services/note";
import { LocalStorage } from "quasar";
import notesContainer from "../components/NotesContainer.vue";
import noteForm from "../components/NoteForm.vue";
import noteView from "../components/NoteView.vue";

const notes = ref([]);
const categories = ref([]);
const toggleAddnote = ref(false);
const toggleViewnote = ref(false);
const isEdit = ref(false);

const user = LocalStorage.getItem("user");

const noteForUpdate = ref({});
const noteForView = ref({});

onMounted(() => {
  getnotesFromDB();
});

const addItem = (note) => {
  addNote({
    userId: user.uid,
    note: {
      title: note.title,
      content: note.content,
      category: note.category,
    },
  });
  reset();
};

const updateItem = (note) => {
  updateNote({
    userId: user.uid,
    note,
  });
  reset();
};

const deleteItem = (note) => {
  deleteNote({
    userId: user.uid,
    note,
  });
  reset();
};

const getnotesFromDB = async () => {
  notes.value = await getNotes(user.uid).then((notes) => notes);
  categories.value = [{'category':''}, ...notes.value.reduce((prev, {category}) =>
      prev.some(x => x.category === category) ? prev: [...prev, {category}], [])];
};

const getnoteFromDB = async () => {
  getNote({
    userId: user.uid,
    note,
  });
};

const closeModal = () => {
  toggleAddnote.value = false;
  noteForUpdate.value = {};
  isEdit.value = false;
};

const closeViewModal = () => {
  toggleViewnote.value = false;
  noteForView.value = {};
};

const viewNote = (note) => {
  noteForView.value = note;
  toggleViewnote.value = true;
};
const openNote = (note) => {
  isEdit.value = true;
  noteForUpdate.value = note;
  toggleAddnote.value = true;
};

const reset = () => {
  getnotesFromDB();
  closeModal();
};
</script>

<style lang="scss" scoped></style>
