
const mongoose = require('mongoose');

const connection = "mongodb+srv://mentsuyu:d1t1try@cluster0.x6uu2.mongodb.net/hackhaton?retryWrites=true&w=majority";

mongoose.connect(connection, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', () => console.error('connection error:'));
db.once('open', () => {
    console.log('connected')
});


