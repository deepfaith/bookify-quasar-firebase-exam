<template>
  <div class="main-container">
    <div class="note-list-container q-px-sm q-py-sm">
      <q-input v-model="searchTerm" label="Search Notes" class="col-7" />
      <q-select
          clearable="true"
          v-model="searchCategory"
          :options="categories"
          label="Search Category"
          option-label="category"
          option-value="category"
      >

      </q-select>
      <div v-if="computedNotes.length" class="">
        <div
          v-for="note in computedNotes"
          :key="note.id"
          class="block q-py-xs q-px-sm q-mb-sm bg-white"
        >
          <q-chip v-if="note.category" color="orange" text-color="white" icon="star">
            {{ note.category }}
          </q-chip>
          <br>
          <b>{{ note.title }}</b>
          <p>
            {{ note.content.substring(0, 50) }} ...
          </p>
          <div>
            <q-btn-group push>
              <q-btn  @click="viewNote(note)" color="info" label="View" icon="visibility" />
              <q-btn  @click="openNote(note)" color="primary" label="Edit" icon="edit"  />
              <q-btn  @click="deleteNote(note)" color="red" label="Delete" icon="delete"  />
            </q-btn-group>
          </div>
        </div>
      </div>
      <div v-if="!searchTerm && !computedNotes.length" class="text-center">
        <h6>You don't have anything on your list yet.</h6>
      </div>
      <div v-if="searchTerm && !computedNotes.length" class="text-center">
        <h6>No item exist yet.</h6>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  notes: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
  },
  openNote: {
    type: Function,
  },
  viewNote: {
    type: Function,
  },
  deleteNote: {
    type: Function,
  },
});

const searchTerm = ref("");
const searchCategory = ref("");

const computedNotes = computed(() => {
  return props.notes.filter((note) => {
    return searchCategory.value.category ? note.category.toLowerCase().includes(searchCategory.value.category) : true;
  }).filter((note) => {
    return searchTerm.value ? note.title.toLowerCase().includes(searchTerm.value.toLowerCase()) : true;
  });
});
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 60%;
  margin: 100px auto 0;
}

.note-list-container {
  background: #ececec;
}
</style>
