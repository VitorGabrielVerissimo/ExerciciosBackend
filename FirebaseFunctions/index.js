const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.onMovieCreate = functions .database
.ref('movies/{movieId}') .onCreate((snapshot, context) => {
const json = snapshot.val(); const key = context.params.movieId;
const log = Object.assign({ createdAt: context.timestamp }, json);
        return admin
            .database()
.ref(`/logsCreated/${key}`)
            .set(log);
});

exports.onMovieDelete = functions .database
.ref('movies/{movieId}') .onDelete((snapshot, context) => {
const json = snapshot.val(); const key = context.params.movieId;
const log = Object.assign({ deletedAt: context.timestamp }, json);
        return admin
            .database()
.ref(`/logsDeleted/${key}`)
            .set(log);
});
