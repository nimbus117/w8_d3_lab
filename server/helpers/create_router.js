const express = require('express');
const ObjectID = require('mongodb').ObjectID;

const createRouter = function (collection) {

  const router = express.Router();

  const addTimestamp = function (doc) {
    doc['created'] = doc._id
      .getTimestamp().toGMTString().substring(0,16);
    return doc;
  };

  //Show All
  router.get('/', (req, res) => {
    collection.find().toArray()
      .then(docs => res.json(docs.map(addTimestamp)))
      .catch(err => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //Create
  router.post('/', (req, res) => {
    collection.insertOne(req.body)
      .then(() => collection.find().toArray())
      .then(docs => res.json(docs.map(addTimestamp)))
      .catch(err => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //Delete
  router.delete('/:id', (req, res) => {
    collection.deleteOne({_id: ObjectID(req.params.id)})
      .then(() => collection.find().toArray())
      .then(docs => res.json(docs.map(addTimestamp)))
      .catch(err => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  //Update
  router.put('/:id', (req, res) => {
    collection.updateOne({_id: ObjectID(req.params.id)}, {$set: req.body})
      .then(() => collection.find().toArray())
      .then(docs => res.json(docs.map(addTimestamp)))
      .catch(err => {
        console.error(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  return router;
};

module.exports  = createRouter;
