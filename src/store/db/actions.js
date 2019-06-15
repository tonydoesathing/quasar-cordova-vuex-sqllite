
export function addPost(context, post) {
  return new Promise((resolve) => {
    context.commit('addPost', post);
    resolve();
  });
}
