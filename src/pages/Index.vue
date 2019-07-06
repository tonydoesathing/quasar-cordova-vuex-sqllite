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
          <h2>{{post.post}}</h2>
          <h3 v-for="(tag, i) in post.tags" :key="i">{{tag}}</h3>

        </div>
        <div class="row">
          <button @click="update()">CLICK</button>
          <button @click="showFives()">Show fives</button>
          <div class="row" v-for="(post, index) in fives" :key="index">
            <h2>{{post.post}}</h2>
            <h3 v-for="(tag, i) in post.tags" :key="i">{{tag}}</h3>
          </div>
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
      fives: [],
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
    showFives() {
      this.$store.dispatch('db/getWordsWithFive').then((posts) => {
        console.log(posts);
        this.fives = posts;
      });
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
