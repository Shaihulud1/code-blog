<template>
  <component :is="layout" />
</template>

<script lang="ts">
import Auth from "./layouts/Auth.vue";
import Basic from "./layouts/Basic.vue";
import { useRoute } from "vue-router";

export default {
    name: "App",
    components: { Auth, Basic },
    computed: {
        layout(): string {
            const route = useRoute();
            return route.meta?.layout ? "Auth" : "Basic";
        }
    }
};
</script>

<style>
html,
body {
    min-height: 100%;
}
body {
    background-color: dodgerblue;
}
</style>
