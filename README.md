# quasar-cordova-vuex-sqllite
Simple SQLLite implementation with Quasar and Cordova


# setup and running
`npm install`

cd into src-cordova and `cordova platform add android`

cd back  into main folder and `quasar dev -m cordova -T android`

# what's happening
So basically there's two pages: a home screen, which displays posts, and an add post screen, where you can add posts.

These posts get stored locally in an SQLLite database and called into the Vue store as needed.

This is useful because in a real application, you can't just load the entire database into the store, as that would be slow and expensive. This allows for streaming into the store; and maybe some kind of timer can be used to cleanup unused items.