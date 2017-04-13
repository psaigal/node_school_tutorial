// Here we will learn how to search for documents.

// In this exercise the database name is learnyoumongo.
// So, the url would be something like: mongodb://localhost:27017/learnyoumongo

// Use the parrots collection to find all documents where age
// is greater than the first argument passed to your script.

// Using console.log, print the documents to stdout.

// -------------------------------------------------------------------------------

// ## HINTS

// To connect to the database, one can use something like this:

//     var mongo = require('mongodb').MongoClient
//     mongo.connect(url, function(err, db) {
//       // db gives access to the database
//     })

// To get a collection, one can use db.collection('<collection name>').

// To find a document or documents, one needs to call find() on the collection.

// Find is a little bit different than what we are used to seeing.

// To access the arguments you can use the process.argv array of strings (the first argument is stored at the third position process.argv[2]). To convert to an integer, you could use parseInt()

// Here is an example:

//     collection.find({
//       name: 'foo'
//     }).toArray(function(err, documents) {
    
//     })

// If your program does not finish executing, you may have forgotten to
// close the db. That can be done by calling db.close() after you
// have finished.

// ## Resources:

//   * http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
//   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt

//Solution

var mongo = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/learnyoumongo';


mongo.connect(url, function(err, db) {
  if(err){
    return console.error(err);
  }
  var num = parseInt(process.argv[2]);
  db.collection('parrots',function(err,collection){
    if(err){
      return console.error(err);
    }
    collection.find({
      age: {$gt:num}
    }).toArray(function(err, documents) {
      if(err){
        return console.error(err);
      }
      console.log(documents)
    })
  })
   db.close();
})

