import { newPromiseHelper } from 'sql-promise-helper';

export function addPost(context, post) {
  return new Promise((resolve, reject) => {
    if (context.state.startupLoaded) {
      const insertPostQuery = 'INSERT INTO posts (post, datecreated) VALUES (?,?)';
      context.state.database.executeStatement(insertPostQuery, [post, Date.now()])
        .then((result) => {
          console.log(result);
          context.commit('addPost', post);
          resolve(post);
        }, (err) => {
          console.log('Error occurred while inserting post.');
          reject(err);
        });
    } else {
      reject('DB not loaded');
    }
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

export function morePosts(context, offset) {
  if (!offset) {
    offset = 0;
  }
  return new Promise((resolve, reject) => {
    if (context.state.startupLoaded) {
      context.state.database.executeStatement(`SELECT * FROM posts ORDER BY id ASC LIMIT 10 OFFSET ${offset}`, null)
        .then((result) => {
          console.log(result);
          for (let i = 0; i < result.rows.length; i += 1) {
            context.commit('addPost', result.rows.item(i).post);
            console.log(result.rows.item(i));
          }
          resolve();
        }, (err) => {
          console.log('Error occurred while selecting');
          reject(err);
        });
    } else {
      reject('DB not loaded');
    }
  });
}

export function startup(context) {
  return new Promise((resolve, reject) => {
    document.addEventListener('deviceready', () => {
      window.sqlitePlugin.openDatabase({
        name: 'posts.db',
        location: 'default',
      },
      (database) => {
        const helper = newPromiseHelper(database);
        context.commit('setDatabase', helper);
        helper.executeStatement('CREATE TABLE IF NOT EXISTS posts (id integer primary key, post text, datecreated integer)')
          .then(() => {
            console.log('table created successfully');

            // now we need to load the previous posts
            context.commit('setStartupLoaded');
            resolve(helper);
          }, (err) => {
            console.log('Error occurred while creating the table.');
            reject(err);
          });
      },
      (err) => {
        reject(err);
      });
    });
  });
}
