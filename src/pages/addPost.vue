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
        <q-btn color="secondary" round dense icon="add" @click="addPost()"/>
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
    };
  },
  methods: {
    addPost() {
      this.$store.dispatch('db/addPost', this.postText).then(() => {
        this.postText = '';
      });
    },
  },
};
</script>

<style>
</style>
