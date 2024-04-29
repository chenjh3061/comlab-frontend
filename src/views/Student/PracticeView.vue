<template>
  <MdEditor :value="value" :handle-change="onChange" />
</template>

<script setup lang="ts">
import MdEditor from "@/plugins/MdEditor.vue";
import { ref } from "vue";

const value = ref();
const onChange = (v: string) => {
  value.value = v;
};
</script>

<style scoped></style>
