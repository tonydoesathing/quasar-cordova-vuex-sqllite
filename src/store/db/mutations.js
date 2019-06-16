
export function addPost(state, post) {
  state.posts.unshift(post);
}

export function setDatabase(state, db) {
  state.database = db;
}

export function setStartupLoaded(state) {
  state.startupLoaded = true;
}
