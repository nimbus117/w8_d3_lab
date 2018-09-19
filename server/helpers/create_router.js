const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function(collection){

  const router = express.Router();

  const addTimestamp = function(doc){
    doc['created_date'] = doc._id.getTimestamp().toGMTString().substring(0,16);
    return doc;
  };

  //Show All
  router.get('/', (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => res.json(docs.map(addTimestamp)))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
    });
  });

  //Show by ID
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .find({ _id: ObjectID(id) })
      .toArray()
      .then((docs) => res.json(docs))
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //Create
  router.post('/',(req, res) => {
    const newData = req.body;
    collection
      .insertOne(newData)
      .then(() => {
        collection
        .find()
        .toArray()
      .then((docs) => {
        res.json(docs.map(addTimestamp));
      });
      });
  });

  //Delete
  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    collection
      .deleteOne({ _id: ObjectID(id) })
      .then(() => {
        collection
          .find()
          .toArray()
          .then((docs) => res.json(docs.map(addTimestamp)));
      })
      .catch((err) => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //Update
  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    collection.updateOne(
      { _id: ObjectID(id) },
      { $set: updatedData}
    )
    .then(() => collection.find().toArray())
    .then((docs) => res.json(docs.map(addTimestamp)));
  });

  return router;
};

module.exports  = createRouter;
