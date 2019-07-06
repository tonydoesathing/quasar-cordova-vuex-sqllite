<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn color="secondary" round dense icon="arrow_back" @click="$router.go(-1)"/>
        <q-toolbar-title>
          Add Post
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page class="q-pa-md">
        <q-input v-model="postText" label="Post Text" />
        <q-select
          label="Tags"
          v-model="tags"
          use-chips
          multiple/>
        <div class="row q-pa-md float-right">
          <q-btn color="secondary" round icon="add" @click="addPost()"/>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'AddPost',
  data() {
    return {
      postText: '',
      tags: ['wow', 'lol', 'hamster'],
    };
  },
  methods: {
    addPost() {
      const post = {
        post: this.postText,
        tags: this.tags,
      };
      this.$store.dispatch('db/addPost', post).then(() => {
        this.postText = '';
        this.tags = [];
        this.$router.go(-1);
      });
    },
  },
};
</script>

<style>
</style>
