<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Quasar-Cordova-Vuex-SQLLite
        </q-toolbar-title>
        <q-btn color="secondary" round dense icon="add" @click="$router.push('addpost')"/>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="q-pa-md">
        <div class="row" v-for="(post, index) in posts" :key="index">
          {{post}}
        </div>
        <div class="row">
          <button @click="update()">CLICK</button>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
</style>

<script>
import { openURL } from 'quasar';

export default {
  name: 'Home',
  data() {
    return {
    };
  },
  computed: {
    posts() {
      return this.$store.state.db.posts;
    },
  },
  methods: {
    openURL,
    update() {
      this.$store.dispatch('db/addPost', 'lol');
    },
  },
  mounted() {
    if (!this.$store.state.db.startupLoaded) {
      this.$store.dispatch('db/startup').then(() => {
        console.log('started');
        this.$store.dispatch('db/morePosts').then(() => {
          console.log('added posts');
        });
      });
    }
  },
};
</script>
