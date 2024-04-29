<template>
  <div id="app">
    <template v-if="router.currentRoute.value.path.startsWith('/user')">
      <router-view />
    </template>
    <!--    <template v-if="router.currentRoute.value.path.startsWith('/')">-->
    <!--      <router-view />-->
    <!--    </template>-->
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>

<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";

const router = useRouter();
const store = useStore();

/**
 * 全局项目入口
 */
const doInit = () => {
  console.log("hello!");
};

onMounted(() => {
  doInit();
});
</script>
<!--openapi &#45;&#45;input http://localhost:3000/v3/api-docs/default &#45;&#45;output ./generated &#45;&#45;client axios-->
