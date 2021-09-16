const mongodb = require('mongodb');

// URI for MongoDB Atlas
const uri = 'mongodb://ecommercemongo123:Y9atvLlbzO9HFz6o7EZ3HMtQQVzoHRa8wvys61LhLy7AFAtlnapMrqyIuWPeW1HgNy9WgZ9AlL3CIk4L18Vfvw==@ecommercemongo123.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@ecommercemongo123@';

module.exports = function (context, req) {
  context.log('Running');
  mongodb.MongoClient.connect(uri, function(error, client) {
    if (error) {
      context.log('Failed to connect');
      context.res = { status: 500, body: res.stack }
      return context.done();
    }
    context.log('Connected');

    client.db('organic').collection('products').find().toArray(function(error, docs) {
      if (error) {
        context.log('Error running query');
        context.res = { status: 500, body: res.stack }
        return context.done();
      }

      context.log('Success!');
      context.res = {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ res: docs })
      };
      context.done();     
    });
  });
};