
export function addPost(context, post) {
  return new Promise((resolve, reject) => {
    if (context.state.startupLoaded) {
      context.state.database.transaction((transaction) => {
        const insertPostQuery = 'INSERT INTO posts (post, datecreated) VALUES (?,?)';
        transaction.executeSql(insertPostQuery, [post, Date.now()],
          (tx, result) => {
            console.log(tx);
            console.log(result);
            context.commit('addPost', post);
            resolve(post);
          },
          (error) => {
            console.log(error);
            reject('Error occurred while inserting post.');
          });
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
      context.state.database.transaction((transaction) => {
        const selectQuery = `SELECT * FROM posts ORDER BY id ASC LIMIT 10 OFFSET ${offset}`;
        transaction.executeSql(selectQuery, [],
          (tx, result) => {
            console.log(tx);
            console.log(result);
            for (let i = 0; i < result.rows.length; i += 1) {
              context.commit('addPost', result.rows.item(i).post);
              console.log(result.rows.item(i));
            }
            resolve();
          },
          (error) => {
            console.log(error);
            reject('Error occurred while selecting.');
          });
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
        context.commit('setDatabase', database);
        database.transaction((transaction) => {
          transaction.executeSql('CREATE TABLE IF NOT EXISTS posts (id integer primary key, post text, datecreated integer)', [],
            (/* tx, result */) => {
              // console.log(tx);
              // console.log(result);
              console.log('table created successfully');

              // now we need to load the previous posts
              context.commit('setStartupLoaded');
              resolve(database);
            },
            (error) => {
              console.log(error);
              reject('Error occurred while creating the table.');
            });
        });
      },
      (err) => {
        reject(err);
      });
    });
  });
}
