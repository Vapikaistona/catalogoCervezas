const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the beers.
recordRoutes.route("/beers").get(function (req, res) {
 let db_connect = dbo.getDb();
 const query = req.query;
 db_connect
   .collection("beers")
   .find({...query})
   .limit(20)
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single beer by id
recordRoutes.route("/beers/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect
     .collection("beers")
     .findOne(myquery, function (err, result) {
       if (err) throw err;
       res.json(result);
     });
});
 
// This section will help you get a list of all the breweries.
recordRoutes.route("/breweries").get(function (req, res) {
    let db_connect = dbo.getDb();
    const query = req.query;
    db_connect
        .collection("breweries")
        .find({...query})
        .limit(20)
        .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
        });
});

// This section will help you get a single brewery by id
recordRoutes.route("/breweries/:id").get(function (req, res) {
let db_connect = dbo.getDb();
let myquery = { _id: ObjectId( req.params.id )};
db_connect
    .collection("breweries")
    .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});


// This section will help you get a list of all the kegs.
recordRoutes.route("/kegs").get(function (req, res) {
  let db_connect = dbo.getDb();
  const query = req.query;
  db_connect
      .collection("kegs")
      .find({...query})
      .limit(20)
      .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
      });
});

// This section will help you create a new keg.
recordRoutes.route("/kegs/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   id: req.body.id,
   prices: req.body.prices
 };
 db_connect.collection("kegs").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a keg by id.
recordRoutes.route("/kegs/:id").post(function (req, response) {
 let db_connect = dbo.getDb(); 
 let myquery = { _id: ObjectId( req.params.id )}; 
 let newvalues = {   
   $set: {     
     name: req.body.name,    
     position: req.body.position,     
     level: req.body.level,   
   }, 
  }
});
 
// This section will help you delete a keg
recordRoutes.route("/kegs/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId( req.params.id )};
 db_connect.collection("kegs").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;