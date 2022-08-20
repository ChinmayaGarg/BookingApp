import express from 'express';

import Hotel from '../models/Hotel.js';
const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  const newHotel = new Hotel(req.body);
  console.log(newHotel, 'newHotel');

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel has been deleted.');
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL

export default router;

/*
MangoDB DB-> Collections-> Documents-> Key-Value Pairs
https://www.geeksforgeeks.org/mongodb-database-collection-and-document/

const newHotel = new Hotel(req.body);
  newHotel is the object (document) that store hotel information (key-value pairs) and 
  it will store in the form of HotelScema of Hotel model inside Hotel Collection and 
  newHotel will get data from request made by the client. req is request that we are taking from user/client

router.post('/:id?limit=5', async (req, res) => {
  To take parameter inside the endpoint we can add colon and then the variable name. Then with the help of question mark we can query.
  
const savedHotel = await newHotel.save();
  The save() method is asynchronous, so it returns a promise that you can await on.
  https://mongoosejs.com/docs/documents.html
  https://masteringjs.io/tutorials/mongoose/save

router.put('/:id', async (req, res) => {
const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new:true });
  1. We created a PUT request.
  2. We passed a param id by :id inside endpoint
  3. We used that id from params to find the document in "hotels" collection
  4. Than we updated the document's key-value pairs that we needed to update

$set: req.body
  It is the MongoDBs set method, here we have passed what we want to change (i.e. what client requested)

new:true
  In findByIdAndUpdate we passed new true, which will return document after updating and not the one that is not updated.
  Depending on APIs requirement either original/old document is returned or the updated one.
*/
