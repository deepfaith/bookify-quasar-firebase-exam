<template>
  <div>
    <div class="overlay"></div>
    <form class="q-px-md q-py-sm shadow-2">
      <div class="row justify-between">
        <q-input v-model="noteTitle" label="Title" class="col-12" />
      </div>
      <q-input
        v-model="noteContent"
        type="textarea"
        label="Content about the note"
      />

      <div class="row justify-between">
        <q-input v-model="noteCategory" label="Category" class="col-12" />
      </div>
      <div class="row">
        <q-btn
          push
          color="red"
          label="Cancel"
          @click="closeModal"
          class="q-px-xl q-py-xs col-2 block q-ml-auto q-mt-md"
        />
        <q-btn
            v-if="!isEdit"
            push
            color="primary"
            label="Add"
            @click="addNote({ title: noteTitle, content: noteContent, category: noteCategory })"
            class="q-px-xl q-py-xs col-2 q-ml-sm block q-mt-md"
            :disable="!noteContent || !noteTitle"
        />
        <q-btn
            v-if="isEdit"
            push
            color="primary"
            label="Update"
            @click="
            updateNote({
              category: noteCategory,
              title: noteTitle,
              content: noteContent,
              id: note.id,
            })
          "
            class="q-px-xl q-py-xs col-2 q-ml-sm block q-mt-md"
            :disable="!noteContent || !noteTitle"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const noteTitle = ref("");
const noteContent = ref("");
const noteCategory = ref("");

const props = defineProps({
  addNote: {
    type: Function,
  },
  updateNote: {
    type: Function,
  },
  deleteNote: {
    type: Function,
  },
  closeModal: {
    type: Function,
  },
  note: {
    type: Object,
  },
  isEdit: {
    type: Boolean,
  },
});

onMounted(() => {
  noteTitle.value = props.note.title ?? "";
  noteContent.value = props.note.content ?? "";
  noteCategory.value = props.note.category ?? "";
});
</script>

<style lang="scss" scoped>
form {
  width: 100%;
  max-width: 600px;
  z-index: 50;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: white;
}

.overlay {
  position: fixed;
  z-index: 30;
  width: 100%;
  height: 100%;
  background: rgba(000, 000, 000, 0.3);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

@media (max-width: $breakpoint-xs-max) {
  form {
    max-width: 90%;
  }
}
</style>
