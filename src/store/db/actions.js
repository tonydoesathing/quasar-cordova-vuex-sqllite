
export function addPost(context, post) {
  return new Promise((resolve) => {
    context.commit('addPost', post);
    resolve(post);
  });
}

export function getPost(context, id) {
  return new Promise((resolve, reject) => {
    // check to see if in store
    const post = context.state.posts[id];
    if (post) {
      resolve(post);
    } else {
      // if it isn't
      // get from database if there
      // then add to posts
      reject(new Error('not in posts'));
    }
  });
}
