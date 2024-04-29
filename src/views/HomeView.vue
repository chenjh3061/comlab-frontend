<template>
  <div class="home">欢迎来到计算机系实验管理平台</div>
  <a-card>
    <a-calendar v-model="value" />
    select: {{ value }}
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "HomeView",
  setup() {
    const value = ref<string | Date>(new Date());
    return value;
  },
});
</script>
