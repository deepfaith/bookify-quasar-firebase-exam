<template>
  <div>
    <div class="overlay"></div>
    <form class="q-px-md q-py-sm shadow-2">

      <h5>{{ noteTitle }}</h5>
      <p>
        {{ noteContent }}
      </p>
      <div class="row">
        <q-btn
          push
          color="red"
          label="Cancel"
          @click="closeViewModal"
          class="q-px-xl q-py-xs col-2 block q-ml-auto q-mt-md"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const noteTitle = ref("");
const noteContent = ref("");

const props = defineProps({
  closeViewModal: {
    type: Function,
  },
  note: {
    type: Object,
  }
});

onMounted(() => {
  noteTitle.value = props.note.title ?? "";
  noteContent.value = props.note.content ?? "";
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
