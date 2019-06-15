<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          {{meow}}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="flex flex-center">
        <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
        <button @click="update()">CLICK</button>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
</style>

<script>
import { openURL } from 'quasar';

export default {
  name: 'PageIndex',
  data() {
    return {
    };
  },
  computed: {
    meow() {
      return this.$store.state.db.meow;
    },
  },
  methods: {
    openURL,
    update() {
      this.$store.dispatch('db/updateMeow', 'lol');
    },
  },
};
</script>
