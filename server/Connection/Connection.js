const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const URI = "mongodb+srv://root:heeroes@@ex-318@@clusterapi.emxz4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = mongoose.connect (URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connectDB  = async () => {
    await mongoose.connect(err => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        client.close();
      });
}
module.exports = connectDB;




