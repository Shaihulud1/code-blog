<template>
  <component :is="layout" />
</template>

<script lang="ts">
import { provide } from 'vue'
import Auth from "./layouts/Auth.vue";
import Basic from "./layouts/Basic.vue";
import { useRoute } from "vue-router";
import apolloClient from './apollo'
import { ApolloClients } from '@vue/apollo-composable'
export default {

    name: "App",
    components: { Auth, Basic },
    setup() {
        provide(ApolloClients, {
            default: apolloClient,
        })
        document.title = 'Админ панель'
    },
    computed: {
        layout(): string {
            const route = useRoute();
            return route.meta?.layout ? "Auth" : "Basic";
        },

    }
};
</script>

<style lang="scss">
html,
body {
    background-color: $mainBGColor;
    min-height: 100%;
    color: $textColor;
    margin: auto;
    font-family: 'Roboto Condensed', sans-serif;
}
.vi {
    &-text {
        color: $textColor;
    }
    &-title {
        color: $titleColor;
    }
}
</style>
